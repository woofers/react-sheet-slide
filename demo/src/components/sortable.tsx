import React, { useState } from 'react'
import { styled } from 'stitches'
import {
  DndContext,
  useSensors,
  useSensor,
  KeyboardSensor,
  MouseSensor,
  TouchSensor
} from '@dnd-kit/core'
import {
  SortableContext,
  useSortable,
  sortableKeyboardCoordinates,
  arrayMove as reorderItems
} from '@dnd-kit/sortable'
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
  restrictToHorizontalAxis
} from '@dnd-kit/modifiers'
import { CSS } from '@dnd-kit/utilities'
import type { UniqueIdentifier } from '@dnd-kit/core'

const Button = styled('button', {
  touchAction: 'manipulation',
  cursor: 'grab',
  zIndex: 10,
  border: 0,
  backgroundColor: '$tabBackground',
  color: '$text',
  transition: 'background-color 0.4s ease-in-out 0s, border-radius 0.3s ease-in-out 0s',
  '&[aria-pressed="true"]': {
    backgroundColor: '$tabActive',
    cursor: 'grabbing',
    zIndex: '20'
  },
  variants: {
    position: {
      both: {
        br: '8px'
      },
      top: {
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px'
      },
      bottom: {
        borderBottomLeftRadius: '8px',
        borderBottomRightRadius: '8px'
      },
      middle: {}
    }
  },
  defaultVariants: {
    position: 'middle'
  }
})

type Position = 'top' | 'bottom' | 'middle' | 'both'

const Wrapper = styled('div', {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column'
})

export type ItemProps = {
  id: UniqueIdentifier
  disabled?: boolean
  children?: React.ReactNode
  as?: string
}

type SortableItemProps = ItemProps & {
  onRemove?: (id: UniqueIdentifier) => void
}

const buttonType: 'button' = 'button'

const SortableItem: React.FC<SortableItemProps> = ({
  id,
  disabled,
  children,
  as = 'button',
  ...rest
}) => {
  const {
    active,
    isDragging,
    index,
    newIndex,
    items,
    overIndex,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id, disabled })
  const liftIndex = overIndex >= 0 ? overIndex : index
  const hasActive = !!active
  const lastIndex = items.length - 1
  const currentIndex = (() => {
    if (isDragging) return liftIndex
    if (hasActive) return newIndex
    return index
  })()
  const isLast = currentIndex === lastIndex
  const isFirst = currentIndex === 0
  const position = ((): Position => {
    if (items.length === 1) return 'both'
    if (isLast) return 'bottom'
    if (isFirst) return 'top'
    return 'middle'
  })()

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }
  const { role, tabIndex, 'aria-disabled': ariaDisabled, ...attrs } = attributes
  const extra =
    as === 'button'
      ? { type: buttonType, disabled: ariaDisabled }
      : { role, tabIndex, 'aria-disabled': ariaDisabled }
  return (
    <Button
      {...extra}
      ref={setNodeRef}
      style={style}
      {...rest}
      {...attrs}
      {...listeners}
      position={position}
    >
      {children}
    </Button>
  )
}

type SetItems = React.Dispatch<React.SetStateAction<ItemProps[]>>

type Axis = 'x' | 'y' | 'xy'

type SortableProps = {
  items: ItemProps[]
  setItems: SetItems
  removable?: boolean
  axis?: Axis
}

const getModifiers = (axis: Axis) => {
  if (axis === 'x') return [restrictToWindowEdges, restrictToHorizontalAxis]
  if (axis === 'y') return [restrictToWindowEdges, restrictToVerticalAxis]
  return [restrictToWindowEdges]
}

export const useSortableItems = (
  init: ItemProps[] | (() => ItemProps[])
): [ItemProps[], SetItems] => {
  const [items, setItems] = useState(init)
  return [items, setItems]
}

export const Sortable: React.FC<SortableProps> = ({
  items,
  setItems,
  removable,
  axis = 'xy'
}) => {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const getIndex = (id: UniqueIdentifier) =>
    items.findIndex(item => item.id === id)
  const getPosition = (id: UniqueIdentifier) => getIndex(id) + 1
  const activeIndex = activeId ? getIndex(activeId) : -1
  const handleRemove = removable
    ? (id: UniqueIdentifier) =>
        setItems(items => items.filter(item => item.id !== id))
    : undefined
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )
  return (
    <DndContext
      modifiers={getModifiers(axis)}
      sensors={sensors}
      onDragStart={({ active }) => {
        if (!active) return
        setActiveId(active.id)
      }}
      onDragEnd={({ over }) => {
        setActiveId(null)
        if (over) {
          const overIndex = getIndex(over.id)
          if (activeIndex !== overIndex) {
            setItems(items => reorderItems(items, activeIndex, overIndex))
          }
        }
      }}
      onDragCancel={() => setActiveId(null)}
    >
      <SortableContext items={items.map(el => el.id)}>
        <Wrapper>
          {items.map(({ id, children, ...rest }, index) => (
            <SortableItem key={id} id={id} {...rest} onRemove={handleRemove}>
              {children}
            </SortableItem>
          ))}
        </Wrapper>
      </SortableContext>
    </DndContext>
  )
}

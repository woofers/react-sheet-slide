import React, { useState } from 'react'
import { styled } from 'stitches'
import {
  DndContext,
  useSensors,
  useSensor,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  MeasuringStrategy
} from '@dnd-kit/core'
import {
  SortableContext,
  useSortable,
  sortableKeyboardCoordinates,
  arrayMove,
  verticalListSortingStrategy,
  horizontalListSortingStrategy
} from '@dnd-kit/sortable'
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
  restrictToHorizontalAxis
} from '@dnd-kit/modifiers'
import { CSS } from '@dnd-kit/utilities'
import type { UniqueIdentifier } from '@dnd-kit/core'

const Flex = styled('div', {
  width: '354px',
  display: 'flex',
  gap: '4px 0',
  flexDirection: 'column'
})

const Title = styled('div', {
  textTransform: 'capitalize',
  fontSize: '16px',
  fontWeight: '700'
})

const Text = styled('div', {
  background: 'none',
  border: 0,
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  ml: '8px',
  pr: '16px',
  height: '100%',
  borderBottom: '0.2px solid $containerBorder'
})

const Square = styled('div', {
  py: '8px',
  br: '8px',
  width: '30px',
  height: '30px',
  background: '#007aff'
})

const Round = styled('div', {
  border: 0,
  padding: 0,
  br: '$round',
  width: '20px',
  height: '20px',
  background: '#ff453a'
})

const Button = styled('button', {
  display: 'flex',
  gap: '0 8px',
  alignItems: 'center',
  padding: '0 0 0 16px',
  height: '44px',
  touchAction: 'manipulation',
  cursor: 'grab',
  zIndex: 10,
  border: 0,
  backgroundColor: '$containerBackground',
  color: '$text',
  textAlign: 'left',
  transition:
    'background-color 0.4s ease-in-out 0s, border-radius 0.3s ease-in-out 0s',
  '&[aria-pressed="true"]': {
    opacity: 0.75,
    cursor: 'grabbing',
    zIndex: '20'
  },
  variants: {
    position: {
      both: {
        br: '8px',
        [`${Text}`]: {
          borderBottom: 0
        }
      },
      top: {
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px'
      },
      bottom: {
        borderBottomLeftRadius: '8px',
        borderBottomRightRadius: '8px',
        [`${Text}`]: {
          borderBottom: 0
        }
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
  minHeight: '88px',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column'
})

const Container = styled('div', {
  display: 'flex',
  gap: '16px 16px'
})

export type ItemProps = {
  id: UniqueIdentifier
  disabled?: boolean
  children?: React.ReactNode
  as?: string
  hidden?: boolean
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
  onRemove,
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
      as={as as 'button'}
      {...extra}
      ref={setNodeRef}
      style={style}
      {...rest}
      {...attrs}
      {...listeners}
      position={position}
    >
      {onRemove && <Round tabIndex={0} onClick={() => onRemove(id)} as="div" />}
      <Text>{children}</Text>
    </Button>
  )
}

type Axis = 'x' | 'y' | 'xy'

type SortableProps = {
  items: Items
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
  init: Items | (() => Items)
): [Items, SetItems] => {
  const [items, setItems] = useState(init)
  return [items, setItems]
}

export type Items = Record<UniqueIdentifier, ItemProps[]>
export type SetItems = React.Dispatch<React.SetStateAction<Items>>

export const Sortable: React.FC<SortableProps> = ({
  items,
  setItems,
  removable,
  axis = 'xy'
}) => {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const [clonedItems, setClonedItems] = useState<Items | null>(null)
  const findContainer = (id: UniqueIdentifier) => {
    if (id in items) return id
    return Object.keys(items).find(key =>
      items[key].find(item => item.id === id)
    )
  }

  const handleRemove = undefined
  //const handleRemove = removable
  //  ? (id: UniqueIdentifier) =>
  //      setItems(items => items.filter(item => item.id !== id))
  //  : undefined
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  const onDragCancel = () => {
    if (clonedItems) {
      setItems(clonedItems)
    }
    setActiveId(null)
    setClonedItems(null)
  }

  return (
    <DndContext
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always
        }
      }}
      modifiers={getModifiers(axis)}
      sensors={sensors}
      onDragStart={({ active }) => {
        setActiveId(active.id)
        setClonedItems(items)
      }}
      onDragOver={({ active, over }) => {
        const overId = over?.id
        if (overId == null || active.id in items) return
        const overContainer = findContainer(overId)
        const activeContainer = findContainer(active.id)
        if (!overContainer || !activeContainer) return
        if (activeContainer !== overContainer) {
          setItems(items => {
            const activeItems = items[activeContainer]
            const overItems = items[overContainer]
            const overIndex = overItems.findIndex(item => item.id === overId)
            const activeIndex = activeItems.findIndex(
              item => item.id === active.id
            )

            let newIndex: number
            if (overId in items) {
              newIndex = overItems.length + 1
            } else {
              const isBelowOverItem =
                over &&
                active.rect.current.translated &&
                active.rect.current.translated.top >
                  over.rect.top + over.rect.height

              const modifier = isBelowOverItem ? 1 : 0
              newIndex =
                overIndex >= 0 ? overIndex + modifier : overItems.length + 1
            }
            return {
              ...items,
              [activeContainer]: items[activeContainer].filter(
                item => item.id !== active.id
              ),
              [overContainer]: [
                ...items[overContainer].slice(0, newIndex),
                items[activeContainer][activeIndex],
                ...items[overContainer].slice(
                  newIndex,
                  items[overContainer].length
                )
              ]
            }
          })
        }
      }}
      onDragEnd={({ active, over }) => {
        const activeContainer = findContainer(active.id)
        if (!activeContainer) {
          setActiveId(null)
          return
        }
        const overId = over?.id
        if (overId == null) {
          setActiveId(null)
          return
        }
        const overContainer = findContainer(overId)

        if (overContainer) {
          const activeIndex = items[activeContainer].findIndex(
            item => item.id === active.id
          )
          const overIndex = items[overContainer].findIndex(
            item => item.id === overId
          )
          if (activeIndex !== overIndex) {
            setItems(items => ({
              ...items,
              [overContainer]: arrayMove(
                items[overContainer],
                activeIndex,
                overIndex
              )
            }))
          }
        }
      }}
      onDragCancel={onDragCancel}
    >
      <Container>
        <SortableContext
          items={Object.keys(items)}
          strategy={horizontalListSortingStrategy}
        >
          {Object.keys(items).map(key => (
            <SortableContext
              items={items[key]}
              key={key}
              strategy={verticalListSortingStrategy}
            >
              <Flex>
                <Title>{key}</Title>
                <SortContainer id={key}>
                  {items[key].map(({ id, children, ...rest }) => (
                    <SortableItem
                      key={`${key}-${id}`}
                      id={id}
                      {...rest}
                      onRemove={handleRemove}
                    >
                      {children}
                    </SortableItem>
                  ))}
                </SortContainer>
              </Flex>
            </SortableContext>
          ))}
        </SortableContext>
      </Container>
    </DndContext>
  )
}

const SortContainer: React.FC<{ id: string; children?: React.ReactNode }> = ({
  id,
  children,
  ...rest
}) => {
  const { listeners, setNodeRef } = useSortable({ id, disabled: true })
  return (
    <Wrapper ref={setNodeRef} {...rest} {...listeners}>
      {children}
    </Wrapper>
  )
}

'use client'
import React, { forwardRef, useState, useId } from 'react'
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
import Box, { type BoxProps } from './box'
import { clsx, cva, type VariantProps } from 'cva'

const button = cva(
  [
    'flex',
    'gap-x-2',
    'items-center',
    'pl-4',
    'h-11',
    'touch-manipulation',
    'cursor-grab',
    'z-10',
    'border-none',
    'bg-[var(--color-container-background)]',
    'text-[var(--color-text)]',
    'text-left',
    '[transition:background-color_0.4s_ease-in-out_0s,border-radius_0.3s_ease-in-out_0s]',
    'aria-pressed:opacity-75 aria-pressed:cursor-grabbing aria-pressed:z-20'
  ],
  {
    variants: {
      position: {
        both: ['rounded-lg', '[--border-bottom:0]'],
        top: ['rounded-t-lg'],
        bottom: ['rounded-b-lg', '[--border-bottom:0]'],
        middle: []
      }
    },
    defaultVariants: {
      position: 'middle'
    }
  }
)

const Button = forwardRef<
  HTMLButtonElement,
  React.HTMLProps<HTMLButtonElement> &
    VariantProps<typeof button> & { className?: string; as?: string }
>(({ className, as = 'button', position, ...rest }, ref) => {
  const Comp = as || 'button'
  const data = { ref } as any
  return (
    <Comp
      {...rest}
      {...data}
      as={as}
      className={clsx(button({ position }), className)}
    />
  )
})

type Position = 'top' | 'bottom' | 'middle' | 'both'

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

const buttonType = 'button' as const

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
      {onRemove && (
        <div
          className="border-none p-0 rounded-full w-5 w-5 background-[#ff453a]"
          tabIndex={0}
          onClick={() => onRemove(id)}
        />
      )}
      <div className="bg-none flex grow items-center ml-2 pr-4 h-full border-[var(--color-container-border)] border-solid border-0 [border-bottom-width:var(--border-bottom,0.2px)]">
        {children}
      </div>
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
  const id = useId()
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
      id={id}
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
      <div className="gap-4 flex">
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
              <div className="w-[354px] flex flex-col gap-y-1">
                <div className="capitalize text-base font-bold">{key}</div>
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
              </div>
            </SortableContext>
          ))}
        </SortableContext>
      </div>
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
    <div
      ref={setNodeRef}
      {...rest}
      {...listeners}
      className="min-height-[88px] relative flex flex-col"
    >
      {children}
    </div>
  )
}

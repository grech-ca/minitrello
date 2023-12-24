import { FC, useMemo, Fragment } from 'react'

import { useLocation } from 'react-router-dom'
import {
  Draggable,
  DraggableStateSnapshot,
  DraggingStyle,
  NotDraggingStyle,
} from 'react-beautiful-dnd'
import { values } from 'lodash'
import { MdSubject, MdOutlineCheckBox, MdOutlineEdit as EditIcon } from 'react-icons/md'
import { clsx } from 'clsx'
import { useToggle } from 'react-use'

import { useCard } from 'hooks'
import { useFloatingCard } from './hooks'

import { Card } from 'store/slices/board/types'

import { ShortLabels } from './ShortLabels'
import { LinkOverlay } from './LinkOverlay'
import { CardContainer } from './CardContainer'
import { EditMenu } from './EditMenu'

export interface CardProps {
  card: Card
  index: number
}

const getStyle = (
  style: DraggingStyle | NotDraggingStyle | undefined,
  snapshot: DraggableStateSnapshot,
) => {
  if (snapshot.isDragging && !snapshot.isDropAnimating) {
    return {
      ...style,
      transform: `${style?.transform || ''} rotate(0.01turn)`,
    }
  }

  return {
    ...style,
    transition: 'transform 1ms ease, opacity 1ms ease',
  }
}

export const CardComponent: FC<CardProps> = ({ card, index }) => {
  const location = useLocation()

  const [isDialogOpened, toggleDialog] = useToggle(false)
  const { labels, checklists } = useCard(card.id)

  const floatingCard = useFloatingCard()

  const { completed, total } = checklists.reduce(
    (acc, checklist) => {
      const completed = values(checklist.items).filter(({ completed }) => completed).length
      const total = checklist.itemIds.length

      return {
        total: acc.total + total,
        completed: acc.completed + completed,
      }
    },
    { completed: 0, total: 0 },
  )

  // TODO: Fix divider
  const isDivider = useMemo(() => /^-{3,}$/.test(card.title), [card.title])

  const hasDescription = !!card.description
  const hasChecklists = card.checklistIds.length > 0 && total + completed > 0

  const labelsColors = useMemo(() => labels.map(({ color }) => color), [labels])

  return (
    <Fragment>
      <Draggable draggableId={card.id} index={index}>
        {(provided, snapshot) => (
          <div
            {...(isDialogOpened
              ? {}
              : {
                  ...provided.draggableProps,
                  ...provided.dragHandleProps,
                })}
            ref={provided.innerRef}
            role="button"
            style={getStyle(provided.draggableProps.style, snapshot)}
            className="relative"
          >
            <CardContainer
              className={clsx(
                'w-full border-b-2 border-b-slate-900/10 transition-[0.05s] hover:bg-gray-100 !cursor-pointer',
                {
                  'px-4 after:inline-block after:h-0.5 after:w-full after:bg-gray-300': isDivider,
                },
              )}
              ref={floatingCard.refs.setReference}
            >
              {!isDialogOpened && <LinkOverlay cardId={card.id} backgroundLocation={location} />}

              {labels.length > 0 && <ShortLabels colors={labelsColors as string[]} />}

              <div className="break-words">{card.title}</div>

              <button
                className={clsx(
                  'absolute right-0.5 top-0.5 invisible group-hover:visible bg-gray-100 hover:bg-gray-200',
                  'flex items-center justify-center aspect-square h-8 rounded-full transition-all active:scale-95',
                  {
                    hidden: isDialogOpened,
                  },
                )}
                onClick={toggleDialog}
              >
                <EditIcon className="text-gray-500" />
              </button>
              {(hasDescription || hasChecklists) && (
                <div className="flex items-center gap-4 flex-wrap text-sm text-gray-500">
                  {hasDescription && <MdSubject />}
                  {hasChecklists && (
                    <Fragment>
                      <MdOutlineCheckBox />
                      {completed} / {total}
                    </Fragment>
                  )}
                </div>
              )}
            </CardContainer>
          </div>
        )}
      </Draggable>

      <EditMenu
        cardId={card.id}
        floatingCard={floatingCard}
        isOpen={isDialogOpened}
        onClose={toggleDialog}
      />
    </Fragment>
  )
}

export { CardComponent as Card }

import { FC, useMemo, Fragment, useRef, CSSProperties } from 'react'
import { createPortal } from 'react-dom'

import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  Draggable,
  DraggableStateSnapshot,
  DraggingStyle,
  NotDraggingStyle,
} from 'react-beautiful-dnd'
import { pick, values, filter } from 'lodash'
import {
  MdSubject,
  MdOutlineCheckBox,
  MdOutlineEdit as EditIcon,
  MdDeleteOutline as DeleteIcon,
  MdOutlineArticle as CardDetailsIcon,
} from 'react-icons/md'
import { clsx } from 'clsx'
import { useToggle } from 'react-use'
import { Dialog, Transition } from '@headlessui/react'
import { useFloating, autoPlacement, offset, autoUpdate } from '@floating-ui/react'
import { IconType } from 'react-icons'
import mergeRefs from 'merge-refs'

import { useCard } from 'hooks'

import { Card, Label } from 'store/slices/board/types'
import { RootState } from 'store'

import { O } from 'ts-toolbelt'
import { ShortLabels } from './ShortLabels'
import { Title, TitleRef } from './Title'
import { LinkOverlay } from './LinkOverlay'
import { CardContainer } from './CardContainer'

export interface CardProps {
  card: Card
  index: number
}

const MENU_BUTTON_DELAY_STEP = 20

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
  const navigate = useNavigate()

  const titleRef = useRef<TitleRef>(null)

  const [isDialogOpened, toggleDialog] = useToggle(false)
  const { updateCard, removeCard } = useCard(card.id)

  const labels = useSelector((state: RootState) => pick(state.board.labels, card.labelIds))
  const labelsList = filter(values(labels)) as O.Compulsory<Label, 'color'>[]
  const { floatingStyles, refs } = useFloating({
    middleware: [
      {
        name: 'card-menu',
        fn: ({
          rects: {
            reference: { x, y },
          },
        }) => ({ x, y }),
      },
    ],
  })
  const {
    floatingStyles: menuFloatingStyles,
    refs: menuRefs,
    placement: menuPlacement,
  } = useFloating({
    placement: 'right-start',
    middleware: [autoPlacement({ allowedPlacements: ['left-start', 'right-start'] }), offset(8)],
  })
  const { floatingStyles: saveButtonFloatingStyles, refs: saveButtonRefs } = useFloating({
    placement: 'bottom-start',
    middleware: [offset(8)],
    whileElementsMounted: autoUpdate,
  })

  const checklists = useSelector((state: RootState) =>
    values(pick(state.board.checklists, card.checklistIds)),
  )
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

  const openDialog = () => toggleDialog(true)

  const closeDialog = () => {
    toggleDialog(false)
  }

  const cardActions = useMemo<{ icon: IconType; title: string; action: () => void }[]>(
    () => [
      {
        icon: CardDetailsIcon,
        title: 'Open card',
        action: () => {
          navigate(`/c/${card.id}`, { state: { backgroundLocation: location } })
          closeDialog()
        },
      },
      {
        icon: DeleteIcon,
        title: 'Delete',
        action: () => {
          removeCard()
          closeDialog()
        },
      },
    ],
    [],
  )

  const labelsColors = useMemo(() => labelsList.map(({ color }) => color), [labelsList])

  const handleTitleChange = (title: string) => {
    updateCard({ title })
    closeDialog()
  }

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
                'w-full border-b-2border-b-slate-900/10 transition-[0.05s] hover:bg-gray-100',
                {
                  'px-4 after:inline-block after:h-0.5 after:w-full after:bg-gray-300': isDivider,
                },
              )}
              ref={refs.setReference}
            >
              {!isDialogOpened && <LinkOverlay cardId={card.id} backgroundLocation={location} />}

              {labelsList.length > 0 && <ShortLabels colors={labelsColors} />}

              <div className="break-words">{card.title}</div>

              <button
                className={clsx(
                  'absolute right-0.5 top-0.5 invisible group-hover:visible bg-gray-100 hover:bg-gray-200',
                  'flex items-center justify-center aspect-square h-8 rounded-full transition-all active:scale-95',
                  {
                    hidden: isDialogOpened,
                  },
                )}
                onClick={openDialog}
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

      {/* TODO: Add footer icons */}
      {createPortal(
        <Transition show={isDialogOpened}>
          <Dialog onClose={closeDialog} className="relative z-40">
            <Dialog.Panel>
              <Transition.Child
                as={Fragment}
                enter="transition-opacity duration-200"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Backdrop
                  onClick={closeDialog}
                  className="fixed inset-0 bg-gray-900/60 backdrop-blur cursor-pointer transition-colors"
                />
              </Transition.Child>
              <div className="fixed z-50" ref={refs.setFloating} style={floatingStyles}>
                <Transition.Child
                  as={CardContainer}
                  enter="transition-opacity"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  className="w-63"
                  ref={mergeRefs<HTMLDivElement>(
                    saveButtonRefs.setReference,
                    menuRefs.setReference,
                  )}
                >
                  {labelsList.length > 0 && <ShortLabels colors={labelsColors} />}

                  <Title value={card.title} onChange={handleTitleChange} ref={titleRef} />
                </Transition.Child>

                <div
                  ref={menuRefs.setFloating}
                  style={menuFloatingStyles}
                  className={clsx('flex flex-col items-start gap-y-1 z-50', {
                    'items-start': menuPlacement === 'right-start',
                    'items-end': menuPlacement === 'left-start',
                  })}
                >
                  {cardActions.map(({ icon: ActionIcon, title, action }, index) => (
                    <Transition.Child
                      key={title}
                      as="button"
                      style={{ '--delay': `${index * MENU_BUTTON_DELAY_STEP}ms` } as CSSProperties}
                      enter={clsx('transition-all delay-[var(--delay)]', {
                        'origin-top-left': menuPlacement === 'right-start',
                        'origin-top-right': menuPlacement === 'left-start',
                      })}
                      enterFrom="opacity-0 scale-50"
                      enterTo="opacity-100 scale-100"
                      leave="transition-opacity"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                      className={clsx(
                        'flex text-slate-700 items-center outline-none rounded bg-slate-50',
                        'hover:bg-slate-300 active:scale-95 transition-all gap-x-1 py-1.5 pl-2 pr-3 text-left',
                      )}
                      onClick={action}
                    >
                      <ActionIcon className="aspect-square" />
                      <div className="text-sm font-bold">{title}</div>
                    </Transition.Child>
                  ))}
                </div>

                <Transition.Child
                  ref={saveButtonRefs.setFloating}
                  enter="transition-all origin-top"
                  enterFrom="opacity-0 scale-50"
                  enterTo="opacity-100 scale-100"
                  leave="transition-opacity"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  style={
                    {
                      ...saveButtonFloatingStyles,
                      '--delay': `${cardActions.length * MENU_BUTTON_DELAY_STEP}`,
                    } as CSSProperties
                  }
                >
                  <button
                    type="button"
                    onClick={titleRef?.current?.submit}
                    className="rounded px-3 py-1.5 text-sm font-medium bg-blue-300 active:scale-95 hover:bg-blue-200 transition-all"
                  >
                    Save
                  </button>
                </Transition.Child>
              </div>
            </Dialog.Panel>
          </Dialog>
        </Transition>,
        document.body,
      )}
    </Fragment>
  )
}

export { CardComponent as Card }

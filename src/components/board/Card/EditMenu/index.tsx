import { Fragment, useRef, CSSProperties, useMemo } from 'react'
import { createPortal } from 'react-dom'

import { Dialog, Transition } from '@headlessui/react'
import { useFloating, autoPlacement, autoUpdate, offset } from '@floating-ui/react'
import mergeRefs from 'merge-refs'
import { clsx } from 'clsx'
import { MdDeleteOutline as DeleteIcon, MdOutlineArticle as CardDetailsIcon } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { IconType } from 'react-icons'

import { CardContainer } from 'components/board/Card/CardContainer'

import { useCard } from 'hooks'
import { FloatingCard } from '../hooks'

import { ShortLabels } from '../ShortLabels'
import { Title, TitleRef } from '../Title'

export type EditMenuProps = {
  cardId: string
  onClose: (value?: boolean) => void
  isOpen: boolean
  floatingCard: FloatingCard
}

const MENU_BUTTON_DELAY_STEP = 20

export const EditMenu = ({ cardId, onClose, isOpen, floatingCard }: EditMenuProps) => {
  const { card, labels, removeCard, updateCard } = useCard(cardId)
  const navigate = useNavigate()

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

  const titleRef = useRef<TitleRef>(null)

  const handleTitleChange = (title: string) => {
    updateCard({ title })
    onClose()
  }

  const cardActions = useMemo<{ icon: IconType; title: string; action: () => void }[]>(
    () => [
      {
        icon: CardDetailsIcon,
        title: 'Open card',
        action: () => {
          navigate(`/c/${cardId}`, { state: { backgroundLocation: location } })
          onClose()
        },
      },
      {
        icon: DeleteIcon,
        title: 'Delete',
        action: () => {
          removeCard()
          onClose()
        },
      },
    ],
    [],
  )

  const labelsColors = useMemo(() => labels.map(({ color }) => color), [labels])

  return createPortal(
    <Transition show={isOpen}>
      <Dialog onClose={onClose} className="relative z-40">
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
              onClick={() => onClose(false)}
              className="fixed inset-0 bg-gray-900/60 backdrop-blur cursor-pointer transition-colors"
            />
          </Transition.Child>
          <div
            className="fixed z-50"
            ref={floatingCard.refs.setFloating}
            style={floatingCard.floatingStyles}
          >
            <Transition.Child
              as={CardContainer}
              enter="transition-opacity"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              className="w-63"
              ref={mergeRefs<HTMLDivElement>(saveButtonRefs.setReference, menuRefs.setReference)}
            >
              {labels.length > 0 && <ShortLabels colors={labelsColors as string[]} />}

              <Title value={card?.title ?? ''} onChange={handleTitleChange} ref={titleRef} />
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
  )
}

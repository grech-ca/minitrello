import { FC, useState, useRef, MouseEventHandler } from 'react'

import { useParams, Navigate, useNavigate, useMatch } from 'react-router-dom'
import { MdOutlineLoyalty, MdOutlineCheckBox, MdDeleteOutline, MdAdd, MdLabelOutline } from 'react-icons/md'
import slugify from 'slugify'
import { Helmet } from 'react-helmet'
import {
  shift,
  offset,
  size,
  useFloating,
  autoPlacement,
  autoUpdate,
  flip,
} from '@floating-ui/react'
import { useToggle } from 'react-use'

import {
  Modal,
  ModalHeader,
  ModalClose,
  ModalBody,
  ModalSidebar,
  ModalSidebarHeading,
  ModalContent,
} from 'components/modal'
import {Button} from 'common/Button'
import { EditableDescription, CreateChecklist, Checklist } from 'components/board'
import { Button as Button_deprecated } from 'components/common'
import { LabelEditor } from 'components/common/LabelEditor'

import { useCard, useEscape } from 'hooks'

import { CardTitle, LabelsList, Label } from './styles'
import { Popover } from '@headlessui/react'
import { ButtonBase } from 'common/Button/ButtonBase'

export const CardModal: FC = () => {
  const checkListButtonRef = useRef<HTMLButtonElement>(null)
  const labelButtonRef = useRef<HTMLButtonElement>(null)

  const { cardId } = useParams<{ cardId: string }>()
  const { card, checklists, labels, updateCard, removeCard, addChecklist } = useCard(cardId!)

  const navigate = useNavigate()
  const match = useMatch('/c/:cardId')

  const [title, setTitle] = useState(card?.title || '')
  const [description, setDescription] = useState(card?.description || '')
  const [checklistPopupVisible, setChecklistPopupVisible] = useState(true)

  const [isLabelEditorOpened, toggleLabelEditor] = useToggle(false)
  const labelEditorFloatingData = useFloating({
    open: isLabelEditorOpened,
    onOpenChange: toggleLabelEditor,
    placement: 'bottom-start',
    middleware: [
      size({
        padding: 8,
        apply({ elements }) {
          Object.assign(elements.floating.style, { maxHeight: `calc(100dvh - 8px * 2)` })
        },
      }),
      offset(8),
      shift({ padding: 8, crossAxis: true }),
    ],
    whileElementsMounted: autoUpdate,
  })

  // useEscape(close)

  if (!card) return <Navigate to="/" />

  const fullPath = `/c/${card.id}/${slugify(title) || `${card.id}-untitled`}`

  if (match) return <Navigate to={fullPath} replace />

  const renameCard = () => {
    if (!card) return
    updateCard({ title })
    navigate(fullPath, { replace: true })
  }
  const deleteCard = () => {
    if (!card) return
    removeCard()
    navigate('/')
  }
  const resetTitle = () => setTitle(card.title)
  const updateDescription = () => updateCard({ description })
  const resetDescription = () => setDescription(card.description || '')

  const toggleCheckList = () => setChecklistPopupVisible(prev => !prev)
  const closeCheckList = () => setChecklistPopupVisible(false)

  const toggleLabelPopup: MouseEventHandler<HTMLElement> = ({ currentTarget }) => {
    // setAnchorElement(prev => (prev ? null : (currentTarget as HTMLElement)))
  }

  return (
    <Modal>
      <Helmet>
        <title>{card.title} | Minitrello</title>
      </Helmet>
      <ModalHeader>
        <CardTitle
          value={title}
          onChange={setTitle}
          onSubmit={renameCard}
          onCancel={resetTitle}
          clickAwayAction="submit"
        />
        <ModalClose />
      </ModalHeader>
      <ModalBody>
        <ModalContent>
          <LabelsList>
            {labels.map(({ id, color, name }) => (
              <Label key={id} $color={color} onClick={toggleLabelPopup}>
                {name}
              </Label>
            ))}
            <Button_deprecated icon={MdAdd} onClick={toggleLabelPopup} variant="secondary" />
          </LabelsList>
          <EditableDescription
            value={description}
            onChange={setDescription}
            onSubmit={updateDescription}
            onCancel={resetDescription}
          />
          {checklists.map(checklist => (
            <Checklist key={checklist.id} checklist={checklist} />
          ))}
        </ModalContent>
        <ModalSidebar>
          <ModalSidebarHeading>Add to card</ModalSidebarHeading>
          <LabelEditor card={card}>
            <ButtonBase as={Popover.Button}>
              <Button icon={MdLabelOutline} as="div" variant="secondary" pressEffect>
                Labels
              </Button>
            </ButtonBase>
          </LabelEditor>
          <Button_deprecated
            variant="secondary"
            ref={checkListButtonRef}
            icon={MdOutlineCheckBox}
            onClick={toggleCheckList}
          >
            Checklist
          </Button_deprecated>
          {/* <CreateChecklist */}
          {/*   isOpen={checklistPopupVisible} */}
          {/*   anchorElement={checkListButtonRef.current} */}
          {/*   onClose={closeCheckList} */}
          {/*   onSubmit={addChecklist} */}
          {/* /> */}
          <ModalSidebarHeading>Actions</ModalSidebarHeading>
          <Button_deprecated variant="secondary" icon={MdDeleteOutline} onClick={deleteCard}>
            Delete
          </Button_deprecated>
        </ModalSidebar>
      </ModalBody>
    </Modal>
  )
}

import { useState, Fragment, useMemo, ReactElement } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { values } from 'lodash'
import { MdChevronLeft, MdOutlineMode as EditIcon } from 'react-icons/md'
import { Popover } from '@headlessui/react'
import { size, shift, offset } from '@floating-ui/react'
import { Float } from '@headlessui-float/react'

import { Button, Editable } from 'components/common'

import { RootState } from 'store'
import {
  Card,
  Label as ILabel,
  addLabelAction,
  removeLabelAction,
  createLabelAction,
  deleteLabelAction,
  updateLabelAction,
  LabelColor,
} from 'store/slices/board'

import { ColorButton } from './ColorButton'
import { IconButton } from 'common/Button/IconButton'

export type LabelEditorProps = {
  card: Card
  children: ReactElement
}

const DEFAULT_COLOR = LabelColor.Green

export const LabelEditor = ({ card, children }: LabelEditorProps) => {
  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [selectedColor, setSelectedColor] = useState<string | null>('')
  const [labelToEdit, setLabelToEdit] = useState<ILabel | null>(null)

  const isNew = labelToEdit?.id === 'NEW'

  const labels = useSelector((state: RootState) => state.board.labels)
  const labelsList = useMemo(() => values(labels), [labels])

  const startEditing = (labelId: string) => {
    const isNew = labelId === 'NEW'

    if (!isNew) {
      const targetLabel = labels[labelId]
      setLabelToEdit(targetLabel)

      setName(targetLabel.name)
      setSelectedColor(targetLabel.color)
    } else {
      setLabelToEdit({ id: 'NEW', name: '', color: DEFAULT_COLOR })
      setName('')
      setSelectedColor(DEFAULT_COLOR)
    }
  }
  const stopEditing = () => {
    setLabelToEdit(null)
    setName('')
  }
  const toggleLabel = (labelId: string) => {
    if (!card.labelIds.includes(labelId)) {
      return dispatch(addLabelAction({ cardId: card.id, id: labelId }))
    }
    return dispatch(removeLabelAction({ cardId: card.id, id: labelId }))
  }
  const deleteLabel = () => {
    if (!labelToEdit) return
    return dispatch(deleteLabelAction(labelToEdit.id))
  }
  const createLabel = () => {
    dispatch(createLabelAction({ name, color: selectedColor || null }))
    stopEditing()
  }
  const updateLabel = () => {
    if (!labelToEdit) return
    dispatch(updateLabelAction({ name, color: selectedColor || null, id: labelToEdit.id }))
    stopEditing()
  }

  return (
    <Popover as={Fragment}>
      <Float
        portal
        middleware={[
          size({
            padding: 8,
            apply({ elements }) {
              Object.assign(elements.floating.style, { maxHeight: `calc(100dvh - 8px * 2)` })
            },
          }),
          offset(8),
          shift({ padding: 8, crossAxis: true }),
        ]}
        enter="transition-all"
        enterFrom="scale-95"
      >
        {children}
        <Popover.Panel className="w-72 p-2 bg-white rounded-xl gap-y-2 grid h-fit">
          <div className="w-full text-center py-2 px-3">
            {labelToEdit ? (
              <Fragment>
                <Button icon={MdChevronLeft} onClick={stopEditing} />
                Update label
              </Fragment>
            ) : (
              'Labels'
            )}
          </div>
          <div>
            {labelToEdit ? (
              <div className="flex flex-col gap-2">
                <label htmlFor="label-name">Name</label>
                <div>
                  <Editable
                    value={name}
                    onChange={setName}
                    id="label-name"
                    minRows={1}
                    maxRows={1}
                    autoFocus
                    className="py-2 px-3 w-full border-gray-400 hover:bg-gray-600/50"
                  />
                </div>
                <label>Select a color</label>
                <div className="grid grid-cols-5 gap-2">
                  {Object.values(LabelColor).map(color => (
                    <ColorButton
                      variant="tile"
                      key={color}
                      onClick={() => setSelectedColor(color === LabelColor.Hidden ? null : color)}
                      color={color}
                      isChecked={
                        (color ?? LabelColor.Hidden) === selectedColor ||
                        (selectedColor === null && color === LabelColor.Hidden)
                      }
                    />
                  ))}
                  <div className="grid gap-y-1 text-sm col-start-2 col-span-4">
                    <p>No color.</p>
                    <p>This won&apos;t show up on the front of cards.</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-y-2">
                {labelsList.map(label => (
                  <div className="grid gap-x-1 grid-cols-1fr/auto" key={label.id}>
                    <ColorButton
                      variant="line"
                      onClick={() => toggleLabel(label.id)}
                      color={label.color}
                      // TODO: Optimize
                      isChecked={card.labelIds?.includes(label.id)}
                    >
                      {label.name}
                    </ColorButton>
                    {/* <div */}
                    {/*   onClick={() => toggleLabel(label.id)} */}
                    {/*   style={ */}
                    {/*     { */}
                    {/*       backgroundColor: label.color ?? '#bbb', */}
                    {/*       '--shadow-color': Color(label.color ?? '#bbb') */}
                    {/*         .darken(0.2) */}
                    {/*         .toString(), */}
                    {/*     } as CSSProperties */}
                    {/*   } */}
                    {/*   className={clsx( */}
                    {/*     'flex items-center h-8 w-full py-1 px-2 rounded hover:pl-6 hover:shadow-[inset_1rem_0_0_0_var(--shadow-color)]', */}
                    {/*     'font-bold transition-all cursor-pointer text-white overflow-hidden text-ellipsis', */}
                    {/*   )} */}
                    {/* > */}
                    {/*   {label.name} */}
                    {/*   <div className="flex-1" /> */}
                    {/*   {card.labelIds.includes(label.id) && <MdCheck />} */}
                    {/* </div> */}
                    <IconButton
                      type="button"
                      icon={EditIcon}
                      color="gray-transparent"
                      onClick={() => startEditing(label.id)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex">
            {labelToEdit ? (
              <Fragment>
                <Button key="submit" variant="primary" onClick={isNew ? createLabel : updateLabel}>
                  {isNew ? 'Create' : 'Save'}
                </Button>
                <div className="flex-1" />
                <Button key="delete" variant="secondary" onClick={deleteLabel}>
                  Delete
                </Button>
              </Fragment>
            ) : (
              <Button key="new" fullWidth variant="secondary" onClick={() => startEditing('NEW')}>
                Create a new label
              </Button>
            )}
          </div>
        </Popover.Panel>
      </Float>
    </Popover>
  )
}

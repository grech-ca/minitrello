import { FC, useState } from 'react'

import { Popup, PopupProps } from 'components/common'

import { TitleInput, Field, InputWrapper, AddButton } from './styles'

export interface CreateChecklistProps extends Omit<PopupProps, 'children'> {
  onSubmit: (value: string) => void
}

const DEFAULT_TITLE = 'Checklist'

export const CreateChecklist: FC<CreateChecklistProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState(DEFAULT_TITLE)

  const submit = () => {
    if (!title) return
    onSubmit(title)
    setTitle(DEFAULT_TITLE)
    // onClose?.();
  }

  return null

  // return (
  //   <Popup anchorElement={anchorElement} isOpen={isOpen} onClose={onClose}>
  //     <PopupHeader>Add checklist</PopupHeader>
  //     <PopupBody>
  //       <Field>
  //         <label htmlFor="checklist-title">Title</label>
  //         <InputWrapper>
  //           <TitleInput
  //             value={title}
  //             id="checklist-title"
  //             onChange={setTitle}
  //             onSubmit={submit}
  //             autoFocus
  //             submitOnEnter
  //           />
  //         </InputWrapper>
  //       </Field>
  //     </PopupBody>
  //     <PopupActions>
  //       <AddButton variant="primary" onClick={submit}>
  //         Add
  //       </AddButton>
  //     </PopupActions>
  //   </Popup>
  // );
}

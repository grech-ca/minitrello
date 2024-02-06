import { FC, FocusEventHandler, useState, useRef } from 'react'

import { useClickAway } from 'react-use'
import Markdown from 'markdown-to-jsx'

import { Button, EditableProps } from 'components/common'

import {
  DescriptionActions,
  DescriptionWrapper,
  DescriptionTextarea,
  MarkdownWrapper,
  TextareaWrapper,
} from './styles'

import { FormattingHelp } from './FormattingHelp'

export type EditableDescriptionProps = Omit<
  EditableProps,
  'submitOnEnter' | 'placeholder' | 'clickAwayAction'
>

export const EditableDescription: FC<EditableProps> = ({
  onFocus,
  onCancel,
  onSubmit,
  value,
  ...props
}) => {
  const descriptionRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const [isFocused, setIsFocused] = useState(false)

  const cancel = () => {
    setIsFocused(false)
    onCancel?.()
  }
  const submit = () => {
    setIsFocused(false)
    onSubmit?.()
  }
  const startEditing = () => {
    setIsFocused(true)
    setTimeout(() => textareaRef.current?.focus(), 0)
  }

  const handleFocus: FocusEventHandler<HTMLTextAreaElement> = e => {
    setIsFocused(true)
    onFocus?.(e)
  }

  useClickAway(descriptionRef, cancel)

  return (
    <DescriptionWrapper ref={descriptionRef}>
      {value && !isFocused ? (
        <MarkdownWrapper onClick={startEditing}>
          <Markdown>{value}</Markdown>
        </MarkdownWrapper>
      ) : (
        <TextareaWrapper $isFocused={isFocused}>
          <DescriptionTextarea
            {...props}
            ref={textareaRef}
            value={value}
            placeholder="Add a more detailed description..."
            onFocus={handleFocus}
            onCancel={cancel}
            submitOnEnter={false}
            minRows={isFocused ? 6 : 3}
          />
        </TextareaWrapper>
      )}
      {isFocused && (
        <DescriptionActions>
          <Button variant="primary" onClick={submit}>
            Save
          </Button>
          <Button onClick={cancel}>Cancel</Button>
          <div className="flex-1" />
          <FormattingHelp />
        </DescriptionActions>
      )}
    </DescriptionWrapper>
  )
}

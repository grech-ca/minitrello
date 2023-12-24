import {
  useEffect,
  forwardRef,
  useCallback,
  useImperativeHandle,
  KeyboardEventHandler,
  useRef,
} from 'react'

import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import ReactTextarea from 'react-textarea-autosize'
import { z, TypeOf } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import mergeRefs from 'merge-refs'

export type TitleProps = {
  value: string
  onChange: (value: string) => void
}

const schema = z.object({
  title: z.string().min(1).trim(),
})

type FormValues = TypeOf<typeof schema>

export type TitleRef = {
  submit: () => void
  focus: () => void
}

export const Title = forwardRef<TitleRef, TitleProps>(({ value, onChange }, ref) => {
  const { handleSubmit, reset, control } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: value,
    },
  })

  const titleRef = useRef<HTMLTextAreaElement>(null)

  const handleTitleSubmit = useCallback<SubmitHandler<FormValues>>(
    ({ title }) => onChange(title),
    [onChange],
  )

  useImperativeHandle(
    ref,
    () => ({
      submit: handleSubmit(handleTitleSubmit),
      focus: () => {
        titleRef.current?.select()
      },
    }),
    [handleSubmit, handleTitleSubmit, value],
  )

  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = e => {
    if (e.key !== 'Enter') return
    e.preventDefault()
    void handleSubmit(handleTitleSubmit)()
  }

  useEffect(() => {
    reset({ title: value })
  }, [value, reset])

  useEffect(() => {
    titleRef.current?.select()
  }, [])

  return (
    <form className="flex" onSubmit={handleSubmit(handleTitleSubmit)}>
      <Controller
        control={control}
        name="title"
        render={({ field: { value, ref: fieldRef, ...field } }) => (
          <ReactTextarea
            {...field}
            className="resize-none p-0 bg-transparent w-full outline-none"
            ref={mergeRefs(titleRef, fieldRef)}
            onKeyDown={handleKeyDown}
            placeholder="Enter a title for this card..."
            minRows={3}
            value={value}
          >
            {value}
          </ReactTextarea>
        )}
      />
    </form>
  )
})

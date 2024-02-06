import { ReactNode, ComponentProps, forwardRef, CSSProperties } from 'react'

import {Transition} from '@headlessui/react'
import { MdCheck as CheckIcon } from 'react-icons/md'
import { clsx } from 'clsx'
import Color from 'color'

export type ColorButtonVariant = 'line' | 'tile'

export type ColorButtonProps = Omit<ComponentProps<'button'>, 'children' | 'color'> & {
  color: string | null
  isChecked?: boolean
} & (
    | {
        variant: 'line'
        children: ReactNode
      }
    | {
        variant: 'tile'
        children?: never
      }
  )

export const ColorButton = forwardRef<HTMLButtonElement, ColorButtonProps>(
  ({ children, variant, className, isChecked, color, ...props }, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        style={
          {
            backgroundColor: color ?? '#bbb',
            '--shadow-color': Color(color ?? '#bbb')
              .darken(0.2)
              .toString(),
          } as CSSProperties
        }
        className={clsx(
          className,
          'rounded h-8 text-white font-medium grid gap-x-2 items-center transition-all py-1 px-2 active:scale-95',
          {
            'hover:shadow-[inset_1rem_0_0_0_var(--shadow-color)] hover:pl-6 grid-cols-1fr/auto truncate text-left':
              variant === 'line',
            'hover:shadow-[inset_0_0_0_2rem_var(--shadow-color)] shadow-transparent aspect-[3/2]':
              variant === 'tile',
          },
        )}
      >
        {variant === 'line' && <div>{children}</div>}
        <Transition
          className="justify-self-center"
          show={isChecked}
          enter="transition-all"
          enterFrom="scale-0 opacity-0"
          enterTo="scale-100 opacity-100"
          leave="transition-all"
          leaveFrom="scale-100 opacity-100"
          leaveTo="scale-0 opacity-0"
        >
          <CheckIcon />
        </Transition>
      </button>
    )
  },
)

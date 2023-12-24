import { forwardRef, ComponentProps } from 'react'

import { clsx } from 'clsx'

export const CardContainer = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'relative rounded-lg outline-none text-sm py-2 px-3 !cursor-pointer min-h-[2rem]',
          'flex flex-col justify-center gap-2 bg-slate-50 group',
          className,
        )}
        {...props}
      />
    )
  },
)

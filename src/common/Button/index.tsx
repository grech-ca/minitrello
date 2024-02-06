import { ElementType, forwardRef } from 'react'

import { PolymorphicRef } from 'common/types'

import { ButtonBase, ButtonBaseProps, ButtonComponent } from './ButtonBase'
import { VariantProps, tv } from 'tailwind-variants'
import { IconType } from 'react-icons'

const button = tv({
  slots: {
    base: 'grid grid-flow-col items-center justify-center font-medium transition-button gap-x-2 px-3 py-1',
    icon: 'aspect-square'
  },
  variants: {
    size: {
      md: {
        base: 'text-sm h-8 gap-x-1 rounded-lg',
        icon: 'text-base'
      }
    },
    variant: {
      primary: {
        base: 'text-white bg-black',
      },
      secondary: {
        base: 'text-gray-700 bg-gray-200'
      }
    },
    disabledVariant: {
      regular: {
        base: 'disabled:text-[#d6d9dd] disabled:bg-[#ebecef]',
      },
      loading: {
        base: 'disabled:bg-transparent disabled:text-[#657080]',
      },
    },
    pressEffect: {
      true: {
        base: 'active:scale-95',
      }
    },
    icon: {
      true: {
        base: 'justify-start',
      }
    }
  },
  defaultVariants: {
    size: 'md',
    variant: 'primary',
  },
})

type ButtonVariants = Omit<VariantProps<typeof button>, 'disabledVariant'>

export interface ButtonProps extends Omit<ButtonVariants, 'icon'> {
  icon?: IconType
}

export const Button: ButtonComponent<ButtonProps> = forwardRef(
  <C extends ElementType = 'button'>(
    props: ButtonBaseProps<C> & ButtonProps,
    ref: PolymorphicRef<C>,
  ) => {
    const { icon: Icon, children, size, variant, loading, disabled, pressEffect, className } = props
    const {base, icon} = button({
      size,
      variant,
      className: [
        className,
        disabled && !loading && 'disabled:text-d6d9dd disabled:bg-ebecef',
        loading && 'disabled:bg-transparent disabled:text-657080',
      ],
      pressEffect,
      icon: Boolean(Icon),
    })

    return (
      <ButtonBase
        ref={ref}
        {...props}
        className={base()}
      >
        {Icon && <Icon className={icon()} />}
        {children}
      </ButtonBase>
    )
  },
)

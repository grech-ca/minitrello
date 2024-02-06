import {ElementType, forwardRef} from 'react'
import { IconType } from "react-icons"
import { ButtonBase, ButtonBaseProps, ButtonComponent } from "./ButtonBase"
import { PolymorphicRef } from 'common/types'
import { VariantProps, tv } from 'tailwind-variants'

const iconButton = tv({
  slots: {
    button: 'aspect-square flex items-center justify-center transition-button',
    icon: 'aspect-square transition-colors',
  },
  variants: {
    size: {
      md: {
        button: 'h-8',
        icon: 'text-base',
      }
    },
    color: {
      gray: {
        button: 'bg-gray-100 hover:bg-gray-200',
        icon: 'text-gray-700',
      },
      'gray-transparent': {
        button: 'bg-transparent hover:bg-gray-200',
        icon: 'text-gray-700',
      },
    },
    rounding: {
      sm: {
        button: 'rounded',
      },
      md: {
        button: 'rounded-lg',
      },
      lg: {
        button: 'rounded-xl',
      },
      '2xl': {
        button: 'rounded-2xl',
      },
      full: {
        button: 'rounded-full',
      },
    },
    pressEffect: {
      true: {
        button: 'active:scale-80',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'gray-transparent',
    rounding: 'sm',
    pressEffect: true,
  }
})

export type IconButtonProps = VariantProps<typeof iconButton> & {
  icon: IconType
  children?: never
}

export const IconButton: ButtonComponent<IconButtonProps> = forwardRef(
  <C extends ElementType = 'button'>(
    props: ButtonBaseProps<C> & IconButtonProps,
    ref?: PolymorphicRef<C>,
  ) => {
  const {icon: Icon, size, color, className} = props
  const {icon, button} = iconButton({size, color})

  return (
    <ButtonBase
      ref={ref}
      {...props}
      className={button({className})}
    >
      <Icon className={icon()} />
    </ButtonBase>
  )
})

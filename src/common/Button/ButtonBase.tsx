import { forwardRef, ElementType, ReactNode, Fragment, ComponentProps } from 'react'

import { PolymorphicComponentPropsWithRef, PolymorphicRef } from 'common/types'

// import { Loading } from 'common/Loading'

export type ButtonType = NonNullable<ComponentProps<'button'>['type']>

export type ButtonBaseProps<C extends ElementType = 'button'> = PolymorphicComponentPropsWithRef<
  C,
  {
    loading?: boolean
    loadingCaption?: string
  }
> &
  (C extends 'button' ? { type: ButtonType } : {})

export type ButtonComponent<P = {}> = <C extends ElementType = 'button'>(
  props: ButtonBaseProps<C> & P,
) => ReactNode | null

export const ButtonBase: ButtonComponent = forwardRef(
  <C extends ElementType = 'button'>(
    { disabled, children, loading, loadingCaption, as, ...props }: ButtonBaseProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const Component = as ?? 'button'
    return (
      <Component ref={ref} disabled={disabled || loading} {...props}>
        {loading ? (
          <Fragment>
            {/* <Loading className="h-6" /> */}
            {loadingCaption}
          </Fragment>
        ) : (
          children
        )}
      </Component>
    )
  },
)

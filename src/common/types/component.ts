import {
  ElementType,
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  PropsWithChildren,
} from 'react'

export type AsProp<C extends ElementType> = {
  as?: C
}

export type PropsToOmit<C extends ElementType, P> = keyof (AsProp<C> & P)

export type PolymorphicComponentProps<C extends ElementType, Props = {}> = PropsWithChildren<
  Props & AsProp<C>
> &
  Omit<ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>

export type PolymorphicComponentPropsWithRef<
  C extends ElementType,
  Props = {},
> = PolymorphicComponentProps<C, Props> & { ref?: PolymorphicRef<C> }

export type PolymorphicRef<C extends ElementType> = ComponentPropsWithRef<C>['ref']

import { ReactNode, Fragment } from 'react'

import { UseFloatingData, useDismiss, useInteractions } from '@floating-ui/react'
import { Popover, Transition } from '@headlessui/react'

export interface PopupProps {
  floatingData: UseFloatingData
  children: ReactNode | ReactNode[]
  className?: string
}

export const Popup = ({ children, floatingData, className }: PopupProps) => {
  const dismiss = useDismiss(floatingData.context)
  const { getFloatingProps } = useInteractions([dismiss])

  return (
    <Transition as={Fragment} show={floatingData.context.open}>
      <Popover className="fixed inset-0">
        <Popover.Panel
          static
          style={floatingData.floatingStyles}
          ref={floatingData.refs.setFloating}
          {...getFloatingProps()}
          className={className}
        >
          {children}
        </Popover.Panel>
      </Popover>
    </Transition>
  )
}

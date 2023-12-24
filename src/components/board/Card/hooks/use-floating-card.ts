import { useFloating } from '@floating-ui/react'

export const useFloatingCard = () => {
  return useFloating({
    middleware: [
      {
        name: 'card-menu',
        fn: ({
          rects: {
            reference: { x, y },
          },
        }) => ({ x, y }),
      },
    ],
  })
}

export type FloatingCard = ReturnType<typeof useFloatingCard>

import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  shift,
  size,
  useDismiss,
  useFloating,
  useInteractions,
} from "@floating-ui/react"
import { motion } from "framer-motion"
import type { ReactNode } from "react"

type PopoverRenderProps = {
  setReference: (node: HTMLElement | null) => void
}

type PopoverProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  renderReference: (props: PopoverRenderProps) => ReactNode
  children: ReactNode
}

export function Popover({
  open,
  onOpenChange,
  renderReference,
  children,
}: PopoverProps) {
  const {
    refs: { setReference, setFloating },
    floatingStyles,
    context,
  } = useFloating({
    open,
    onOpenChange,
    placement: "bottom-start",
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(8),
      flip({ padding: 8 }),
      shift({ padding: 8 }),
      size({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
          })
        },
        padding: 8,
      }),
    ],
  })

  const dismiss = useDismiss(context)
  const { getFloatingProps } = useInteractions([dismiss])

  return (
    <>
      {renderReference({ setReference })}
      {open ? (
        <FloatingPortal>
          <div
            ref={setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.14, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </div>
        </FloatingPortal>
      ) : null}
    </>
  )
}

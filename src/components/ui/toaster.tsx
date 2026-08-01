import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { cn } from "@/lib/utils"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        variant,
        ...props
      }: {
        id: string
        title?: React.ReactNode
        description?: React.ReactNode
        action?: React.ReactNode
        variant?: "default" | "destructive" | "success"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: any
      }) {
        return (
          <Toast
            key={id}
            {...props}
            className={cn(
              "rounded-lg shadow-xl border-2 text-white w-[min(100%,24rem)] min-w-0 max-w-[calc(100vw-2rem)]",
              variant === "success" && "bg-green-500 border-green-400",
              variant === "destructive" && "bg-red-500 border-red-400",
              !variant && "bg-slate-800 border-slate-700"
            )}
          >
            <div className="grid gap-1.5">
              {title && <ToastTitle className="text-base font-semibold">{title}</ToastTitle>}
              {description && <ToastDescription className="text-sm opacity-95">{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}

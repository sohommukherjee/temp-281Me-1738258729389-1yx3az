import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface MinimalistButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export function MinimalistButton({ children, className, ...props }: MinimalistButtonProps) {
  return (
    <Button
      className={cn(
        "h-8 px-4 border border-white bg-transparent text-white text-sm hover:bg-white/10 transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  )
}
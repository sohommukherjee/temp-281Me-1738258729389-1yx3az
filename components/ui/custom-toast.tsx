import { AlertCircle, CheckCircle2 } from "lucide-react";

type ToastType = 'success' | 'error';

interface CustomToastProps {
  type: ToastType;
  message: string;
  description: string;
}

export function createCustomToast({ type, message, description }: CustomToastProps) {
  const icon = type === 'success' ? <CheckCircle2 className="h-5 w-5 text-green-500" /> : <AlertCircle className="h-5 w-5 text-red-500" />;
  
  return {
    title: message,
    description: description,
    icon: icon,
    className: "dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-800",
  };
}
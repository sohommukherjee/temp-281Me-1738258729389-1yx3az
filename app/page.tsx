"use client"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState, KeyboardEvent } from "react"
import { createCustomToast } from "@/components/ui/custom-toast"
import { toast, Toaster } from "sonner"

export default function Home() {
  const [text, setText] = useState("")

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>, mode: '281' | 'titlecase') => {
    if (e.ctrlKey && e.key === 'Enter') {
      mode === '281' ? handle281() : handleTitleCase()
    }
  }

  const handle281 = async () => {
    if (!text.trim()) {
      const toastProps = createCustomToast({
        type: 'error',
        message: 'Error',
        description: 'Please enter some text first.'
      })
      toast(toastProps.title, {
        description: toastProps.description,
        icon: toastProps.icon,
        className: toastProps.className
      })
      return
    }

    if (text.length > 280) {
      const toastProps = createCustomToast({
        type: 'error',
        message: 'Error',
        description: 'Please enter text that is 280 characters or less.'
      })
      toast(toastProps.title, {
        description: toastProps.description,
        icon: toastProps.icon,
        className: toastProps.className
      })
      return
    }

    const processedText = text.padEnd(280, ' ')
    setText(processedText)
    
    try {
      await navigator.clipboard.writeText(processedText)
      const toastProps = createCustomToast({
        type: 'success',
        message: 'Success',
        description: 'Text copied to clipboard!'
      })
      toast(toastProps.title, {
        description: toastProps.description,
        icon: toastProps.icon,
        className: toastProps.className
      })
    } catch (err) {
      const toastProps = createCustomToast({
        type: 'error',
        message: 'Error',
        description: 'Failed to copy to clipboard.'
      })
      toast(toastProps.title, {
        description: toastProps.description,
        icon: toastProps.icon,
        className: toastProps.className
      })
    }
  }

  const handleTitleCase = async () => {
    if (!text.trim()) {
      const toastProps = createCustomToast({
        type: 'error',
        message: 'Error',
        description: 'Please enter some text first.'
      })
      toast(toastProps.title, {
        description: toastProps.description,
        icon: toastProps.icon,
        className: toastProps.className
      })
      return
    }

    const processedText = text
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
    
    setText(processedText)
    
    try {
      await navigator.clipboard.writeText(processedText)
      const toastProps = createCustomToast({
        type: 'success',
        message: 'Success',
        description: 'Text copied to clipboard!'
      })
      toast(toastProps.title, {
        description: toastProps.description,
        icon: toastProps.icon,
        className: toastProps.className
      })
    } catch (err) {
      const toastProps = createCustomToast({
        type: 'error',
        message: 'Error',
        description: 'Failed to copy to clipboard.'
      })
      toast(toastProps.title, {
        description: toastProps.description,
        icon: toastProps.icon,
        className: toastProps.className
      })
    }
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-xl space-y-6">
        <h1 className="text-2xl font-bold text-center">281 Me</h1>
        
        <Tabs defaultValue="281" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="281">281 Me</TabsTrigger>
            <TabsTrigger value="titlecase">Title Case</TabsTrigger>
          </TabsList>
          
          <TabsContent value="281" className="space-y-4">
            <Textarea
              placeholder="Paste your text here..."
              className="min-h-[200px] resize-none focus:ring-0 focus:ring-offset-0 focus:border-border focus:outline-none !ring-0 !ring-offset-0"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, '281')}
              style={{ outline: 'none' }}
            />
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {text.length} / 280 characters
              </p>
              <Button onClick={handle281}>281 Me</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="titlecase" className="space-y-4">
            <Textarea
              placeholder="Paste your text here..."
              className="min-h-[200px] resize-none focus:ring-0 focus:ring-offset-0 focus:border-border focus:outline-none !ring-0 !ring-offset-0"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, 'titlecase')}
              style={{ outline: 'none' }}
            />
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {text.length} characters
              </p>
              <Button onClick={handleTitleCase}>Title Case Me</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <Toaster theme="dark" />
    </main>
  )
}
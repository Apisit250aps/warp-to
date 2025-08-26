'use client'

import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group' // ⭐ ใช้ toggle group
import { Warp, warpSchema } from '@/models/schema'
import { useWarp } from '@/store/use-warp'
import { toast } from 'sonner'
function GodTools({ children }: { children: React.ReactNode }) {
  const form = useForm<Warp>({
    resolver: zodResolver(warpSchema),
    defaultValues: {
      type: 'unknown',
      content: '',
    },
    mode: 'onChange',
  })

  const { post, error } = useWarp()

  const onSubmit = async (values: Warp) => {
    await post(values)

    if (error) {
      toast.error(error)
      return
    }
    toast.success('Warp submitted successfully!')
    form.reset()
    return
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>God Tools</DialogTitle>
          <DialogDescription>
            Being a god doesn&apos;t require special powers.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* 🎛️ TYPE: Toggle (single-select) */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <ToggleGroup
                      type="single"
                      value={field.value}
                      onValueChange={(v) => v && field.onChange(v)}
                      className="justify-start"
                    >
                      <ToggleGroupItem value="unknown" aria-label="UN">
                        UN
                      </ToggleGroupItem>
                      <ToggleGroupItem value="av" aria-label="AV">
                        AV
                      </ToggleGroupItem>
                      <ToggleGroupItem value="vk" aria-label="VK">
                        VK
                      </ToggleGroupItem>
                      <ToggleGroupItem value="ig" aria-label="IG">
                        IG
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* 📝 CONTENT */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter your content"
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
              >
                Reset
              </Button>
              <Button type="submit" disabled={!form.formState.isValid}>
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default GodTools

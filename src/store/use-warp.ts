import { create } from 'zustand'
import _ from 'lodash'
import axios, { AxiosError } from 'axios'

import { Warp } from '@/models/schema'

type WarpType = 'all' | 'av' | 'vk' | 'ig' | 'unknown'

type WarpState = {
  warps: Warp[]
  warpContent: Record<WarpType, string>
  // statuses
  loading: boolean
  error: string | null

  // actions
  random: () => void
  clearError: () => void
  post: (warp: Warp) => Promise<void>
  load: () => Promise<void>
}

export const useWarp = create<WarpState>((set, get) => ({
  warps: [],
  warpContent: { all: '-', av: '-', vk: '-', ig: '-', unknown: '-' },

  // init status
  loading: false,
  error: null,

  clearError: () => set({ error: null }),

  random: () => {
    const { warps, warpContent } = get()
    if (!warps.length) return // ยังไม่มีข้อมูล ไม่ต้องทับของเดิม

    set({
      warpContent: {
        all: _.sample(warps)?.content || warpContent.all || '',
        unknown:
          _.sample(warps.filter((w) => w.type === 'unknown'))?.content ||
          warpContent.unknown ||
          '-',
        av:
          _.sample(warps.filter((w) => w.type === 'av'))?.content ||
          warpContent.av ||
          '-',
        vk:
          _.sample(warps.filter((w) => w.type === 'vk'))?.content ||
          warpContent.vk ||
          '-',
        ig:
          _.sample(warps.filter((w) => w.type === 'ig'))?.content ||
          warpContent.ig ||
          '-',
      },
    })
  },

  post: async (warp) => {
    set({ loading: true, error: null })
    try {
      const { data: result } = await axios.post<ApiResponse<Warp>>(
        '/api/warp',
        warp
      )

      if (result.success) {
        // เพิ่มข้อมูลใหม่และสุ่ม content ใหม่ของ type นั้น ๆ ให้ด้วยก็ได้
        set((state) => {
          const nextWarps = [...state.warps, warp]
          return { warps: nextWarps, postStatus: 'success' as const }
        })
        // อัปเดต random เฉพาะประเภทที่เกี่ยว หรือจะเรียกทั้ง random() ก็ได้
        get().random()
      } else {
        set({
          loading: false,
          error: result.message || 'Post warp failed',
        })
      }
    } catch (e) {
      const error =
        (e as AxiosError<ApiResponse>)?.response?.data?.message ??
        (e as Error)?.message ??
        'Network error'
      set({
        loading: false,
        error,
      })
      console.error('Error posting warp:', error)
    }
  },

  load: async () => {
    set({ loading: true, error: null })
    try {
      const { data: result } = await axios.get<ApiResponse<Warp[]>>('/api/warp')

      if (result.success && result.data) {
        set({ warps: result.data, loading: false })
      } else {
        set({
          loading: false,
          error: result.message || 'Failed to load warps',
        })
      }
    } catch (e) {
      const error =
        (e as AxiosError<ApiResponse>)?.response?.data?.message ??
        (e as Error)?.message ??
        'Network error'
      set({
        loading: false,
        error,
      })
      console.error('Error loading warps:', error)
    } finally {
      get().random()
    }
  },
}))

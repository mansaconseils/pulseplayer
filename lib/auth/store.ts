import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { User, Session } from "./types"

interface AuthStore {
  user: User | null
  session: Session | null
  
  // Actions
  setUser: (user: User | null) => void
  setSession: (session: Session | null) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      session: null,

      setUser: (user) => set({ user }),
      setSession: (session) => set({ session }),
      logout: () => set({ user: null, session: null }),
    }),
    {
      name: "auth-store",
    }
  )
)
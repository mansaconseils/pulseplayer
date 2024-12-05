import { create } from "zustand"
import { persist } from "zustand/middleware"
import { BackupMetadata } from "./types"

interface DataStore {
  backups: BackupMetadata[]
  lastBackupTime: Date | null
  
  // Actions
  addBackup: (backup: BackupMetadata) => void
  removeBackup: (id: string) => void
  clearBackups: () => void
  updateLastBackupTime: (time: Date) => void
}

export const useDataStore = create<DataStore>()(
  persist(
    (set) => ({
      backups: [],
      lastBackupTime: null,

      addBackup: (backup) => set((state) => ({
        backups: [...state.backups, backup],
      })),

      removeBackup: (id) => set((state) => ({
        backups: state.backups.filter((b) => b.id !== id),
      })),

      clearBackups: () => set({ backups: [] }),

      updateLastBackupTime: (time) => set({ lastBackupTime: time }),
    }),
    {
      name: "data-management",
    }
  )
)
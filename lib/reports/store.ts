import { create } from "zustand"
import { persist } from "zustand/middleware"
import { ReportTemplate } from "./types"

interface ReportStore {
  templates: ReportTemplate[]
  scheduledReports: ReportTemplate[]
  
  // Actions
  addTemplate: (template: Omit<ReportTemplate, "id">) => void
  updateTemplate: (id: string, template: Partial<ReportTemplate>) => void
  deleteTemplate: (id: string) => void
  scheduleReport: (template: ReportTemplate) => void
  unscheduleReport: (id: string) => void
}

export const useReportStore = create<ReportStore>()(
  persist(
    (set) => ({
      templates: [],
      scheduledReports: [],

      addTemplate: (template) => set((state) => ({
        templates: [
          ...state.templates,
          { ...template, id: crypto.randomUUID() },
        ],
      })),

      updateTemplate: (id, template) => set((state) => ({
        templates: state.templates.map((t) =>
          t.id === id ? { ...t, ...template } : t
        ),
      })),

      deleteTemplate: (id) => set((state) => ({
        templates: state.templates.filter((t) => t.id !== id),
        scheduledReports: state.scheduledReports.filter((r) => r.id !== id),
      })),

      scheduleReport: (template) => set((state) => ({
        scheduledReports: [...state.scheduledReports, template],
      })),

      unscheduleReport: (id) => set((state) => ({
        scheduledReports: state.scheduledReports.filter((r) => r.id !== id),
      })),
    }),
    {
      name: "report-store",
    }
  )
)
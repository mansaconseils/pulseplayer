import { BackupMetadata, DataSource } from "./types"
import { useDataStore } from "./store"
import { validateData } from "./validation"
import { generateChecksum } from "./utils"

export async function createBackup(source: DataSource, data: any): Promise<BackupMetadata> {
  // Validate data before backup
  const isValid = await validateData(data, source)
  if (!isValid) {
    throw new Error(`Invalid data for source: ${source}`)
  }

  // Create backup metadata
  const backup: BackupMetadata = {
    id: crypto.randomUUID(),
    timestamp: new Date(),
    source,
    size: new Blob([JSON.stringify(data)]).size,
    checksum: await generateChecksum(data),
  }

  // Store backup data
  try {
    const key = `backup_${backup.id}`
    localStorage.setItem(key, JSON.stringify(data))
    useDataStore.getState().addBackup(backup)
    useDataStore.getState().updateLastBackupTime(backup.timestamp)
    return backup
  } catch (error) {
    throw new Error(`Failed to create backup: ${error}`)
  }
}

export async function restoreBackup(backupId: string): Promise<any> {
  try {
    const key = `backup_${backupId}`
    const data = localStorage.getItem(key)
    if (!data) {
      throw new Error("Backup not found")
    }
    return JSON.parse(data)
  } catch (error) {
    throw new Error(`Failed to restore backup: ${error}`)
  }
}

export async function deleteBackup(backupId: string): Promise<void> {
  try {
    const key = `backup_${backupId}`
    localStorage.removeItem(key)
    useDataStore.getState().removeBackup(backupId)
  } catch (error) {
    throw new Error(`Failed to delete backup: ${error}`)
  }
}
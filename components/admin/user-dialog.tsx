```typescript
"use client"

import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAdminStore } from "@/lib/admin/store"
import { getRolePermissions } from "@/lib/admin/permissions"
import type { User, UserRole } from "@/lib/admin/types"

interface UserDialogProps {
  userId: string | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

const defaultUser = {
  email: "",
  name: "",
  role: "viewer" as UserRole,
  active: true,
  permissions: [],
}

export function UserDialog({ userId, open, onOpenChange }: UserDialogProps) {
  const { users, addUser, updateUser } = useAdminStore()
  const [formData, setFormData] = useState<Partial<User>>(defaultUser)

  useEffect(() => {
    if (userId) {
      const user = users.find((u) => u.id === userId)
      if (user) {
        setFormData(user)
      }
    } else {
      setFormData(defaultUser)
    }
  }, [userId, users])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (userId) {
      updateUser(userId, formData)
    } else {
      addUser(formData as Omit<User, "id" | "createdAt">)
    }
    
    onOpenChange(false)
  }

  const handleRoleChange = (role: UserRole) => {
    setFormData({
      ...formData,
      role,
      permissions: getRolePermissions(role),
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {userId ? "Edit User" : "Add User"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select
              value={formData.role}
              onValueChange={(value) => handleRoleChange(value as UserRole)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Administrator</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="analyst">Analyst</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="active">Active</Label>
            <Switch
              id="active"
              checked={formData.active}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, active: checked })
              }
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {userId ? "Save Changes" : "Add User"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
```
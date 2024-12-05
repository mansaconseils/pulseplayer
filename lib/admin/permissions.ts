```typescript
import { UserRole, Permission } from "./types"

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  admin: [
    "manage_users",
    "manage_settings",
    "view_audit_logs",
    "manage_data",
    "export_data",
    "manage_teams",
    "manage_players",
  ],
  manager: [
    "manage_data",
    "export_data",
    "manage_teams",
    "manage_players",
  ],
  analyst: [
    "export_data",
    "manage_players",
  ],
  viewer: [],
}

export function hasPermission(
  userPermissions: Permission[],
  requiredPermission: Permission
): boolean {
  return userPermissions.includes(requiredPermission)
}

export function getRolePermissions(role: UserRole): Permission[] {
  return ROLE_PERMISSIONS[role]
}

export function validatePermissions(role: UserRole, permissions: Permission[]): Permission[] {
  const allowedPermissions = ROLE_PERMISSIONS[role]
  return permissions.filter(permission => allowedPermissions.includes(permission))
}
```
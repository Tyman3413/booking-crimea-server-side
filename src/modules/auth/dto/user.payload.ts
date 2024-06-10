import { UserRole } from '../../users/enums/user.role.enum';

export class UserPayload {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}
export function getFullName(user: UserPayload): string {
  return `${user.firstName} ${user.lastName || ''}`;
}

export function isAdmin(user: UserPayload): boolean {
  return user.role === UserRole.ADMIN;
}

export function isLandlord(user: UserPayload): boolean {
  return user.role === UserRole.LANDLORD;
}

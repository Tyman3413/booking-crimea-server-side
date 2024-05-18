import { UserRole } from '../../users/enums/user.role.enum';

export class UserPayload {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;

  fullName(): string {
    return `${this.firstName} ${this.lastName || ''}`;
  }
}

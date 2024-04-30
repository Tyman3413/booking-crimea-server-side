export class UserPayload {
  id: number;
  email: string;
  firstName: string;
  lastName: string;

  fullName(): string {
    return `${this.firstName} ${this.lastName || ''}`;
  }
}

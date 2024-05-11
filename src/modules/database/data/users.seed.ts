import { UserRole } from '../../users/enums/user.role.enum';
import { LandlordType } from '../../landlords/landlord.type.enum';
import { LandlordStatus } from '../../landlords/landlord.status.enum';

export const UsersSeed = [
  {
    id: 1,
    email: 'admin@booking-crimea.com',
    password: '$2a$10$HmPUb/D2xm8f84rmITfsbuM8.d2wJecQd3InnuU1M3v03L2xlnyc.',
    firstName: 'Admin',
    nickname: 'admin',
    role: UserRole.ADMIN,
  },
  {
    id: 2,
    email: 'main-landlord@booking-crimea.com',
    password: '$2a$10$ho9ir1rFJ7fBi0wkh2brCeC6C5Y9vn.e3z87dHD3u.KU2G1qUTnIC',
    firstName: 'Landlord',
    nickname: 'landlord',
    role: UserRole.LANDLORD,
  },
  {
    id: 3,
    email: 'user@booking-crimea.com',
    password: '$2a$10$a0d2tUeDW152UbgapJEhW.63qMvaHoOavSScUADP5pumGrEEno0ZW',
    firstName: 'User',
    nickname: 'user',
    role: UserRole.USER,
  },
];

export const LandlordSeed = [
  {
    id: 1,
    companyName: 'Main Landlord',
    type: LandlordType.COMPANY,
    status: LandlordStatus.APPROVED,
    userId: 2,
  },
];

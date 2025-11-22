export type UserRole = 'visitante' | 'organizador';

export interface UserProfile {
  uid: string;
  email: string;
  role: UserRole;
  name: string;
  // Organizer specific fields
  companyName?: string;
  companyLocation?: string;
  website?: string;
  socialMedia?: string;
}
import { User } from "firebase/auth";

export interface UserType {
  userDisplayName: string;
  userEmail: string;
  userPhotoUrl: string;
}

export function isUser(userObject: any): userObject is User {
  return (userObject as User) !== undefined;
}

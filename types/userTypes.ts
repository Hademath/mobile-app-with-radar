export interface IUserResponse {
  message: string;
  status: boolean;
  status_code: number;
  data: IUserData;
}

export interface IUserData {
  uuid: string;
  email: string;
  id: number;
  firstName: string;
  resident_type: string;
  email_verified_at: string;
  status: string;
  role?: string; // "artist" | "listener" | "music-pro"
  lastName: string;
  username: string;
  dateOfBirth: string;
  profile: string | null;
  avatar: string | null;
  notification: boolean;
  genres: string[];
  radar: number;
  artiste_type: string | null;
  remember_me: boolean;
  created_at: string;
  updated_at: string;
  token: string;
}

export interface ICreateProfile {
  avatarType: string; // "upload" | "avatar";
  profile: string | { uri: string; name: string; type: string };
  username: string;
  genres: string[];
  role: string; // "artist" | "listener" | "music-pro";
  notification: boolean;
}

export interface ICreatePasswordData {
  password: string;
  confirm_password: string;
}

export interface ICreatePassword {
  params: string;
  payload: ICreatePasswordData;
}


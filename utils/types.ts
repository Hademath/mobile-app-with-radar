export interface IUser {
  token: string;
  token_type: string;
  expires_in: number;
  data: {
    id: number;
    uuid: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_num: string;
    resident_type: string;
    email_verified_at: string;
    status: string;
    created_at: string;
    updated_at: string;
  };
}

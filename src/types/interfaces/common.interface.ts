export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: any;
}

export interface UserIdentity {
  user_id: string;
  roles: string[];
  entityReq: string;
}

export interface DecodedToken{
  user_id: string;
  roles?: string[];
  username?: string;
}

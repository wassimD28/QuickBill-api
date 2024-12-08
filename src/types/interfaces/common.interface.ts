declare global {
  namespace Express {
    interface Request {
      auth: DecodedToken;
    }
  }
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: any;
}

export interface DecodedToken {
  user_id: string;
  roles: string[];
  entityReq: string;
}

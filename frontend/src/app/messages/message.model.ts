export interface MessageResponse {
  id: number,
  message: string,
  timestamp: string
}

export interface GlobalResponse<T> {
  message: string;
  status: any;
  code: number;
  timestamp: string;
  data: T;
}

export interface MessageRequest {
  message: string;
}


import { AxiosError } from 'axios';

export type ApiError = AxiosError<{ error: string }>;

export interface AppError {
  message: string;
}

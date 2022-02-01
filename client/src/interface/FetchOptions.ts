export interface FetchOptions {
  method: string;
  headers?: {
    'Content-Type': string;
  };
  body?: string | FormData;
  credentials: RequestCredentials;
}

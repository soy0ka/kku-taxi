export enum ApiStatus {
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface ApiBase {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  status: ApiStatus
  error?: {
    code: string
    message: string
  }
}

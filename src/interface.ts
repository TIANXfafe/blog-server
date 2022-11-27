/**
 * @description User-Service parameters
 */
export interface IUserOptions {
  uid: string;
}

export interface IGetUserResponse {
  success: boolean;
  message: string;
  data: IUserOptions;
}

export interface CheckCaptcha {
  id: string;
  answer: string;
}

export interface Params {
  filter?: object;
  pageSize?: number;
  pageNo?: number;
  sort?: object;
}

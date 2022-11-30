export interface IUserOptions {
  uid: string;
}
export interface IGetUserResponse {
  success: boolean;
  message: string;
  data: IUserOptions;
}
/**
 * @description 注册信息
 */
export interface RegisterInfo {
  type: 'phone' | 'email';
  phone?: string;
  email?: string;
  password: string;
  rePassword: string;
}
/**
 * @description 登录信息
 */
export interface LoginInfo {
  type: 'phone' | 'email' | 'account';
  phone?: string;
  email?: string;
  account?: string;
  password: string;
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

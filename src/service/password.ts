import { App, Provide } from '@midwayjs/decorator';
import { Application } from "@midwayjs/web";
import * as crypto from "crypto";

@Provide()
export class PasswordService {

  @App()
  app: Application

  /**
   * 加密密码
   * @param password 密码原始值
   */
  generatePassword(password: string) {
    return crypto.createHash('sha256', this.app.config.crypto.secret)
      .update(password)
      .digest('hex');
  }

  /**
   * 验证密码
   * @param password 原始密码
   * @param hashPassword 加密后密码
   */
  checkPassword(password: string, hashPassword: string) {
    const hmac = crypto.createHash('sha256', this.app.config.crypto.secret)
      .update(password)
      .digest('hex');
    return hmac === hashPassword;
  }
}

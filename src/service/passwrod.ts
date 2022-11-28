import { App, Provide } from '@midwayjs/decorator';
import { Application } from "@midwayjs/web";
import * as crypto from "crypto";

@Provide()
export class PasswrodService {

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

  async checkPassword(password: string) {
    return 1;
  }
}

import { App, Inject, Provide } from '@midwayjs/decorator';
import { Application } from "egg";
import { JwtService } from "@midwayjs/jwt";
import { User } from "../model/user";
import { PasswordService } from "./password";
import { RegisterInfo, LoginInfo } from "../interface";
import { OperateRedisService } from "./operateRedis";

@Provide()
export class AccountService {
  @App()
  app: Application;

  @Inject()
  jwtService: JwtService;

  @Inject()
  passwordService: PasswordService;

  @Inject()
  operateRedisService: OperateRedisService;

  /**
   * 注册
   * @param registerInfo
   */
  async register(registerInfo: RegisterInfo) {
    const { type, phone, email, password, rePassword } = registerInfo
    if(password !== rePassword) {
      throw new Error("两次密码不一致，请重新输入!");
    }
    let isRepeat, user;
    if(type === 'phone') {
      isRepeat = await User.findOne({ where: { phone } });
    } else {
      isRepeat = await User.findOne({ where: { email } });
    }
    if(isRepeat) {
      throw new Error(`该${ type === 'phone' ? '手机号' : '邮箱' }已被注册，请重新输入!`);
    }
    const hashPwd = this.passwordService.generatePassword(password);
    if(type === 'phone') {
      user = await User.create({
        phone,
        password: hashPwd
      });
    } else {
      user = await User.create({
        email,
        password: hashPwd
      });
    }
    if(!user) {
      throw new Error("创建失败，请稍后重试!");
    }
    delete user.password;
    return user;
  }

  /**
   * 登录
   * @param loginInfo
   */
  async login(loginInfo: LoginInfo) {
    const { secret, expiresIn } = this.app.config.jwt;
    const { type, phone, email, account, password } = loginInfo;
    let user;
    if(type === 'phone') {
      user = await User.findOne({
        where: {
          phone,
          isActive: 1
        },
      });
    } else if(type === 'email') {
      user = await User.findOne({
        where: {
          email,
          isActive: 1
        },
      });
    } else if(type === 'account') {
      user = await User.findOne({
        where: {
          account,
          isActive: 1
        },
      });
    }
    if(!user) {
      throw new Error("用户不存在或已被禁用!");
    }
    const checkPwd = this.passwordService.checkPassword(password, user.password);
    if(!checkPwd) {
      throw new Error("密码错误!");
    }
    user = JSON.parse(JSON.stringify(user));
    const token = await this.jwtService.sign({ user }, secret, { expiresIn });
    user.token = token;
    delete user.password;
    if(!await this.operateRedisService.set(`user_${ user.id }`, token, 60 * 60 * 24 * 2)) {
      throw new Error('登录失败，请稍后重试!')
    }
    return user;
  }
}

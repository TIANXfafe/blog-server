import { App, Body, Controller, Del, Get, Inject, Post, Put } from "@midwayjs/decorator";
import { Application } from "@midwayjs/web";
import { JwtService } from "@midwayjs/jwt";
import { User } from "../model/user";
import { AccountService } from "../service/account";
import { PasswordService } from "../service/password";
import { LoginInfo, RegisterInfo, Params } from "../interface";

@Controller('/user')
export class UserController {

  @App()
  app: Application;

  @Inject()
  accountService: AccountService;

  @Inject()
  passwordService: PasswordService;

  @Inject()
  jwtService: JwtService;

  // 用户列表
  @Get('/')
  async list(@Body() params: Params) {
    const { filter, sort, pageSize = 20, pageNo = 1 } = params;
    console.table({ filter, sort, pageSize, pageNo })
    const userList = await User.findAndCountAll({
      attributes: { exclude: [ 'password', 'deletedAt' ] },
      limit: pageSize,
      offset: (pageNo - 1)
    })
    return {
      pageNo,
      pageSize,
      ...userList
    };
  }

  // 新增用户
  @Put('/')
  async create() {
    return 'user create'
  }

  // 删除用户
  @Del('/:id')
  async delete() {
    return 'user delete';
  }

  // 更新用户信息
  @Put('/:id')
  async update() {
    return 'user patch';
  }

  // 查询单个用户信息
  @Get('/:id')
  async retirve() {
    return 'user retirve';
  }


  /**
   * 用户注册
   * @param registerInfo 注册信息
   */
  @Post('/register')
  async registerWithPhone(@Body() registerInfo: RegisterInfo) {
    const { type, phone, email, password, rePassword } = registerInfo;
    return await this.accountService.register({
      type,
      phone,
      email,
      password,
      rePassword
    });
  }

  /**
   * 用户登录
   * @param loginInfo 登录信息
   */
  @Post('/login')
  async loginWithPhone(@Body() loginInfo: LoginInfo) {
    const { type, phone, email, account, password } = loginInfo;
    return await this.accountService.login({
      type,
      phone,
      email,
      account,
      password
    });
  }

  // 用户登出
  @Post('/logout')
  async logout() {
    return 'User logout'
  }
}

import { App, Body, Controller, Del, Get, Inject, Post, Put } from "@midwayjs/decorator";
import { JwtService} from "@midwayjs/jwt";
import { PasswordService } from "../service/password";
import { User } from "../model/user";
import { Params } from "../interface";
import { Application } from "@midwayjs/web";

@Controller('/user')
export class UserController {

  @App()
  app: Application;

  @Inject()
  passwordService: PasswordService;

  @Inject()
  jwtService: JwtService;

  // 用户列表
  @Get('/')
  async list(@Body() params: Params) {
    const { filter, sort, pageSize=20, pageNo=1 } = params;
    console.table({filter, sort, pageSize, pageNo})
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


  // 用户注册(手机号)
  @Post('/registerWithPhone')
  async registerWithPhone(
    @Body('phone') phone: number,
    @Body('password') password: string,
    @Body('rePassword') rePassword: string,
  ) {
    if (password !== rePassword) {
      throw new Error("两次密码不一致，请重新输入!");
    }
    if (await User.findOne({
      where: {phone},
    })) {
      throw new Error("该手机号已被注册，请重新输入!");
    }
    const hashPwd = this.passwordService.generatePassword(password);
    const user = await User.create({
      phone,
      password: hashPwd
    });
    if (!user) {
      throw new Error("创建失败，请稍后重试!");
    }
    delete user.password;
    return user;
  }

  // 用户注册(邮箱)
  @Post('/registerWithEmail')
  async registerWithEmail(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('rePassword') rePassword: string,
  ) {
    if (password !== rePassword) {
      throw new Error("两次密码不一致，请重新输入!");
    }
    if (await User.findOne({
      where: {email},
    })) {
      throw new Error("该邮箱已被注册，请重新输入!");
    }
    const hashPwd = this.passwordService.generatePassword(password);
    const user = await User.create({
      email,
      password: hashPwd
    })
    if (!user) {
      throw new Error("创建失败，请稍后重试!")
    }
    delete user.password;
    return user;
  }

  // 用户登录(手机号)
  @Post('/loginWithPhone')
  async loginWithPhone(
    @Body('phone') phone: string,
    @Body('password') password: string,
  ) {
    const user: any = await User.findOne({
      where: {
        phone,
        isActive: 1
      },
    });
    if (!user) {
      throw new Error("用户不存在或已被禁用!");
    }
    const checkPwd = this.passwordService.checkPassword(password, user.password);
    if (!checkPwd) {
      throw new Error("密码错误!");
    }
    console.log('this.app.config.jwt', this.app.config.jwt)
    const token = await this.jwtService.sign(user, this.app.config.jwt.secret);
    console.log('ttt', token)
    return 'User login'
  }

  // 用户登录(手机号)
  @Post('/loginWithEmail')
  async loginWithEmail(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return 'User login'

  }

  // 用户登录(账号)
  @Post('/loginWithAccount')
  async loginWithAccount(
    @Body('account') account: string,
    @Body('password') password: string,
  ) {
    return 'User login'

  }

  // 用户登出
  @Post('/logout')
  async logout() {
    return 'User logout'
  }
}

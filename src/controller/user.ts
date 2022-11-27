import { Body, Controller, Del, Get, Post, Put } from "@midwayjs/decorator";
import { User } from "../model/user";
import { Params } from "../interface";

@Controller('/user')
export class UserController {
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


  // 用户注册
  @Post('/register')
  async register(
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
      throw new Error("手机号已被注册，请重新输入!");
    }
    const user = await User.create({
      phone,
      password
    })
    if (!user) {
      throw new Error("创建失败，请稍后重试!")
    }
    return user;
  }

  // 用户登录
  @Post('/login')
  async login() {
    return 'User login'
  }

  // 用户登出
  @Post('/logout')
  async logout() {
    return 'User logout'
  }
}

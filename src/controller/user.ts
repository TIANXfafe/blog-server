import { Controller, Put, Del, Get, Post } from '@midwayjs/decorator';

@Controller('/user')
export class UserController {
  // 用户列表
  @Get('/')
  async list() {
    return 'user page';
  }
  // 新增用户
  @Put('/')
  async create () {
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
  async register() {
    return 'User register'
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

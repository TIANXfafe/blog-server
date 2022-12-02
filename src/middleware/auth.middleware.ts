import { Middleware } from '@midwayjs/decorator';
import { IMiddleware } from '@midwayjs/core';
import { Context, NextFunction } from '@midwayjs/web';
import { PasswordService } from '../service/password';
import { OperateRedisService } from '../service/operateRedis';
import { User } from '../model/user';

@Middleware()
export class AuthMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      console.log('ctx', ctx.header);
      const { token = '' } = ctx.header;
      ctx.logger.info(`请求：${ctx.request.method}---------${ctx.request.url}`);
      if (!token) {
        throw new Error('您没有权限访问该接口!');
      }
      const passwordService =
        await ctx.requestContext.getAsync<PasswordService>(PasswordService);
      const operateRedisService =
        await ctx.requestContext.getAsync<OperateRedisService>(
          OperateRedisService
        );
      let user;
      try {
        user = passwordService.checkToken(token);
      } catch (err) {
        const fail =
          err.name === 'TokenExpiredError'
            ? 'token已过期!请重新获取令牌'
            : 'token令牌不合法!';
        throw new Error(fail);
      }
      const redisToken = await operateRedisService.get(`user_${user.id}`);
      if (!redisToken || redisToken !== token) {
        throw new Error('token令牌不合法!');
      }
      user = await User.findByPk(user.id);
      if (!user || user.isActive === 0) {
        throw new Error('用户不存在或当前账号已被禁用!');
      }
      ctx.session.authUser = user;
      await next();
    };
  }

  static getName(): string {
    return 'auth';
  }

  ignore(ctx: Context): boolean {
    // 下面的路由将忽略此中间件
    return ctx.path === '/user/register' || ctx.path === '/user/login';
  }
}

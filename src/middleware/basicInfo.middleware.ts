import { IMiddleware } from "@midwayjs/core";
import { Middleware } from "@midwayjs/core";
import { NextFunction, Context} from "@midwayjs/web";

@Middleware()
export class BasicInfoMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      // 控制器执行前的逻辑
      const startTime = Date.now();
      // 执行下一个中间件直到控制器
      const result = await next();
      // 控制器执行后的逻辑
      ctx.logger.info(`耗时${Date.now() - startTime}ms`);
      // 返回给上一个中间件的结果
      return result;
    };
  }

  static getName(): string {
    return 'basicInfo';
  }
}

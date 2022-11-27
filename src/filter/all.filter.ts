import { Catch } from "@midwayjs/decorator";
import { Context } from "egg";

@Catch()
export class AllErrorFilter {
  async catch(err: Error, ctx: Context) {
    return {
      code: 1,
      msg: 'fail',
      data: err.message
    }
  }
}

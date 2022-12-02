import { Inject, Provide } from '@midwayjs/decorator';
import { RedisService } from '@midwayjs/redis';

@Provide()
export class OperateRedisService {
  @Inject()
  redisService: RedisService;

  /**
   * 设置Redis缓存
   * @param key 键
   * @param value 值
   * @param expiration 过期时间(单位秒)
   * @return {String} 返回成功字符串OK
   */
  async set(key: string, value: string, expiration = 0) {
    let res;
    if (expiration === 0) {
      res = await this.redisService.set(key, value);
    } else {
      res = await this.redisService.set(key, value, 'EX', expiration);
    }
    return res;
  }

  /**
   * 获取Redis缓存
   * @param key 键
   * @return {String | Array | Object} 返回获取的数据
   */
  async get(key: string) {
    const res = await this.redisService.get(key);
    return res && JSON.parse(res);
  }
}

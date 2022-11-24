import { App, Configuration } from '@midwayjs/decorator';
import { ILifeCycle } from '@midwayjs/core';
import { Application } from 'egg';
import { join } from 'path';
import * as egg from '@midwayjs/web';
import * as validate from '@midwayjs/validate';
import * as swagger from '@midwayjs/swagger';
import * as jwt from '@midwayjs/jwt';
import * as captcha from '@midwayjs/captcha';
import * as sequelize from '@midwayjs/sequelize';
import * as redis from '@midwayjs/redis';

@Configuration({
  imports: [
    egg,
    validate,
    swagger,
    jwt,
    captcha,
    sequelize,
    redis
  ],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle implements ILifeCycle {
  @App()
  app: Application;

  async onReady() {}
}

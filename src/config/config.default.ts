import { MidwayConfig, MidwayAppInfo } from '@midwayjs/core';
import entities from '../model';

export default (appInfo: MidwayAppInfo) => {
  return {
    // use for cookie sign key, should change to your own and keep security
    keys: appInfo.name + '_1669293593767_7236',
    egg: {
      port: 7001,
    },
    security: {
      csrf: false,
    },
    // jwt配置
    jwt: {
      // 密钥
      secret: appInfo.name + '_1669293593767_7236',
      // 过期时间
      expiresIn: '1d'
    },
    // 数据库配置
    sequelize: {
      dataSource: {
        default: {
          database: 'blogserver',
          username: 'root',
          password: 'root',
          host: '127.0.0.1',
          port: 3306,
          encrypt: false,
          dialect: 'mysql',
          define: { charset: 'utf8' },
          timezone: '+08:00',
          entities,
          // 本地的时候，可以通过 sync: true 直接 createTable
          sync: true,
        },
      },
    },
    // redis配置
    redis: {
      client: {
        port: 6379, // Redis port
        host: "127.0.0.1", // Redis host
        password: "",
        db: 1,
      },
    },
    crypto: {
      secret: appInfo.name + 'dbwu7dw8aqnhdw&W*dwj)O/*'
    }
  } as MidwayConfig;
};

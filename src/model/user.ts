import {
  Table,
  Model,
  AutoIncrement,
  PrimaryKey,
  Column,
  Length,
  Default,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({
  timestamps: true, // 自动维护时间
  tableName: 'user', // 数据库表名称
  freezeTableName: true, // 禁止修改表名，如果不写会把表名自动复数化，users
  paranoid: true, // 软删除
})
export class User extends Model {
  @AutoIncrement // 自增
  @PrimaryKey
  @Column
  id: number;

  @Column({
    unique: true,
    comment: '账号',
  })
  account: string;

  @Length({ max: 30 })
  @Column({
    comment: '用户名',
  })
  username: string;

  @Length({ max: 30 })
  @Column({
    comment: '用户昵称',
  })
  nickname: string;

  @Column({
    defaultValue: '',
    comment: '密码',
  })
  password: string;

  @Length({ max: 11 })
  @Column({
    unique: true,
    defaultValue: '',
    comment: '用户手机号',
  })
  phone: string;

  @Column({
    unique: true,
    defaultValue: '',
    comment: '用户邮箱',
  })
  email: string;

  @Column({
    defaultValue: '',
    comment: '用户头像',
  })
  avatar: string;

  @Column({
    defaultValue: '',
    comment: '用户性别',
  })
  gender: '男' | '女' | '';

  @Column({
    comment: '用户地址',
  })
  address: string;

  @Column({
    comment: '出生日期',
  })
  birthday: number;

  @Column({
    defaultValue: false,
    comment: '是否为管理员',
  })
  isSuperAdmin: boolean;

  @Column({
    defaultValue: true,
    comment: '是否激活',
  })
  isActive: boolean;

  @Default(new Date())
  @CreatedAt
  @Column
  createDate: Date;

  @Default(new Date())
  @UpdatedAt
  @Column
  updateDate: Date;
}

# A koa app implementing jwt auth.

## 依赖
"@koa/cors": "^2.2.3",
允许跨域访问
"bcrypt-nodejs": "0.0.3",
密文存储密码
"jsonwebtoken": "^8.5.1",
jwt生成与验证
"koa": "^2.11.0",
"koa-bodyparser": "^4.2.1",
解析请求json
"koa-router": "^7.4.0",
实现路由
"sqlite3": "^4.1.1"
"knex": "^0.20.3",
数据库连接

## 需要设置的环境变量：
PORT(3000)
JWT_SECRET(secret)
SALT_ROUNDS(20000)

## 数据库：sqlite
可使用DB Browser for SQLite(https://sqlitebrowser.org/blog/version-3-11-2-released/)进行管理
该demo中数据库为db.sqlite(存储到db文件夹下), 需要两个表:
users(密码用utilities文件夹下bcrypt加密)
CREATE TABLE `users` (
 `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
 `username` TEXT NOT NULL UNIQUE,
 `passwordHash` TEXT NOT NULL
);
INSERT INTO `users` (
  `username`,
  `passwordHash`
) VALUES (
  'yanfei',
  '$2a$10$T13crrdHSjhaexxc6.vtWe.XjY9JT.Wb49SiPdOM7jbtia1JMAAK.'
)
pets
CREATE TABLE `pets` (
 `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
 `user_id` INTEGER NOT NULL,
 `name` TEXT NOT NULL,
 `species` TEXT
);
INSERT INTO `pets` (
  `user_id`,
  `name`,
  `species`
) VALUES (
  1,
  'Bunny',
  'dog'
)
INSERT INTO `pets` (
  `user_id`,
  `name`,
  `species`
) VALUES (
  1,
  'Ru',
  'cat'
)
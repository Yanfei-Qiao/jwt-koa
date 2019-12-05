const jwt = require('jsonwebtoken')

const db = require('../db');
const bcrypt = require('../utilities/bcrypt');

// secret 一般存放在环境变量中，而非代码中
const secret = process.env.JWT_SECRET || 'secret'
const payload = {
  sub: 1 // 一般存储用户唯一标识
}
// token中不应该有敏感信息，所有人都可以看到token，但是只有server使用secret才可以验证它
const token = jwt.sign(
  payload,
  secret
)

module.exports = async (ctx) => {
  // ctx.body = 'I am the auth route.';
  const { username, password } = ctx.request.body;
  if (!username) ctx.throw(422, 'Username required.');
  if (!password) ctx.throw(422, 'Password required.');

  const wrongUserPassMsg = 'Incorrect username and/or password.';

  const dbUser = await db.first(['id', 'passwordHash'])
    .from('users')
    .where({ username });
  if (!dbUser) ctx.throw(401, wrongUserPassMsg);
  if (await bcrypt.compare(password, dbUser.passwordHash)) {
    /* Sign and return the token just like before
    * except this time, sub is the actual database
    * user ID. */
    const payload = { sub: dbUser.id };
    const token = jwt.sign(payload, secret);
    ctx.body = token;
  } else {
    ctx.throw(401, wrongUserPassMsg);
  }

  ctx.body = token;
};
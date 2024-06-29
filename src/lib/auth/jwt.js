var jwt = require('jsonwebtoken')
const dotenv = require('dotenv');

dotenv.config();


function getJWTScope(token) {
    const secret = process.env.JWT_SECRET;
    var payload = jwt.verify(token, secret);
    return payload.scope;
}

async function isUser(ctx, next) {
    await next();
    var token = ctx.request.header.authorization.split(' ')[1];
    var scope = getJWTScope(token);
    ctx.assert(scope.includes('user'), 403, "You're not a user");
}

async function isAdmin(ctx, next) {
    await next();
    var token = ctx.request.header.authorization.split(' ')[1];
    var scope = getJWTScope(token);
    ctx.assert(scope.includes('admin'), 403, "You're not a admin");
}

async function isAuth(ctx, next) {
    const authorizationHeader = ctx.request.header.authorization;
  
    if (!authorizationHeader) {
      ctx.status = 401;
      ctx.body = { isAuthenticated: false, message: 'Authorization header is missing' };
      return;
    }
  
    const token = authorizationHeader.split(' ')[1];
  
    if (!token) {
      ctx.status = 401;
      ctx.body = { isAuthenticated: false, message: 'Token is missing' };
      return;
    }
  
    const scope = getJWTScope(token);
  
    if (!scope || !(scope.includes('user') || scope.includes('admin'))) {
      ctx.status = 403;
      ctx.body = { isAuthenticated: false, message: "You're not authenticated" };
      return;
    }
  
    // Si el token es válido y tiene el alcance adecuado, continuamos con el siguiente middleware
    await next();
}

module.exports = {
    isUser, isAdmin, isAuth
};
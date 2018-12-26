import Koa from 'koa';
import mongoose from 'mongoose';
import cors from 'koa2-cors';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
// import router from './routes'
const app = new Koa();
const router = new Router({
    prefix: '/api'
})
app.use(bodyParser()); // 解析request的body内容

// 处理跨域的配置
app.use(cors({
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Date'],
    maxAge: 100,
    credentials: true,
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Custom-Header', 'anonymous'],
}));

const db = mongoose.connect("mongodb://localhost/testDB")

// 账户的数据库模型
var UserSchema = new mongoose.Schema({
    username:String,
    password:String,
    email:String
});
var User = mongoose.model('User',UserSchema);

// 新增数据
var user = {
  username: 'zcx',
  password: '123456',
  email: 'itonline0823@gmail.com'
}
var newUser = new User(user);
newUser.save();

router.get('/', async (ctx, next) => {
	let val = null
	const data = await User.findOne({username: 'zcx'})
	console.log('data', data)
	const result = {
		code:200,
		response: data,
		ts: 123456
	}
	ctx.response.body = result
	return result
})


app.use(router.routes());
app.listen(3000);
console.log('app started at port 3000...');
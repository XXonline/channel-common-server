const router = require('koa-router')();

router.get('/', async (ctx, next) => {
    ctx.body = "<div>Hello</div>"
})

router.get('/string', async (ctx, next) => {
    ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
    ctx.body = {
        title: 'koa2 json'
    }
})

export default router

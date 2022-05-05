'use strict'
const Router = require('koa-router')

const router = new Router()

router.get('/logout', async(ctx) => {
	ctx.session.authorised = null
	ctx.redirect('/?msg=you are now logged out')
})
module.exports = router

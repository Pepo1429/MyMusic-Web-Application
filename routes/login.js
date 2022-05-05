'use strict'

const Router = require('koa-router')
const User = require('../modules/user')
const dbName = 'website.db'
const router = new Router()

router.get('/login', async(ctx) => {
	const data = {}
	if (ctx.query.msg) data.msg = ctx.query.msg
	if (ctx.query.user) data.user = ctx.query.user
	await ctx.render('login', data)
})

router.post('/login', async(ctx) => {
	try {
		const body = ctx.request.body
		const user = await new User(dbName)
		const result = await user.login(body.user, body.pass)
		ctx.session.authorised = true
		ctx.session.userID = result
		ctx.session.userName = body.user
		console.log(ctx.session.userID)
		console.log(ctx.session.userName)

		return ctx.redirect('/?msg=you are now logged in...')
	} catch (err) {
		await ctx.render('error', { message: err.message })
		return undefined
	}
})
module.exports = router

'use strict'
const koaBody = require('koa-body')({
	multipart: true,
	uploadDir: '.',
})
const Router = require('koa-router')
const User = require('../modules/user')

const dbName = 'website.db'
const router = new Router()

/**
 * The user registration page.
 *
 * @name Register Page
 * @route {GET} /register
 */
// eslint-disable-next-line no-return-await
router.get('/register', async(ctx) => {
	await ctx.render('register')
})
/**
 * The script to process new user registrations.
 *
 * @name Register Script
 * @route {POST} /register
 */
router.post('/register', koaBody, async(ctx) => {
	try {
		// extract the data from the request
		const body = ctx.request.body
		console.log(body)
		// call the functions in the module
		const user = await new User(dbName)
		await user.register(body.user, body.pass, body.confirm)
		// redirect to the home page
		ctx.redirect(`/?msg=new user "${body.name}" added`)
	} catch (err) {
		await ctx.render('error', { message: err.message })
	}
})
module.exports = router

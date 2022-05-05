'use strict'
const Router = require('koa-router')
const koaBody = require('koa-body')({
	multipart: true,
	uploadDir: '.',
})

const dbName = 'website.db'
const Playlist = require('../modules/playlist')

const router = new Router()

/**
 * The secure home page.
 *
 * @name Home Page
 * @route {GET} /
 * @authentication This route requires cookie-based authentication.
 */
router.get('/', koaBody, async(ctx) => {
	try {
		if (ctx.session.authorised !== true) return ctx.redirect('/login?msg=you need to log in')
		const user = ctx.session.userID
		const userName = ctx.session.userName
		const playlist = await new Playlist(dbName)
		const result = await playlist.retrive(user)
		console.log(result)
		console.log(user)
		await ctx.render('index', { result, user: userName })
		return undefined
	} catch (err) {
		await ctx.render('error', { message: err.message })
		return undefined
	}
})

router.post('/', async(ctx) => {
	console.log(ctx)
	return undefined
})
module.exports = router

'use strict'
const Router = require('koa-router')
const koaBody = require('koa-body')({
	multipart: true,
	uploadDir: '.',
})
const Playlist = require('../modules/playlist')

const dbName = 'website.db'
const router = new Router()

router.get('/playlist', async(ctx) => {
	const data = {}
	if (ctx.query.msg) data.msg = ctx.query.msg
	if (ctx.query.user) data.user = ctx.query.user
	await ctx.render('playlist', data)
})

router.post('/playlist', koaBody, async(ctx) => {
	try {
		// extract the data from the request
		const file = ctx.request.files.image.path
		const title = ctx.request.body
		const user = ctx.session.userID
		const userName = ctx.session.userName
		const name = ctx.request.files.image.name
		const music = await new Playlist(dbName)
		await music.uploadImg(title, name, file, user, userName)
		console.log(name)
		return ctx.redirect('/')
	} catch (err) {
		await ctx.render('error', { message: err.message })
		return undefined
	}
})
module.exports = router

'use strict'
const Router = require('koa-router')
const koaBody = require('koa-body')({
	multipart: true,
	uploadDir: '.',
})
const Music = require('../modules/music')
const Playlist = require('../modules/playlist')

const dbName = 'website.db'
const router = new Router()

router.get('/upload', async(ctx) => {
	const user = ctx.session.userID
	const data = await new Playlist(dbName)
	const title = await data.retrive(user)
	await ctx.render('upload', { title })
})

router.post('/upload', koaBody, async(ctx) => {
	try {
		// extract the data from the request
		const playlist = ctx.request.body.playlist
		const file = ctx.request.files.music.path
		const name = ctx.request.files.music.name
		const user = ctx.session.userID
		const music = await new Music(dbName)
		await music.upload(file, user, name, playlist)
		return ctx.redirect('/')
	} catch (err) {
		await ctx.render('error', { message: err.message })
		return undefined
	}
})
module.exports = router

'use strict'

const Router = require('koa-router')
const koaBody = require('koa-body')({
	multipart: true,
	uploadDir: '.',
})

const dbName = 'website.db'
const Playlist = require('../modules/playlist')
const Music = require('../modules/music')
const Rate = require('../modules/rate')
const Comment = require('../modules/comment')

const router = new Router()


/**
 * The secure home page.
 *
 * @name Home Page
 * @route {GET} /
 * @authentication This route requires cookie-based authentication.
 */
router.get('/allPlaylists', koaBody, async(ctx) => {
	try {
		if (ctx.session.authorised !== true) return ctx.redirect('/login?msg=you need to log in')
		const user = ctx.session.userID
		const playlist = await new Playlist(dbName)
		const result = await playlist.retriveAll(user)
		await ctx.render('allPlaylists', { result })
		console.log(result)
		return undefined
	} catch (err) {
		await ctx.render('error', { message: err.message })
		return undefined
	}
})

router.get('/allMusic', async(ctx) => {
	try {
		if (ctx.session.authorised !== true) return ctx.redirect('/login?msg=you need to log in')
		const user = ctx.session.userID
		const data = ctx.query.playlist
		const userid = ctx.query.user
		const userInfo = {userid,data}
		const music = await new Music(dbName)
		const score = await new Rate(dbName)
		const comment = await new Comment(dbName)
		const result = await music.OnlineMusic(user, data, userid)
		if (result.length === 0) return ctx.render('error', { message: 'No music Found' })
		const userPlaylist = result[0].userID
		const rate = await score.getRate(data, userPlaylist)
		const commentar = await comment.getComment(data, userPlaylist)
		await ctx.render('allMusic', {result, name: data, score: rate, comment: commentar, userInfo})
	} catch (err) {
		await ctx.render('error', { message: err.message })
	}
})

router.post('/rate', koaBody, async(ctx) => {
	try {
		if (ctx.session.authorised !== true) return ctx.redirect('/login?msg=you need to log in')
		const user = ctx.session.userID
		const data = ctx.request.body.playlist
		const userID = ctx.request.body.user
		const rate = parseInt(ctx.request.body.rate)
		const score = await new Rate(dbName)
		await score.setRate(user, data, rate, userID)
		await ctx.redirect(`/allMusic?playlist=${data}&user=${userID}`)
	} catch (err) {
		await ctx.render('error', { message: err.message })
		return undefined
	}
})

router.post('/comment', koaBody, async(ctx) => {
	try {
if (ctx.session.authorised !== true) return ctx.redirect('/login?msg=you need to log in')
		const user = ctx.session.userID
		const text = ctx.request.body.comment
		const data = ctx.request.body.playlist
		const userID = ctx.request.body.user
		console.log(ctx.body)
		 const userName = ctx.session.userName
		 const comment = await new Comment(dbName)
		 console.log(userID)
	    await comment.setComment(user, data, text, userID,userName)
		await ctx.redirect(`/allMusic?playlist=${data}&user=${userID}`)
	} catch (err) {
		await ctx.render('error', { message: err.message })
	}
})
module.exports = router

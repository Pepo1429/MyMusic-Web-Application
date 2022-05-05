'use strict'
const Router = require('koa-router')

const dbName = 'website.db'
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
router.get('/musiclist', async(ctx) => {
	try {
		if (ctx.session.authorised !== true) return ctx.redirect('/login?msg=you need to log in')
		const user = ctx.session.userID
		const data = ctx.query.playlist
		console.log(ctx.query.playlist)
		const music = await new Music(dbName)
		const rate = await new Rate(dbName)
		const comment = await new Comment(dbName)
		const commentar = await comment.getComment(data, user)
		const result = await music.retrive(user, data)
		const score = await rate.getRate(data, user)
		await ctx.render('musiclist', { result, rate: score, comment: commentar,playlist: data})
	} catch (err) {
		await ctx.render('error', { message: err.message })
	}
})

router.post('/', async(ctx) => {
	console.log(ctx)
	return undefined
})
module.exports = router

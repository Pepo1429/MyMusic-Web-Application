#!/usr/bin/env node
'use strict'
// Routes File


/* MODULE IMPORTS */
const Koa = require('koa')
const Router = require('koa-router')
const views = require('koa-views')
const staticDir = require('koa-static')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session')

/* IMPORT CUSTOM MODULES */

const app = new Koa()
const router = new Router()

/* CONFIGURING THE MIDDLEWARE */
app.keys = ['darkSecret']
app.use(staticDir('public'))
app.use(bodyParser())
app.use(session(app))
app.use(views(`${__dirname}/views`, {
	extension: 'handlebars',
}, {
	map: {
		handlebars: 'handlebars',
	},
}))

const defaultPort = 8080
const port = process.env.PORT || defaultPort

const home = require('./routes/home')
const register = require('./routes/register')
const login = require('./routes/login')
const logout = require('./routes/logout')
const upload = require('./routes/upload')
const playlist = require('./routes/playlist')
const musiclist = require('./routes/musiclist')
const allList = require('./routes/allPlaylists')


app.use(home.routes())
app.use(register.routes())
app.use(login.routes())
app.use(logout.routes())
app.use(upload.routes())
app.use(router.routes())
app.use(playlist.routes())
app.use(musiclist.routes())
app.use(allList.routes())


module.exports = app.listen(port, async() => console.log(`listening on port ${port}`))

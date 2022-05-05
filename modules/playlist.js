'use strict'

const sqlite = require('sqlite-async')
const fs = require('fs')

module.exports = class Playlist {
	constructor(dbName = ':memory:') {
		return (async() => {
			this.db = await sqlite.open(dbName)
			// we need this table to store the user accounts
			const sql = 'CREATE TABLE IF NOT EXISTS playlist (id INTEGER PRIMARY KEY AUTOINCREMENT,'+
						'title TEXT, name TEXT, imgSrc TEXT, accessSrc TEXT, userID TEXT, userName TEXT);'
			await this.db.run(sql)
			return this
		})()
	}

	async uploadImg(title, name, path, userID, userName) {
		try {
			if (title.playlist === '') throw new Error('missing playlist name')
			if (name === '') throw new Error('cannot find image')
			const dest = `public/image/${name}`
			const accDes = `/image/${name}`
			await this.checkPlaylist(title.playlist,userName)
			const sql = `INSERT INTO playlist (title, name, imgSrc, accessSrc, userID, userName)
				VALUES("${title.playlist}","${name}","${dest}","${accDes}","${userID}","${userName}")`
			await this.db.run(sql)
			fs.copyFileSync(path, dest)
			return true
		} catch (err) {
			console.log('Error')
			throw err
		}
	}

	async checkPlaylist(playlist,userName) {
		const sql = `SELECT COUNT(id) as records FROM playlist WHERE title="${playlist}" AND userName="${userName}";`
		const data = await this.db.get(sql)
		if(data.records === 0 )return true
		else{
			throw new Error(`You already have a playlist with name - "${playlist}"`)
		}
	}

	async retrive(userID) {
		try {
			if (userID.length === 0) throw new Error('missing username')
			const sql = `SELECT title, accessSrc, userName FROM playlist WHERE userID = ${userID};`
			const data = await this.db.all(sql)
			console.log(data)
			return data
		} catch (err) {
			console.log('Error')
			throw err
		}
	}

	async retriveAll(userID) {
		try {
			if (userID.length === 0) throw new Error('missing username')
			const sql = `SELECT * FROM playlist WHERE userID != ${userID};`
			const data = await this.db.all(sql)
			return data
		} catch (err) {
			console.log('Error')
			throw err
		}
	}
}

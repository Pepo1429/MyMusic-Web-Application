'use strict'

const sqlite = require('sqlite-async')

module.exports = class Comment {
	constructor(dbName = ':memory:') {
		return (async() => {
			this.db = await sqlite.open(dbName)
			const sql ='CREATE TABLE IF NOT EXISTS comment'+
						'(id INTEGER PRIMARY KEY AUTOINCREMENT,'+
						'playlist TEXT,userPlaylist TEXT, user TEXT,' +
		    			' comment TEXT, userName TEXT, date TEXT);'
			await this.db.run(sql)
			return this
		})()
	}

	async setComment(user, playlist, comment, userPlaylist,userName) {
		try {
			if (user.length === 0) throw new Error('missing username')
			if (comment.length === 0) throw new Error('Please write a comment')
			const date = await this.getdate()
			const sql = `INSERT INTO comment (playlist, userPlaylist ,user, comment,userName,date)
					 	 VALUES("${playlist}","${userPlaylist}","${user}","${comment}","${userName}","${date}")`
			await this.db.run(sql)
			return true
		} catch (err) {
			console.log('Error')
			throw err
		}
	}

	async getComment(playlist, userPlaylist) {
		try {
			if (playlist.length === 0) throw new Error('Cannot find playlist')
			const sql = `SELECT comment,userName,date
					    FROM comment WHERE (playlist = "${playlist}" AND userPlaylist = "${userPlaylist}");`
			const data = await this.db.all(sql)
			return data
		} catch (err) {
			console.log('Error')
			throw err
		}
	}

	
	async getdate() {
		const date = new Date(Date.now())
		const slice = 10
		const strDate = date.toISOString().slice(0,slice)
		return strDate
	}
}

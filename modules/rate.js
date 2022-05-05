'use strict'
const sqlite = require('sqlite-async')

module.exports = class Rate {
	constructor(dbName = ':memory:') {
		return (async() => {
			this.db = await sqlite.open(dbName)
			// we need this table to store the user accounts
			const sql = 'CREATE TABLE IF NOT EXISTS rate (id INTEGER PRIMARY KEY AUTOINCREMENT,'+
						'playlist TEXT,userPlaylist TEXT, user TEXT, score INT);'
			await this.db.run(sql)
			return this
		})()
	}

	async setRate(user, playlist, rate, userPlaylist) {
		try {
			if (user.length === 0) throw new Error('missing username')
			if (rate.length === 0) throw new Error('please select rate')
			const sql = `INSERT INTO rate (playlist, userPlaylist ,user, score)
					 	 VALUES("${playlist}","${userPlaylist}","${user}","${rate}")`
			await this.db.run(sql)
			return true
		} catch (err) {
			console.log('Error')
			throw err
		}
	}

	async getRate(playlist, userPlaylist) {
		try {
			if (playlist.length === 0) throw new Error('missing playlist')
			const sql = `SELECT score
					    FROM rate WHERE (playlist = "${playlist}" AND userPlaylist = "${userPlaylist}");`
			const data = await this.db.all(sql)
			const fix = await this.averageRate(data)
			return fix
		} catch (err) {
			console.log('Error')
			throw err
		}
	}

	async averageRate(data) {
		try {
			if (data === undefined) throw new Error('missing rates')
		let score = 0
		const float = 2
		data.forEach((obj) => {
			score += obj.score
		})
		const average = score / data.length
		const fix = average.toFixed(float)
		return fix
	} catch (err) {
		console.log('Error')
		throw err
	}
	}
}

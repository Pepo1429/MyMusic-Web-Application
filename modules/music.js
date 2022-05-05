'use strict'
const sqlite = require('sqlite-async')
const fs = require('fs')
const NodeID3 = require('node-id3')

module.exports = class Music {
	constructor(dbName = ':memory:') {
		return (async() => {
			this.db = await sqlite.open(dbName)
			const sql = 'CREATE TABLE IF NOT EXISTS music'+
						'(id INTEGER PRIMARY KEY AUTOINCREMENT,'+
						'path TEXT, sPath TEXT, userID TEXT, name TEXT,'+
						'album TEXT, year TEXT, publisher TEXT, artist TEXT,playlist TEXT, genre TEXT);'
			await this.db.run(sql)
			return this
		})()
	}

	async upload(path, user, name, playlist) {
		try {
			if (playlist === undefined) throw new Error('Please select or create playlist')
			if (path.length === 0) throw new Error('cannot find music')
			const dest = `public/music/${name}`
			const statdes = `/music/${name}`
			const destinations = [dest,statdes]
			console.log(path)
			await this.checkName(name)
			fs.copyFileSync(path, dest)
			const tags = NodeID3.read(dest)
			this.insertid3(destinations, user, name, tags, playlist)
			return true
		} catch (err) {
			console.log('Error')
			throw err
		}
	}

	async insertid3(destinations,user,name,tags,playlist) {
		try {
			if (playlist === undefined) throw new Error('No playlist')
			if (destinations === '') throw new Error('No destination found')
			const sql = `INSERT INTO music(path, sPath, userID, 
						name, album, year, publisher, artist, 
						playlist,genre)
						VALUES( "${destinations[1]}","${destinations[0]}","${user}","${name}",
						"${tags.album}","${tags.year}","${tags.publisher}",
						"${tags.artist}","${playlist}", "${tags.genre}")`
			this.db.run(sql)
	   return true
		} catch (err) {
			console.log('Error')
			throw err
		}
	}

async checkName(name) {
		const len = 4
		const exten = name.substr(name.length-len)
		if (name.indexOf('.mp3') === name.length - len)	{
			return true
		} else{
			throw new Error(`Your file format is"${exten}", Please select a .Mp3 file`)
		}
	}


	async retrive(user, playlistt) {
		try {
			console.log(user)
			console.log(playlistt)

			if (user.length === 0) throw new Error('missing username')
			const sql = `SELECT userID,path,name,album,year,
						publisher,artist,genre,playlist
					    FROM music WHERE (playlist = "${playlistt}" AND userID  = "${user}");`
			const data = await this.db.all(sql)
			console.log(data)
			return data
		} catch (err) {
			console.log('Error')
			throw err
		}
	}

	async OnlineMusic(user, playlistt,userID) {
		try {
			//console.log(userID)
			if (user.length === 0) throw new Error('missing username')
			const sql = `SELECT userID,path,name,album,year,
						publisher,artist,genre,playlist
					    FROM music WHERE (playlist = "${playlistt}" AND userID ="${userID}");`
			const data = await this.db.all(sql)
			return data
		} catch (err) {
			console.log('Error')
			throw err
		}
	}
}

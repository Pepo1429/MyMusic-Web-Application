'use strict'

const bcrypt = require('bcrypt-promise')
const sqlite = require('sqlite-async')

const saltRounds = 10

module.exports = class User {
	constructor(dbName = ':memory:') {
		return (async() => {
			this.db = await sqlite.open(dbName)
			const sql = 'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, user TEXT, pass TEXT);'
			await this.db.run(sql)
			return this
		})()
	}

	async register(user, pass, config) {
		try {
			if (user.length === 0) throw new Error('missing username')
			if (pass.length === 0) throw new Error('missing password')
			if (config.length === 0) throw new Error('missing config password')
			await this.checkPassords(pass,config)
			await this.checkUser(user)
			pass = await bcrypt.hash(pass, saltRounds)
			const sql = `INSERT INTO users(user, pass) VALUES("${user}", "${pass}")`
			await this.db.run(sql)
			return true

		} catch (err) {
			console.log('Error')
			throw err
		}
	}

	async checkUser(user) {
		const sql = `SELECT COUNT(id) as records FROM users WHERE user="${user}";`
		const data = await this.db.get(sql)
		if (data.records !== 0) {
			throw new Error(`username "${user}" already in use`)
		} else {
			return true
		}
	}

	async checkPassords(pass, config) {
		const length = 6
		if(pass !== config) {
			throw new Error('Passwords don`t match')
		} if(pass.length < length) {
			throw new Error('Passwords needs to be minimum 6 symbols')
		} else{
			return true
		}

	}
	async login(username, password) {
		try {
			let sql = `SELECT count(id) AS count FROM users WHERE user="${username}";`
			const records = await this.db.get(sql)
			if (!records.count) throw new Error(`username "${username}" not found`)
			sql = `SELECT id, pass FROM users WHERE user = "${username}";`
			const record = await this.db.get(sql)
			const valid = await bcrypt.compare(password, record.pass)
			if (valid === false) throw new Error(`invalid password for account "${username}"`)
			return record.id
		} catch (err) {
			console.log('User is not found')
			throw err
		}
	}
}

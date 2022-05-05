'use strict'

const Accounts = require('../modules/user.js')

describe('register()', () => {

	test('register a valid account', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		const register = await account.register('doej', 'password','password')
		expect(register).toBe(true)
		done()
	})

	test('register a valid account , other inputs', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		const register = await account.register('user', 'password1','password1')
		expect(register).toBe(true)
		done()
	})

	test('register a valid account , other big inputs', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		const register = await account.register('useruseruseruser', 'password1password1password1password1',
			'password1password1password1password1')
		expect(register).toBe(true)
		done()
	})

	test('register a duplicate username', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await account.register('doej', 'password','password')
		await expect( account.register('doej', 'password','password') )
			.rejects.toEqual( Error('username "doej" already in use') )
		done()
	})

	test('register a duplicate username, other valid inputs', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await account.register('thisIsUser', 'password1','password1')
		await expect( account.register('thisIsUser', 'password1','password1') )
			.rejects.toEqual( Error('username "thisIsUser" already in use') )
		done()
	})

	test('error if blank username', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await expect( account.register('', 'password','password') )
			.rejects.toEqual( Error('missing username') )
		done()
	})

	test('error if blank username with other inputs', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await expect( account.register('', 'thisIsnewPass','thisIsnewPass') )
			.rejects.toEqual( Error('missing username') )
		done()
	})

	test('error if blank username with other big inputs', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await expect( account.register('', 'thisIsnewPassthisIsnewPassthisIsnewPass',
			'thisIsnewPassthisIsnewPassthisIsnewPass') )
			.rejects.toEqual( Error('missing username') )
		done()
	})

	test('error if blank password', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await expect( account.register('doej', '' , '') )
			.rejects.toEqual( Error('missing password') )
		done()
	})


	test('error if blank password, with other username', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await expect( account.register('userName', '' , '') )
			.rejects.toEqual( Error('missing password') )
		done()
	})

	test('error if blank password, with big username', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await expect( account.register('userNameuserNameuserNameuserName', '' , '') )
			.rejects.toEqual( Error('missing password') )
		done()
	})


	test('error if blank config password', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await expect( account.register('doej', 'password' , '') )
			.rejects.toEqual( Error('missing config password') )
		done()
	})

	test('error if blank config password with other inputs', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await expect( account.register('useName', 'thisIsnewPass' , '') )
			.rejects.toEqual( Error('missing config password') )
		done()
	})

	test('error if blank config password with big inputs', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await expect( account.register('useNameuseNameuseName', 'thisIsnewPassthisIsnewPass' , '') )
			.rejects.toEqual( Error('missing config password') )
		done()
	})

})

describe('checkUser()', () => {
	test('User is not in database', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await account.register('doej', 'password','password')
		const isEql= await account.checkUser('pepo')
		await expect(isEql)
			.toEqual( true )
		done()
	})
})

describe('checkUser()', () => {
	test('User is not in database check with big string', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await account.register('user', 'password','password')
		const isEql= await account.checkUser('qwertyuibigSTRING')
		await expect(isEql)
			.toEqual( true )
		done()
	})
})

describe('checkUser()', () => {
	test('User is in database', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await account.register('pepo', 'password','password')
		await expect(account.checkUser('pepo'))
		 .rejects.toEqual( Error('username "pepo" already in use') )
		done()
	})
})

describe('checkUser()', () => {
	test('check if User is in database big string', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await account.register('qqqqqqqwwwwwwwwwwweeeeeeeeeeeeee', 'password','password')
		await expect(account.checkUser('qqqqqqqwwwwwwwwwwweeeeeeeeeeeeee'))
		 .rejects.toEqual( Error('username "qqqqqqqwwwwwwwwwwweeeeeeeeeeeeee" already in use') )
		done()
	})
})

describe('checkPassword()', () => {
	test('password match', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		const isEql= await account.checkPassords('password','password')
		await expect(isEql)
			.toEqual( true )
		done()
	})

	test('password match,with other input', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		const isEql= await account.checkPassords('newPassword','newPassword')
		await expect(isEql)
			.toEqual( true )
		done()
	})

	test('password match,with big input', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		const isEql= await account.checkPassords('newPasswordnewPassword','newPasswordnewPassword')
		await expect(isEql)
			.toEqual( true )
		done()
	})
})

describe('checkPassword()', () => {
	test('password do not match', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		 await expect(account.checkPassords('password','password1'))
			.rejects.toEqual( Error('Passwords don`t match') )
		done()
	})

	test('password do not match,with other input', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		 await expect(account.checkPassords('newPass','oldPass'))
			.rejects.toEqual( Error('Passwords don`t match') )
		done()
	})
})

describe('checkPassword()', () => {
	test('chekd password do not match(big string)', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		 await expect(account.checkPassords('passwordpasswordpassword','password1passwordpassword'))
			.rejects.toEqual( Error('Passwords don`t match') )
		done()
	})
})

describe('checkPassword()', () => {
	test('passwords lenght,not 6 symbol', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await expect(account.checkPassords('pass','pass'))
			.rejects.toEqual( Error('Passwords needs to be minimum 6 symbols') )
		done()
	})

	test('passwords lenght,not 6 symbol,with other input', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await expect(account.checkPassords('new','new'))
			.rejects.toEqual( Error('Passwords needs to be minimum 6 symbols') )
		done()
	})
})

describe('checkPassword1()', () => {
	test('passwords lenght,invaid input', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await expect(account.checkPassords('p','p'))
			.rejects.toEqual( Error('Passwords needs to be minimum 6 symbols') )
		done()
	})
})


describe('login()', () => {
	test('log in with valid credentials', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await account.register('doej', 'password','password')
		const valid = await account.login('doej', 'password','password')
		   expect(valid).toBe(1)
		done()
	})

	test('log in with valid credentials,big sting', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await account.register('doejdoejdoejdoejdoej', 'password','password')
		const valid = await account.login('doejdoejdoejdoejdoej', 'password','password')
		   expect(valid).toBe(1)
		done()
	})


	test('invalid username', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await account.register('doej', 'password','password')
		await expect( account.login('roej', 'password') )
			.rejects.toEqual( Error('username "roej" not found') )
		done()
	})

	test('invalid username with big string', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await account.register('doejjjjjjjjjjjjjjjjjjjjjjjjjj', 'password','password')
		await expect( account.login('roejjjjjjjjjjjjjjjjjjjjjjjjjjjjjj', 'password') )
			.rejects.toEqual( Error('username "roejjjjjjjjjjjjjjjjjjjjjjjjjjjjjj" not found') )
		done()
	})

	test('invalid password', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await account.register('doej', 'password','password')
		await expect( account.login('doej', 'bad','bad') )
			.rejects.toEqual( Error('invalid password for account "doej"') )
		done()
	})

	test('invalid password input', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await account.register('doej', 'password','password')
		await expect( account.login('doej', 'badpasssssssssssssssssssssssssssword','badpasssssssssssssssssssssssssssword') )
			.rejects.toEqual( Error('invalid password for account "doej"') )
		done()
	})

})

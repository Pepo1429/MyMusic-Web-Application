'use strict'

const Music = require('../modules/music.js')

describe('upload()', () => {

	test('upload a valid music file', async done => {
		expect.assertions(1)
		const music = await new Music()
		const register = await music.upload('public/music/music.mp3','pepo','music.mp3','pepo')
		expect(register).toBe(true)
		done()
	})

	test('upload another music file', async done => {
		expect.assertions(1)
		const music = await new Music()
		const register = await music.upload('public/music/Test.mp3','pepo','Test.mp3','pepo')
		expect(register).toBe(true)
		done()
	})

	test('upload a  music file without playlist', async done => {
		expect.assertions(1)
		const music = await new Music()
	       await expect(music.upload('public/music/music.mp3','pepo','music.mp3',undefined))
			.rejects.toEqual( Error('Please select or create playlist') )
		done()
	})

	test('find music file invalid input', async done => {
		expect.assertions(1)
		const music = await new Music()
		await expect(music.upload('','pepo','music.mp3','pepo'))
			.rejects.toEqual( Error('cannot find music') )
		done()
	})

	test('upload with correct filetype', async done => {
		expect.assertions(1)
		const music = await new Music()
		const file ='music.mp3'
		await music.checkName(file)
		const register = await music.upload('public/music/music.mp3','pepo',file,'pepo')
		expect(register).toBe(true)
		done()
	})

	test('upload with correct filetype, with other input', async done => {
		expect.assertions(1)
		const music = await new Music()
		const file ='music.mp3'
		await music.checkName(file)
		const register = await music.upload('public/music/music.mp3','data',file,'data')
		expect(register).toBe(true)
		done()
	})

	test('upload with another correct filetype', async done => {
		expect.assertions(1)
		const music = await new Music()
		const file ='Test.mp3'
		await music.checkName(file)
		const register = await music.upload('public/music/Test.mp3','pepo',file,'pepo')
		expect(register).toBe(true)
		done()

	})

		test('upload with another correct filetype,other input', async done => {
			expect.assertions(1)
			const music = await new Music()
			const file ='Test.mp3'
			await music.checkName(file)
			const register = await music.upload('public/music/Test.mp3','user',file,'user')
			expect(register).toBe(true)
			done()
	})

	test('upload with another correct filetype,other big input', async done => {
		expect.assertions(1)
		const music = await new Music()
		const file ='Test.mp3'
		await music.checkName(file)
		const register = await music.upload('public/music/Test.mp3','useruseruseruser',file,'useruseruseruser')
		expect(register).toBe(true)
		done()
})

	test('insert with correct id3 info', async done => {
		expect.assertions(1)
		const destinations = ['public/music/music.mp3','music/music.mp3']
		const tags = ['album','year','publisher','artist','genre']
		const music = await new Music()
		const id3 = await music.insertid3(destinations,'1','pepo',tags,'pepo')
		expect(id3).toBe(true)
		done()
	})

	test('insert with correct id3 info,with other input', async done => {
		expect.assertions(1)
		const destinations = ['public/music/music.mp3','music/music.mp3']
		const tags = ['album','year','publisher','artist','genre']
		const music = await new Music()
		const id3 = await music.insertid3(destinations,'1','other',tags,'other')
		expect(id3).toBe(true)
		done()
	})

	test('insert with correct id3 info,big string', async done => {
		expect.assertions(1)
		const destinations = ['public/music/music.mp3','music/music.mp3']
		const tags = ['album','year','publisher','artist','genre']
		const music = await new Music()
		const id3 = await music.insertid3(destinations,'qqqqqqqqqqqqqqqqqqqqqq','PepoBigStringTest',tags,'PepoBigStringTest')
		expect(id3).toBe(true)
		done()
	})

	test('insert without playlist', async done => {
		expect.assertions(1)
		const destinations = ['public/music/music.mp3','music/music.mp3']
		const tags = ['album','year','publisher','artist','genre']
		const music = await new Music()
		await expect(music.insertid3(destinations,'1','pepo',tags, undefined))
			.rejects.toEqual( Error('No playlist') )
		done()
	})

	test('insert without destination of File', async done => {
		expect.assertions(1)
		const tags = ['album','year','publisher','artist','genre']
		const music = await new Music()
		await expect(music.insertid3('','1','pepo',tags, 'pepo'))
			.rejects.toEqual( Error('No destination found') )
		done()
	})

	test('check name func with correct filetype', async done => {
		expect.assertions(1)
		const music = await new Music()
		const check = await music.checkName('music.mp3')
		expect(check).toBe(true)
		done()
	})

	test('check name func with correct filetype, big String', async done => {
		expect.assertions(1)
		const music = await new Music()
		const check = await music.checkName('musicVeryBigStringTest.mp3')
		expect(check).toBe(true)
		done()
	})

	test('check name func with icorrect filetype,.JPG', async done => {
		expect.assertions(1)
		const music = await new Music()
		await expect(music.checkName('music.JPG'))
			.rejects.toEqual( Error('Your file format is".JPG", Please select a .Mp3 file') )
		done()
	})

	test('check name func with icorrect filetype, .EXE', async done => {
		expect.assertions(1)
		const music = await new Music()
		await expect(music.checkName('Test.EXE'))
			.rejects.toEqual( Error('Your file format is".EXE", Please select a .Mp3 file') )
		done()
	})

	test('check name func with icorrect filetype, .TXT', async done => {
		expect.assertions(1)
		const music = await new Music()
		await expect(music.checkName('Test.TXT'))
			.rejects.toEqual( Error('Your file format is".TXT", Please select a .Mp3 file') )
		done()
	})

	test('check name func with icorrect filetype, .cpp', async done => {
		expect.assertions(1)
		const music = await new Music()
		await expect(music.checkName('Test.cpp'))
			.rejects.toEqual( Error('Your file format is".cpp", Please select a .Mp3 file') )
		done()
	})

	test('check name func with ccorrect filetype', async done => {
		expect.assertions(1)
		const music = await new Music()
		const isMp3 = await music.checkName('music.mp3')
		expect(isMp3).toBe(true)
		done()
	})

})

describe('retrive()', () => {
	test('retrive music with valid inputs', async done => {
		expect.assertions(1)
		const music = await new Music()
		await music.upload('public/music/music.mp3','user','music.mp3','playlist')
		const isMp3 = await music.retrive('user','playlist')
		expect(isMp3).toEqual([{'album': 'undefined', 'artist': 'undefined', 'genre': 'undefined',
		 'name': 'music.mp3', 'path': '/music/music.mp3', 'playlist': 'playlist', 'publisher': 'undefined',
		  'userID': 'user', 'year': 'undefined'}])
		done()
	})



	test(' Try retrive music without user param', async done => {
		expect.assertions(1)
		const music = await new Music()
		await music.upload('public/music/music.mp3','user','music.mp3','playlist')
		await expect(music.retrive('','playlist'))
			.rejects.toEqual( Error('missing username') )
		done()
	})

	test('retrive music', async done => {
		expect.assertions(1)
		const music = await new Music()
		await music.upload('public/music/music.mp3','user','music.mp3','playlist')
		const isMp3 = await music.OnlineMusic('user','playlist','user')
		expect(isMp3).toEqual([{'album': 'undefined', 'artist': 'undefined', 'genre': 'undefined', 'name': 'music.mp3', 'path': '/music/music.mp3', 'playlist': 'playlist', 'publisher': 'undefined', 'userID': 'user', 'year': 'undefined'}])
		done()
	})

	test('retrive music without username', async done => {
		expect.assertions(1)
		const music = await new Music()
		await music.upload('public/music/music.mp3','user','music.mp3','playlist')
	    await expect(music.OnlineMusic('','playlist','user'))
			.rejects.toEqual( Error('missing username') )
		done()
	})

	test('retrive music without username, other inputs', async done => {
		expect.assertions(1)
		const music = await new Music()
		await music.upload('public/music/music.mp3','otherUser','music.mp3','otherPlaylist')
	    await expect(music.OnlineMusic('','otherPlaylist','otherUser'))
			.rejects.toEqual( Error('missing username') )
		done()
	})

	test('retrive music without username, big inputs', async done => {
		expect.assertions(1)
		const music = await new Music()
		await music.upload('public/music/music.mp3','otherUserotherUserotherUser',
			'music.mp3','otherPlaylistotherPlaylistotherPlaylist')
	    await expect(music.OnlineMusic('','otherPlaylistotherPlaylistotherPlaylist','otherUserotherUserotherUser'))
			.rejects.toEqual( Error('missing username') )
		done()
	})

})

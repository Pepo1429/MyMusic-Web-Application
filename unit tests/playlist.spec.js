'use strict'

const Playlist = require('../modules/playlist.js')

describe('createPlaylist()', () => {

	test('Create Playlist with valid data', async done => {
		expect.assertions(1)
		const playList = await new Playlist()
		const title = {	playlist: 'playlist'}
		const isCreated = await playList.uploadImg(title,'image1.JPG','public/image/image1.JPG','1','pepo')
		    expect(isCreated).toBe(true)
		done()
	})

	test('Create Playlist with valid data,anoteh input', async done => {
		expect.assertions(1)
		const playList = await new Playlist()
		const title = {	playlist: 'playlist'}
		const isCreated = await playList.uploadImg(title,'image1.JPG','public/image/image1.JPG','2','usename')
		    expect(isCreated).toBe(true)
		done()
	})

	test('Create Playlist with valid data,big string', async done => {
		expect.assertions(1)
		const playList = await new Playlist()
		const title = {	playlist: 'playlist'}
		const isCreated = await playList.uploadImg(title,'image1.JPG','public/image/image1.JPG',
													'1000000','biggggggggggggggggggggstring')
		    expect(isCreated).toBe(true)
		done()
	})
})



describe('check With empty Title()', () => {
	test('Create Playlist with empty playlist name', async done => {
		expect.assertions(1)
		const playList = await new Playlist()
		const title = {	playlist: ''}
		await expect(playList.uploadImg(title,'image1.JPG','public/image/image1.JPG','1','pepo'))
		        .rejects.toEqual( Error('missing playlist name') )
		done()
	})

	test('Create Playlist with empty playlist name,another inputs', async done => {
		expect.assertions(1)
		const playList = await new Playlist()
		const title = {	playlist: ''}
		await expect(playList.uploadImg(title,'image1.JPG','public/image/image1.JPG','1000','user'))
		        .rejects.toEqual( Error('missing playlist name') )
		done()
	})

	test('Create Playlist with empty playlist name,big inputs', async done => {
		expect.assertions(1)
		const playList = await new Playlist()
		const title = {	playlist: ''}
		await expect(playList.uploadImg(title,'image1.JPG','public/image/image1.JPG','10000000000','useruseruseruseru'))
		        .rejects.toEqual( Error('missing playlist name') )
		done()
	})
})

describe('check Without Image()', () => {
	test('Create Playlist without image', async done => {
		expect.assertions(1)
		const playList = await new Playlist()
		const title = {	playlist: 'playlist'}
		await expect(playList.uploadImg(title,'','public/image/image1.JPG','1','pepo'))
		        .rejects.toEqual( Error('cannot find image') )
		done()
	})

	test('Create Playlist without image,other inputs', async done => {
		expect.assertions(1)
		const playList = await new Playlist()
		const title = {	playlist: 'playlist'}
		await expect(playList.uploadImg(title,'','public/image/image1.JPG','1000','user'))
		        .rejects.toEqual( Error('cannot find image') )
		done()
	})
	test('Create Playlist without image,big inputs', async done => {
		expect.assertions(1)
		const playList = await new Playlist()
		const title = {	playlist: 'playlist'}
		await expect(playList.uploadImg(title,'','public/image/image1.JPG','10000000','useruseruseruseruser'))
		        .rejects.toEqual( Error('cannot find image') )
		done()
	})
})

	describe('copyFile()', () => {
		test('Create Playlist without path to image', async done => {
			expect.assertions(1)
			const playList = await new Playlist()
			const title = {	playlist: 'playlist'}
			await expect(playList.uploadImg(title,'image1.JPG',undefined,'1','pepo'))
					.rejects.toEqual( Error('cannot find image') )
			done()
		})

		test('Create Playlist without path to image,other inputs', async done => {
			expect.assertions(1)
			const playList = await new Playlist()
			const title = {	playlist: 'playlist'}
			await expect(playList.uploadImg(title,'image1.JPG',undefined,'1000','user'))
					.rejects.toEqual( Error('cannot find image') )
			done()
		})

		test('Create Playlist without path to image,big inputs', async done => {
			expect.assertions(1)
			const playList = await new Playlist()
			const title = {	playlist: 'playlist'}
			await expect(playList.uploadImg(title,'image1.JPG',undefined,'100000000','useruseruseruseruser'))
					.rejects.toEqual( Error('cannot find image') )
			done()
		})
})

describe('check if playlist exist', () => {
	test('with not existed playlist', async done => {
		expect.assertions(1)
		const playList = await new Playlist()
		const title = {	playlist: 'playlist'}
		 await playList.checkPlaylist(title.playlist,'user')
		const isCreated = await playList.uploadImg(title,'image1.JPG','public/image/image1.JPG','1','pepo')
		    expect(isCreated).toBe(true)
		done()
	})

	test('with not existed playlist,another inputs', async done => {
		expect.assertions(1)
		const playList = await new Playlist()
		const title = {	playlist: 'thatPlaylist'}
		 await playList.checkPlaylist(title.playlist,'user')
		const isCreated = await playList.uploadImg(title,'image1.JPG','public/image/image1.JPG','1000','user')
		    expect(isCreated).toBe(true)
		done()
	})

	test('with not existed playlist,big inputs', async done => {
			expect.assertions(1)
			const playList = await new Playlist()
			const title = {	playlist: 'thatPlaylistqqqqqqqqqqqqqqqqqq'}
			 await playList.checkPlaylist(title.playlist,'user')
			const isCreated = await playList.uploadImg(title,'image1.JPG','public/image/image1.JPG','1000000000','useruseruseruser')
				expect(isCreated).toBe(true)
			done()
	})

	test('with exist playlist', async done => {
		expect.assertions(1)
		const playList = await new Playlist()
		const title = {	playlist: 'playlist'}
		 await playList.uploadImg(title,'image1.JPG','public/image/image1.JPG','1','user')
		 await expect(playList.uploadImg(title,'image1.JPG','public/image/image1.JPG','1','user'))
		     .rejects.toEqual( Error('You already have a playlist with name - "playlist"') )
		done()
	})
	test('with exist playlist, other inputs', async done => {
		expect.assertions(1)
		const playList = await new Playlist()
		const title = {	playlist: 'playlist1'}
		 await playList.uploadImg(title,'image1.JPG','public/image/image1.JPG','2','pepo')
		 await expect(playList.uploadImg(title,'image1.JPG','public/image/image1.JPG','2','pepo'))
		     .rejects.toEqual( Error('You already have a playlist with name - "playlist1"') )
		done()
	})
})

describe('checkPlaylist()', () => {
	test('Without record in database', async done => {
		expect.assertions(1)
		const playList = await new Playlist()
		const data = playList.checkPlaylist('playlist','user')
		expect(data.record).toEqual(undefined)
		done()
	})

	test('Without record in database,other inputs', async done => {
		expect.assertions(1)
		const playList = await new Playlist()
		const data = playList.checkPlaylist('playlist1','user1')
		expect(data.record).toEqual(undefined)
		done()
	})

	test('Without record in database,big inputs', async done => {
		expect.assertions(1)
		const playList = await new Playlist()
		const data = playList.checkPlaylist('playlistplaylistplaylist','user1user1user1user1')
		expect(data.record).toEqual(undefined)
		done()
	})

	test('With record in database', async done => {
		expect.assertions(1)
		const playList = await new Playlist()
		const title = {	playlist: 'playlist'}
		await playList.uploadImg(title,'image1.JPG','public/image/image1.JPG','1','user')
		await expect(playList.checkPlaylist('playlist','user'))
				.rejects.toEqual( Error('You already have a playlist with name - "playlist"') )
		done()
	})

	test('With record in database, other inputs', async done => {
		expect.assertions(1)
		const playList = await new Playlist()
		const title = {	playlist: 'playlist1'}
		await playList.uploadImg(title,'image1.JPG','public/image/image1.JPG','1','user')
		await expect(playList.checkPlaylist('playlist1','user'))
				.rejects.toEqual( Error('You already have a playlist with name - "playlist1"') )
		done()
	})

	test('With record in database, big inputs', async done => {
		expect.assertions(1)
		const playList = await new Playlist()
		const title = {	playlist: 'playlist1playlist1playlist1'}
		await playList.uploadImg(title,'image1.JPG','public/image/image1.JPG','1','user')
		await expect(playList.checkPlaylist('playlist1playlist1playlist1','user'))
				.rejects.toEqual( Error('You already have a playlist with name - "playlist1playlist1playlist1"') )
		done()
	})
})

describe('retrive()', () => {
	test('Retrive data from database with valid data', async done => {
		expect.assertions(1)
		const playList = await new Playlist()
		const title = {	playlist: 'playlist'}
		await playList.uploadImg(title,'image1.JPG','public/image/image1.JPG','1','user')
		const data = await playList.retrive('1')
			expect(data).toEqual([{"accessSrc": "/image/image1.JPG", "title": "playlist", "userName": "user"}])
		done()
	})

	test('Retrive data from database with valid data, other inputs', async done => {
		expect.assertions(1)
		const playList = await new Playlist()
		const title = {	playlist: 'playlist1'}
		await playList.uploadImg(title,'image1.JPG','public/image/image1.JPG','1','user')
		const data = await playList.retrive('1')
			expect(data).toEqual([{"accessSrc": "/image/image1.JPG", "title": "playlist1", "userName": "user"}])
		done()
	})

	test('Retrive data from database without UserID', async done => {
		expect.assertions(1)
		const playList = await new Playlist()
		const title = {	playlist: 'playlist'}
		await playList.uploadImg(title,'image1.JPG','public/image/image1.JPG','1','user')
		 await expect(playList.retrive(''))
				.rejects.toEqual( Error('missing username') )
		done()
	})

	test('Retrive data from database without UserID,other input', async done => {
		expect.assertions(1)
		const playList = await new Playlist()
		const title = {	playlist: 'playlist1'}
		await playList.uploadImg(title,'image1.JPG','public/image/image1.JPG','2','user2')
		 await expect(playList.retrive(''))
				.rejects.toEqual( Error('missing username') )
		done()
	})
})

describe('retriveAll()', () => {
	test('Retrive All data from database exept current User data', async done => {
		expect.assertions(1)
		const playList = await new Playlist()
		let title = {	playlist: 'playlist'}
		await playList.uploadImg(title,'image1.JPG','public/image/image1.JPG','1','user')
		title = {	playlist: 'playlist1'}
		await playList.uploadImg(title,'image1.JPG','public/image/image1.JPG','2','user2')
		const data = await playList.retriveAll('1')
			expect(data).toEqual([{"accessSrc": "/image/image1.JPG", "id": 2, "imgSrc": "public/image/image1.JPG", "name": "image1.JPG", "title": "playlist1", "userID": "2", "userName": "user2"}])
		done()
	})

	test('Retrive All data from database without accounts of the user', async done => {
		expect.assertions(1)
		const playList = await new Playlist()
		const title = {	playlist: 'playlist'}
		await playList.uploadImg(title,'image1.JPG','public/image/image1.JPG','1','user')
		await playList.uploadImg(title,'image1.JPG','public/image/image1.JPG','2','user2')
		 await expect(playList.retriveAll(''))
				.rejects.toEqual( Error('missing username') )
		done()
	})

	test('Retrive All data from database without accounts of the user,another inputs', async done => {
		expect.assertions(1)
		const playList = await new Playlist()
		const title = {	playlist: 'playlist'}
		await playList.uploadImg(title,'image1.JPG','public/image/image1.JPG','1','user100')
		await playList.uploadImg(title,'image1.JPG','public/image/image1.JPG','2','user200')
		 await expect(playList.retriveAll(''))
				.rejects.toEqual( Error('missing username') )
		done()
	})
})

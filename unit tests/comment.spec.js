'use strict'

const Comment = require('../modules/comment.js')

describe('setComment()', () => {
	test('set comment with valid input', async done => {
		expect.assertions(1)
		const comment = await new Comment()
		const isSet = await comment.setComment('user', 'playlist', 'someComment', 'userPlaylist','userName')
		    expect(isSet).toBe(true)
		done()
	})

	test('set comment with other valid input', async done => {
		expect.assertions(1)
		const comment = await new Comment()
		const isSet = await comment.setComment('1', '1', 'anotherComment', '1','1')
		    expect(isSet).toBe(true)
		done()
	})

	test('set comment with other big valid input', async done => {
		expect.assertions(1)
		const comment = await new Comment()
		const isSet = await comment.setComment('user', 'playlist', 'anotherCommentanotherCommentanotherComment', 'userID','userName')
		    expect(isSet).toBe(true)
		done()
	})

	test('set comment with other Number valid input', async done => {
		expect.assertions(1)
		const comment = await new Comment()
		const isSet = await comment.setComment('user', 'playlist', '123321test', 'userID','userName')
		    expect(isSet).toBe(true)
		done()
	})

	test('set comment with other valid input with spaces between', async done => {
		expect.assertions(1)
		const comment = await new Comment()
		const isSet = await comment.setComment('user', 'playlist', '1233 21te st is test', 'userID','userName')
		    expect(isSet).toBe(true)
		done()
	})

	test('set comment without user data input', async done => {
		expect.assertions(1)
		const comment = await new Comment()
		await expect(comment.setComment('', '1', 'comment', '1','1'))
			. rejects.toEqual( Error('missing username') )
		done()
	})

	test('set comment without user data input,other inputs', async done => {
		expect.assertions(1)
		const comment = await new Comment()
		await expect(comment.setComment('', 'user', 'somecomment', 'playlist','userID'))
			. rejects.toEqual( Error('missing username') )
		done()
	})

	test('set comment without user data input,big inputs', async done => {
		expect.assertions(1)
		const comment = await new Comment()
		await expect(comment.setComment('', 'useruseruseruseruseruseruseruser', 
		'somecommentsomecommentsomecommentsomecomment', 'playlistplaylistplaylist','userIDuserIDuserIDuserID'))
			. rejects.toEqual( Error('missing username') )
		done()
	})



	test('set comment without comment data input', async done => {
		expect.assertions(1)
		const comment = await new Comment()
		await expect(comment.setComment('user', 'playlist', '', 'userID','playlistID'))
			. rejects.toEqual( Error('Please write a comment') )
		done()
	})

	test('set comment with another number input', async done => {
		expect.assertions(1)
		const comment = await new Comment()
		const isSet = await comment.setComment('1', '1', '123321', '1','1')
		    expect(isSet).toBe(true)
		done()
	})

	test('set comment with another big input', async done => {
		expect.assertions(1)
		const comment = await new Comment()
		const isSet = await comment.setComment('useruseruseruseruseruser', 
						'playlistplaylistplaylist', '123321123321123321123321123321', 'pepo','user')
		    expect(isSet).toBe(true)
		done()
	})

})

describe('getComment()', () => {
	test('get Comment with valid inpput', async done => {
		expect.assertions(1)
		const comment = await new Comment()
		const date = new Date(Date.now())
		const slice = 10
		const strDate = date.toISOString().slice(0,slice)
		await comment.setComment('playlist', 'userPlaylist' ,'comment', 'user','userName')
		const comme = await comment.getComment('playlist', 'userPlaylist')
		    expect(comme).toEqual([{'comment': 'comment', 'date': strDate, 'userName': 'userName'}])
		done()
	})

	test('get Comment with other valid number input', async done => {
		expect.assertions(1)
		const comment = await new Comment()
		const date = new Date(Date.now())
		    const slice = 10
		    const strDate = date.toISOString().slice(0,slice)
		await comment.setComment('1', '1', '1', '1','1')
		const comme = await comment.getComment('1', '1')
		expect(comme).toEqual([{'comment': '1', 'date': strDate, 'userName': '1'}])
		done()
	})


	test('get Comment with other valid ibig nput', async done => {
		expect.assertions(1)
		const comment = await new Comment()
		const date = new Date(Date.now())
		    const slice = 10
		    const strDate = date.toISOString().slice(0,slice)
		await comment.setComment('1', '1', 'commentcommentcommentcomment', '1','useruseruseruser')
		const comme = await comment.getComment('1', '1')
		expect(comme).toEqual([{'comment': 'commentcommentcommentcomment', 
			'date': strDate, 'userName': 'useruseruseruser'}])
		done()
	})
	test('get Comment with invalid input', async done => {
		expect.assertions(1)
		const comment = await new Comment()
		await expect(comment.getComment('', 'userPlaylist'))
			. rejects.toEqual( Error('Cannot find playlist') )
		done()
	})

	test('get Comment with invalid input, other other' , async done => {
		expect.assertions(1)
		const comment = await new Comment()
		await expect(comment.getComment('', 'thatsPlaylist'))
			. rejects.toEqual( Error('Cannot find playlist') )
		done()
	})

	test('get Comment with invalid input, other big inputs' , async done => {
		expect.assertions(1)
		const comment = await new Comment()
		await expect(comment.getComment('', 'thatsPlaylistthatsPlaylistthatsPlaylistthatsPlaylist'))
			. rejects.toEqual( Error('Cannot find playlist') )
		done()
	})

})

describe('getDate()', () => {
	test('get Date', async done => {
		expect.assertions(1)
		const comment = await new Comment()
		const date = new Date(Date.now())
		const slice = 10
		const strDate = date.toISOString().slice(0,slice)
		const data = await comment.getdate()
		    expect(data).toEqual(strDate)
		done()
    })
})

'use strict'

const Rate = require('../modules/rate.js')

describe('setRate()', () => {

	test('set Rate with valid data', async done => {
		expect.assertions(1)
		const rate = await new Rate()
		const isSet = await rate.setRate('1','user','2','5')
		    expect(isSet).toBe(true)
		done()
	})

	test('set Rate with valid data, with other inputs', async done => {
		expect.assertions(1)
		const rate = await new Rate()
		const isSet = await rate.setRate('1','user','5','5')
		    expect(isSet).toBe(true)
		done()
	})

	test('set Rate with valid data, with another input', async done => {
		expect.assertions(1)
		const rate = await new Rate()
		const isSet = await rate.setRate('1','user','3','5')
		    expect(isSet).toBe(true)
		done()
	})

	test('set Rate with valid data, with big input', async done => {
		expect.assertions(1)
		const rate = await new Rate()
		const isSet = await rate.setRate('1','user','100','5')
		    expect(isSet).toBe(true)
		done()
	})

	test('set Rate without username', async done => {
		expect.assertions(1)
		const rate = await new Rate()
	   await expect(rate.setRate('','user','2','5'))
			. rejects.toEqual( Error('missing username') )
		done()
	})

	test('set Rate without username,other input', async done => {
		expect.assertions(1)
		const rate = await new Rate()
	   await expect(rate.setRate('','userID','5','playlist'))
			. rejects.toEqual( Error('missing username') )
		done()
	})

	test('set Rate without username,with big inputs', async done => {
		expect.assertions(1)
		const rate = await new Rate()
	   await expect(rate.setRate('','userIDuseriIDuserID','5000','playlistplaylistplaylist'))
			. rejects.toEqual( Error('missing username') )
		done()
	})


	test('set Rate without rate', async done => {
		expect.assertions(1)
		const rate = await new Rate()
	   await expect(rate.setRate('1','user','','1'))
			. rejects.toEqual( Error('please select rate') )
		done()
	})

	test('set Rate without rate,other input', async done => {
		expect.assertions(1)
		const rate = await new Rate()
	   await expect(rate.setRate('user','userID','','playlist'))
			. rejects.toEqual( Error('please select rate') )
		done()
	})

	test('set Rate without rate,big input', async done => {
		expect.assertions(1)
		const rate = await new Rate()
	   await expect(rate.setRate('useruseruseruseruser','userIDuserIDuserIDuserID','','playlistplaylistplaylist'))
			. rejects.toEqual( Error('please select rate') )
		done()
	})

})


describe('getRate()', () => {

	test('getRate() with valid input', async done => {
		expect.assertions(1)
		const rate = await new Rate()
		const score = 2
		await rate.setRate('1','1',score,'1')
		await rate.setRate('1','1',score,'1')
		const rateGet = await rate.getRate('playlist','1')
		    expect(rateGet).toEqual('2.00')
		done()
	})

	test('getRate() with other valid input', async done => {
		expect.assertions(1)
		const rate = await new Rate()
		const score = 5
		await rate.setRate('user','playlist',score,'user')
		await rate.setRate('user','playlist',score,'user')
		const rateGet = await rate.getRate('playlist','user')
		    expect(rateGet).toEqual('5.00')
		done()
	})

	test('getRate() with other big input', async done => {
		expect.assertions(1)
		const rate = await new Rate()
		const score = 50000
		await rate.setRate('user','playlist',score,'user')
		await rate.setRate('user','playlist',score,'user')
		const rateGet = await rate.getRate('playlist','user')
		    expect(rateGet).toEqual('50000.00')
		done()
	})
	test('getRate without data for playlist', async done => {
		expect.assertions(1)
		const rate = await new Rate()
		await expect(rate.getRate('','user'))
			. rejects.toEqual( Error('missing playlist') )
		done()
	})

	test('getRate without data for playlist, other valid input', async done => {
		expect.assertions(1)
		const rate = await new Rate()
		await expect(rate.getRate('','userIDPlaylist'))
			. rejects.toEqual( Error('missing playlist') )
		done()
	})

	test('getRate without data for playlist, big valid input', async done => {
		expect.assertions(1)
		const rate = await new Rate()
		await expect(rate.getRate('','userIDPlaylistuserIDPlaylistuserIDPlaylist'))
			. rejects.toEqual( Error('missing playlist') )
		done()
	})
})

describe('averageRate()', () => {
	test('average Rate with valid input', async done => {
		expect.assertions(1)
		const rate = await new Rate()
		const rates = [{score: 1}, {score: 5}, {score: 1}, {score: 5}]
		const calculate = await rate.averageRate(rates)
		    expect(calculate).toEqual('3.00')
		done()
	})

	test('average Rate with different inputs', async done => {
		expect.assertions(1)
		const rate = await new Rate()
		const rates = [{score: 0}, {score: 5}, {score: 3}, {score: 5}]
		const calculate = await rate.averageRate(rates)
		expect(calculate).toEqual('3.25')
		done()
	})

	test('average Rate with 0 values inputs', async done => {
		expect.assertions(1)
		const rate = await new Rate()
		const rates = [{score: 0}, {score: 0}, {score: 0}, {score: 0}]
		const calculate = await rate.averageRate(rates)
		expect(calculate).toEqual('0.00')
		done()
	})

	test('average Rate with big values inputs', async done => {
		expect.assertions(1)
		const rate = await new Rate()
		const rates = [{score: 100}, {score: 150}, {score: 300}, {score: 4000}]
		const calculate = await rate.averageRate(rates)
		expect(calculate).toEqual('1137.50')
		done()
	})

	test('average Rate with other big values inputs', async done => {
		expect.assertions(1)
		const rate = await new Rate()
		const rates = [{score: 10000}, {score: 15000}, {score: 3000}, {score: 4000}]
		const calculate = await rate.averageRate(rates)
		expect(calculate).toEqual('8000.00')
		done()
	})

	

	test('average Rate missing inputs', async done => {
		expect.assertions(1)
		const rate = await new Rate()
		await expect( rate.averageRate())
			.rejects.toEqual( Error('missing rates') )
		done()
	})

})

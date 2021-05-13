'use strict'

const fy = require('../fy')
const randomItem = require('../demo/random-item')
const metatests = require('metatests')

// ok 1 - GET: fy/api/validate # time=146ms
metatests.testAsync('POST: fy/api/validate', async (test) => {
  test.strictSame(await fy.validate('email', 'test@landex.com'), true)
  test.strictSame(await fy.validate('phone', '+380671234567', {locale: 'uk-UA'}), true)
  test.strictSame(await fy.validate('float', '10.01'), true)
  test.strictSame(await fy.validate('ip', '192.168.11.12', {version: 4}), true)
  test.end()
})

// ok 2 - POST: fy/api/validate # time=150ms
metatests.testAsync('GET: fy/api/validate', async (test) => {
    test.strictSame(await fy.validate('email', 'test@landex.com', 'GET'), true)
    test.strictSame(await fy.validate('phone', '+380671234567', {locale: 'uk-UA'}, 'GET'), true)
    test.strictSame(await fy.validate('float', '10.01', 'GET'), true)
    test.strictSame(await fy.validate('ip', '192.168.11.12', {version: 4}, 'GET'), true)
    test.end()
})

// ok 3 - POST: fy/api/randomItem # time=1919ms
metatests.testAsync('POST: fy/api/randomItem', async (test) => {
  
  test.strictSame(typeof (await randomItem(1))[0].balance, 'number')

  let items = await randomItem(2)

  test.strictSame(typeof items[1].email, 'string')

  let validate = (await randomItem(1))[0].validate
  //console.log('validate', validate)
  test.strictSame(typeof validate, 'object')
  test.strictSame(validate.ip, true)
  test.strictSame(validate.email, true)
  test.strictSame(validate.phone, true)
  test.strictSame(validate.country, true)
  test.strictSame(validate.city, true)
  test.strictSame(validate.float, true)
  test.end()
})

// ok 4 - 100/randomItem # time=30000ms
metatests.testAsync('100/randomItem', async (test) => {
  let items = await randomItem(100)
  test.strictSame(typeof items, 'object')
  test.end()
})
'use strict'

const fy = require('../fy')
const randomItem = require('../demo/random-item')
const metatests = require('metatests')

metatests.testAsync('POST: fy/api/validate', async (test) => {
  test.strictSame(await fy.validate('email', 'test@landex.com'), true)
  test.strictSame(await fy.validate('phone', '+380671234567', {locale: 'uk-UA'}), true)
  test.strictSame(await fy.validate('float', '10.01'), true)
  test.strictSame(await fy.validate('ip', '192.168.11.12', {version: 4}), true)
  test.end()
})

metatests.testAsync('GET: fy/api/validate', async (test) => {
    test.strictSame(await fy.validate('email', 'test@landex.com', 'GET'), true)
    test.strictSame(await fy.validate('phone', '+380671234567', {locale: 'uk-UA'}, 'GET'), true)
    test.strictSame(await fy.validate('float', '10.01', 'GET'), true)
    test.strictSame(await fy.validate('ip', '192.168.11.12', {version: 4}, 'GET'), true)
    test.end()
})

metatests.testAsync('POST: fy/api/randomItem', async (test) => {
  test.strictSame(typeof randomItem(10), 'object')
  test.end()
})
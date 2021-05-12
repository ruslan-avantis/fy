'use strict'

const fy = require('../fy.js')
const metatests = require('metatests')

class User {
  constructor(param = {}) {
    this.param = param
  }
  save() {
    return this.param
  }
}

const randomCreate = async (n) => {
  let i = 0, resp = []
  while (i < n) {
      let user = new User({
          'email': await fy.random('email'),
          'phone': await fy.random('phone'),
          'password': await fy.random('password'),
          'currency': await fy.random('currency'),
          'city': await fy.random('city'),
          'country': await fy.random('country'),
          'name': await fy.random('firstName'),
          'last_name': await fy.random('lastName'),
          'balance': await fy.random('integer', {min: 0, max: 999}),
          'session_id': await fy.random('sessionId'),
          'ip': await fy.random('ip')
      })
      user.save()
      resp.push(user)
  }
}

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

metatests.testAsync('POST: fy/api/randon', async (test) => {
  test.strictSame(typeof randomCreate(10), 'object')
  test.end()
})
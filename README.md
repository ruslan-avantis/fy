# FY API `Validate` `Random` `Generate` `Crypt`

## :rocket: Simple Usage

`GET` `https://fy.com.ua/validate?request=isEmail&value=foo@bar.com`

```js
// return
{
    "code": 200,
    "message": "OK",
    "request": "ping",
    "type": "validate",
    "params": {
        "value": "foo@bar.com"
    },
    "function": "isEmail",
    "return": true // true|false
}
```

### JavaScript example

Create file `fy.js` in local directory or download from the link [fy.js](example/fy.js)

```js
const axios = require('axios')
const queryString = require('query-string')

/** Inbox class
 * 
 * @param string $type
 * @param {*} $params
 * @param string $method
 * @returns this
 */

class Fy {

    constructor(setings = {}) {
        
        this.setings = {
            baseURL: 'https://fy.com.ua/api/v1/',
            headers: {'token': 'demo'}
        }
        if (setings) this.setings = Object.assign(this.setings, setings)

        this.instance = axios.create(this.setings)
    }

    async run(type = 'validate', request = 'ping', params = {}, method = 'POST') {

        let inbox = {'data': {}}

        try {
            
            const url = `/${type}?request=${request}`

            if (method == 'GET') {
                let query = ''
                if (params) query = '&'+queryString.stringify(params)

                console.log('GET: ', `${url}${query}`)

                inbox = await this.instance.get(`${url}${query}`)
            } else {

                console.log('POST: ', url, 'params', params)

                inbox = await this.instance.post(url, params)
            }

            /** inbox.data = {
            "code": 200,
            "message": "OK",
            "request": "ping",
            "type": "validate",
            "params": {
                "value": "foo@bar.com"
                },
            "function": "isEmail",
            "return": true // true|false
            } */

            //console.log('inbox', inbox.data)

        } catch (error) {
            console.error(error)
        }
        return inbox.data.return ? inbox.data.return : null
        // or return object data
        // return inbox.data
    }
    
    static validate(request, params, method = 'POST', setings = {}) {
        const fy = new Fy(setings)
        if (typeof params == 'string') {
            params = {'value': params}
        }
        return fy.run('validate', request, params, method)
    }

    static random(request, params = {}, method = 'POST', setings = {}) {
        const fy = new Fy(setings)
        return fy.run('random', request, params, method)
    }

    static generate(request, params = {}, method = 'POST', setings = {}) {
        const fy = new Fy(setings)
        return fy.run('generate', request, params, method)
    }

    static crypt(request, params = {}, method = 'POST', setings = {}) {
        const fy = new Fy(setings)
        return fy.run('crypt', request, params, method)
    }
}

module.exports = Fy
```

### Use `fy.js`

```js

const fy = require('./fy.js')

const email = 'foo@bar.com'

if (fy.validate('email', {value: email}, 'GET') === true) {
    // Your code
    // user.email = email
}

// or simply

if (fy.validate('email', email) === true) {
    // Your code
    // user.email = email
}

// or create 10 random users
let i = 0
while (i < 10) {
    let user = new User({
        'email': fy.random('email'),
        'phone': fy.random('phone'),
        'password': fy.random('password'),
        'currency': fy.random('currency'),
        'city': fy.random('city'),
        'country': fy.random('country'),
        'name': fy.random('firstName'),
        'last_name': fy.random('lastName'),
        'balance': fy.random('integer', {min: 0, max: 999}),
        'session_id': fy.random('sessionId'),
        'ip': fy.random('ip')
    })
    user.save()
}

```

### All functions

```js
const fy = require('./fy.js')

// Validate return true|false
fy.validate('email', 'foo@bar.com')
fy.validate('phone', '+380671234567') // or +38 (067) 123-45-67
fy.validate('float', '10.01')
fy.validate('ip', '192.168.1.0)', {version: 4}) // version 4 or 6

// Random
fy.random('words') // random word
fy.random('words', {num: 2, lang: 'en|ru|it'}) // two random words
fy.random('string', {i: 36, n: 7, lang: 'en|ru'}) // sdfdghtrh
fy.random('integer', {min: 0, max: 99999}) // 2345
fy.random('float', {min: 0, max: 99999, fraction: 2}) // 153.54
fy.random('ip') // random ip version: 4
//fy.random('ip', {version: '6'}) // random ip version: 6
fy.random('firstName') //
fy.random('lastName', {lang: 'en|ru|it', gender: 'male|female'}) // gender:male|female

// Crypt
fy.crypt('encrypt', { encrypt: encrypt_string, public_key })
fy.crypt('decrypt', { decrypt: to_decrypt_string, private_key })

```

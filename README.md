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

/** fy class
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

        let response = {'data': {}}

        try {
            
            const url = `/${type}?request=${request}`

            if (method == 'GET') {
                let query = ''
                if (params) query = '&'+queryString.stringify(params)

                console.log('GET: ', `${url}${query}`)

                response = await this.instance.get(`${url}${query}`)
            } else {

                console.log('POST: ', url, 'params', params)

                response = await this.instance.post(url, params)
            }

            /** response.data = {
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

            //console.log('response.data', response.data)

        } catch (error) {
            console.error(error)
        }
        return response.data.return ? response.data.return : null
        // or return object data
        // return response.data
    }
    
    static validate(request, params, method, setings) {
        if (typeof params == 'string') {
            params = {'value': params}
        }
        return (new Fy(setings)).run('validate', request, params, method)
    }

    static random(request, params, method, setings) {
        return (new Fy(setings)).run('random', request, params, method)
    }

    static generate(request, params, method, setings) {
        return (new Fy(setings)).run('generate', request, params, method)
    }

    static crypt(request, params, method, setings) {
        return (new Fy(setings)).run('crypt', request, params, method)
    }
}

module.exports = Fy
```

### Use `fy.js`

```js
const fy = require('./fy.js')

if (fy.validate('email', 'foo@bar.com') === true) {
    // Your code
    // user.email = email
}
// or
if (fy.validate('email', {value: 'foo@bar.com'}, 'GET') === true) {
    // Your code
    // user.email = email
}

// or create (n) random users
const randomCreate = async (n) => {
    let i = 0
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
    }
}

randomCreate(10)

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
fy.random('email', {domain: 'domain.com'}) // random word
fy.random('firstName') //
fy.random('lastName', {lang: 'en|ru|it', gender: 'male|female'}) // gender:male|female

// Crypt
fy.crypt('encrypt', { encrypt: encrypt_string, public_key })
fy.crypt('decrypt', { decrypt: to_decrypt_string, private_key })

```

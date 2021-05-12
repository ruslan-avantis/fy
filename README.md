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
            if (typeof method == 'object') {
                params = Object.assign(params, method)
            }
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
const randomItem = async (n) => {

    let i = 0, resp = []

    while (i < n) {

        let obj = {}
        
        obj.email = await fy.random('email', {domain : 'gmail.com'})
        obj.password = await fy.random('password')
        obj.country = await fy.random('country')
        obj.city = await fy.random('city', {country : obj.country})
        obj.phone = await fy.random('phone', {locale : 'UA'})
        obj.currency = await fy.random('currency')
        obj.name = await fy.random('firstName', {gender : 'female'})
        obj.last_name = await fy.random('lastName')
        obj.balance = await fy.random('integer', {min: 0, max: 999})
        obj.session_id = await fy.random('sessionId')
        obj.ip = await fy.random('ip')
        obj.float = await fy.random('float')
        
        obj.validate = {}
        obj.validate.ip = await fy.validate('ip', obj.ip)
        obj.validate.email = await fy.validate('email', obj.email)
        obj.validate.phone = await fy.validate('phone', obj.phone)
        obj.validate.float = await fy.validate('float', obj.float)
        obj.validate.country = await fy.validate('country', obj.country)
        obj.validate.city = await fy.validate('city', obj.city, {country: obj.country})

        resp.push(obj)

        i++
    }
    console.log('random users --> ', resp)
    return resp
}

randomItem(2)

```

### All functions

```js
const fy = require('./fy.js')

// Validate return true|false
fy.validate('email', 'foo@bar.com')
fy.validate('phone', '+380671234567') // or +38 (067) 123-45-67
fy.validate('float', '10.01')
fy.validate('ip', '192.168.1.0', {version: 4}) // version 4 or 6
fy.validate('country', 'Ukraine')
fy.validate('city', {value: 'Kiev', country : 'Ukraine'})

// Random
fy.random('word') // random word
fy.random('words', {num: 2, lang: 'en'}) // two random words en|ru|it
fy.random('string', {length: 7, lang: 'en'}) // sdfdghtrh en|ru
fy.random('integer', {min: 0, max: 99999}) // 2345
fy.random('float', {min: 0, max: 99999, fix: 2}) // 153.54
fy.random('email', {domain : 'gmail.com'})
fy.random('password')
fy.random('country')
fy.random('city', {country : fy.random('country')})
fy.random('phone', {locale : 'UA'})
fy.random('currency')
fy.random('firstName', {lang: 'en', gender : 'female'}) // gender:male|female
fy.random('lastName', {lang: 'en'})
fy.random('sessionId')
fy.random('ip') // random ip version: 4
//fy.random('ip', {version: '6'}) // random ip version: 6

// Crypt
//fy.crypt('encrypt', { encrypt: encrypt_string, public_key })
//fy.crypt('decrypt', { decrypt: to_decrypt_string, private_key })

```

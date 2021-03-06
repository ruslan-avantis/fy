# FY:API `Validate` and `Random data` online

What FY allows developers to do is avoid having to program any code or setup any local development environments for creating fake test data.

You can quickly create random data, just install and configure the library and get the data through our API when you need it. It's free.

## :rocket: Simple Usage FY:API

`GET` `https://fy.com.ua/api/v1/validate?request=email&value=foo@bar.com`

The api in the header always returns the code 200
```js
// Real response code in response body
{
    "code": 200,
    "message": "OK",
    "value": "foo@bar.com",
    "function": "email",
    "return": true
}
```

### JavaScript example

Download file from the link [fy.js](./fy.js)

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
const randomItem = async (n, i = 0, resp = []) => {

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

## Why use FY?

You *should* use [fy.js](https://github.com/ruslan-avantis/fy)! We use it everyday. It's a great API!

### All methods

```js
const fy = require('./fy.js')

/** Random
 * 
*/
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
fy.random('uuidv4')
fy.random('ip') // random ip version: 4
fy.random('ip', {version: '6'}) // random ip version: 6

// Validate return true|false
fy.validate('email', 'foo@bar.com')
fy.validate('phone', '+380671234567') // or +38 (067) 123-45-67
fy.validate('float', '10.01')
fy.validate('ip', '192.168.1.0', {version: 4}) // version 4 or 6
fy.validate('country', 'Ukraine')
fy.validate('city', {value: 'Kiev', country : 'Ukraine'})

```

## Developer Support

Are you a developer? Have you tried API [https://fy.com.ua](https://fy.com.ua) yet? 

Please let us know how we can make FY a better developer experience for *YOU*.

### Issues and Feature Requests

You can start a conversation on our public Github Issue Tracker: [https://github.com/ruslan-avantis/fy/issues/new](https://github.com/ruslan-avantis/fy/issues/new)

### Contact Support

If you'd like a more private chat, please email our support staff at: [support@fy.com.ua](support@fy.com.ua)

We look forward to hearing from you!
const fy = require('../fy.js')

/** class User
 * @param {*} $obj
 */
class User {

    constructor(obj = {}) {

        this.obj = {}

        for (let key in obj) {

            Object.defineProperty(this, key, {
                set: (value) => { this.obj[key] = value; },
                get: () => { return this.obj[key]; },
                configurable: true
            })

            this[key] = obj[key]
        }
    }

    save() {
        return this
    }
}
  
const randomCreate = async (n, i = 1, resp = []) => {

    if (i > n) return resp

    let obj = {}
    obj.email = await fy.random('email', {domain : 'gmail.com'}, 'POST', {headers: {'token': 'token'}})
    obj.password = await fy.random('password')
    obj.country = await fy.random('country')
    obj.city = await fy.random('city', {country : obj.country})
    obj.phone = await fy.random('phone', {locale : 'UA'})
    obj.currency = await fy.random('currency')
    obj.name = await fy.random('firstName', {gender : 'female'})
    obj.last_name = await fy.random('lastName')
    obj.balance = await fy.random('integer', {min: 0, max: 999})
    obj.session_id = await fy.random('uuidv4')
    obj.ip = await fy.random('ip')
    obj.float = await fy.random('float')
        
    obj.validate = {}
    obj.validate.ip = await fy.validate('ip', obj.ip)
    obj.validate.email = await fy.validate('email', obj.email)
    obj.validate.phone = await fy.validate('phone', obj.phone)
    obj.validate.country = await fy.validate('country', obj.country)
    obj.validate.city = await fy.validate('city', obj.city, {country: obj.country})
    obj.validate.float = await fy.validate('float', obj.float)

    let user = new User(obj)

    //user.email = '12345@gmail.com'
    user.save()

    resp.push(user.obj)

    i++
    resp = await randomCreate(n, i, resp)
    
    console.log('random users --> ', resp)

    return resp
}

randomCreate(1)
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

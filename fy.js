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
            //baseURL: 'http://localhost:3000/api/v1/',
            headers: {'token': 'demo'}
        }

        Object.assign(this.setings, setings)
        Object.freeze(this.setings)

        this.instance = axios.create(this.setings)
    }

    async execute(type, request = 'ping', params = {}, method = 'POST') {

        if (!type) return null
        let response = {'data': {}}

        try {
            
            const url = `/${type}?request=${request}`

            if (method == 'GET') {

                let query = ''
                if (params) query = '&'+queryString.stringify(params)

                response = await this.instance.get(`${url}${query}`)

            } else response = await this.instance.post(url, params)

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
        if (typeof params === 'string' || typeof params === 'number') {
            params = {'value': params}
            if (typeof method === 'object') {
                params = Object.assign({}, params, method)
                method = 'POST'
            }
        }
        return (new Fy(setings)).execute('validate', request, params, method)
    }

    static random(request, params, method, setings) {
        return (new Fy(setings)).execute('random', request, params, method)
    }

    static generate(request, params, method, setings) {
        return (new Fy(setings)).execute('generate', request, params, method)
    }

    static crypt(request, params, method, setings) {
        return (new Fy(setings)).execute('crypt', request, params, method)
    }
}

module.exports = Fy
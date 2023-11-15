import {parseTcpStringAsHttpRequest} from "../../1.2.2-http-request/src/index.js";

function processHttpRequest ({method, uri, headers = '', body = ''}) {
    const regexp_response_200 = /\/sum\?nums=(,?\d,?)+/gm
    const regexp_response_404 = /^\/sum/gm
    const regexp_response_400 = [/\?nums=/gm, /GET/gm]

    headers['Date'] = new Date().toString()

    const sorted_headers_keys = Object.keys(headers).sort()
    const sorted_headers = sorted_headers_keys.reduce((counter, header_key, index) => {
        counter[header_key] = headers[header_key]
        return counter
    }, {})

    if (method === 'GET' && (createRegexpMatchList(regexp_response_200, uri) !== null)) {
        const sum = uri.match(/\d/gm).map(number => +number).reduce((counter, curr_number) => counter += curr_number, 0)
        const status_message = 'OK'

        return outputHttpResponse('200', status_message, sorted_headers, sum.toString().length)
    }
    if (method === 'GET' && createRegexpMatchList(regexp_response_404, uri) === null) {
        const status_message = 'not found'

        return outputHttpResponse('404', status_message, sorted_headers, status_message.length)
    }
    if (method !== 'GET' || createRegexpMatchList(regexp_response_400, uri) === null) {
        const status_message = 'Bad request'

        return outputHttpResponse('400', status_message, sorted_headers, status_message.length)
    }

    function createRegexpMatchList (regexp, string) {
        return string.match(regexp)
    }
}

function outputHttpResponse(status_code, status_message, headers, body) {
    return `HTTP/1.1 ${status_code} ${status_message}
${Object.keys(headers).map((header, index, array) => `${header}: ${Object.values(headers)[index]}${index < array.length - 1 ? ',\n' : ''}`).join('')}

${body}`
}

const test_0 = {
    method: 'GET',
    uri: '/sum?nums=1,2,3',
    headers: {
        'Host': 'student.shpp.me'
    }
} // 200 OK

const test_1 = {
    method: 'GET',
    uri: '/difference?nums=1,2,3',
    headers: {
        'Host': 'student.shpp.me'
    }
} // 400 'not found'

const test_2 = {
    method: 'POST',
    uri: '/difference?nums=1,2,3',
    headers: {
        'Host': 'student.shpp.me'
    }
} // 400 'Bad Request'

const test_3 = {
    method: 'GET',
    uri: '/sum?letters=1,2,3',
    headers: {
        'Host': 'student.shpp.me',
    }
} // 400 'Bad Request'

const test_string = `POST /src/index HTTP/1.1
key=key&login=login`

console.log(processHttpRequest(test_0))
console.log(processHttpRequest(test_1))
console.log(processHttpRequest(test_2))
console.log(processHttpRequest(test_3))
console.log(parseTcpStringAsHttpRequest(test_string))
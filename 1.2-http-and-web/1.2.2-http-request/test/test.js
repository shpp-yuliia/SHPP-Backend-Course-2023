const test_string_0 = `GET /doc/test.html HTTP/1.1 
Host: www.test101.com 
Accept: image/gif, image/jpeg, */* 
Accept-Language: en-us 
Accept-Encoding: gzip, deflate 
User-Agent: Mozilla/4.0 
Content-Length: 35

bookId=12345&author=Tan+Ah+Teck`

const test_string_1 = `POST /doc/test HTTP/1.1
HOST: shpp.me
Accept: image/gif, image/jpeg, */*
Accept-Language: en-us
Accept-Encoding: gzip, deflate
User-Agent: Mozilla/4.0
Content-Length: 35

bookId=12345&author=Tan+Ah+Teck
`

const test_string_2 = `GET /doc/test.html HTTP/1.1`

function parseTcpStringAsHttpRequest(string) {
    const string_regexp_elements = {
        'method': new RegExp('^[A-Z]{3,}', 'gm'), // possible methods: GET | PUT | DELETE | POST
        'uri': new RegExp('(\\/[A-Za-z]*)+\\.[a-z]+', 'gm'), // possible methods: /docs/tests/statistics.ejs
        'headers': new RegExp('[A-Za-z\\-]+\\:.*', 'gm'), // Content-Length: 35
        'body': new RegExp('.*=.*&.*=.*', 'gm') // bookId=12345&author=Tan+Ah+Teck
    }

    const string_elements = {}

    for (let key of Object.keys(string_regexp_elements)) {

        const elements_regexp = string_regexp_elements[key]

        let matched_string_elements = string.match(elements_regexp)

        if (key === 'headers' && matched_string_elements) {
            matched_string_elements = matched_string_elements
                .map(header => header.split(':'))
                .reduce((counter, header, index, headers) => { counter[header[0]] = header[1]; return counter }, {})
        }

        string_elements[key] = (matched_string_elements && matched_string_elements.length === 1) ? matched_string_elements[0] : matched_string_elements
    }

    const filtered_string_elements = Object.keys(string_elements).reduce((counter, string_elements_keys, index) => {
        if (string_elements[string_elements_keys] !== null) counter[string_elements_keys] = string_elements[string_elements_keys]
        return counter
    }, {})

    return filtered_string_elements
}

console.log(parseTcpStringAsHttpRequest(test_string_0))
console.log(parseTcpStringAsHttpRequest(test_string_1))
console.log(parseTcpStringAsHttpRequest((test_string_2)))

String.prototype.startFromUpperLetter = function () {
    const string_value = this.match().input

    return `${string_value[0].toUpperCase()}${string_value.slice(1,).toLowerCase()}`
}

console.log('HTTP'.startFromUpperLetter())
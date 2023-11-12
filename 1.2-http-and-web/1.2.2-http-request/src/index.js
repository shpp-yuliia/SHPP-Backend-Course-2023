// цей файл потрібно буде дописати...

String.prototype.startFromUpperLetter = function () {
    const string_value = this
        .match()
        .input
        .split('-')
        .map(symbol => `${symbol[0].toUpperCase()}${symbol.slice(1,).toLowerCase()}`)
        .join('-')

    return string_value
}

String.prototype.removeUnnecessarySpaces = function () {
    const string_value_symbols = this
        .match()
        .input
        .split(' ')
        .filter(symbol => symbol !== '')
        .join(' ')

    return string_value_symbols
}

// не звертайте увагу на цю функцію
// вона потрібна для того, щоб коректно зчитувати вхідні данні
function readHttpLikeInput(){
    var fs = require("fs");
    var res = "";
    var buffer = Buffer.alloc ? Buffer.alloc(1) : new Buffer(1);
    let was10 = 0;
    for(;;){
        try { fs.readSync(0 /*stdin fd*/, buffer, 0, 1); } catch (e) {break; /* windows */}
        if(buffer[0] === 10 || buffer[0] === 13) {
            if (was10 > 10)
                break;
            was10++;
        } else
            was10 = 0;
        res += new String(buffer);
    }

    return res;
}

let contents = readHttpLikeInput();

// ось цю функцію, власне, і треба написати
function parseTcpStringAsHttpRequest(string) {

    const string_regexp_elements = {
        'method': new RegExp('(POST|GET|PUT|DELETE)', 'gm'), // possible methods: GET | PUT | DELETE | POST
        'uri': new RegExp('(\\/[A-Za-z]*)+(?=[\\s])', 'gm'), // possible methods: /docs/tests/index.html
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
                .reduce((counter, header) => { counter[header[0].startFromUpperLetter()] = header[1].removeUnnecessarySpaces(); return counter }, {})
        }

        string_elements[key] = (matched_string_elements && matched_string_elements.length >= 1) ? matched_string_elements[0] : matched_string_elements
    }

    const filtered_string_elements = Object.keys(string_elements).reduce((counter, string_elements_keys, index) => {
        if (string_elements[string_elements_keys] !== null) counter[string_elements_keys] = string_elements[string_elements_keys]
        return counter
    }, {})

    return filtered_string_elements
}

http = parseTcpStringAsHttpRequest(contents);
console.log(JSON.stringify(http, undefined, 2));
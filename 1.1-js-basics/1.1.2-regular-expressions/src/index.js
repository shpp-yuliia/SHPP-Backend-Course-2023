function Validator () {
    this.validateEmail = (email) => {
        const test_email_regexp =  new RegExp('^(([a-zA-Z]{1,}([a-zA-Z\\.\\-+]){1,19}))\\@(([a-zA-Z.!$%&’*+\\/=?^_\\-]){1,15})\\.([a-zA-Z]{1,5})$', 'gm')

        return test_email_regexp.test(email)
    }
    this.validatePhoneNumber = (phone_number) => {
        const test_phone_number_regexp =  new RegExp('^[\\s\\-]*(\\s*\\-*\\+?\\d?){2}?[\\s\\-]*\\(?(s*\\-*\\d){3}\\)?[\\s\\-]*(\\s*\\-*\\d){7}$', 'gm')

        const valid_phone_number_length = phone_number.length <= 25

        return (test_phone_number_regexp.test(phone_number) && valid_phone_number_length)
    }
    this.validatePassword = (password) => {
        const test_password_regexp =  new RegExp('.*(?=.*([a-z]{1,}))(?=.*([A-Z]{1,}))(?=.*([0-9]{1,}))[a-zA-Z\\d\\_]{5,}', 'gm')

        return test_password_regexp.test(password)
    }
}

const valid_emails_list = ['fi@secondpart.end', 'first-part@.se=cond%p.art.end', 'first.part@se=cond%part.r']
const valid_phone_numbers_list = ['+38 (099) 567 8901', '+38 099 5 6 7 8 9  01', '(09-9) 567-890-1', '--  (099) 567 890-1']
const valid_passwords_list = ['C00l_Pass', 'SupperPas1']

const invalid_emails_list = ['f@secondart.end,', 'first-part@.se=cond@part.end', '-firstpart@.se=cond%.enddeded', 'firs_tpart@.se.en', 'firstpart@.se.enddeded']
const invalid_phone_numbers_list = ["+38 (099) 567 8901 0", "+38 099 a0000000", "+38 (0989) 567 8901", "+48 (0989) 567 8901"]
const invalid_passwords_list = ['Cool_pass', 'C00L']

valid_emails_list.forEach(email => {
    const { validateEmail } = new Validator()

    console.log(validateEmail(email))
})

valid_phone_numbers_list.forEach(phone_number => {
    const { validatePhoneNumber } = new Validator()

    console.log(validatePhoneNumber(phone_number))
})

valid_passwords_list.forEach(password => {
    const { validatePassword } = new Validator()

    console.log(validatePassword(password))
})

invalid_emails_list.forEach(email => {
    const { validateEmail } = new Validator()

    console.log(validateEmail(email))
})

invalid_phone_numbers_list.forEach(phone_number => {
    const { validatePhoneNumber } = new Validator()

    console.log(validatePhoneNumber(phone_number))
})

invalid_passwords_list.forEach(password => {
    const { validatePassword } = new Validator()

    console.log(validatePassword(password))
})
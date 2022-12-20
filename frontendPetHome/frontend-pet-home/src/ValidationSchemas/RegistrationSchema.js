import * as yup from "yup";

const phoneRegExp = /^\+380\d{3}\d{2}\d{2}\d{2}$/
const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/

export const RegistrationSchema = yup.object().shape({
    surname: yup.string().required().min(2),
    name: yup.string().required().min(2),
    email: yup.string().email().required(),
    phone: yup.string().matches(phoneRegExp, 'Phone number is not valid').min(10).max(13),
    username: yup.string().required().min(5),
    password: yup.string().required().min(8).matches(passwordRegExp, "Password have to contain at least 1 upper case, 1 lower case, 8 symbols, 1 special symbol."),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
});

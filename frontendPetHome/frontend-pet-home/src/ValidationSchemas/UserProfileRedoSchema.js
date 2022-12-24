import * as yup from "yup";

const phoneRegExp = /^(\+38\d{10}|\d{10})$/

export const UserProfileRedoSchema = yup.object().shape({
    surname: yup.string().required().min(2),
    name: yup.string().required().min(2),
    email: yup.string().email().required(),
    PhoneNumber: yup.string().matches(phoneRegExp, 'Phone number is not valid').min(10).max(13),
});

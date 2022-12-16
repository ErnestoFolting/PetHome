import * as yup from "yup";

const phoneRegExp = /^\+380\d{3}\d{2}\d{2}\d{2}$/

export const UserProfileRedoSchema = yup.object().shape({
    surname: yup.string().required().min(2),
    name: yup.string().required().min(2),
    email: yup.string().email().required(),
    phone: yup.string().matches(phoneRegExp, 'Phone number is not valid').min(10).max(13),
});

import * as yup from "yup";

export const RegistrationSchema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
});

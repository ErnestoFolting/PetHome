import * as yup from "yup";

export const CreateAdvertSchema = yup.object().shape({
    name: yup.string().required().min(5),
    description: yup.string().required().min(10).max(500),
    cost: yup.number().positive().required().max(100000),
});

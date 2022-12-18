import * as yup from "yup";

export const AdvertsFilterSchema = yup.object().shape({
    costFrom: yup.number()
        .typeError()
        .positive()
        .max(99999)
        .integer(),
    costTo: yup.number()
        .typeError()
        .positive()
        .max(100000)
        .integer()
        .moreThan(yup.ref('costFrom'))
});

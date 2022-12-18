import * as yup from "yup";

export const AdvertsFilterSchema = yup.object().shape({
    costFrom: yup.lazy((value) =>
        value === ''
            ? yup.string()
            : yup.number()
                .typeError()
                .positive()
                .max(99999)
                .integer()),
    costTo: yup.lazy((value) =>
        value === ''
            ? yup.string()
            : yup.number()
                .typeError()
                .positive()
                .max(100000)
                .integer()
                .moreThan(yup.ref('costFrom')))
});

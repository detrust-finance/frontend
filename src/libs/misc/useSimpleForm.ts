import { useState } from 'react';

export const useSimpleForm = (initialValues : any) => {
  const [formValues, setFormValues] = useState(initialValues);

  return [
    formValues,
    (newData : any) => {
      setFormValues((data : any) => {
        return {...data, ...newData};
      });
    },
  ];
};

// This is a replacement of useForm from package react-hooks-helper.
// (See https://github.com/revelcw/react-hooks-helper/blob/develop/src/useForm.js)
// DataPicker's selected prop does not accept string value, use this
// function to prevent the Date value from being converted to string.
export const useSimpleForm2 = (initialValues : any) => {
  const [formValues, setFormValues] = useState(initialValues);

  return [
    formValues,
    ({ target }: { target: any }) => {
      const {
        name, value, checked, type,
      } = target;
      const isCheckbox = type === 'checkbox';

      setFormValues((data: any) => {
        const dataClone = {...data}
        dataClone[name] = isCheckbox ? checked : value;
        return dataClone;
      });
    },
  ];
};

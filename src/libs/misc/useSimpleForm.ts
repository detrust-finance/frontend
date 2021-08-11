import { useState } from 'react';

const useSimpleForm = (initialValues : any) => {
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

export { useSimpleForm };

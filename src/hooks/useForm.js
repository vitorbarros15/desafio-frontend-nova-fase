import { useState } from "react";

export default function useForm(initialValues) {
  const [formData, setFormData] = useState(initialValues);
  const [data, setData] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChangeEvent = (e) => {
    let name = "";
    let value = "";
    console.log("E", e);
    if (e.target && e.target.value !== undefined) {
      name = e.target.name;
      value = e.target.value;
    } else if (typeof e === "object" && e.name && e.value !== undefined) {
      name = e.name;
      value = e.value;
    } else {
      console.error("Argumento 'e' não é um evento ou um objeto de input válido");
      return;
    }
    console.log("name, value", name, value);

    setData({
      ...data,
      [name]: value
    });

    const updatedFormData = {
      ...formData,
      [name]: {
        ...formData[name],
        value
      }
    };

    if (typeof formData[name] === "object") {
      if (name === "tipoReuniaoId" && formData.tipoReuniaoId !== value) {
        updatedFormData.camposAtaReuniao = [];
      }
      setFormData(updatedFormData);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: false
      }));
    } else {
      setFormData(updatedFormData);
    }
    console.log("Datos", formData);
    console.log("Data", data);
  };

  const handleChangeAtaReuniao = (input) => {
    const { campoId, value } = input;
    const valueForData = { campoId, valor: value };
    const inputExist = formData.camposAtaReuniao.find((campo) => campo.campoId === campoId);
    console.log("inputExist", inputExist);

    if (inputExist) {
      const inputNew = formData.camposAtaReuniao.map((campo) => {
        if (campo.campoId === campoId) {
          return { ...campo, value };
        }
        return campo;
      });
      setData({
        ...data,
        camposAtaReuniao: inputNew
      });

      setFormData({ ...formData, camposAtaReuniao: });
    } else {
      const inputNew = { campoId, value };
      setFormData({ ...formData, camposAtaReuniao: [...formData.camposAtaReuniao, inputNew] });
      setData({
        ...data,
        camposAtaReuniao: [...formData.camposAtaReuniao, valueForData]
      });
    }
    console.log("Data", data);
  };

  const validateForm = () => {
    const newErrors = {};

    Object.keys(formData).forEach((field) => {
      if (formData[field].required && !String(formData[field].value).trim()) {
        newErrors[field] = true;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    formData,
    setFormData,
    handleChangeEvent,
    handleChangeAtaReuniao,
    validateForm,
    errors,
    data
  };
}

import { useState } from "react";

export default function useForm(initialValues) {
  const [formData, setFormData] = useState(initialValues);
  const [data, setData] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChangeEvent = (e) => {
    let name = "";
    let value = "";
    console.log("e", e);
    if (e instanceof Event) {
      name = e.target.name;
      value = e.target.value;
    } else if (typeof e === "object" && e.name && e.value) {
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
      if (name === "tipoReuniaoname" && formData.tipoReuniaoname !== value) {
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
  };

  const handleChangeAtaReuniao = (input) => {
    const { campoId, value } = input;
    const inputExist = formData.camposAtaReuniao.find((campo) => campo.campoId === campoId);

    if (inputExist) {
      const inputNew = formData.camposAtaReuniao.map((campo) => {
        if (campo.campoId === campoId) {
          return { ...campo, value };
        }
        return campo;
      });
      setFormData({ ...formData, camposAtaReuniao: inputNew });
    } else {
      const inputNew = { campoId, value };
      setFormData({ ...formData, camposAtaReuniao: [...formData.camposAtaReuniao, inputNew] });
    }
  };

  const valnameateForm = () => {
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
    valnameateForm,
    errors,
    data
  };
}

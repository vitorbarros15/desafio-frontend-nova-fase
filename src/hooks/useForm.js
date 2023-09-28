import { useState } from "react";

export default function useForm(initialValues) {
  const [formData, setFormData] = useState(initialValues);
  const [data, setData] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChangeEvent = (e) => {
    let name = "";
    let value = "";

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
  };

  const handleChangeAtaReuniao = async (input) => {
    const { campoId, valor } = input;

    const inputExist = formData.camposAtaReuniao.find((campo) => campo.campoId === campoId);

    if (inputExist) {
      const inputNew = formData.camposAtaReuniao.map((campo) => {
        if (campo.campoId === campoId) {
          return { ...campo, valor };
        }
        return campo;
      });

      setFormData({ ...formData, camposAtaReuniao: inputNew });
      setData({ ...data, camposAtaReuniao: inputNew });
    } else {
      const inputNew = { campoId, valor };
      setFormData({ ...formData, camposAtaReuniao: [...formData.camposAtaReuniao, inputNew] });

      setData({
        ...data,
        camposAtaReuniao: [data.camposAtaReuniao, inputNew]
      });
    }
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

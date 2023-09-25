import { useState } from "react";

export default function useForm(initialValues) {
  const [formData, setFormData] = useState(initialValues);
  const [data, setData] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChangeEvent = (input) => {
    const { nome, valor } = input;

    setData({
      ...data,
      [nome]: valor
    });

    const updatedFormData = {
      ...formData,
      [nome]: {
        ...formData[nome],
        valor
      }
    };

    if (typeof formData[nome] === "object") {
      if (nome === "tipoReuniaoId" && formData.tipoReuniaoId !== valor) {
        updatedFormData.camposAtaReuniao = [];
      }
      setFormData(updatedFormData);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [nome]: false
      }));
    } else {
      setFormData(updatedFormData);
    }
  };

  const handleChangeAtaReuniao = (input) => {
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
    } else {
      const inputNew = { campoId, valor };
      setFormData({ ...formData, camposAtaReuniao: [...formData.camposAtaReuniao, inputNew] });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    Object.keys(formData).forEach((field) => {
      if (formData[field].required && !String(formData[field].valor).trim()) {
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

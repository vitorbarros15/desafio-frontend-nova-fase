export default function useDate(dateTime) {
  const data = new Date(dateTime);

  const yaer = data.getFullYear(); // Obtém o ano (exemplo: 2023)
  const month = (data.getMonth() + 1).toString().padStart(2, "0");
  const day = data.getDate().toString().padStart(2, "0");
  const hour = data.getHours().toString().padStart(2, "0");
  const minute = data.getMinutes().toString().padStart(2, "0");
  const second = data.getSeconds().toString().padStart(2, "0");
  const millisecond = data.getMilliseconds().toString().padStart(3, "0");

  const dataFormated = `${yaer}-${month}-${day}T${hour}:${minute}:${second}.${millisecond}Z`;
  return dataFormated;
}

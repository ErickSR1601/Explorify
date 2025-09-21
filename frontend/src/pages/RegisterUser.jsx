import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/Api";
import CustomUserForm from "../components/CustomUserForm";

export default function RegisterUser() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const payload = { ...formData, role: "Editor" };
      await API.post("/users/register", payload);
      setMessage("Usuario registrado exitosamente.");
      navigate("/login");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Error al registrar usuario."
      );
    }
  };

  return (
    <CustomUserForm
      title="Registro de Usuario"
      fields={[
        {
          type: "text",
          name: "name",
          placeholder: "Nombre",
          value: formData.name,
          onChange: handleChange,
          required: true,
        },
        {
          type: "email",
          name: "email",
          placeholder: "Correo electrónico",
          value: formData.email,
          onChange: handleChange,
          required: true,
        },
        {
          type: "password",
          name: "password",
          placeholder: "Contraseña",
          value: formData.password,
          onChange: handleChange,
          required: true,
        },
      ]}
      onSubmit={handleSubmit}
      buttonText="Registrarse"
      message={message}
      linkText="¿Ya tienes cuenta?"
      linkHref="/login"
    />
  );
}

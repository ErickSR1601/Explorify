import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/Api";
import CustomUserForm from "../components/CustomUserForm";

export default function LoginUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const { data } = await API.post("/users/login", { email, password });
      sessionStorage.setItem("userInfo", JSON.stringify(data));
      setMessage("Login exitoso.");

      navigate("/");
    } catch (error) {
      setMessage(error.response?.data?.message || "Error al iniciar sesión.");
    }
  };

  return (
    <CustomUserForm
      title="Iniciar Sesión"
      fields={[
        {
          type: "email",
          name: "email",
          placeholder: "Correo electrónico",
          value: email,
          onChange: (e) => setEmail(e.target.value),
          required: true,
        },
        {
          type: "password",
          name: "password",
          placeholder: "Contraseña",
          value: password,
          onChange: (e) => setPassword(e.target.value),
          required: true,
        },
      ]}
      onSubmit={handleSubmit}
      buttonText="Ingresar"
      message={message}
      linkText="¿No tienes cuenta?"
      linkHref="/users/new"
    />
  );
}

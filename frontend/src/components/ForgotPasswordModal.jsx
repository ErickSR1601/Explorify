import { useState } from "react";
import API from "../api/Api";
import "../styles/components/ForgotPasswordModal.css";

export default function ForgotPasswordModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const { data } = await API.put("/users/forgot-password", {
        email,
        newPassword,
      });
      setMessage(data.message);
      setEmail("");
      setNewPassword("");

      // Opcional: cerrar después de 2 segundos
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Error al restablecer contraseña"
      );
    }
  };

  return (
    <div className="fp-overlay">
      <div className="fp-modal">
        <h3>Restablecer contraseña</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
          />
          <input
            type="password"
            placeholder="Nueva contraseña"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="form-input"
          />
          <button type="submit" className="form-button">
            Restablecer
          </button>
          <button
            type="button"
            className="form-button cancel-button"
            onClick={onClose}
          >
            Cancelar
          </button>
        </form>
        {message && <p className="form-message">{message}</p>}
      </div>
    </div>
  );
}

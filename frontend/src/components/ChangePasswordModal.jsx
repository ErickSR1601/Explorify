import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/Api";
import "../styles/components/ChangePasswordModal.css";

export default function ChangePasswordModal({ isOpen, onClose }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Las contraseñas nuevas no coinciden.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const { data } = await API.put("/users/change-password", {
        currentPassword,
        newPassword,
      });

      setMessage(data.message || "Contraseña actualizada correctamente.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      sessionStorage.removeItem("userInfo");
      navigate("/login");
    } catch (err) {
      setMessage(
        err.response?.data?.message ||
          err.message ||
          "Error al actualizar la contraseña."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Cambiar contraseña</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={currentPassword}
            placeholder="Contraseña actual"
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />

          <input
            type="password"
            value={newPassword}
            placeholder="Nueva contraseña"
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <input
            type="password"
            value={confirmPassword}
            placeholder="Confirmar nueva contraseña"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {message && <p className="modal-message">{message}</p>}

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-confirm" disabled={loading}>
              {loading ? "Guardando..." : "Cambiar contraseña"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

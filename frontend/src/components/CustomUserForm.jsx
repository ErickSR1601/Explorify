import "../styles/components/CustomUserForm.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ForgotPasswordModal from "./ForgotPasswordModal";

export default function CustomUserForm({
  title,
  fields,
  onSubmit,
  buttonText,
  message,
  linkText,
  linkHref,
}) {
  const navigate = useNavigate();
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  return (
    <div className="form-container">
      <div className="form-card">
        <h2 className="form-title">{title}</h2>
        <form onSubmit={onSubmit}>
          {fields.map((field) => (
            <input
              key={field.name}
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={field.value}
              onChange={field.onChange}
              className="form-input"
              required={field.required}
            />
          ))}
          <button type="submit" className="form-button">
            {buttonText}
          </button>
        </form>

        {message && <p className="form-message">{message}</p>}

        <div className="form-links">
          {linkText && (
            <span>
              {linkText}{" "}
              <a href={linkHref} className="form-link">
                {buttonText === "Registrarse" ? "Inicia sesión" : "Regístrate"}
              </a>
            </span>
          )}

          {buttonText === "Ingresar" && (
            <a
              onClick={() => setShowForgotPassword(true)}
              className="form-link forgot-link"
            >
              Olvidé mi contraseña
            </a>
          )}
        </div>
      </div>

      {/* Render del modal */}
      {showForgotPassword && (
        <ForgotPasswordModal onClose={() => setShowForgotPassword(false)} />
      )}
    </div>
  );
}

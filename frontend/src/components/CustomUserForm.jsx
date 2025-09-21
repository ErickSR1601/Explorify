import "../styles/components/CustomUserForm.css";

export default function CustomForm({
  title,
  fields,
  onSubmit,
  buttonText,
  message,
  linkText,
  linkHref,
}) {
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

        {linkText && (
          <p className="form-text">
            {linkText}{" "}
            <a href={linkHref} className="form-link">
              {buttonText === "Registrarse" ? "Inicia sesión" : "Regístrate"}
            </a>
          </p>
        )}
      </div>
    </div>
  );
}

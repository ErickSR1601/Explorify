import mongoose from "mongoose";

// User schema definition
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre es obligatorio"],
    },
    email: {
      type: String,
      required: [true, "El email es obligatorio"],
      unique: true,
      match: [/\S+@\S+\.\S+/, "Formato de email inválido"],
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
    },
    role: {
      type: String,
      enum: ["Admin", "Editor", "Viewer"],
      default: "Editor",
    },
    achievements: [
      {
        name: { type: String, required: true },
        emoji: { type: String },
        description: { type: String },
        earned: { type: Boolean, default: false },
        date: { type: Date },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;

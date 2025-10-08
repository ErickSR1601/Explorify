import express from "express";
import { 
  createArticle, 
  updateArticle, 
  deleteArticle, 
  getArticles,
  searchArticles
} from "../controllers/articleController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public route
router.get("/", getArticles);
router.post ("/search", searchArticles);

// Private routes
router.post("/", protect, createArticle); 
router.put("/:id", protect, updateArticle); 
router.delete("/:id", protect, deleteArticle); 

export default router;

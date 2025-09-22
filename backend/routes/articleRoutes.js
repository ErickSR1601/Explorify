import express from "express";
import { 
  createArticle, 
  updateArticle, 
  deleteArticle, 
  getArticles 
} from "../controllers/articleController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public route
router.get("/", getArticles);

// Private routes
router.post("/", protect, createArticle); 
router.put("/:id", protect, updateArticle); 
router.delete("/:id", protect, deleteArticle); 

export default router;

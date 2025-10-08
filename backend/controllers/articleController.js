import Article from "../models/Article.js";

import sanitizeHtml from "sanitize-html";

/**
 * @desc    Create a new article
 * @route   POST /api/articles
 * @access  Private (only authenticated users)
 */
export const createArticle = async (req, res) => {
  const { title, content } = req.body;

  try {
    const cleanContent = sanitizeHtml(content, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        img: ["src", "alt"],
        a: ["href", "target"],
      },
    });

    const article = new Article({
      title,
      content: cleanContent,
      author: req.user.id,
    });

    const savedArticle = await article.save();
    res.status(201).json(savedArticle);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear el artículo: " + error.message });
  }
};

/**
 * @desc    Edit an article
 * @route   PUT /api/articles/:id
 * @access  Private (only the author can edit)
 */
export const updateArticle = async (req, res) => {
  const { id } = req.params;

  try {
    const article = await Article.findById(id);

    if (!article)
      return res.status(404).json({ message: "Artículo no encontrado" });

    if (article.author.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "No tienes permiso para editar este artículo" });
    }

    // Update fields
    article.title = req.body.title || article.title;
    article.content = req.body.content || article.content;

    const updatedArticle = await article.save();
    res.json(updatedArticle);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar el artículo: " + error.message });
  }
};

/**
 * @desc    Delete an article
 * @route   DELETE /api/articles/:id
 * @access  Private (only the author can delete)
 */
export const deleteArticle = async (req, res) => {
  const { id } = req.params;

  try {
    const article = await Article.findById(id);

    if (!article)
      return res.status(404).json({ message: "Artículo no encontrado" });

    if (article.author.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "No tienes permiso para eliminar este artículo" });
    }

    // Delete the article
    await article.deleteOne();
    res.json({ message: "Artículo eliminado correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar el artículo: " + error.message });
  }
};

/**
 * @desc    Obtain all articles
 * @route   GET /api/articles
 * @access  Public
 */
export const getArticles = async (req, res) => {
  try {
    const articles = await Article.find()
      .select("title content createdAt")
      .populate("author", "name")
      .sort({ createdAt: -1 });

    res.json(articles);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los artículos: " + error.message });
  }
};

// @desc    Search articles by title
// @route   GET /api/articles/search
// @access  Public
export const searchArticles = async (req, res) => {
  try {
    const { title } = req.body;

    // Avoid errors if the title is missing and remove spaces at the beginning/end and accents.
    const normalizedTitle = title
      ? title
          .trim()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
      : "";

    const query = normalizedTitle
      ? { title: { $regex: normalizedTitle, $options: "i" } }
      : {};

    const articles = await Article.find(query).sort({ createdAt: -1 });
    res.json(articles);
  } catch (error) {
    console.error("Error al buscar el artículo:", error);
    res.status(500).json({ message: "Hubo un problema al buscar el artículo" });
  }
};

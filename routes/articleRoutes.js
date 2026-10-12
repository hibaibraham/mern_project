const express = require('express');
const router = express.Router();
const articleController = require('../controller/articleController');


// GET /api/articles - Tous les articles (avec filtrage optionnel ?author=...)
router.get('/', articleController.getAllArticles);

// GET /api/articles/:id - Un article par son ID
router.get('/:id', articleController.getArticleById);

// POST /api/articles - Créer un nouvel article
router.post('/', articleController.createArticle);

// PUT /api/articles/:id - Mettre à jour un article
router.put('/:id', articleController.updateArticle);

// DELETE /api/articles/:id - Supprimer un article
router.delete('/:id', articleController.deleteArticle);

module.exports = router;

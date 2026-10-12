const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// GET /api/users - Tous les utilisateurs
router.get('/', userController.getUsers);

// GET /api/users/:id - Un utilisateur par son ID
router.get('/:id', userController.getUserById);

// POST /api/users - Créer un nouvel utilisateur
router.post('/', userController.createUser);

// DELETE /api/users/:id - Supprimer un utilisateur
router.delete('/:id', userController.deleteUser);

module.exports = router;
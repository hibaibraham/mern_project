const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const articleRoutes = require('./routes/articleRoutes');

const app = express();

// Chargement des variables d'environnement (.env)
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Connexion asynchrone à MongoDB Atlas puis démarrage de l'écoute
(async () => {
  try {
    // 1. Établissement de la connexion distante
    await connectDB(process.env.MONGODB_URI);

    // 2. Démarrage de l'écoute du serveur HTTP
    app.listen(PORT, () => {
      console.log(`Serveur MERN en écoute sur http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Erreur critique de démarrage du serveur :', err.message);
    process.exit(1);
  }
})();

// Route principale
app.get('/', (req, res) => {
  res.json({ message: "Bonjour, je suis l'API du blog" });
});

// Montage des routeurs (AVANT les routes locales)
app.use('/api/users', userRoutes);
app.use('/api/articles', articleRoutes);

// GET /about - Informations sur l'application
app.get('/about', (req, res) => {
  res.json({
    nom: "API Blog MERN",
    auteur: "hiba",  
    version: "1.0.0"
  });
});

// POST /contact - Formulaire de contact
app.post('/contact', (req, res) => {
  const { email, message } = req.body;
  
  if (!email || !message) {
    return res.status(400).json({ 
      error: "L'email et le message sont obligatoires" 
    });
  }
  
  res.status(200).json({ 
    message: "Merci, votre message a bien été reçu" 
  });
});

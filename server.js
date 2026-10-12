const userRoutes = require('./routes/userRoutes');  // Importer le routeur users
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const app = express();                // 2. créer l'application : c'est notre serveur

// Chargement des variables d'environnement (.env)
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(express.json());   // lit le corps JSON et le range dans req.body

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

// 3. une route : quand un client demande GET /, Express exécute cette fonction
app.get('/', (req, res) => {
  res.json({ message: "Bonjour, je suis l'API du blog" });
});
let articles = [
  { id: 1, title: 'Bienvenue sur le blog', author: 'Admin' },
  { id: 2, title: 'Mon premier serveur Express', author: 'Aya' },
  { id: 3, title: 'Tester une API avec Postman', author: 'Aya' }
];

// GET /api/articles?author=Aya -> seulement ceux d'Aya
app.get('/api/articles', (req, res) => {
  const { author } = req.query;   // = const author = req.query.author;

  let resultat = articles;
  if (author) {                   // si le client a précisé ?author=...
    resultat = articles.filter(a => a.author === author);
  }
  res.json({ total: resultat.length, articles: resultat });
});



app.get('/api/articles/:id', (req, res) => {
  const id = Number(req.params.id);
  const article = articles.find(a => a.id === id);  

  if (!article) {
    return res.status(404).json({ error: 'Article ${id} non trouvé' });
  }

  res.json({ article });
});


let prochainId = 4;
app.post ('/api/articles', (req,res) => {
const {title , author } = req.body ; // dé structuration (é tape 5)
if (!title || ! author ){ // validation : les deux champs sont obligatoires
return res.status (400).json ({ error : "Le titre et l'auteur sont obligatoires " }) ;
}
const nouvelArticle = { id: prochainId , title : title , author : author };
prochainId = prochainId + 1;
articles.push( nouvelArticle ) ;
res.status (201).json ({ message : 'Article créé', article : nouvelArticle }) ;
}) ;

// PUT /api/articles/:id - Modifier un article
app.put('/api/articles/:id', (req, res) => {
  const id = Number(req.params.id);
  const { title, author } = req.body;
  
  const index = articles.findIndex(a => a.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: `Article ${id} introuvable` });
  }
  
  if (title) articles[index].title = title;
  if (author) articles[index].author = author;
  
  res.status(200).json({ message: 'Article mis à jour', article: articles[index] });
});

// DELETE /api/articles/:id - Supprimer un article
app.delete('/api/articles/:id', (req, res) => {
  const id = Number(req.params.id);
  
  const articleExiste = articles.some(a => a.id === id);
  
  if (!articleExiste) {
    return res.status(404).json({ 
      error: `Impossible de supprimer : article ${id} introuvable` 
    });
  }
  
  articles = articles.filter(a => a.id !== id);
  
  res.status(200).json({ message: `Article ${id} supprimé avec succès` });
});




// Montage du routeur users sur le préfixe '/api/users'
app.use('/api/users', userRoutes);




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


// 4. démarrer le serveur : il attend les requêtes sur le port 3000
app.listen(PORT, () => {
  console.log(`Serveur disponible sur http://localhost:${PORT}`);
});

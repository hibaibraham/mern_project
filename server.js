const express = require('express');   // 1. charger la bibliothèque Express

const app = express();                // 2. créer l'application : c'est notre serveur
const PORT = 3000;


app.use(express.json());   // lit le corps JSON et le range dans req.body

// 3. une route : quand un client demande GET /, Express exécute cette fonction
app.get('/', (req, res) => {
  res.json({ message: "Bonjour, je suis l'API du blog" });
});
const articles = [
  { id: 1, title: 'Bienvenue sur le blog', author: 'Admin' },
  { id: 2, title: 'Mon premier serveur Express', author: 'Aya' },
  { id: 3, title: 'Tester une API avec Postman', author: 'Aya' }
];

// GET /api/articles?author=Aya 
app.get('/api/articles', (req, res) => {
  const { author } = req.query;   // = const author = req.query.author;

  let resultat = articles;
  if (author) {                   // si le client a précisé ?author=...
    resultat = articles.filter(a => a.author === author);
  }
  res.json({ total: resultat.length, articles: resultat });
});

// GET /api/articles            -> tous les articles
// GET /api/articles?author=Aya -> seulement ceux d'Aya
app.get('/api/articles', (req, res) => {
  res.json({ total: articles.length, articles: articles });
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


// EXERCICE 1 : Routes supplémentaires

// 1. GET /about - Informations sur l'application
app.get('/about', (req, res) => {
  res.json({
    nom: "API Blog MERN",
    auteur: "hiba",  
    version: "1.0.0"
  });
});

// 2. GET /api/users - Liste des utilisateurs
const users = [
  { id: 1, name: 'Aya', email: 'aya@example.com' },
  { id: 2, name: 'Ali', email: 'ali@example.com' },
  { id: 3, name: 'Sara', email: 'sara@example.com' }
];

app.get('/api/users', (req, res) => {
  const { name } = req.query;
  
  let resultat = users;
  if (name) {
    resultat = users.filter(u => u.name === name);
  }
  
  res.json({ total: resultat.length, users: resultat });
});

// 3. GET /api/users/:id - Un utilisateur par son ID
app.get('/api/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(u => u.id === id);
  
  if (!user) {
    return res.status(404).json({ error: `Utilisateur ${id} introuvable` });
  }
  
  res.json(user);
});

// 4. POST /contact - Formulaire de contact
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

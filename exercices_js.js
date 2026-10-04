// Exercice 2 

const produits = [
  { nom: 'Clavier', prix: 45 },
  { nom: 'Écran', prix: 320 },
  { nom: 'Souris', prix: 25 }
];

// 1. Déstructuration : extraire nom et prix du premier produit
const { nom, prix } = produits[0];
console.log(nom, prix);

// 2. Find : trouver le produit 'Souris' et afficher son prix
const souris = produits.find(p => p.nom === 'Souris');
console.log(souris.prix);

// 3. Filter : produits dont le prix < 100
const petitsPrix = produits.filter(p => p.prix < 100);
console.log(petitsPrix);

// 4. Fonction fléchée : remise de 10%
const avecRemise = (prixInitial) => prixInitial * 0.9;
console.log(avecRemise(320));

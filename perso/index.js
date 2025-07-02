const express = require('express');
const app = express();
const port = 3000;

// Pour lire le body JSON dans les requêtes POST et PUT
app.use(express.json());

// Données fictives (dans un vrai cas, ce serait une base de données)
let utilisateurs = [
  { id: 1, nom: 'Alice' },
  { id: 2, nom: 'Bob' }
];

// GET /users → liste des utilisateurs
app.get('/users', (req, res) => {
  res.json(utilisateurs);
});

// GET /users/:id → un seul utilisateur
app.get('/users/:id', (req, res) => {
  const user = utilisateurs.find(u => u.id === parseInt(req.params.id));
  user ? res.json(user) : res.status(404).json({ message: 'Utilisateur non trouvé' });
});

// POST /users → ajouter un utilisateur
app.post('/users', (req, res) => {
  const { nom } = req.body;
  const newUser = { id: Date.now(), nom };
  utilisateurs.push(newUser);
  res.status(201).json(newUser);
});

// PUT /users/:id → modifier un utilisateur
app.put('/users/:id', (req, res) => {
  const { nom } = req.body;
  const user = utilisateurs.find(u => u.id === parseInt(req.params.id));
  if (user) {
    user.nom = nom;
    res.json(user);
  } else {
    res.status(404).json({ message: 'Utilisateur non trouvé' });
  }
});

// DELETE /users/:id → supprimer un utilisateur
app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = utilisateurs.findIndex(u => u.id === id);
  if (index !== -1) {
    utilisateurs.splice(index, 1);
    res.json({ message: 'Utilisateur supprimé' });
  } else {
    res.status(404).json({ message: 'Utilisateur non trouvé' });
  }
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur Express démarré sur http://localhost:${port}`);
});

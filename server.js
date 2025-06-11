const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// data in pet store
let pets = [
  { id: 1, name: "Leo", category: "dog", status: "available" },
  { id: 2, name: "Howie", category: "dog", status: "available" },
  { id: 3, name: "Butters", category: "cat", status: "available" },
  { id: 4, name: "Kwazi", category: "cat", status: "sold" },
  { id: 5, name: "Hunt", category: "turtle", status: "sold" }
];

const getNextId = () => {
  return pets.length > 0 ? Math.max(...pets.map(p => p.id)) + 1 : 1;
};

app.get('/api/pets', (req, res) => {
  res.json(pets);
});

app.get('/api/pets/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const pet = pets.find(p => p.id === id);
  
  if (!pet) {
    return res.status(404).json({ error: 'Pet not found' });
  }
  
  res.json(pet);
});

app.post('/api/pets', (req, res) => {
  const { name, category, status = 'available' } = req.body;
  
  if (!name || !category) {
    return res.status(400).json({ error: 'Name and category are required' });
  }
  
  const newPet = {
    id: getNextId(),
    name,
    category,
    status
  };
  
  pets.push(newPet);
  res.status(201).json(newPet);
});

app.put('/api/pets/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const petIndex = pets.findIndex(p => p.id === id);
  
  if (petIndex === -1) {
    return res.status(404).json({ error: 'Pet not found' });
  }
  
  const { name, category, status } = req.body;
  
  if (name) pets[petIndex].name = name;
  if (category) pets[petIndex].category = category;
  if (status) pets[petIndex].status = status;
  
  res.json(pets[petIndex]);
});

app.delete('/api/pets/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const petIndex = pets.findIndex(p => p.id === id);
  
  if (petIndex === -1) {
    return res.status(404).json({ error: 'Pet not found' });
  }
  
  const deletedPet = pets.splice(petIndex, 1)[0];
  res.json({ message: 'Pet deleted', pet: deletedPet });
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.get('/', (req, res) => {
  res.json({
    message: 'Pet Store API',
    endpoints: [
      'GET /api/pets - Get all pets',
      'GET /api/pets/:id - Get pet by ID',
      'POST /api/pets - Create new pet',
      'PUT /api/pets/:id - Update pet',
      'DELETE /api/pets/:id - Delete pet'
    ]
  });
});

app.listen(PORT, () => {
  console.log(`Pet Store API running on http://localhost:${PORT}`);
});

module.exports = app;
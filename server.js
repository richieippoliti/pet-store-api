const express = require('express');
const app = express();
const PORT = 3000;

// Static data
let pets = [
  { id: 1, name: "Leo", category: "dog", status: "available" },
  { id: 2, name: "Howie", category: "dog", status: "available" },
  { id: 3, name: "Butters", category: "cat", status: "available" },
  { id: 4, name: "Kwazi", category: "cat", status: "sold" },
  { id: 5, name: "Hunt", category: "turtle", status: "sold" }
];

// Single endpoint - get all pets
app.get('/pets', (req, res) => {
  res.json(pets);
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});

module.exports = app;
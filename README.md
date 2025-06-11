Pet Store API
Simple REST API for managing pets. Built with Node.js and Express.
How to Run

Install Node.js
Clone this repo
Run:
npm install
npm start

API runs at http://localhost:3000

Test It
bash# See all pets
curl http://localhost:3000/api/pets

# Adding a pet
curl -X POST http://localhost:3000/api/pets \
  -H "Content-Type: application/json" \
  -d '{"name":"Fluffy","category":"cat"}'

# Get one pet
curl http://localhost:3000/api/pets/1
Endpoints

GET /api/pets - List pets
POST /api/pets - Add pet
GET /api/pets/:id - Get pet
PUT /api/pets/:id - Update pet
DELETE /api/pets/:id - Delete pet

Data resets when server restarts (uses memory, not database).
const express = require('express')
const app = express();
const PORT = process.env.PORT || 8080

const frase = "Hola a todos"
const palabras = frase.split(" ") // [Hola, a, todos]

// api/palabras/0
//{ nueva: Adios }

// { buscada: Hola }
app.use(express.json())

const movies = [
  { id: 1, name: 'Joker' }, 
  { id: 2, name: 'Good Fellas' },
  { id: 3, name: 'Matrix' }
];

// GET /movies
app.get("/api/movies", (req, res) => {
  res.send(movies)
})

// GET /movies/id
app.get("/api/movies/:id", (req, res) => {
  const { id } = req.params // parametros de URL

  const movie = movies.find(m => m.id == id)

  // guard clauses
  if(!movie) {
    res.status(404).send({
      error: "Movie not found"
    })
    return
  }

  // if (error) {

  //   return
  // }

  res.send(movie)
})

// POST /movies

app.post("/api/movies", (req, res) => {
  const { id, name } = req.body

  movies.push({
    id,
    name
  })

  res.sendStatus(201) // created
})

// PUT /movies/id

app.put("/api/movies/:id", (req, res) => {
  const { id } = req.params // parametros de URL

  const movie = movies.find(m => m.id == id)

  if(!movie) {
    res.status(404).send({
      error: "Movie not found"
    })
    return
  }

  const { name } = req.body

  movie.name = name
  res.sendStatus(200)
})

app.delete("/api/movies/:id", (req, res) => {
  const { id } = req.params // parametros de URL

  const movie = movies.find(m => m.id == id)

  if(!movie) {
    res.status(404).send({
      error: "Movie not found"
    })
    return
  }

  console.log(movies)

  const index = movies.indexOf(movie)
  movies.splice(index, 1)

  res.sendStatus(200)

})


app.listen(
  PORT,
  () => console.log(`Escuchando en http://localhost:${PORT}`)
)
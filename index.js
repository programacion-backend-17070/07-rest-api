const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080

const movies = [
  { id: 1, name: 'Joker' }, 
  { id: 2, name: 'Good Fellas' },
  { id: 3, name: 'Matrix' }
];

app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

app.get('/api/movies', (req, res) => { 
  res.status(200).send(movies)
})

app.get('/api/movies/:id', (req, res) => {
  const movie = movies.find(m => m.id === req.params.id)
  if (!movie) {
    res.status(404).send("Movie not found")
    return
  }

  res.send(movie)
})

app.post('/api/movies/:id', (req, res) => {
  const { id } = req.params
  const { name } = req.body

  const movie = movies.find(m => m.id === id)
  if (!movie) {
    res.status(404).send("Movie not found")
    return
  }


  res.sendStatus(201)
})

app.put('/api/movies/:id', (req, res) => {
  const { id } = req.params
  const { name } = req.body

  const movie = movies.find(m => m.id === id)
  if (!movie) {
    res.status(404).send("Movie not found")
    return
  }

  movie.name = name;
  res.sendStatus(200)
})

app.delete('/api/movies/:id', (req, res) => {
  const { id } = req.params

  const movie = movies.find(m => m.id === id)
  if (!movie) {
    res.status(404).send("Movie not found")
    return
  }

  const index = movies.indexOf(movie)
  movies.splice(index, 1)

  res.sendStatus(200)
})


app.listen(
  PORT,
  () => console.log(`server is running on http://localhost:${PORT}`)
)
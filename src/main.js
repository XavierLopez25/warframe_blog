import express from 'express'
import fs from 'fs'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'
import { getAllPosts, getPostByID, createPost, deletePostByID, updatePostByID } from './db.js'

const swaggerDocument = YAML.load('./api-docs/swagger.yaml')

const app = express()
app.use(express.json())
app.use(cors())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.get('/posts', async (req, res) => {
  try {
    const posts = await getAllPosts()
    res.status(200).json(posts)
  } catch (error) {
    res.status(500).send('An error occurred while fetching the posts.')
  }
})

app.get('/posts/:id', async (req, res) => {
  try {
    const posts = await getPostByID(req.params.id)
    res.status(200).json(posts)
  } catch (error) {
    res.status(500).send('An error occurred while fetching the posts.')
  }
})

app.post('/posts', async (req, res) => {
  try {
    const { title, content, warframe, build, formasRequired, imageBase64 } = req.body
    const result = await createPost(title, content, warframe, build, formasRequired, imageBase64)
    const message = 'Post Created Successfully!'
    res.status(200).json({ message, result })
  } catch (error) {
    res.status(500).send(error.message)
  }
})

app.delete('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params
    await deletePostByID(id)
    res.status(200).send(`Post with ID ${id} deleted successfully.`)
  } catch (error) {
    res.status(404).send(error.message)
  }
})

app.put('/posts/:id', async (req, res) => {
  try {
    const { title, content, warframe, build, formasRequired, imageBase64 } = req.body
    const { id } = req.params
    const message = 'Post Updated Successfully!'
    const result = await updatePostByID(
      title,
      content,
      warframe,
      build,
      formasRequired,
      imageBase64,
      id,
    )
    res.status(200).json({ message, result })
  } catch (error) {
    res.status(500).send(error.message)
  }
})

const port = 5000
app.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`)
})
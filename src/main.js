// Importar los módulos necesarios para la aplicación
import express from 'express'
import fs from 'fs'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'
import { getAllPosts, getPostByID, createPost, deletePostByID, updatePostByID } from './db.js'

// Cargar la documentación de la API desde el archivo YAML
const swaggerDocument = YAML.load('./api-docs/swagger.yaml')

// Inicializar la aplicación Express
const app = express()
// Habilitar el middleware para parsear JSON en el cuerpo de las solicitudes
app.use(express.json())
// Habilitar CORS para permitir solicitudes de cualquier origen
app.use(cors())
// Servir la documentación de la API utilizando Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// Middleware para registrar las solicitudes y respuestas en un archivo log
app.use((req, res, next) => {
  // Crear entrada de registro para la solicitud
  const logEntry = `${new Date().toISOString()} - ${req.method} ${
    req.path
  } - Request Body: ${JSON.stringify(req.body)}\n`
  // Añadir la entrada de registro al archivo
  fs.appendFile('log.txt', logEntry, (err) => {
    if (err) {
      console.error('Error logging request:', err)
    }
  })
  // Evento para capturar el momento en que se completa la respuesta y registrarla
  res.on('finish', () => {
    // Crear entrada de registro para la respuesta
    const responseLog = `${new Date().toISOString()} - ${req.method} ${
      req.path
    } - Response Status: ${res.statusCode}\n`
    // Añadir la entrada de registro al archivo
    fs.appendFile('log.txt', responseLog, (err) => {
      if (err) {
        console.error('Error logging response:', err)
      }
    })
  })
  // Pasar al siguiente middleware
  next()
})

// Endpoint para obtener todos los posts
app.get('/posts', async (req, res) => {
  try {
    const posts = await getAllPosts()
    res.status(200).json(posts)
  } catch (error) {
    // Manejar errores potenciales, como problemas de conexión a la base de datos
    res.status(500).send('An error occurred while fetching the posts.')
  }
})

// Endpoint para obtener un post específico por su ID
app.get('/posts/:id', async (req, res) => {
  try {
    const posts = await getPostByID(req.params.id)
    res.status(200).json(posts)
  } catch (error) {
    res.status(500).send('An error occurred while fetching the posts.')
  }
})

// Endpoint para crear un nuevo post
app.post('/posts', async (req, res) => {
  try {
    // Desestructurar el cuerpo de la solicitud para obtener los datos necesarios
    const { title, content, warframe, build, formasRequired, imageBase64 } = req.body
    // Crear el post y obtener el resultado
    const result = await createPost(title, content, warframe, build, formasRequired, imageBase64)
    res.status(200).json({ message: 'Post Created Successfully!', result })
  } catch (error) {
    res.status(500).send(error.message)
  }
})

// Endpoint para eliminar un post específico por su ID
app.delete('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params
    await deletePostByID(id)
    res.status(200).send(`Post with ID ${id} deleted successfully.`)
  } catch (error) {
    res.status(404).send(error.message)
  }
})

// Endpoint para actualizar un post específico por su ID
app.put('/posts/:id', async (req, res) => {
  try {
    const { title, content, warframe, build, formasRequired, imageBase64 } = req.body
    const { id } = req.params
    const result = await updatePostByID(
      title,
      content,
      warframe,
      build,
      formasRequired,
      imageBase64,
      id,
    )
    res.status(200).json({ message: 'Post Updated Successfully!', result })
  } catch (error) {
    res.status(500).send(error.message)
  }
})

// Middleware para manejar solicitudes a endpoints no encontrados
app.use((req, res) => {
  res.status(404).send('404 Not Found: The requested endpoint does not exist.')
})

// Middleware para manejar métodos HTTP no implementados
app.use((req, res, next) => {
  if (
    req.method !== 'GET'
    && req.method !== 'POST'
    && req.method !== 'PUT'
    && req.method !== 'DELETE'
  ) {
    return res
      .status(501)
      .send(
        '501 Not Implemented: The request method is not supported by the server and cannot be handled.',
      )
  }
  return next()
})

// Indicador de si el servidor se encuentra inicializado en localhost:port
const port = 5000
app.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`)
})

// Nota: En los middlewares finales, el uso de `return next()` es correcto,
// pero en realidad, cuando se envía una respuesta como `res.status().send()`,
// no es necesario seguir a `next()` porque la respuesta ya está completada.
// Por lo tanto, el `return next()` solo se alcanza si no se entra en la condición `if`.

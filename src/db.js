// Importar la conexión a la base de datos desde el módulo conn.js
import conn from './conn.js'

/**
 * Obtiene todos los posts de la base de datos.
 * @returns Una promesa que resuelve a un arreglo de todos los posts.
 */
async function getAllPosts() {
  // Ejecutar consulta SQL para seleccionar todos los registros en la tabla blog_posts
  const [rows] = await conn.query('SELECT * FROM blog_posts')
  return rows
}

/**
 * Obtiene un post por su ID.
 * @param {number|string} id - El ID del post a buscar.
 * @returns Una promesa que resuelve al post encontrado o null si no existe.
 */
async function getPostByID(id) {
  // Ejecutar consulta SQL para seleccionar un post específico por ID
  const [rows] = await conn.query('SELECT * FROM blog_posts WHERE id = ?', [id])
  // Retorna el primer elemento si existe, de lo contrario null
  return rows.length > 0 ? rows[0] : null
}

/**
 * Crea un nuevo post en la base de datos.
 * @param {string} title - Título del post.
 * @param {string} content - Contenido del post.
 * @param {string} warframe - Nombre del Warframe asociado al post.
 * @param {string} build - Descripción de la build.
 * @param {number} formasRequired - Número de formas requeridas para la build.
 * @param {string} imageBase64 - Imagen de la build en formato Base64.
 * @returns Una promesa que resuelve al resultado de la inserción.
 */
async function createPost(title, content, warframe, build, formasRequired, imageBase64) {
  // Ejecutar consulta SQL para insertar un nuevo registro en la tabla blog_posts
  const [result] = await conn.query(
    'INSERT INTO blog_posts (title, content, warframe, build, formas_required, image_base64) VALUES (?, ?, ?, ?, ?, ?)',
    [title, content, warframe, build, formasRequired, imageBase64],
  )
  return result
}

/**
 * Elimina un post por su ID.
 * @param {number|string} id - El ID del post a eliminar.
 * @returns Una promesa que resuelve a true si el post fue eliminado.
 * @throws Error si el post no se encuentra o ya fue eliminado.
 */
async function deletePostByID(id) {
  // Ejecutar consulta SQL para eliminar un registro específico por ID
  const [result] = await conn.query('DELETE FROM blog_posts WHERE id = ?', [id])
  // Si no se afectaron filas, lanzar un error
  if (result.affectedRows === 0) {
    throw new Error(`Post with ID ${id} not found or already deleted.`)
  }
  return true
}

/**
 * Actualiza un post por su ID.
 * @param {string} title - Nuevo título del post.
 * @param {string} content - Nuevo contenido del post.
 * @param {string} warframe - Nuevo nombre del Warframe asociado al post.
 * @param {string} build - Nueva descripción de la build.
 * @param {number} formasRequired - Nuevo número de formas requeridas para la build.
 * @param {string} imageBase64 - Nueva imagen de la build en formato Base64.
 * @param {number|string} id - El ID del post a actualizar.
 * @returns Una promesa que resuelve al resultado de la actualización.
 */
async function updatePostByID(title, content, warframe, build, formasRequired, imageBase64, id) {
  // Ejecutar consulta SQL para actualizar un registro específico por ID
  const [result] = await conn.query(
    'UPDATE blog_posts SET title =?, content =?, warframe =?, build =?, formas_required =?, image_base64 =? WHERE id = ?',
    [title, content, warframe, build, formasRequired, imageBase64, id],
  )

  return result
}

// Exportar las funciones para que puedan ser utilizadas en otros módulos
export { getAllPosts, getPostByID, createPost, deletePostByID, updatePostByID }

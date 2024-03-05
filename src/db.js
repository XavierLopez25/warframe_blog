import conn from './conn.js'

async function getAllPosts() {
  const [rows] = await conn.query('SELECT * FROM blog_posts')
  return rows
}

async function getPostByID(id) {
  const [rows] = await conn.query('SELECT * FROM blog_posts WHERE id = ?', [id])
  return rows.length > 0 ? rows[0] : null
}

async function createPost(title, content, warframe, build, formasRequired, imageBase64) {
  const [result] = await conn.query(
    'INSERT INTO blog_posts (title, content, warframe, build, formas_required, image_base64) VALUES (?, ?, ?, ?, ?, ?)',
    [title, content, warframe, build, formasRequired, imageBase64],
  )
  return result
}

async function deletePostByID(id) {
  const [result] = await conn.query('DELETE FROM blog_posts WHERE id = ?', [id])
  if (result.affectedRows === 0) {
    throw new Error(`Post with ID ${id} not found or already deleted.`)
  }
  return true
}

async function updatePostByID(title, content, warframe, build, formasRequired, imageBase64, id) {
  const [result] = await conn.query(
    'UPDATE blog_posts SET title =?, content =?, warframe =?, build =?, formas_required =?, image_base64 =? WHERE id = ?',
    [title, content, warframe, build, formasRequired, imageBase64, id],
  )

  return result
}

export { getAllPosts, getPostByID, createPost, deletePostByID, updatePostByID }

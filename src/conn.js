// Importar el módulo mysql2 con soporte para promesas
import mysql from 'mysql2/promise'

/**
 * Crea un pool de conexiones a la base de datos.
 *
 * Un pool de conexiones permite gestionar un conjunto de conexiones a la base de datos,
 * reutilizándolas para múltiples peticiones. Esto mejora el rendimiento en aplicaciones
 * con muchas operaciones de base de datos, al evitar la sobrecarga asociada a la apertura
 * y cierre de conexiones para cada petición.
 *
 * Configuraciones:
 * - host: Dirección del servidor de la base de datos.
 * - user: Nombre de usuario para acceder a la base de datos.
 * - database: Nombre de la base de datos a la que conectarse.
 * - password: Contraseña para el usuario de la base de datos.
 * - waitForConnections: Si es true, las llamadas a getConnection() esperarán por una conexión
 *                       si no hay ninguna libre. False lanzará un error inmediatamente.
 * - connectionLimit: Máximo número de conexiones a crear en el pool.
 * - queueLimit: Máximo número de solicitudes de conexión en cola de espera; 0 significa sin límite.
 */
const pool = mysql.createPool({
  host: 'localhost',
  user: 'xavierlopez25',
  database: 'blog_db',
  password: '123',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

// Exportar el pool para ser utilizado en otras partes de la aplicación.
// Al importar este módulo, se puede acceder al pool para realizar consultas
// a la base de datos sin necesidad de manejar la conexión directamente.
export default pool

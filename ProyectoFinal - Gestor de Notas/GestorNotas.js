const fs = require('fs');

// Ruta del archivo de notas
const filePath = 'notas/notas.json';

/**
 * Agrega una nueva nota al archivo.
 * @param {string} titulo - El título de la nota.
 * @param {string} contenido - El contenido de la nota.
 */
function agregarNota(titulo, contenido) {
  let notas = [];
  if (fs.existsSync(filePath)) {
    // Leer las notas existentes antes de agregar la nueva
    const data = fs.readFileSync(filePath, 'utf8');
    notas = JSON.parse(data);
  } else {
    // Asegurar que el directorio existe
    const dir = 'notas';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  }

  const nuevaNota = { titulo, contenido };
  notas.push(nuevaNota);

  // Guardar las notas actualizadas
  fs.writeFileSync(filePath, JSON.stringify(notas, null, 2));
  console.log('Nota agregada con éxito.');
  console.log(`Título: ${titulo}\nContenido: ${contenido}`);
  console.log('Notas guardadas en:', filePath);
}

/**
 * Lista todas las notas guardadas.
 */
function listarNotas() {
  if (fs.existsSync(filePath)) {
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      const notas = JSON.parse(data);

      if (Array.isArray(notas) && notas.length > 0) {
        console.log('Notas guardadas:');
        notas.forEach((nota, index) => {
          console.log(`${index + 1}. Título: ${nota.titulo}\n   Contenido: ${nota.contenido}`);
        });
      } else {
        console.log('No hay notas guardadas.');
      }
    } catch (error) {
      console.log('Error al leer o parsear las notas:', error.message);
    }
  } else {
    console.log('No hay notas guardadas.');
  }
}

/**
 * Elimina una nota por su título.
 * @param {string} titulo - El título de la nota a eliminar.
 */
function eliminarNota(titulo) {
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf8');
    const notas = JSON.parse(data);

    const notasRestantes = notas.filter((nota) => nota.titulo !== titulo);

    fs.writeFileSync(filePath, JSON.stringify(notasRestantes, null, 2));

    console.log(`Nota con título "${titulo}" eliminada.`);
  } else {
    console.log('No hay notas para eliminar.');
  }
}

// Ejecución de ejemplo
agregarNota('Compras', 'Comprar leche y pan.');
agregarNota('Trabajo', 'Terminar reporte semanal.');
listarNotas();
eliminarNota('Compras');

/* 
// ### Pistas para Resolver el Proyecto ###
// Formato del archivo `notas.json`:
[
  { "titulo": "Compras", "contenido": "Comprar leche y pan." },
  { "titulo": "Trabajo", "contenido": "Terminar reporte semanal." }
]

// #### Operaciones clave: ###
// 1. Para leer las notas existentes:
const data = fs.readFileSync(filePath, 'utf8');
const notas = JSON.parse(data);

// 2. Para guardar las notas actualizadas:
fs.writeFileSync(filePath, JSON.stringify(notas, null, 2));

// 3. Filtrar notas para eliminar:
const notasRestantes = notas.filter((nota) => nota.titulo !== titulo);
*/

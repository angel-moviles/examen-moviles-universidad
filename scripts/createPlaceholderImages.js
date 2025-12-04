const fs = require('fs');
const path = require('path');

// Crear directorio assets si no existe
const assetsDir = path.join(__dirname, '../assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// Crear un archivo de imagen simple (en realidad sería mejor descargar o crear imágenes reales)
// Por ahora, solo crearemos archivos de marcador de posición

console.log('Para crear imágenes de placeholder:');
console.log('1. Ve a https://via.placeholder.com/');
console.log('2. Descarga estas imágenes:');
console.log('   - https://via.placeholder.com/1024x1024/007AFF/FFFFFF?text=Examen+Moviles (para icon.png)');
console.log('   - https://via.placeholder.com/1242x2436/007AFF/FFFFFF?text=Splash+Screen (para splash.png)');
console.log('   - https://via.placeholder.com/1024x1024/007AFF/FFFFFF?text=Adaptive+Icon (para adaptive-icon.png)');
console.log('3. Colócalas en la carpeta assets/');
// pathParser.js
import { readdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Получаем абсолютный путь к текущей директории
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 👉 Название папки с изображениями
const projectFolder = 'projects_7';

// Полный путь к папке с изображениями
const folderPath = path.join(__dirname, 'src/assets', projectFolder);

// Базовый путь для markdown-файла
const publicPath = `/assets/${projectFolder}`;

// Поддерживаемые расширения
const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

try {
  const files = await readdir(folderPath);
  const imagePaths = files
    .filter(file => imageExtensions.includes(path.extname(file).toLowerCase()))
    .sort()
    .map(file => `  - 'src${publicPath}/${file}'`);

  console.log(imagePaths.join('\n'));
} catch (err) {
  console.error('❌ Ошибка:', err);
}

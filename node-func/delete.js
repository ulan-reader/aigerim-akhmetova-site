// import { readdir, mkdir } from 'fs/promises';
// import path from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const projectFolders = [
//   'projects_1',
//   'projects_2',
//   'projects_3',
//   'projects_4',
//   'projects_5',
//   'projects_6',
//   'projects_7',
//   'projects_8',
//   'projects_9',
//   'projects_10',
//   'projects_11',
//   'projects_12',
//   'projects_13',
//   'projects_14',
//   'projects_15',
// ];

// const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

// for (const projectFolder of projectFolders) {
//     const folderPath = path.join(__dirname, 'src/assets', projectFolder);
//     await mkdir(folderPath, { recursive: true });
//     console.log(`mkdir folder: ${folderPath}`);
// }

import { readdir, unlink } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectFolder = 'projects_7';
const folderPath = path.join(__dirname, 'src/assets', projectFolder);

// Массив допустимых чисел
const allowedNumbers = [2,10,23,41,51,3];

// Регулярка для извлечения числа перед расширением
const numberRegex = /(\d+)(?=\.[^.]+$)/;

const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

async function removeUnlistedImages() {
  const files = await readdir(folderPath);

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!imageExtensions.includes(ext)) continue;

    const match = file.match(numberRegex);
    const num = match ? parseInt(match[1], 10) : null;

    // Удаляем если числа нет или оно не входит в массив
    if (!num || !allowedNumbers.includes(num)) {
      const filePath = path.join(folderPath, file);
      await unlink(filePath);
      console.log(`🗑 Удалён: ${file}`);
    }
  }

  console.log('✅ Готово: ненужные фото удалены.');
}

removeUnlistedImages().catch(console.error);

// make_press_files.js
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outDir = path.resolve(__dirname, 'src/content/clients'); // изменить при необходимости
const total = 21;

const links = [
  "https://www.instagram.com/idadesignmates/",
  "https://www.soffitinteriors.com/",
  "https://k-kvadrat.kz/en?fbclid=PAQ0xDSwLi7ONleHRuA2FlbQIxMAABp1_p6Df73tiSZyUd2HCbpoM0Ek9T1HoFhB9YBoA6-iiDyKDkN8YnFiHzfhta_aem_l9T65u9PB6YSOSQWVRzLSA",
  "https://www.christinacruzinteriors.com/",
  "https://latifbureau.com/",
  "https://www.instagram.com/damir_otegen_/",
  "https://stephanjulliard.com/en/interiors",
  "https://www.instagram.com/mazurinadesign/",
  "https://www.instagram.com/alenakrasatulina?igsh=MTd1andwcW9rOTNncw==",
  "https://www.instagram.com/forma.bureau?igsh=MXBnd2Rxdm02NHJuNA==",
  "https://www.instagram.com/up2date_architects?igsh=MTBuczRicWdnMHlrZw==",
  "https://www.instagram.com/danara.akhmetova.interior?igsh=NDVtbDdreTV6MWtx",
  "https://www.instagram.com/itallux_interiors?igsh=NXVobnJ1eWRsNWkz",
  "https://www.instagram.com/malygina_yana?igsh=MTc5amwyaHl2a3B4Nw==",
  "https://www.instagram.com/k.iminteriors?igsh=MTZ0Z3A4dHNhMmwxdw==",
  "https://www.instagram.com/aida.archdesigner?igsh=anBwYzByMTB4d3ls",
  "https://www.instagram.com/yeren.interiors?igsh=aWVxNzJmMGZ2ajZ0",
  "https://www.instagram.com/cami.acai?igsh=anFjamlwMnRoNjlo",
  "https://www.instagram.com/olgap.interiors?igsh=NjZsZzd3a2cwYjFq",
  "https://www.instagram.com/ursastudio?igsh=YWo2MWs1bWNnaHpo",
  "https://ashleyhome.kz/?srsltid=AfmBOoqA_vAJCUkJzIN-HU-ClL7zKcDiGseA3UiaUwJLS9menWSsQAJU"
];

let alts = [
  'idadesignmates',
  'soffitinteriors',
  'k-kvadrat',
  'Christina Cruz Interiors',
  'LATIF BUREAU',
  'Damir Otegen',
  'Stephan Julliard',
  'Mazurina Design',
  'Alena Krasatulina',
  'Forma Bureau',
  'Up2date Architects',
  'Danara Akhmetova Interior',
  'Itallux Interiors',
  'Malygina Yana',
  'K.IM Interiors',
  'Aida Archdesigner',
  'Yeren Interiors',
  'Cami Acai',
  'Olga P Interiors',
  'Ursa Studio',
  'Ashley Home'
]

let images = [

]

async function main() {
  await fs.mkdir(outDir, { recursive: true });

  for (let i = 1; i <= total; i++) {
    const filename = `client_${i}.md`;
    const filepath = path.join(outDir, filename);

    const content = `---\nimage: ''\ntitle: '${alts[i - 1]}'\nlink: '${links[i - 1]}'\n---`;

    await fs.writeFile(filepath, content, 'utf8');
    console.log('Created', filepath);
  }

  console.log('Done:', total, 'files in', outDir);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});

import QRCode from 'qrcode';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const courses = [
  {
    slug: 'ai-powered-business-automation',
    name: 'AI Business Automation'
  },
  {
    slug: 'next-gen-data-analytics',
    name: 'Next-Gen Data Analytics'
  },
  {
    slug: 'ai-for-office-productivity',
    name: 'AI Office Productivity'
  }
];

const outDir = 'C:\\Users\\ADMIN\\.gemini\\antigravity-ide\\brain\\d6b6aad8-8b39-4f45-be93-8648fa184545\\scratch';

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

async function generateQRs() {
  for (const course of courses) {
    const url = `https://sysfotech.uk/courses/${course.slug}`;
    const outFile = join(outDir, `${course.slug}.png`);
    await QRCode.toFile(outFile, url, {
        color: {
            dark: '#000000',
            light: '#FFFFFF'
        },
        width: 300
    });
    console.log(`Generated ${outFile}`);
  }
}

generateQRs().catch(console.error);

import fs from 'fs';
import path from 'path';

const pagesDir = 'd:/tugas/apps/web/src/pages';
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.jsx'));

for (const file of files) {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Check if it already has TopRightNav
  if (content.includes('<TopRightNav />')) continue;

  // Regex to match the right side nav block
  // It starts with <div className="flex items-center gap-6"> and ends where the header ends.
  // Actually, it's safer to use a regex that matches from <div className="flex items-center gap-6"> to the closing </header>, replacing the div but keeping </header>.
  const regex = /<div className="flex items-center gap-6">[\s\S]*?(?=<\/header>)/;
  
  if (regex.test(content)) {
    content = content.replace(regex, '<TopRightNav />\n      ');
    
    // Add import statement at the top if not exists
    if (!content.includes("import TopRightNav")) {
      const importLines = content.split('\n');
      // find last import
      let lastImportIndex = -1;
      for (let i = 0; i < importLines.length; i++) {
        if (importLines[i].startsWith('import ')) lastImportIndex = i;
      }
      importLines.splice(lastImportIndex + 1, 0, "import TopRightNav from '../components/TopRightNav';");
      content = importLines.join('\n');
    }

    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated ${file}`);
  }
}

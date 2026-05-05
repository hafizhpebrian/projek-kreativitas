const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'apps/web/src/pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('Page.jsx'));

for (const file of files) {
  if (file === 'LoginPage.jsx' || file === 'SignUpPage.jsx') continue;

  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Check if aside exists
  if (!content.includes('<aside')) {
    console.log(`Skipping ${file}: No <aside> found.`);
    continue;
  }

  // Find start and end of <aside> block
  const asideStart = content.indexOf('<aside');
  const asideEndStr = '</aside>';
  const asideEnd = content.indexOf(asideEndStr) + asideEndStr.length;

  if (asideStart === -1 || asideEnd < asideEndStr.length) {
    console.log(`Skipping ${file}: Invalid <aside> boundaries.`);
    continue;
  }

  // Replace with <Sidebar />
  const beforeAside = content.substring(0, asideStart);
  const afterAside = content.substring(asideEnd);
  
  // Also we need to import Sidebar if not imported
  let newContent = beforeAside + '<Sidebar />' + afterAside;
  if (!newContent.includes('import Sidebar from')) {
    // Find the last import
    const lastImportIndex = newContent.lastIndexOf('import ');
    const endOfLastImport = newContent.indexOf('\n', lastImportIndex);
    
    newContent = newContent.substring(0, endOfLastImport + 1) + 
                 "import Sidebar from '../components/Sidebar';\n" + 
                 newContent.substring(endOfLastImport + 1);
  }

  fs.writeFileSync(filePath, newContent);
  console.log(`Updated ${file}`);
}

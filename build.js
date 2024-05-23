const fs = require('fs');
const path = require('path');

// Función para leer el contenido de un archivo
const readFile = (filePath) => fs.readFileSync(filePath, 'utf-8');

// Plantilla de layout
const layoutTemplate = readFile(path.join(__dirname, 'src/templates/layout.html'));

// Función para insertar contenido en la plantilla
function renderPage(content, title, templates) {
  return layoutTemplate
    .replace('{{{content}}}', content)
    .replace('{{title}}', title)
    .replace('{{{templates}}}', templates);
}

// Cargar los componentes
const headerTemplate = readFile(path.join(__dirname, 'src/components/header.html'));
const footerTemplate = readFile(path.join(__dirname, 'src/components/footer.html'));
const templates = headerTemplate + footerTemplate;

// Páginas a generar
const pages = [
  {
    fileName: 'index.html',
    content: readFile(path.join(__dirname, 'src/pages/index.html')),
    title: 'Home'
  },
  {
    fileName: 'about-us.html',
    content: readFile(path.join(__dirname, 'src/pages/about-us.html')),
    title: 'About Us'
  }
];

// Generar las páginas
pages.forEach(page => {
  const renderedPage = renderPage(page.content, page.title, templates);
  fs.writeFileSync(path.join(__dirname, 'dist', page.fileName), renderedPage, 'utf-8');
});

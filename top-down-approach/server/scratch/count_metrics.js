import fs from 'fs';
import path from 'path';

function getFilesRecursively(dir, exts = ['.js', '.jsx', '.css']) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== 'dist' && file !== 'build' && file !== 'scratch') {
        results = results.concat(getFilesRecursively(filePath, exts));
      }
    } else {
      if (exts.some((ext) => file.endsWith(ext))) {
        results.push(filePath);
      }
    }
  });
  return results;
}

function countLoc(files) {
  let totalLines = 0;
  let codeLines = 0;
  files.forEach((file) => {
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');
    totalLines += lines.length;
    lines.forEach((line) => {
      const trimmed = line.trim();
      if (trimmed.length > 0 && !trimmed.startsWith('//') && !trimmed.startsWith('/*') && !trimmed.startsWith('*')) {
        codeLines++;
      }
    });
  });
  return { totalLines, codeLines };
}

const clientDir = 'c:/Documents/3rd Year/Software Engineering/Project/E-Commerce Website/top-down-approach/client/src';
const serverDir = 'c:/Documents/3rd Year/Software Engineering/Project/E-Commerce Website/top-down-approach/server/src';

const clientFiles = getFilesRecursively(clientDir);
const serverFiles = getFilesRecursively(serverDir);

const clientLoc = countLoc(clientFiles);
const serverLoc = countLoc(serverFiles);

console.log('--- METRICS ANALYSIS ---');
console.log('Client Files:', clientFiles.length, 'Total LOC:', clientLoc.totalLines, 'Code LOC:', clientLoc.codeLines);
console.log('Server Files:', serverFiles.length, 'Total LOC:', serverLoc.totalLines, 'Code LOC:', serverLoc.codeLines);
console.log('Total Source Files:', clientFiles.length + serverFiles.length);
console.log('Total System LOC:', clientLoc.totalLines + serverLoc.totalLines);

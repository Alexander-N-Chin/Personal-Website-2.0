// readFile.ts
const fs = require('fs');
const path = require('path');

// Shuffle function (Fisher-Yates algorithm)
const shuffleArray = (array: string[]): string[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  };
const filePath = path.resolve(__dirname, './public/questions.txt');
const fileContent = fs.readFileSync(filePath, 'utf-8');
const fileLines = shuffleArray(fileContent.split(/\r?\n/));
const data = [];
for (const line of fileLines) {
  let attrs = line.split(",");
  data.push({
    question: attrs[0],
    answer: attrs[1],
  });
}
fs.writeFileSync(
  path.resolve(__dirname, './src/fileContent.ts'),
  `export const fileLines = ${JSON.stringify(fileLines)};`
);

console.log('File content has been written to fileContent.ts');
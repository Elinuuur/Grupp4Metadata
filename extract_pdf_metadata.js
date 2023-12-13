// Import the fork module
import pdfParse from 'pdf-parse-fork';

import mysql from 'mysql2/promise';
//Importera file system (fs) - inbyggt i node.js
import fs from 'fs';
 
// Ger oss en lista på alla filerna i mappen
let pdfs = fs.readdirSync('pdfs');
 
// Kopplar oss till databasen
const db = await mysql.createConnection({
    host: '161.97.144.27',
    port: "8094",
    user: 'root',
    password: 'guessagain94',
    database: 'group4.Metadata'
  });

// Funktion för att skapa querys
async function query(sql, listOfValues) {
  let result = await db.execute(sql, listOfValues);
  return result[0];
}
 
// Läs alla filers namn från pdf mappen
const files = await fs.readdirSync('pdfs');
 
// Loopa genom alla bilder och läs metadata
for (let pdf of pdfs) {
 
  // Ta metadatan från filen
  let metadata = await pdfParse(fs.readFileSync('./pdfs/' + pdf));
 
  // Sätt in i databasen med hjälp av query funktionen
  let result = await query(`
    INSERT INTO pdf (pdfName, pdfDescription)
    VALUES(?, ?)
  `, [pdf, metadata]);
 
  // Logga resultatet för att se att något händer.
  console.log(pdf, result);
 
}
 
// Automatisk stop när det är klart, annars tror VSC
// att något mer ska skickas in då vi är kopplade till databasen.
process.exit();
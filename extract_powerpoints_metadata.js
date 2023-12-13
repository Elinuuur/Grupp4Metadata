// Import the file system module (fs)
import fs from 'fs';

import mysql from 'mysql2/promise';

// Read the json string from file
let json = fs.readFileSync('csvjson.json', 'utf-8');

// Convert from a string to a real data structure
let data = JSON.parse(json);

// Kopplar oss till databasen
const db = await mysql.createConnection({
    host: '161.97.144.27',
    port: "8094",
    user: 'root',
    password: 'guessagain94',
    database: 'group4.Metadata'
  });
  
  async function query(sql, listOfValues) {
    let result = await db.execute(sql, listOfValues);
    return result[0];
  }

for (let json of data) {
  // extract the file name (the property digest + '.ppt)
  let fileName = json.digest + '.ppt';

  // remove the file name
  delete json.digest;

  // remove sha hashes as well (only needed for file authenticy checks)
  delete json.sha256;
  delete json.sha512;

  // console.log things to see that we have correct 
  // filname and metadata
  // (that eventually want to write to the db)
  console.log('');
  console.log(fileName);
  console.log(json);

  // TODO: Do something like this to INSERT the data in our database
  let result = await query(`
    INSERT INTO powerpoint (powerpointName, powerpointDescription)
    VALUES(?, ?)
  `, [fileName, json]);

  console.log(json, result);

}
 
// Automatisk stop när det är klart, annars tror VSC
// att något mer ska skickas in då vi är kopplade till databasen.
process.exit();
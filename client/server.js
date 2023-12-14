// Import the express package/module
// that let us start up a web server
import express from 'express';

// Import the database driver
import mysql from 'mysql2/promise';

// Create a web server named app
const app = express();

// Serve all files in the folder client
app.use(express.static('client'));

// Start the server on a certain port
// and write to the terminal which port...
app.listen(3000, () =>
  console.log('Listening on http://localhost:3000'));



// Create a connection 'db' to the database
const db = await mysql.createConnection({
  host: '161.97.144.27',
  port: 8094,
  user: 'root',
  password: 'guessagain94',
  database: 'group4.Metadata'
});

// A small function for a database query
async function query(sql, listOfValues) {
  let result = await db.execute(sql, listOfValues);
  return result[0];
}


// A search route to find music
app.get('/api/music/:searchTerm/:searchType', async (request, response) => {
    // Get the search term from as a parameter from the route/url
    let searchTerm = request.params.searchTerm;
    // Get teh search type a sa parameter from the route/url
    let searchType = request.params.searchType;
    // Make a database query and remember the result
    // using the search term
  
    let sql = `
     SELECT * 
     FROM music
     WHERE LOWER(metadata -> '$.common.${searchType}') LIKE LOWER (?)
    `;
  
    // since the sql gets a bit different if you want to search all
    // fix this with a if-clause replacing the sql
    if (searchType == 'all') {
      sql = `
        SELECT *
        FROM music
        WHERE LOWER(metadata) LIKE LOWER (?)
      `;
    }
  
    let result = await query(sql, ['%' + searchTerm + '%']);
  
    // Send a response to the client
    response.json(result);
  });


// Create a REST-api route
// When somebody asks for http://localhost:3000/api/photos
// send som JSON based on a database query
app.get('/api/photos', async (request, response) => {
  // Make a database query and remember the result
  let result = await query(`
    SELECT *
    FROM photos
  `);
  // Send a response to the client
  response.json(result);
});

// A search route to find a cat by parts of its name
// or parts of its description
app.get('/api/photos/:searchTerm', async (request, response) => {
  // Get the search term from as a parameter from the route/url
  let searchTerm = request.params.searchTerm;
  // Make a database query and remember the result
  // using the search term
  let result = await query(`
    SELECT *
    FROM photos
    WHERE 
      LOWER(CONCAT(name, ' ', meta->'$.description')) 
      LIKE LOWER(?)
  `, ['%' + searchTerm + '%']);
  // Send a response to the client
  response.json(result);
});


// Create a REST-api route
// When somebody asks for http://localhost:3000/api/pdf
// send som JSON based on a database query
app.get('/api/pdf', async (request, response) => {
    // Make a database query and remember the result
    let result = await query(`
      SELECT *
      FROM pdfs
    `);
    // Send a response to the client
    response.json(result);
  });
  
  // A search route to find a cat by parts of its name
  // or parts of its description
  app.get('/api/pdf/:searchTerm', async (request, response) => {
    // Get the search term from as a parameter from the route/url
    let searchTerm = request.params.searchTerm;
    // Make a database query and remember the result
    // using the search term
    let result = await query(`
      SELECT *
      FROM pdfs
      WHERE 
        LOWER(CONCAT(name, ' ', meta->'$.description')) 
        LIKE LOWER(?)
    `, ['%' + searchTerm + '%']);
    // Send a response to the client
    response.json(result);
  });


  // Create a REST-api route
// When somebody asks for http://localhost:3000/api/photos
// send som JSON based on a database query
app.get('/api/powerpoints', async (request, response) => {
    // Make a database query and remember the result
    let result = await query(`
      SELECT *
      FROM powerpoints
    `);
    // Send a response to the client
    response.json(result);
  });
  
  // A search route to find a cat by parts of its name
  // or parts of its description
  app.get('/api/powerpoints/:searchTerm', async (request, response) => {
    // Get the search term from as a parameter from the route/url
    let searchTerm = request.params.searchTerm;
    // Make a database query and remember the result
    // using the search term
    let result = await query(`
      SELECT *
      FROM powerpoints
      WHERE 
        LOWER(CONCAT(name, ' ', meta->'$.description')) 
        LIKE LOWER(?)
    `, ['%' + searchTerm + '%']);
    // Send a response to the client
    response.json(result);
  });
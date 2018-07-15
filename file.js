const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');


// Full date for error logs
const fullDate = new Date();
// Formatted date for .csv file names
const date = fullDate.toISOString().split('T')[0];


// Create csvWriter
const csvWriter = createCsvWriter({
    path: `./data/${date}.csv`,
    header: [
        {id: 'title', title: 'Title'},
        {id: 'price', title: 'Price'},
        {id: 'imgURL', title: 'ImageURL'},
        {id: 'url', title: 'URL'},
        {id: 'time', title: 'Time'}
    ]
});

// Write to .csv
function write(records) {
  const dataFolder = './data';
  const todaysFile = `./data/${date}.csv`;

  // Check for data folder, create it if it doesn't exist
  if (!fs.existsSync(dataFolder)) {fs.mkdirSync(dataFolder)}
  // Check for todays file, delete it if it does exist
  if (fs.existsSync(todaysFile)) {fs.unlinkSync(todaysFile)}

  // Write the csv file to the data directory
  csvWriter.writeRecords(records)
    .then( () => console.log(`Write successful, file is located at:\n${todaysFile}`))
    .catch( error => {
      log(error);
      console.log(error);
    });
}

// Write to error log
function log(error) {
  const errorLog = './scraper-error.log';
  const message = `[${fullDate}] <${error}>\n`;
  fs.appendFileSync(errorLog, message);
}

module.exports.write = write;
module.exports.log = log;

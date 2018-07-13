const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// New date formatted to use as file name.
const date = new Date().toISOString().split('T')[0];

// csvWriter instance defines headers, sets path using date above
const csvWriter = createCsvWriter({
    path: `/Volumes/E-Drive/Programming/github/THProjects/scraper/data/${date}.csv`,
    header: [
        {id: 'title', title: 'Title'},
        {id: 'price', title: 'Price'},
        {id: 'imgURL', title: 'ImageURL'},
        {id: 'url', title: 'URL'},
        {id: 'time', title: 'Time'}
    ]
});

function write(records) {
  const dataFolder = '/Volumes/E-Drive/Programming/github/THProjects/scraper/data';
  const todaysFile = `/Volumes/E-Drive/Programming/github/THProjects/scraper/data/${date}.csv`;

  // Check for data folder, create it if it doesn't exist
  if (!fs.existsSync(dataFolder)) {
    fs.mkdirSync(dataFolder);
  }
  // Check for todays file, delete it if it does exist
  if (fs.existsSync(todaysFile)) {
    fs.unlinkSync(todaysFile);
  }
  // Write the csv file to the data directory
  csvWriter.writeRecords(records).then(() => console.log(`Success!\nToday's data is located at \n${todaysFile}`)).catch((error) => console.log(error));
}

module.exports.write = write;

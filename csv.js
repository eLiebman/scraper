const date = new Date().toISOString().split('T')[0];
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: `/Volumes/E-Drive/Programming/github/THProjects/scraper/data/${date}.csv`,
    header: [
        {id: 'title', title: 'Title'},
        {id: 'price', title: 'Price'},
        {id: 'imgURL', title: 'ImageURL'},
        {id: 'url', title: 'URL'},
        {id: 'time', title: 'Time'},
    ]
});

function write(records) {
  const dataFolder = '/Volumes/E-Drive/Programming/github/THProjects/scraper/data';
  const todaysFile = `/Volumes/E-Drive/Programming/github/THProjects/scraper/data/${date}.csv`;

  if (!fs.existsSync(dataFolder)) {
    fs.mkdirSync(dataFolder);
  }
  if (fs.existsSync(todaysFile)) {
    fs.unlinkSync(todaysFile);
  }
  csvWriter.writeRecords(records).then(() => console.log(`Success!\nToday's data is located at \n${todaysFile}`)).catch((error) => console.log(error));
}

module.exports.write = write;

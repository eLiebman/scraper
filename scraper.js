const fs = require('fs');
const scrape_it = require('scrape-it');

const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: `scraper/data/${date}`,
    header: [
        {id: 'name', title: 'NAME'},
        {id: 'lang', title: 'LANGUAGE'},
    ]
});

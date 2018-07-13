const file = require('./file.js');
const get = require('./get.js');

// Initial request to get.shirtPages
get.shirtPages.queue('http://shirts4mike.com/shirts.php');

// When request is complete, format relative urls into absolute urls,
// and pass them to get.shirtInfo
get.shirtPages.on('drain', () => {
  const hrefs = get.pages;
  const links = hrefs.map( (href) => `http://www.shirts4mike.com/${href}` );
  get.shirtInfo.queue(links);
});

// When request is complete, write shirtData to a .csv file
get.shirtInfo.on('drain', () => file.write(get.info));

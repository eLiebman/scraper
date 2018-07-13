const Crawler = require('crawler');


// This crawler instance extracts relative urls for each shirt
// from shirts4mike.com/shirts.php, and stores them in the
// options.shirtPages array, exported as 'get.pages'

const shirtPages = new Crawler({
  shirtPages: [],
  retries: 0,
  callback : function (error, response, done) {
    if (error) {
      console.error(`\nUnable to connect to shirts4mike.com\n`);
    } else {
      const $ = response.$;

      //Store 8 links in shirtPages array
      for (let i = 0; i<8; i++) {
        response.options.shirtPages.push($(".products li a")[i].attribs.href);
      }
    }
    done();
  }
});


// This crawler instance takes an individual shirt page
// and extracts relevant data, storing it as an object
// in the options.shirtInfo array, exported as 'get.info'

const shirtInfo = new Crawler({
  shirtInfo: [],
  callback : function (error, response, done) {
      if (error) {
        console.log(error);
      } else {
        const $ = response.$;

        // Store info to variables
        const header = $('.shirt-details h1').text().split(' ');
        const price = header.shift();
        const color = header.pop();
        const title = header.join(' ');

        const imgSrc = $('img').attr('src');
        const imgURL = `http://shirts4mike.com/${imgSrc}`

        const url = response.request.uri.href;
        const time = new Date().toTimeString();

        // Construct object in correct format
        const newRow = {title, price, imgURL, url, time};

        // Store each object in 'shirtInfo' array
        response.options.shirtInfo.push(newRow);
      }
      done();
    }
});

// The crawler instances
module.exports.shirtPages = shirtPages;
module.exports.shirtInfo = shirtInfo;

// The data returned (shorthand makes scraper.js more readable)
module.exports.pages = shirtPages.options.shirtPages;
module.exports.info = shirtInfo.options.shirtInfo;

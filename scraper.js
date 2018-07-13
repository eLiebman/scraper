const csv = require('./csv.js');
const Crawler = require('crawler');

const records = [];

const getShirtData = new Crawler({
  callback : function (error, response, done) {
      if (error) {
        console.log(error);
      } else{
        const $ = response.$;
        const header = $('.shirt-details h1').text().split(' ');
        const price = header.shift();
        const color = header.pop();
        const title = header.join(' ');

        const imgSrc = $('img').attr('src');
        const imgURL = `http://shirts4mike.com/${imgSrc}`

        const url = response.request.uri.href;
        const time = new Date().toTimeString();

        const newRow = {title, price, imgURL, url, time};
        records.push(newRow);
      }
      done();
    }
});

const getLinks = new Crawler({
  callback : function (error, response, done) {
    if (error) {
      console.log(error);
    } else{
      const $ = response.$;
      const links = [];
      for (let i = 0; i<8; i++) {
        links.push($(".products li a")[i].attribs.href);
      }
      links.forEach(link => getShirtData.queue(`http://shirts4mike.com/${link}`));
    }
    done();
  }
});

getLinks.queue('http://shirts4mike.com/shirts.php');
getShirtData.on('drain', () => csv.write(records));

const PDFDocument = require('pdfkit');
const fs = require('fs');
const cheerio = require('cheerio');
const striptags = require('striptags');

const generate = async  (req, res) => {
  // Read the HTML file
  const doc = new PDFDocument();
  const html =  fs.readFileSync('payslip.html', 'utf8');


        const pdfPath = `payslip.pdf`;

        const writeStream = fs.createWriteStream(pdfPath);

        doc.pipe(writeStream);
        const $ = cheerio.load(html);
        const plainTextContent = striptags($('body').text());

        doc.fontSize(14).text(plainTextContent, 50, 50);

        doc.end();
        writeStream.on('finish', () => {
          res.setHeader('Content-Type', 'application/pdf');
         res.setHeader('Content-Disposition', 'attachment; filename="output.pdf"');
 
      stream.pipe(res);
      });

  
}
generate();
module.exports = generate;

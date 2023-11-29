const puppeteer = require('puppeteer');

const generateExcel =async (content,attachmentPath) => {

 const browser = await puppeteer.launch({headless: 'new'});
 const page = await browser.newPage();
 await page.setContent(content);

 await page.pdf({ path: attachmentPath, format: 'A4' });
    console.log("============== generating pdf ================")
 await browser.close();
}
module.exports=generateExcel;
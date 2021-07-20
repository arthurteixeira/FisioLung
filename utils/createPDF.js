const fs = require("fs");
const path = require("path");
const puppeteer = require('puppeteer');
const handlebars = require("handlebars");
const moment = require('moment');
const tmp = require('tmp');


module.exports = {

    async createPDF(pagina, data) {
        var templateHtml = fs.readFileSync(path.join(__dirname, `../views/relatorios/${pagina}.html`), 'utf8');
        var template = await handlebars.compile(templateHtml);
        handlebars.registerHelper('setDate', function (data) {
            moment.locale('pt-bt');
            return moment(data).format("lll")
        })
        var html = template(data);

        let milis = moment().format('LLL');

        const tmpobj = tmp.dirSync({ prefix: 'pdf' });
        var pdfPath = path.join(tmpobj.name, `${data.name}-${milis}.pdf`);

        var options = {
            format: 'A4',
            headerTemplate: "<p></p>",
            footerTemplate: "<p></p>",
            displayHeaderFooter: false,
            printBackground: true,
            path: pdfPath
        }

        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });

        var page = await browser.newPage();

        await page.goto(`data:text/html;charset=UTF-8,${html}`, {
            waitUntil: 'load'
        });

        await page.addScriptTag({ url: "https://code.jquery.com/jquery-3.2.1.slim.min.js" })
        await page.addStyleTag({ url: "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" })
        await page.addScriptTag({ url: "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" })
        await page.addScriptTag({ url: "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" })



        await page.pdf(options);
        await browser.close();

        return pdfPath;
    }
}
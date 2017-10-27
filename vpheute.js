const puppeteer = require('puppeteer'); // controls for headless chrome browser
const cheerio = require('cheerio'); // server implementation of core jQuery
const CREDS = require('./creds');
const user = CREDS.username;
const pw = CREDS.password;
const fs = require('fs'); // file system
const heute = new Date()
const tag = heute.getDate(); // heutiges Tagesdatum, zB 13

async function main(){
  // Seite aufrufen, Seitendatum suchen und prüfen
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  var subpage = 0;
  do {
    subpage = subpage + 1;
    var url = 'https://intranet.zd.schulen.konstanz.de/gpuntis/h/schueler/subst_00' + subpage + '.htm'
    await page.authenticate({username:user, password:pw});
    await page.goto(url, {waitUntil: 'load'});
    var pagedatum = await page.$eval('.mon_title', e => e.innerHTML);  // Ausgabe zB "13.10.2017 Freitag, Woche B"
    var stimmt = (tag == pagedatum.slice(0,2)); // Führende Leerstelle, folgende 2 Zeichen entsprechen dem Tagesdatum
    console.log("Seite hat ", pagedatum, " , und heute ist der ", tag, "., Übereinstimmung ", stimmt);
} while (!stimmt && subpage > 2);

  // Refresh-Tag entfernen
  var regex = /(<meta\shttp-equiv="refresh"[\S\s]*?htm">)/ig
  var body = await page.content();
  var page_stripped = body.replace(regex, "");
  
  // Lokale Datei schreiben
  await fs.writeFile('./vp.html', page_stripped, function(err){
    if (err) throw err;
    console.log("Local file written");});

  // Browser schliesen
  browser.close(); 
  return;
};

main();
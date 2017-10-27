// FTP-upload local file to Web
const JSFtp = require("jsftp");
const FTPCREDS = require('./ftpcreds');
const myhost = FTPCREDS.host;
const myport = FTPCREDS.port;
const myusername = FTPCREDS.username;
const mypassword = FTPCREDS.password;
var Ftp = new JSFtp({
 host: myhost,
 port: myport, // defaults to 21 
 user: myusername, // defaults to "anonymous" 
 pass: mypassword, // defaults to "@anonymous" 
});
console.log('Connecting to FTP host')
Ftp.put('./vp.html', './koehler-kn.de/test/vp.html', function(hadError) {
  if (!hadError) {
    console.log("File transferred successfully!");
    Ftp.raw("quit")
  };
});
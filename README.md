# vertretungsplan
AvHG-Vertretungsplan faster

The official school server changes day-subpages every 15 sec - you have to wait forever to see the actual day's table.
And I'm forced to authenticate myself - are you guarding Fort Knox or something? Hell, it's just a list of cancelled lessons!

vpheute.js gets the actual subpage, strips the refresh-metatag, and stores the html locally. I have this done every morning.
vphorgen.js  gets the subpage of the next school day. I have this done at noon.
ftpupload.js uploads the page to my webspace. Keep learning!

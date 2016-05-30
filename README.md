## shaileopen

Step 1
======

    ionic start [projectname]  blank --v2 --ts

    ionic add android

Removed obsolete ionic.config.js
Added platforms to .gitignore
Added www/build to .gitignore

Added to www/index.html

  <meta http-equiv="Content-Security-Policy" content="default-src *; script-src 'self' 'unsafe-inline' 'unsafe-eval' *; style-src  'self' 'unsafe-inline' *">


Step 2
======

    ionic resources

Test the app on emulators:

    ionic run ios

Install and start Genymotion 

    ionic run android
    
Start developing:

    ionic serve
    
Browse to: http://192.168.57.1:8100/ionic-lab

Add icomoon font: 
- add icomoon.css to app/theme/styles.
- rename it to _icomoon.scss.
- create folder app/fonts and add icomoon.eot, icomoon.svg, icomoon.ttf, icomoon.woff.
- in _icomoon.scss update location of font files (add ../). 
- open app/theme/app.core.scss and add icomoon.scss.
- create a task in gulpfile.js to copy fonts to www/buid/fonts.

Add menu and 4 pages.
- copy home directory
- rename all 'home' to 'categories'.
- in app/theme/app.core.scss add all 4 .scss files from the above directoriers.

Add menu in home.html

Add 4 buttons/tiles for nativation on homepage.

Change meta tag in www/build/index.html to load images

  <meta http-equiv="Content-Security-Policy" content="default-src *; script-src 'self' 'unsafe-inline' 'unsafe-eval' *; style-src  'self' 'unsafe-inline' *; img-src 'self' data:;">

### Improvement: prevent adding menu to every page.

    ionic emulate ios --live-reload --target='iPhone-5s'

Run the app on an iPhone
Run the app on and Andriod device

Step 3
======
Added about page in menu.

Added icons in tiles on home page.

Remove menu in all pages, it is only needed in app.ts.

Added icons to menu.

Added logo image to toolbar.

Added gulp task to copy images.

Added icomoon: home, refresh and about/info icon.

Whitespace around logo image.

Styling and logo in toolbar.

Add icons in menu.

Style tiles on home page.

Add slider with sponsor images (hide pagination bulltes with css).

Added naviagation when clicking tiles on home page.

Changes splashscreen settings


Run the app on an iPhone:
- sudo npm install -g --unsafe-perm ios-deploy
- ionic run ios

Run the app on and Andriod device.
- I do not (yet) have an andriod device.

Step 4
======
Changed data structure.

mongoimport -h ds019470.mlab.com:19470 -d toernooi -c games -u toernooi -p xxxxxxx --file games.json

Create a formatDate Pipe becaue Angular2 date format pipe did not work.

Fixed navigation but still not how I want it!!!

Add services to retrieve data:
- dates (ordered by date)
- games (ordered by date, category)
- categories (ordered by category)
- players (ordered by last name)
- events (ordered by date)

Step 5
======
Query games by date.

Players per alphabet letter.

Better App icon, better splash screen icon.

Spinner during service invocation.

Fix navigation: remove back button when opening from home page.

Refresh current games. 

Fix logo in header.

Filter on players page for surname.

Rotate icon -> image.

Install typings
- npm install -g typings

Install cordova.d.ts en networkinformstion.d.ts
    typings install cordova --ambient --save
    typings install cordova/plugins/networkinformation --ambient --save

Check network connection at startup and give error message if unavailable. 
In browser is navigator.network not available, it only works on a real device!!!

Retrieve and show KNLTB ranking and actual ranking.
- Setup proxy in ionic.config.json to prevent CORS error.
  
Styling of:
- events
- about
- players
- categories
- games page
     
Fixed Spelers header.
Page with poules per schema (with players and results) (wait for datamodel update)
Player detail page with all his/her games (wait for datamodel update).
Show toast message on timeout.

TODO:
- Games page with 3 tabs.


Step 5.1
=========
Watch Lynda.com cources:
- TypeScript
- XCode
- IONIC (1)
- AndroidStudio
- NoSql databases
- Angular2
- NodeJS
- Put ios apps in AppStore.


Step 7
======
Build admin webapp with use of: 
Docker, NodeJs, Express, MongoDB, Mongoose, Angular2, Material Design, JSON Web Tokens.
Responsive.

User roles:
- Administrator (Enter users)
- Super user (Enter dates, categories, players, teams, games, scores)
- User (Enter scores)

CRUD:
- dates
- categories
- events
- players
- teams
- poules
- games
- kwartfinale / halve finale / finale

Step 6
======
Add favorites to persons and store on phone, local db.
Berekenen winnaar, walkover, opgave, niet gespeeld.


Setp 8
======
Refresh dmv websockets.
Refactor css.
Refactor ts.
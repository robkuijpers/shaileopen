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
- copy icomoon.css to www/build/css
- copy icomoon.eot, icomoon.svg, icomoon.ttf, icomoon.woff to www/build/fonts
- insert into index.html <link href="build/css/icomoon.css" rel="stylesheet">
- Better to do this in app directory and add scss but don't know (yet) how to copy fonts with gulp.

Add menu and 4 pages.
- copy home directory
- rename all 'home' to 'categories'.
- in app/theme/app.core.scss add all 4 scss files from above directoriers.

Add menu in home.html

    <ion-navbar *navbar>  
        <button menuToggle>
            <ion-icon name="menu"></ion-icon>
        </button>
        <ion-title>Shaile Open</ion-title>
    </ion-navbar>

Add 4 buttons/tiles for nativation on homepage.

Change meta tag in www/build/index.html to load images

  <meta http-equiv="Content-Security-Policy" content="default-src *; script-src 'self' 'unsafe-inline' 'unsafe-eval' *; style-src  'self' 'unsafe-inline' *; img-src 'self' data:;">

### Improvement: prevent adding menu to every page.

    ionic emulate ios --live-reload --target='iPhone-5s'

Step 3
======
App icon
Add icons to buttons on homepage.
Add styling to menu bar
Add slider with sponsor images


Step 4
======
Check database connection and give error message.
Add services to retrieve data:
- dates
- categories
- players
- games
- events


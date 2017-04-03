# generator-frontend-blick
> Yeoman generator for simple frontend development using gulp, stylus, nunjucks and jshint. This generator is designed to be used in small/medium websites that don't require the complexity of any js framework or the usage of ES2015/2016. For bigger projects, you should look for more specific generators.

## Installation

First, install [Yeoman](http://yeoman.io) and generator-frontend-blick using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g https://github.com/BlickLabs/generator-frontend-blick
```

Then generate your new project:

```bash
yo frontend-blick
```

And it's done! You can now run gulp and start to code!

```bash
gulp
```

**IMPORTANT!**

Yeoman will try to install all the node and bower dependencies that you need to work, but if it fails you will have to run **npm install** and **bower install** before coding. Also, you need to install the following global packages:

```bash
npm install -g gulp bower stylus jshint
```

## Directory structure

Here is a short explanation of each file and directory that is generated (excluding the obvious ones...):

* **.jshintrc**: Contains the jshint settings, feel free to modify it. [Learn more about it](http://jshint.com/docs/options/)
* **gulpfile.js**: Main gulpfile that imports single gulptasks
* **gulpconfig.js**: Configuration file for paths and other values used in gulptasks.
* **gulptasks/**:  A folder that contains individual files for each gulptask that is used by the main gulpfile.
* **src/**: All the code and resources that you will create to your project.
  * **js/**: JS files
    * **app.js**: JS file where you can set global properties and default values.
  * **templates/**: Nunjucks files
    * **partials/**: subfolder that contains the base layout, as well as navbar and footer files. You can add as many partials you need.
      * **base.njk**: Base template (sections extend it)
      * **navbar.njk**: Navigation var. It uses <nav> tag.
      * **footer.njk**: It uses <footer> tag.
    * **sections/**: subfolder that contains all the files that are going to be actual sections on your website.
  * **styl/**: Stylus files
    * **sections/**
    * **partials/**
    * **vars.styl**: Contains declaration of variables
    * **mixins.styl**: Contains declaration of mixins and functions
    * **fonts.styl**: Declaration of fonts
    * **utils.styl**: Utility classes that are not directly part of the website's styles.
    * **base.styl**: Styles shared between all (or most) of sections and that are part of the website's styles. It includes navbar and footer files by default.
    * **main.styl**: Imports all the other files.

## Stylus utilities

**vars.styl**, **mixins.styl** and **utils.styl** files come with some useful resources.

* **vars.styl** (All variables begin with $ symbol)
  * Variables for font-weights (based on [MDN name mapping](https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight)).
  * $baseFontSize: font-size of the whole (desktop) website.

* **mixins.styl**
  * center-block(): Short alias for margin-left: auto; margin-right: auto;
  * remify(pxsize): Transforms a pixel-based size into a rem-based one (depends on $baseFontSize)
  * rfont-size(baseSize, mediaSize, newSize, useMin [default: false]): Assigns a default font-size and a responsive sized based on the media query with the format '@media screen and (mediaType: mediaSize)', where the value of mediaType depends on the value of useMin (true -> min-width)
  * simple-border(side, width, color, style [default: solid]): Creates a border.   
    * **side** parameter could take the following values: 'top', 'bottom', 'right', 'left', 'topbottom', 'leftright', 'notop', 'nobottom', 'noleft', 'noright', 'all'

* **utils.styl**
  * .cover: background-size: cover; background-position: center;
  * .simple-parallax: Uses background-attachment property to emulate a parallax effect (although it's not the same). It is deleted on mobile devices.
  * .vertical-center: Uses flexbox to allow you to finally center vertically anything (Use it in the parent element)

## Gulptasks

All the tasks, with the only exception of **deploy** can take the --production flag. If you don't use it, all the files will be compiled into the build/ directory. If you use it, the destination directory will be dist/, and all the resources are going to be minified. This is useful to keep the development and production final resources separated.

* **build:html**: Renders nunjucks code into html files. Each .njk file inside /templates/sections is going to be rendered into an html file with the same name (e.g. contact.njk -> contact.html)

* **build:styles**: Compiles stylus code into a single css file called main.css

* **build:scripts**: Concatenates all files inside /js folder into a single js named as the project.

* **build:bower**: Concatenates all css and js code of bower dependencies into single files that follow the structure project.libs.extension

* **copy:fonts**: Copies both your custom fonts and bower dependencies' fonts.

* **copy:images**: Copies all images to the destination folder.

* **server:run**: Launches a localserver to serve all destination files

* **server:reload**: Reloads the localserver.

* **create:cname**: Creates a CNAME file with the domain that you want to use in your page

* **deploy**: Uploads /dist folder to github pages.

* **build**: Shorcut for all build:* tasks.

* **watch**: Watches all build:* tasks

* **serve**: Shorcut for server:run and server:reload

* **default**: Launches build, watch and serve tasks.

**IMPORTANT!**

* build:styles and build:scripts taks will concatenate your files in an alphabetical order (try not to create any js file that would be placed before app.js)
* If you use --production, create:cname will be included into the default task. Otherwise, serve and watch will take its place.

## Gulpconfig file

The gulpconfig file manages the paths that gulptasks will use to listen and create files, as well as some values such as the website domain (create:cname). Since you can look at it to see the paths values, we will explain just the last section of the file, the **etc** object.

* **etc**: Contains all values that are not paths and are needed in any gulptask.
  * **domain**: Custom (and already bought) domain for your gh-page. Its default value is '' (empty string). You can use this value, as well as false, undefined and null, to tell the cname gulptask not to create CNAME file.
  * **projectName**: Value that is used by build:html task to access to the original project name that you passed to the generator options.
  * **formattedName**: This property is used by nunjucks templates to access to the project's formatted name (latinized, lowercased and with all spaces replaced by underscores). However, this property is an alias for the package variable of the gulpconfig file. This means that if you want to change its value you'd rather change the **package**'s value, since **outputs** object also depends on this value.

## Generator options

> Project name (default: directory name)

This is the name that will be used in the package.json and bower.json files. It's also the name of the index section.

> Only-frontend project (default: true)

If false, the following gulptasks won't be available:
 * build:html
 * server (both run and reload)
 * create:cname
 * deploy

Additionally, the whole src/templates directory won't be generated.

> CSS Framework (default: Bootstrap)

CSS Framework that you will use. This helps you by writing the proper bower overrides. If you don't choose any framework (=Other), normalize-css will be included instead.

> Use Font Awesome (default: true)

It works just like the css framework option.

## Section subgenerator

You can create a new section, with its respective nunjucks and stylus files, by running

```bash
yo frontend-blick:section
```

> Section name (default: Contact)

Text that will be used in the title tag of this section. It's also the name of the file, formatted just as follows:

'About us' generates 'about_us.njk'

> Create stylus file (default: true)

Lets you choose if you want to create the stylus empty file inside styl/sections

You can use the --name flag to change the default section name

```bash
yo frontend-blick:section --name='Gallery'
```

**IMPORTANT!**

If your project was generated as an only-frontend one, this subgenerator won't be useful (nunjucks templates won't be compiled).

## Blick's frontend workflow

This README only describes the structure of the generated files, as well as the usage of the different gulptasks and the gulpconfig file. However, there are some extra stuff that you need to know about how frontend development is made in blick, such as styleguides and naming rules. This extra information is described in [the project's wiki](https://github.com/BlickLabs/generator-frontend-blick/wiki)

## Using NVM?

If after installing the generator you are still unable to use it? You may want to see [this issue](https://github.com/yeoman/yo/issues/406) in the yeoman repository.

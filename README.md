# andpopup

> easy popup? andpopup with sent form!

#### install

```
$ npm i andpopup
```

#### Example using

Add a link to the css file in your `<head>`:

```html
<link rel="stylesheet" href="your-project-name/andpopup/andpopup.min.css">
```

Then, before your closing `<body>` tag add:

```html
<script src="your-project-name/andpopup/andpopup.min.js"></script>
```

Easy popup connection:

```
let modal = new Andpopup('.open-popup', { //Clicking on an item opens your popup
        popupSelector: '.popup' //Your popup
    });
```

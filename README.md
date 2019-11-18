# andpopup

> easy popup? andpopup with sent form!

#### install

```
$ npm i andpopup
```

#### Example using

Add a link to the css file in your `<head>`:

```
<link rel="stylesheet" href="your-project-name/andpopup/andpopup.min.css">
```

Then, before your closing `<body>` tag add:

```
<script src="your-project-name/andpopup/andpopup.min.js"></script>
```

Easy popup connection:

```
let modal = new Andpopup('.open-popup', { *//Clicking on an item opens popup*
        popupSelector: '.popup'
    });
```

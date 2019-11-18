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

Easy popup connection.

HTML:

```html
<div class="andpopup popup">
    <h2>Modal window</h2>
    <ul>
        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, totam!</li>
        <li>Lorem ipsum dolor sit.</li>
        <li>Lorem ipsum dolor sit amet, consectetur.</li>
    </ul>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias aliquid eligendi magni maiores
        odio
        porro repellendus. Alias consectetur deleniti dicta eligendi inventore modi, optio qui repudiandae
        voluptatibus.
        Amet architecto atque cum cupiditate distinctio ducimus eveniet facere fuga fugiat ipsum, itaque maxime
        mollitia
        natus nemo obcaecati tempore ut veniam voluptatum!</p>
</div>
```

JavaScript:

```javascript
let modal = new Andpopup('.open-popup', { //Clicking on an item opens your popup
        popupSelector: '.popup' //Your popup
    });
```

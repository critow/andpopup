# andpopup

> easy popup? andpopup with sent form!

### demo
https://critow.github.io/index.html

### install

```
$ npm i andpopup
```

### Example using

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
<button class="open-popup">Open popup</button>

<div class="andpopup popup"> //Do not forget about the class 'andpopup'
    <h2>Modal window</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias aliquid eligendi magni maiores
        odio porro repellendus.</p>
</div>
```

JavaScript:
```javascript
let modal = new Andpopup('.open-popup', { //Clicking on an item opens your popup
        popupSelector: '.popup' //Your popup
    });
```

Popup with send form.

HTML:
```html
<button class="open-popup">Open popup</button>

<div class="andpopup submit-popup">
    <h2>Send popup</h2>
    <form id="submit-form">
        <label for="name">name</label>
        <input type="text" name="name" id="name" required>
        <label for="phone">phone</label>
        <input type="tel" name="phone" id="phone" required>
        <button type="submit">send</button>
    </form>
</div>
```

JavaScript:
```javascript
let modal = new Andpopup('.open-popup', {
        popupSelector: '.submit-popup',
        sendForm: {
            filePath: `${SITEDATA.themepath}/obr.php`, //Your path to the handler
            formSelector: '#submit-form'
        }
    });
```

### Options

All options

```javascript
let modal = new Andpopup('.open-modal', {
        popupSelector: '.modal',
        sendForm: {
            filePath: `${SITEDATA.themepath}/obr.php`,
            formSelector: '#submit-form-3',
            successImage: 'url(https://hetic.in/wp-content/uploads/2018/02/check.gif)',
            successText: 'Form submit',
            errorImage: 'url(https://unowp.com/wp-content/uploads/2017/08/white-screen-of-death.png)',
            errorText: 'Error!!!',
            loadImage: 'url(https://i.pinimg.com/originals/3f/2c/97/3f2c979b214d06e9caab8ba8326864f3.gif)'
        }
    });
```

import keyboardEnglish from './keyboardEnglish.js'
import keyboardPortuguese from './keyboardPortuguese.js'
import './style.css';

const body = document.getElementsByTagName('body')[0];
let language = keyboardEnglish;

let section = createElement('container', 'section', 'class')
body.appendChild(section)
let div = createElement('blockTextarea', 'div', 'class')
section.appendChild(div)
let textarea = createElement('textarea', 'textarea', 'class')
div.appendChild(textarea)

div = createElement('blockKeyboard', 'div', 'id')
section.appendChild(div)



//create keyboard
function createKeybord(language) {

    let htmlElements = language.map(el => {
        let button = createElement(`button-key ${el.code}`, 'button', 'class');
        button.setAttribute('id', el.code);

        button.innerText = el.small
        return button;
    });

    htmlElements.forEach(element => {
        div.appendChild(element);
    });
    createTxt()
}
createKeybord(keyboardEnglish)

//Click Tab
document.querySelector("textarea").document.addEventListener('keydown', e => {

    if (e.key === 'Tab') {
        let parent = document.getElementById("Tab");
        parent.innerHTML = '  ';
    }
})

// click shift change size
document.addEventListener('keydown', e => {

    if (e.key === 'Shift') {
        let parent = document.getElementById("blockKeyboard");
        parent.innerHTML = '';
        let htmlElements = language.map(el => {
            let button = createElement(`button-key ${el.code}`, 'button', 'class');
            button.setAttribute('id', el.code);
            button.innerText = el.shift
            return button;
        });

        htmlElements.forEach(element => {
            div.appendChild(element);
        });
        createTxt()
    }
})


document.addEventListener('keyup', e => {

    if (e.key === 'Shift') {
        let parent = document.getElementById("blockKeyboard");
        parent.innerHTML = '';
        createKeybord(language);
    }

})

// click CapsLock change letter
const getKeyCapsLock = []
document.addEventListener('keydown', e => {
    let parent = document.getElementById("blockKeyboard");
    if (e.key === 'CapsLock' && getKeyCapsLock.length === 0) {
        getKeyCapsLock.push(e.key)
        parent.innerHTML = '';
        let htmlElements = language.map(el => {
            let button = createElement(`button-key ${el.code}`, 'button', 'class');
            button.setAttribute('id', el.code);
            button.innerText = el.shift
            return button;
        });

        htmlElements.forEach(element => {
            div.appendChild(element);
        });
        createTxt()
    } else if (getKeyCapsLock.length === 1) {
        parent.innerHTML = '';
        createKeybord(language);
        getKeyCapsLock.length = 0;
    }
})

//change color 
document.addEventListener('keydown', e => {
    document.querySelector(`#${e.code}`).style.background = '#4169e1d4';
    document.querySelector(`#${e.code}`).style.borderRadius = '50px';
})
document.addEventListener('keyup', (e => {
    document.querySelector(`#${e.code}`).style.background = 'transparent';
    document.querySelector(`#${e.code}`).style.borderRadius = '5px';
}))

//change language
const getKeyValue = []

function changeLanguageKeyboard() {
    document.addEventListener('keydown', e => {
        getKeyValue.push(e.key)
        if (getKeyValue.length == 2) {
            const buttonsChangeLanguage = ['Control', 'Alt', 'AltGraph']
            const containsAll = getKeyValue.every(e => buttonsChangeLanguage.includes(e))

            if (containsAll && language == keyboardEnglish) {

                let parent = document.getElementById("blockKeyboard");
                parent.innerHTML = '';
                language = keyboardPortuguese
                createKeybord(language);
                getKeyValue.length = 0;

            } else if (containsAll && language == keyboardPortuguese) {

                let parent = document.getElementById("blockKeyboard");
                parent.innerHTML = '';
                language = keyboardEnglish
                createKeybord(language);
                getKeyValue.length = 0;
            }
        }
    })
}
changeLanguageKeyboard()

document.addEventListener('keyup', e => {
    getKeyValue.length = 0;
});

//CREATE ELEMENT HTML
function createElement(nameclass, element, type) {
    if (!nameclass) {
        let newElement = document.createElement(`${element}`)
        return newElement
    } else {
        keyboardEnglish
        let newElement = document.createElement(`${element}`)
        newElement.setAttribute(`${type}`, `${nameclass}`)
        return newElement
    }
}

//CREATE TEXT
function createTxt() {
    let p = createElement(null, 'p', 'class')
    p.innerHTML = 'The keyboard was created in the linux operating system'
    div.appendChild(p)
    p = createElement(null, 'p', 'class')
    p.innerHTML = 'To change the language, the combination: left ctrl + alt'
    div.appendChild(p)

}

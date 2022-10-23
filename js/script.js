/*Dato un array di oggetti letterali con:
-url dell’immagine
-titolo
-descrizione
Creare un carosello come nella foto allegata.
Milestone 0:
Come sempre focalizziamoci prima sulla creazione del markup statico: costruiamo il container e inseriamo l'immagine grande in modo da poter stilare lo slider.
Milestone 1:
Ora rimuoviamo i contenuti statici e usiamo l’array di oggetti letterali per popolare dinamicamente il carosello.
Al click dell'utente sulle frecce verso sinistra o destra, l'immagine attiva diventerà visibile e dovremo aggiungervi titolo e testo.
Milestone 2:
Aggiungere il **ciclo infinito** del carosello. Ovvero se la miniatura attiva è la prima e l'utente clicca la freccia verso destra, la miniatura che deve attivarsi sarà l'ultima e viceversa per l'ultima miniatura se l'utente clicca la freccia verso sinistra.
BONUS 1:
Aggiungere le thumbnails (sottoforma di miniatura) ed al click attivare l’immagine corrispondente.
BONUS 2:
Aggiungere funzionalità di autoplay: dopo un certo periodo di tempo (3 secondi) l’immagine attiva dovrà cambiare alla successiva.
BONUS 3:
Aggiungere bottoni di start/stop e di inversione del meccanismo di autoplay.*/

const images = [
    {
        url: 'http://www.viaggiareonline.it/wp-content/uploads/2014/11/sweden_148857365.jpg',
        title: 'Svezia',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },

    {
        url: 'https://static1.evcdn.net/images/reduction/1513757_w-1920_h-1080_q-70_m-crop.jpg',
        title: 'Perù',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },

    {
        url: 'https://img.itinari.com/pages/images/original/0d3ed180-d22d-48e8-84df-19c4d888b41f-62-crop.jpg?ch=DPR&dpr=2.625&w=1600&s=7ebd4b5a9e045f41b4e0c7c75d298d6c',
        title: 'Chile',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },
    {
        url: 'https://static1.evcdn.net/images/reduction/1583177_w-1920_h-1080_q-70_m-crop.jpg',
        title: 'Argentina',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },
    {
        url: 'https://cdn.sanity.io/images/24oxpx4s/prod/ed09eff0362396772ad50ec3bfb728d332eb1c30-3200x2125.jpg?w=1600&h=1063&fit=crop',
        title: 'Colombia',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },
];

const Wrapper = document.querySelector('.wrapper');
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');

for (let i = 0; i < images.length; i++) {
    Wrapper.innerHTML +=
        `<div class="images">
        <img src="${images[i].url}" class="img">
        <h2 class='title'>${images[i].title} &#128205;</h2>
        <h3 class='description'>${images[i].description}</h3>
        </div>`;
}

const image = document.querySelectorAll('.img');
const title = document.querySelectorAll('.title');
const description = document.querySelectorAll('.description');

let frame = 0;
addShow();

const thumbnails = document.querySelector('.thumbnails');

for (let c = 0; c < images.length; c++) {
    let thumb = document.createElement('img');
    thumb.src = images[c].url;
    thumb.classList.add('thumbnails-img');
    thumb.addEventListener('click',
        function () {
            removeShow();
            frame = c;
            addShow();
            thumbnailsIMG[index].classList.remove('img-frame');
            index = c;
            thumbnailsIMG[index].classList.add('img-frame');
        }
    );
    thumbnails.append(thumb);
}

const thumbnailsIMG = document.querySelectorAll('.thumbnails-img');
let index = 0;
thumbnailsIMG[index].classList.add('img-frame');

next.addEventListener('click', NextImg);

prev.addEventListener('click', PrevImg);

const BtnStartCarousel = document.getElementById('btn-start');
const BtnStopCarousel = document.getElementById('btn-stop');
const BtnReverseCarousel = document.getElementById('btn-reverse');
let interval;

BtnStartCarousel.addEventListener('click',
    function () {
        clearInterval(interval);
        interval = setInterval(NextImg, 3000);
    }
);

BtnStopCarousel.addEventListener('click',
    function () {
        clearInterval(interval);
    }
);

BtnReverseCarousel.addEventListener('click',
    function () {
        clearInterval(interval);
        interval = setInterval(PrevImg, 3000);
    }
);

function addShow() {
    image[frame].classList.add('show');
    title[frame].classList.add('show');
    description[frame].classList.add('show');
}

function removeShow() {
    image[frame].classList.remove('show');
    title[frame].classList.remove('show');
    description[frame].classList.remove('show');
}

function NextImg() {
    removeShow();
    thumbnailsIMG[index].classList.remove('img-frame');
    frame++;
    index++;
    if (frame == images.length) {
        frame = 0;
    }
    if (index == images.length) {
        index = 0;
    }
    addShow();
    thumbnailsIMG[index].classList.add('img-frame');
}

function PrevImg() {
    removeShow();
    thumbnailsIMG[index].classList.remove('img-frame');
    frame--;
    index--;
    if (frame == images.length - 6) {
        frame = 4;
    }
    if (index == images.length - 6) {
        index = 4;
    }
    addShow();
    thumbnailsIMG[index].classList.add('img-frame');
}
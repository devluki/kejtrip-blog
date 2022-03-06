// Burger menu for mobile view
const burger = document.querySelector('.nav__burger-container');
const navLinksContainer = document.querySelector('.nav__links');
const navLinks = document.querySelectorAll('.nav__link');
const navLogo = document.querySelector('.nav__logo-img');
// Slider constraints
const slides = document.querySelectorAll('.articles__slide');

const arrowLeft = document.querySelector('.btn__slide--left');
const arrowRight = document.querySelector('.btn__slide--right');
const dots = document.querySelectorAll('.articles__slider-dot')
let index = 0;
// Sticky navigation
const nav = document.querySelector('.nav');
const header = document.querySelector('.header')
// Map Z-index
const maps = document.getElementById('map')

// Z-index of map
maps.style.zIndex = 1;

// Mobile menu

// Toogle class on mobile menu elementys
const burgerMenuToggle = function () {
    [burger, navLinksContainer, navLogo].forEach(item => item.classList.toggle('menu--active'))
    console.log('click');
}


// Event listeners
navLinks.forEach(navLink => navLink.addEventListener('click', function () {
    if (window.innerWidth > 1024) return
    burgerMenuToggle()
}))
burger.addEventListener('click', burgerMenuToggle);





// Smooth scrolling

const smoothScroll = function (id) {
    document.querySelector(id).scrollIntoView({
        behavior: 'smooth'
    });
}

navLinksContainer.addEventListener('click', function (e) {
    e.preventDefault();



    if (e.target.classList.contains('nav__link')) {
        const id = e.target.getAttribute('href');

        smoothScroll(id);
    };

    if (e.target.classList.contains('nav-icon')) {
        const id = e.target.parentElement.getAttribute('href');
        smoothScroll(id);
    };
});




// Slider
// Basic function to organize slider layout and change slides
const slidePosition = function () {
    slides.forEach((slide, i) => slide.style.transform = `translateX(${(index - i)*150-50}%)`)

    dots.forEach(dot => dot.classList.remove('slider__dot--active'));
    dots[index].classList.add('slider__dot--active');
}

slidePosition();



const moveSlideRight = function () {
    if (index === slides.length - 1) return
    index++
    slidePosition()

    console.log('click right', index);
}
const moveSlideLeft = function () {
    if (index === 0) return
    index--;
    slidePosition();

    console.log('click left', index);
}


// Swipe posts

let initialX = null;
let initialY = null;

const startTouch = function (e) {
    initialX = e.touches[0].clientX;
    initialY = e.touches[0].clientY;
};

function moveTouch(e) {
    if (initialX === null || initialY === null) return;

    let currentX = e.touches[0].clientX;
    let currentY = e.touches[0].clientY;
    let diffX = initialX - currentX;
    let diffY = initialY - currentY;
    if (Math.abs(diffX) > Math.abs(diffY)) {
        diffX > 0 ? moveSlideLeft() : moveSlideRight();


    }
    initialX = initialY = null;
    e.preventDefault();
};


slides.forEach(slide => {
    slide.addEventListener('touchstart', startTouch, false);
    slide.addEventListener('touchmove', moveTouch, false);
});

arrowRight.addEventListener('click', moveSlideRight);
arrowLeft.addEventListener('click', moveSlideLeft);

dots.forEach((dot, i) => dot.addEventListener('click', function () {
    index = i;
    slidePosition();
}));

// TO DO INFINITE SLIDER??




//Sticky navigation -> OBSERVER API

const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
    const [entry] = entries;


    if (!entry.isIntersecting) nav.classList.add('sticky');
    else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);


// Leaflet
// map ------------------

var map = L.map('map', {

    dragging: window.innerWidth < 1024 ? false : true,
    tap: window.innerWidth < 1024 ? false : true,

    inertia: false,
    scrollWheelZoom: false,
}).setView([10.01, -84.221388888889], 3);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiemFiaWVnbGkiLCJhIjoiY2t0eGE5NjhkMTJsczMwbXhkb2N0Y2UxZCJ9.9LFCbpbXL3o5trk3NM7WRw', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    minZoom: 3,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(map);


// Pin - icon

var pinkIcon = L.icon({
    iconUrl: './IMG/marker-icon.png',
    // shadowUrl: 'leaf-shadow.png',

    iconSize: [30, 50], // size of the icon
    // shadowSize: [50, 64], // size of the shadow
    iconAnchor: [15, 50], // point of the icon which will correspond to marker's location
    // shadowAnchor: [4, 62], // the same for the shadow
    // popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});
L.marker([9.976416, -83.85344], {
    icon: pinkIcon
}).addTo(map).bindPopup("<b>Kostaryka</b><br>brvolcán irazú</br><br><biutton class='btn'>Zobacz więcej</button>").closePopup();

L.marker([8.976416, -73.85344], {
    icon: pinkIcon
}).addTo(map).bindPopup("<b>Kostaryka</b><br>brvolcán irazú</br><br>").closePopup();


// Random quote gnerator

const motivationQuote = [{
    quote: 'Jeśli myślisz, że przygody bywają niebezpieczne, spróbuj rutyny. Ona jest śmiercionośna.',
    author: 'Paulo Coelho'
}, {
    quote: 'Turyści nie wiedzą gdzie byli, podróżnicy nie wiedzą gdzie będą.',
    author: 'Paul Theroux'
}, {
    quote: 'Życie albo jest śmiałą przygodą, albo niczym.',
    author: 'Helen Keller'
}, {
    quote: 'Przygoda warta jest każdego trudu.',
    author: 'Arystoteles'
}, {
    quote: 'Za dwadzieścia lat bardziej będziesz żałował tego czego nie zrobiłeś, niż tego co zrobiłeś. Więc odwiąż liny, opuść bezpieczną przystań. Złap w żagle pomyślne wiatry. Podróżuj. Śnij. Odkrywaj.',
    author: 'Mark Twain'
}, {
    quote: 'Najważniejsze w życiu jest nie to, co posiadamy, lecz kogo spotykamy.',
    author: 'J. M. Lawrence'
}];


const markupParentEl = document.querySelector('.destinations__motivation-quote-container');

let quote = '';

const randomNumberGenerator = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

const randomQuoteGenerator = function () {
    markupParentEl.innerHTML = '';

    const quoteIndex = randomNumberGenerator(0, motivationQuote.length);
    quote = motivationQuote[quoteIndex]
    const markup = `
        <p class="motivation__quote">${quote.quote}</p>
    <p class="motivation__quote-author">${quote.author}</p>
    `;

    // console.log(markup);

    markupParentEl.insertAdjacentHTML('afterbegin', markup);
}


setInterval(randomQuoteGenerator, 5000)
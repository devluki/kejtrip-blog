// Burger menu for mobile view
const burger = document.querySelector('.nav__burger-container');
const navLinks = document.querySelector('.nav__links');
const navLogo = document.querySelector('.nav__logo-img');
// Slider constraints
const slides = document.querySelectorAll('.articles__slide');
const arrowLeft = document.querySelector('.btn__slide--left');
const arrowRight = document.querySelector('.btn__slide--right');
const dots = document.querySelectorAll('.articles__slider-dot')
let index = 0;



burger.addEventListener('click', function () {
    [burger, navLinks, navLogo].forEach(item => item.classList.toggle('menu--active'))
    console.log('click');
})



// Slider

const slidePosition = function () {
    slides.forEach((slide, i) => slide.style.transform = `translateX(${(index - i)*150-50}%)`)

    dots.forEach(dot => dot.classList.remove('slider__dot--active'));
    dots[index].classList.add('slider__dot--active');
}

slidePosition();

arrowRight.addEventListener('click', function () {

    if (index === slides.length - 1) return
    index++
    slidePosition()

    console.log('click right', index);


})

arrowLeft.addEventListener('click', function () {
    if (index === 0) return
    index--;
    slidePosition();

    console.log('click left', index);
})

dots.forEach((dot, i) => dot.addEventListener('click', function () {
    index = i;
    slidePosition();
}))
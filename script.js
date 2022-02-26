const burger = document.querySelector('.nav__burger-container');
const navLinks = document.querySelector('.nav__links')
const navLogo = document.querySelector('.nav__logo-img')



burger.addEventListener('click', function () {
    navLinks.classList.toggle('menu--active');
    navLogo.classList.toggle('menu--active');

    console.log('click');
})
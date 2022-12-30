const info = document.querySelector('.info');
const offScreendrop = document.querySelector('.offscreenInfo');
    info.addEventListener('click',() => {
        offScreendrop.classList.toggle('active');
});

const menu = document.querySelector('.hamburgerMenu');
const offScreen = document.querySelector('.offScreenMenu');
menu.addEventListener('click',() => {
    menu.classList.toggle('active');
    offScreen.classList.toggle('active');
});

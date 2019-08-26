//variables

let nav = document.getElementById('nav');
let menu = document.getElementById('links');
let abrir = document.getElementById('open');
let botones = document.getElementsByClassName('btn-header');
let cerrado = true;

//funciones

const menus = () => {
    let desplazamientoActual = window.pageYOffset;

    if(desplazamientoActual <= 315) {
        nav.classList.remove('nav2');
        nav.className = ('nav1');
        nav.style.transition = '1s';
        menu.style.top = '80px';
        abrir.style.color = '#fff';
    }else {
        nav.classList.remove('nav1');
        nav.className = ('nav2');
        abrir.style.color = '#000';
    }
};

const apertura = () => {
    if(cerrado) {
        menu.style.width = '70vw';
        cerrado = false;
    }else {
        menu.style.width = '0%';
        menu.style.overflow = 'hidden';
        cerrado = true;
    }
};

//eventos

window.addEventListener('load', () => {
    $('#onLoad').fadeOut();
    $('body').removeClass('hidden');
    menus();
});

window.addEventListener('click', (e) => {
    if(!cerrado) {
        let span = document.querySelector('span');
        if(e.target !== span && e.target !== abrir) {
            menu.style.width = '0%';
            menu.style.overflow = 'hidden';
            cerrado = true;
        }
    }else {

    }
});

window.addEventListener('scroll', () => {
    menus();
});

window.addEventListener('resize', () => {
    if(screen.width >= 700) {
        cerrado = true;
        menu.style.removeProperty('overflow');
        menu.style.removeProperty('width');
    }
});

abrir.addEventListener('click', () => {
    apertura();
});
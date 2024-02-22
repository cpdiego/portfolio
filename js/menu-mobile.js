const btnMenu = document.getElementById('open-menu')
const menuMobile = document.getElementById('menu-mobile')

function animarMenu() {
    menuMobile.classList.toggle('abrir')
    btnMenu.classList.toggle('ativo')

    if (btnMenu.classList.contains('bx-menu')) {
        btnMenu.classList.remove('bx-menu')
        btnMenu.classList.add('bx-x')
    } else {
        btnMenu.classList.remove('bx-x')
        btnMenu.classList.add('bx-menu')
    }
}

menuMobile.addEventListener('click', animarMenu)
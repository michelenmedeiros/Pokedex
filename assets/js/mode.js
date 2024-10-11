function toggleTheme() {
    document.body.classList.toggle('light-mode');
}
const toggleMenuBtn = document.getElementById('toggleMenu');
const menu = document.getElementById('menu');

toggleMenuBtn.addEventListener('click', () => {
    menu.classList.toggle('hidden');

});

const themeButton = document.querySelector('#menu li:last-child'); // Seleciona o último item do menu

themeButton.addEventListener('click', () => {
    document.body.classList.toggle('light-mode'); // Assume que você tem uma classe 'dark-mode' no CSS para alterar o tema
});
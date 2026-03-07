
const modal = document.querySelector('.search-model');
const searchBtn = document.querySelector('.search-switch');
const closeBtn = modal.querySelector('.search-close-switch');
const searchInput = modal.querySelector('#search-input');

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.style.display = 'block';
    searchInput.focus();
});

closeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.style.display = 'none';
});

searchInput.addEventListener('input', (e) => {
    console.log('search-input value: ', e.target.value);
});


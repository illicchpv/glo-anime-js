
const elements = document.querySelectorAll('.set-bg');

elements.forEach((element) => {
  const bg = element.getAttribute('data-setbg');
  element.style.backgroundImage = `url(${bg})`;
});
const elements = () => {
  const elements = document.querySelectorAll('.set-bg');

  elements.forEach((element) => element.style.backgroundImage = `url(${element.dataset.setbg})`);
};

elements();
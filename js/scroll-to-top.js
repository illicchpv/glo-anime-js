const scroll = () => {

  const scrollToTopButton = document.getElementById('scrollToTopButton');

  scrollToTopButton.addEventListener('click', (e) => {
    e.preventDefault();
    // window.scrollTo({ // это решение работает с ошибкими
    //     top: 0,
    //     behavior: 'smooth',
    // });
    seamless.scrollIntoView(document.querySelector('.header'), {
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
  });
};
scroll();
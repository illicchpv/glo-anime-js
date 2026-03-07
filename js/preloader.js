const preloader = () => {
  // console.log("Preloader script loaded");

  const preloader = document.getElementById('preloder');
  preloader.classList.add('active');

  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      preloader.classList.remove('active');
    }, 500);
  });
};

preloader();

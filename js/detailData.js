const detailData = () => {
  const preloader = document.getElementById('preloder');

  // Загрузка данных
  {
    fetch('db.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const itemParam = new URLSearchParams(window.location.search).get('itemId');

        const ganres = new Set();
        data.anime.forEach(anime => ganres.add(anime.ganre));
        // const sotred5 = data.anime.sort((a, b) => b.views - a.views).slice(0, 5);

        renderGanres(ganres);
        // renderTopAnime(sotred5);
        renderAnimeDetails(data.anime, itemParam);

        setTimeout(() => preloader.classList.remove('active'), 500);
      });
  }

  // Рендер жанров
  function renderGanres(ganres) {
    const dropdownBlock = document.querySelector('.header__menu .dropdown');
    dropdownBlock.innerHTML = '';

    ganres.forEach(ganre => {
      dropdownBlock.insertAdjacentHTML('beforeend', `
        <li><a href="./categories.html?ganre=${ganre}">${ganre}</a></li>
      `);
    });
  };

  // Рендер список аниме
  function renderAnimeDetails(animeList, itemId) {
    if (!itemId) return console.error('itemId is required');
    const anime = animeList.find(anime => anime.id == itemId);
    if (!anime) return console.error('Anime not found');

    const imageBlock = document.querySelector('.anime__details__pic');
    const viewBlock = imageBlock.querySelector('.view');
    const titleBlock = document.querySelector('.anime__details__title h3');
    const subtitleBlock = document.querySelector('.anime__details__title span');
    const detailsBlock = document.querySelector('.anime__details__text p');
    const widgetListBlock = document.querySelectorAll('.anime__details__widget ul li');
    const breadcrumbBlock = document.querySelectorAll('.breadcrumb__links a');
    const breadcrumbBlock2 = document.querySelector('.breadcrumb__links span');

    imageBlock.dataset.setbg = anime.image;
    viewBlock.innerHTML = `<i class="fa fa-eye"></i> ${anime.views}`;
    titleBlock.textContent = anime.title;
    subtitleBlock.textContent = anime['original-title'];
    detailsBlock.textContent = anime.description;

    widgetListBlock[0].innerHTML = `<span>Date aired:</span> ${anime['date']}`;
    widgetListBlock[1].innerHTML = `<span>Rating:</span> ${anime.rating}`;
    widgetListBlock[2].innerHTML = `<span>Genre:</span> ${anime.tags.join(', ')}`;

    breadcrumbBlock[1].outerHTML = `<a href="./categories.html?ganre=${anime.ganre}">Categories</a>`;
    breadcrumbBlock2.textContent = anime.ganre;

    document.querySelectorAll('.set-bg').forEach((element) => element.style.backgroundImage = `url(${element.dataset.setbg})`);
  }

  // // Рендер топ аниме
  // function renderTopAnime(animeList) {
  //   const wrapper = document.querySelector('.filter__gallery');
  //   wrapper.innerHTML = '';

  //   animeList.forEach(anime => {
  //     wrapper.insertAdjacentHTML('beforeend', `
  //       <div class="product__sidebar__view__item set-bg mix" 
  //         data-setbg="${anime.image}" 
  //       >
  //         <div class="ep">${anime.rating} / 10</div>
  //         <div class="view"><i class="fa fa-eye"></i> ${anime.views}</div>
  //         <h5><a href="/anime-details.html">${anime.title}</a></h5>
  //       </div>
  //     `);
  //   });
  //   wrapper.querySelectorAll('.set-bg').forEach((element) => element.style.backgroundImage = `url(${element.dataset.setbg})`);
  // };

};

detailData();

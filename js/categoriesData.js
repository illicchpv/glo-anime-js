const categoriesData = () => {
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
        const ganreParam = new URLSearchParams(window.location.search).get('ganre');

        const ganres = new Set();
        data.anime.forEach(anime => ganres.add(anime.ganre));
        const sotred5 = data.anime.sort((a, b) => b.views - a.views).slice(0, 5);

        renderGanres(ganres);
        renderTopAnime(sotred5);
        renderAnimeList(data.anime, ganreParam ? [ganreParam] : ganres);

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
  function renderAnimeList(animeList, ganres) {
    const wrapper = document.querySelector('.product .col-lg-8');
    wrapper.innerHTML = '';

    ganres.forEach(ganre => {
      const productBlock = document.createElement('div');
      productBlock.classList.add('mb-5');
      productBlock.insertAdjacentHTML('beforeend', `
        <div class="row">
          <div class="col-lg-8 col-md-8 col-sm-8">
            <div class="section-title">
              <h4>${ganre}</h4>
            </div>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-4">
            <div class="btn__all">
              <a href="/categories.html?ganre=${ganre}" class="primary-btn">View All <span class="arrow_right"></span></a>
            </div>
          </div>
        </div>
      `);

      const list = animeList.filter(anime => anime.ganre === ganre || anime.tags.includes(ganre));
      const listBlock = document.createElement('div');
      listBlock.classList.add('row');
      list.forEach(anime => {
        listBlock.insertAdjacentHTML('beforeend', `
          <div class="col-lg-4 col-md-6 col-sm-6">
            <div class="product__item">
              <div class="product__item__pic set-bg" data-setbg="${anime.image}">
                <div class="ep">${anime.rating} / 10</div>
                <div class="view"><i class="fa fa-eye"></i> ${anime.views}</div>
              </div>
              <div class="product__item__text">
                <ul>
                  ${anime.tags.map(tag => `<li>${tag}</li>`).join('')}
                </ul>
                <h5><a href="/anime-details.html?itemId=${anime.id}">${anime.title}</a></h5>
              </div>
            </div>
          </div>
        `);
      });

      productBlock.appendChild(listBlock);
      wrapper.appendChild(productBlock);

    });
    wrapper.querySelectorAll('.set-bg').forEach((element) => element.style.backgroundImage = `url(${element.dataset.setbg})`);
  }

  // Рендер топ аниме
  function renderTopAnime(animeList) {
    const wrapper = document.querySelector('.filter__gallery');
    wrapper.innerHTML = '';

    animeList.forEach(anime => {
      wrapper.insertAdjacentHTML('beforeend', `
        <div class="product__sidebar__view__item set-bg mix" 
          data-setbg="${anime.image}" 
        >
          <div class="ep">${anime.rating} / 10</div>
          <div class="view"><i class="fa fa-eye"></i> ${anime.views}</div>
          <h5><a href="/anime-details.html">${anime.title}</a></h5>
        </div>
      `);
    });
    wrapper.querySelectorAll('.set-bg').forEach((element) => element.style.backgroundImage = `url(${element.dataset.setbg})`);
  };

};

categoriesData();
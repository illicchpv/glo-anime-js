const mainData = () => {

  fetch('db.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const ganres = new Set();
      data.anime.forEach(anime => {
        ganres.add(anime.ganre);
      });
      renderAnimeList(data.anime, ganres);

      const sotred5 = data.anime.sort((a, b) => b.views - a.views).slice(0, 5);
      renderTopAnime(sotred5);
    })
    .catch(error => {
      console.error('Error:', error);
    });

  function renderAnimeList(animeList, ganres) {
    console.log('animeList: ', animeList);
    console.log('ganres: ', ganres);
  }

  function renderTopAnime(animeList) {
    const wrapper = document.querySelector('.filter__gallery');
    wrapper.innerHTML = '';

    animeList.forEach(anime => {
      wrapper.insertAdjacentHTML('afterbegin', `
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

mainData();

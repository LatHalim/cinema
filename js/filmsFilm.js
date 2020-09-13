const url = 'https://kinopoiskapiunofficial.tech/api/v2.1';
const filmsElement = document.getElementById('films');
const tabletFilmsElement = document.getElementsByClassName('movie-list__table')[0];

const films = [
  568413,
  530,
  1045172,
  1005878,
  535341,
  1236063
];

const getFilmById = function (id) {
  return new Promise(function (resolve, reject) {
    fetch(`${url}/films/${id}`, {
      headers: {
        "X-API-KEY": "380ca7cb-582d-4bd3-b879-8b59e83d9046"
      }
    }).then(response => response.json()).then(resolve)
  })
}

const parseFilm = function (data) {
  data = data.data;
  let countries = '';
  let genres = '';

  data.genres.forEach(function (item) {
    genres += `${item.genre} `
  })
  data.countries.forEach(function (item) {
    countries += `${item.country} `
  })
  return {
    name: data.nameRu,
    country: countries,
    genre: genres,
    year: data.year,
    description: data.description,
    img: data.posterUrl,
    link: data.webUrl
  }
}
const generateFilmItem = function ({
  name,
  country,
  genre,
  year,
  description,
  img,
  link
}) {
  return ` 
        <div class="cinema__movie1">
                    <div class="cinema__relative">
                        <div class="cinema__img">
                            <img src="${img}" alt="">
                        </div>
                        <div class="cinema__descr">
                            <div class="cinema__text1">${name}</div>
                            <div class="cinema__sep"></div>
                            <div class="cinema__text2">${description}</div>
                            <div class="cinema__linis">
                                <a href="#"><i class="cinema__icon icon_facebook"><img src="img/facebook  .png"
                                            alt="фейсбук"></i></a>
                                <a href="#"><i class="cinema__icon icon_twiter"><img src="img/twitter.png"
                                            alt="твитер"></i></a>
                                <a href="#"><i class="cinema__icon icon_behance"><img src="img/behance.png"
                                            alt="беханс"></i></a>
                            
                            </div>
                        </div>
                </div>
          </div>
          `;
}

const generatTabletItem = function ({name,genre}) {
  function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  let time1, time2, time3, time4;
  time1 = getRandomNumber(0,2);
  time3 = getRandomNumber(0,5);
  time4 = getRandomNumber(0,9);
  switch (time1) {
    case 0:
    case 1:
      time2 = getRandomNumber(0, 9);
    default:
      time2 = getRandomNumber(0, 3);
  };

  const time = `${time1}${time1}:${time3}${time4}`;
  return `
  <tr>
      <td id="film_start_2">${time}</td>
      <td id="film_name_2">${name}</td>
      <td id="film_genre_2">${genre}</td>
      <td><img src="img/plus.png " alt="plus" class="movie-list__table_plus"></td>
  </tr>
`;
};

let element, prepareFilm;
films.forEach(function (item) {
  let film = getFilmById(item);
  film.then(result => {
    prepareFilm = parseFilm(result);
    element = generateFilmItem({...prepareFilm});
    tabletElement = generatTabletItem({...prepareFilm});
    filmsElement.insertAdjacentHTML('beforeEnd', element);
  })
})

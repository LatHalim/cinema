//TODO устранить прыгание верстки;
//TODO использовать везде addEventListener;
//TODO упростить код;
//TODO поставить везде занк ";".

/** Заглушки данных */
const mock = [{
        id: 1,
        name: "Человек-паук",
        start: "10:00",
        genre: [0, 1, 2],
        filmHire: true,
        filmNew: true,
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab adipisci alias, animi, commodi eius",
        image: "img/mov1.jpg", //для д.з. CA
        fb: "https://fb.com",
        twitter: "https://twitter.com",
        behance: "https://www.behance.net",
        price: 200,
        room: 0,
        tickets: [1, 5]
    },
    {
        id: 2,
        name: "Собачья жизнь 2",
        start: "12:00",
        genre: [3, 4, 5],
        filmHire: true,
        filmNew: true,
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab adipisci alias, animi, commodi eius",
        image: "img/mov2.jpg", //для д.з. CA
        fb: "https://fb.com",
        twitter: "https://twitter.com",
        behance: "https://www.behance.net",
        price: 300,
        room: 1,
        tickets: [8, 10]
    },
    {
        id: 3,
        name: "История игрушек 4",
        start: "14:00",
        genre: [6, 3, 5],
        filmHire: true,
        filmNew: false,
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab adipisci alias, animi, commodi eius",
        image: "", //для д.з. CA
        fb: "https://fb.com",
        twitter: "https://twitter.com",
        behance: "https://www.behance.net",
        price: 500,
        room: 2,
        tickets: [1, 4]
    },
    {
        id: 4,
        name: "Люди в чёрном: Интернэшнл",
        start: "16:00",
        genre: [0, 1, 5],
        filmHire: true,
        filmNew: true,
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab adipisci alias, animi, commodi eius",
        image: "img/mov3.jpg", //для д.з. CA
        fb: "https://fb.com",
        twitter: "https://twitter.com",
        behance: "https://www.behance.net",
        price: 700,
        room: 1,
        tickets: [2, 5, 7, 9]
    }
];

//справочник жанров - так часто работают сервисы
const genres = [{
        id: 0,
        name: "фантастика"
    },
    {
        id: 1,
        name: "боевик"
    },
    {
        id: 2,
        name: "приключения"
    },
    {
        id: 3,
        name: "фэнтези"
    },
    {
        id: 4,
        name: "драма"
    },
    {
        id: 5,
        name: "комедия"
    },
    {
        id: 6,
        name: "мультфильм"
    }
];

//Справочник залов где можно посмотреть фильм 
const rooms = [{
        id: 0,
        name: 'X',
        count: 10
    },
    {
        id: 1,
        name: 'L',
        count: 15
    },
    {
        id: 2,
        name: 'XL',
        count: 20
    }
]

//массивы для хранения отсортированных данных
let filmsNew = [],
    filmsHire = [];

//сортируем на новинки и в прокате
for (let i = 0; i < mock.length; i++) {
    let currentFilm = mock[i];

    if (currentFilm.filmHire) {
        filmsHire.push(currentFilm);
    }

    if (currentFilm.filmNew) {
        filmsNew.push(currentFilm);
    }
}

const places = new Set();

//объект-обертка для универсализации работы с данными
const film = {
    getName: function () {
        return this.name;
    },

    getStart: function () {
        return this.start;
    },

    getGanre: function () {
        //хранит текущие идентификаторы жанров. Здесь тоже используется this!
        const ganarsIds = this.genre;

        //вспомогательный массив, который будет хранить текстовые описания жанров
        let arrGanars = [];

        //проходим по id шникам жанров
        for (let i = 0; i < ganarsIds.length; i++) {
            let currentId = ganarsIds[i];

            //так делали на лекции
            //arrGanars.push( genres[currentId] );

            //@see https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/find
            let genreText = genres.find(
                //el содержит текущий элемент перебираемого массива genres
                function (el) {
                    //если условие выполняется, то возвращается проверяемый элемент
                    return el.id == currentId;
                }
            ).name; //элементом genres является объект справочника { id:..., name... }, на этом объекте
            // берем поле name и сохраняем как genreText;

            arrGanars.push(genreText); //добаляем полученный genreText во вспомогательный массив
        }

        //текстовое представление жанров
        //@see https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/join
        let strGanars = arrGanars.join(", ");
        return strGanars;
    },

    getRoom: function () {
        const room = this.room;
        const name = rooms.find(
            //el содержит текущий элемент перебираемого массива genres
            function (el) {
                //если условие выполняется, то возвращается проверяемый элемент
                return el.id == room;
            }
        ).name;
        const count = rooms.find(
            //el содержит текущий элемент перебираемого массива genres
            function (el) {
                //если условие выполняется, то возвращается проверяемый элемент
                return el.id == room;
            }
        ).count;
        return {
            name,
            count
        }
    },

    getPrice: function () {
        return this.price
    },
    renderFilmRow() {

        //добавлена строка вывода цены
        let filmId = this.id,
            filmName = this.name,
            filmStart = this.start,
            filmGanars = film.getGanre.apply(this),
            filmPrice = this.price;


        filmHTML = `
            <td>
                <input type="checkbox" class="block03__checkbox" id="block03__checkbox1">
                <label for="block03__checkbox1">
                  <i class="icon icon-check" title="check"></i>
                </label>
            </td>
            <td id="start_film_${filmId}">${filmStart}</td>
            <td id="name_film_${filmId}">${filmName}</td>
            <td id="ganar_film_${filmId}">${filmGanars}</td>
            <td id="ganar_price_${filmId}">${filmPrice}</td>
          `;
        return filmHTML;
    },

    renderFilmBlock() {
        let filmName = this.name,
            filmImage = this.image,
            filmDescription = this.description,
            filmFb = this.fb,
            filmTw = this.twitter,
            filmBh = this.behance,
            filmHTML = `
            <div class="block05__movie1">
                    <div class="block05__bg">
                        <img src="${filmImage}" alt="">
                    </div>
                    <div class="block05__descr">
                        <div class="block05__text2">${filmName}</div>
                        <div class="block05__sep"></div>
                        <div class="block05__text3">${filmDescription}</div>
                        <div class="block05__linls">
                            <a href="${filmTw}" target="_blank"><i class="icon icon-twitter" title="twitter"></i></a>
                            <a href="${filmFb}" target="_blank"><i class="icon icon-facebook" title="facebook"></i></a>
                            <a href="${filmBh}"><i class="icon icon-camera" title="camera"></i></a>
                        </div>
                    </div>
                </div>
          `;
        return filmHTML;
    },


    renderFilmPlaces(count) {
        cinemaTickets = document.getElementById('cinema-tickets');
        countTicket = document.getElementById('orderFilmCountTicket');
        orderFilmTotalPrice = document.getElementById('orderFilmTotalPrice');
        cinemaTickets.innerHTML = '';
        for (let i = 1; i < count + 1; i++) {
            let element = document.createElement('div');

            element.classList.add('squeare');
            element.setAttribute('data-buy', 0)

            //Проверка на уже забронированный билет
            this.tickets.forEach(item => {

                if (item === i) {
                    element.classList.add('bought');
                }
            })
            element.innerHTML = i;
            element.setAttribute('data-place', i);
            cinemaTickets.append(element)
            element.addEventListener('mouseover', event => {
                if (!event.target.classList.contains('bought')) {
                    element.classList.add('hover_cinema');
                }
            });
            element.addEventListener('mouseout', event => {
                element.classList.remove('hover_cinema');

            });
            element.addEventListener('contextmenu', event => {
                event.preventDefault();
                alert("Стоимость: " + this.price + " " + "рублей");
            });

            element.addEventListener('click', event => {
                const {
                    target
                } = event;
                if (target.classList.contains('bought')) {
                    alert('место забронировано')
                } else {
                    const place = target.getAttribute('data-place');
                    if (target.classList.contains('reserve')) {
                        target.classList.remove('reserve');
                        places.delete(place);
                        countTicket.innerHTML = parseInt(countTicket.innerHTML) - 1;
                        orderFilmTotalPrice.innerHTML = this.price * parseInt(countTicket.innerHTML);
                    } else {
                        target.classList.add('reserve');
                        places.add(place);
                        countTicket.innerHTML = parseInt(countTicket.innerHTML) + 1;
                        orderFilmTotalPrice.innerHTML = this.price * parseInt(countTicket.innerHTML);
                    }

                    const buyTicketPlace = document.getElementById('buyTicketPlace');
                    const buyTicketsPlace = document.getElementById('buyTicketsPlace');
                    const buyTicketPlaceWrapper = document.getElementById('buyTicketPlaceWrapper');
                    const buyTicketsPlaceWrapper = document.getElementById('buyTicketsPlaceWrapper');
                    console.log(places);
                    if (places.size === 0) {

                        buyTicketPlace.value = '';
                        buyTicketsPlace.innerHTML = '';
                    } else if (places.size === 1) {
                        buyTicketPlaceWrapper.style.display = 'block';
                        buyTicketsPlaceWrapper.style.display = 'none';
                        buyTicketPlace.value = [...places][0];
                    } else {
                        buyTicketPlaceWrapper.style.display = 'none';
                        buyTicketsPlaceWrapper.style.display = 'block';
                        buyTicketsPlace.innerHTML = [...places].join(',');
                    }
                }
            })
        }
    }
};

//Билеты на фильмы
let ticket = [];

//получаем DOM элемент с таблицей
let tableDOM = document.getElementById("filmsHire");
for (let i = 0; i < filmsHire.length; i++) {
    let currentFilm = filmsHire[i],
        filmName = film.getName.bind(currentFilm)(),
        filmRoom = film.getRoom.bind(currentFilm)(),
        filmStart = film.getStart.bind(currentFilm)(),
        filmGanars = film.getGanre.bind(currentFilm)(),
        filmPrice = film.getPrice.bind(currentFilm)(),
        filmRowHTML = film.renderFilmRow.bind(currentFilm)(),
        tr = document.createElement("tr"); //содаем DOM элемент TR;

    tr.innerHTML = filmRowHTML; //записываем в DOM элемент HTML разметку

    //вешаем обработчик события на строку, вызывающий модальное окно
    /*** РАЗОБРАТЬ */
    tr.onclick = function () {
        // 1. Находим элемент с формой заказ
        // 2. Изменить состояние из display: none -> display: block;
        // 3. Отобразить данные по бронированию фильма
        film.renderFilmPlaces.bind(currentFilm)(filmRoom.count)
        orderForm.style.display = 'block';

        let orderFilmName = document.getElementById('orderFilmName'),
            orderFilmStart = document.getElementById('orderFilmStart'),
            orderFilmGanar = document.getElementById('orderFilmGanar'),
            orderFilmPrice = document.getElementById('orderFilmPrice'),
            orderFilmRoom = document.getElementById('orderFilmRoom');
        orderFilmCountTicket = document.getElementById('orderFilmCountTicket'),
            orderFilmTotalPrice = document.getElementById('orderFilmTotalPrice');
        orderFilmCountTicket.innerHTML = 0;

        orderFilmName.innerHTML = filmName;
        orderFilmStart.innerHTML = filmStart;
        orderFilmGanar.innerHTML = filmGanars;
        orderFilmPrice.value = filmPrice;
        orderFilmRoom.innerHTML = filmRoom.name;

        orderFilmTotalPrice.innerHTML = filmPrice * parseInt(orderFilmCountTicket.innerHTML);
    }
    tableDOM.appendChild(tr); //добавляем в DOM элемент таблицы DOM элемент строки с фильмом
}

// Закрытие модального окна
/*** РАЗОБРАТЬ Event Handler */
let orderForm = document.getElementById('orderForm');
let closeOrderForm = document.getElementById('closeOrderFrom');

closeOrderForm.onclick = function () {
    orderForm.style.display = 'none';
}

// Валидация ввода имени
/** РАЗОБРАТЬ Event Handler */
/* let sendOrder = document.getElementById('sendOrder');
sendOrder.onclick = function () {
    let orderClinetName = document.getElementById('orderClinetName');

    if (orderClinetName.value) {
        orderClinetName.style.border = '1px solid #bebebe';
    } else {
        orderClinetName.style.border = '2px solid red';
    }
} */

//Обработка формы
function checkCorrectPhoneNumber(number) {
    /* const reg = new RegExp('^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$')
    return reg.test(number); */
    return true;
}
const clearErrors = element => {
    let i = 0;
    const elErrorMassege = element.getElementsByClassName('popup-error-message');
    while (i < elErrorMassege.length) {
        elErrorMassege[i].parentNode.classList.remove('error');
        elErrorMassege[i].innerHTML = '';
        i++;
    }
}

orderFormPlace.addEventListener('submit', event => {
    const setError = ($el, error) => {
        $el.parentNode.classList.add('error');
        $el.parentNode.getElementsByClassName('popup-error-message')[0].innerHTML = error;
    }

    event.preventDefault();
    clearErrors(orderFormPlace);
    const fields = orderFormPlace.getElementsByTagName('input');

    let error = false;

    const data = {
        name: '',
        phone: '',
        places: []
    }

    for (let i = 0; i < fields.length; i++) {
        switch (fields[i].getAttribute('name')) {
            case 'name':
                if (!checkInput(fields[i].value)) {
                    setError(fields[i], 'Заполните поле Имя');
                    error = true;
                    break;
                }
                data.name = fields[i].value;
                break;
            case 'phone':
                if (!checkInput(fields[i].value)) {
                    setError(fields[i], 'Заполните поле Телефон');
                    error = true;
                    break;
                } else {
                    if (!checkCorrectPhoneNumber(fields[i].value)) {
                        setError(fields[i], 'Введите корректный номер телефона');
                        error = true;
                        break;
                    }
                    data.phone = fields[i].value;
                }
                break;
            default:
        }
    }
    if (orderFormPlace.getElementsByClassName('reserve').length < 1) {
        const ticketError = orderFormPlace.getElementsByClassName('tickets-error');
        ticketError[0].classList.add('error');
        ticketError[0].getElementsByTagName('p')[0].innerHTML = 'Выберите хотя бы 1 место';
        error = true;
    } else {
        let places = [];
        for (let i = 0; i < orderFormPlace.getElementsByClassName('reserve').length; i++) {
            places.push(orderFormPlace.getElementsByClassName('reserve')[i].getAttribute('data-place'));
        }
        data.places = places;
    }

    if (error) {
        return;
    }

    //Отправляем данные на сервер
    sendFormButton.setAttribute('disabled', 'true');
    sendFormButton.getElementsByClassName('overlay-loader')[0].style.display = 'block';

    setTimeout(() => {
        sendFormButton.removeAttribute('disabled');
        sendFormButton.getElementsByClassName('overlay-loader')[0].style.display = 'none';
        orderForm.style.display = 'none';
        popupSuccess.classList.remove('hidden');
    }, 3000);
})

// Закрываем модальные окна с помощью кнопки ESC
document.addEventListener('keydown', function (e) {
    if (e.keyCode == 27) {
        orderForm.style.display = 'none';
        popupSuccess.classList.add('hidden');
        popup.classList.add('hidden');
        chosse_city.style.display = 'none'
    }
});

const modalCityClose = document.getElementById('modal-city-close')
modalCityClose.addEventListener('click', event => {
    chosse_city.style.display = 'none'
});
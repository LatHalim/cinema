const GEO_API = 'http://api.sypexgeo.net/',
    CITIES_API = 'https://glavpunkt.ru/api/get_rf_cities';

let city, cities;

function getXmlReguest(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onreadystatechange = function () {
        if (xhr.status == 200 && xhr.readyState == 4) {
            callback.call(xhr.responseText);
        }
        if (xhr.status != 200) {
            console.log('error')
        }
    }
    xhr.send();
}

jQuery(($) => {
    $('.yourCity').on('click', function (e) {
        e.preventDefault();
        chosse_city.style.display = 'inline';
        if (!cities) {
            getXmlReguest(CITIES_API, function () {
                cities = $.parseJSON(this);
            })
        }
    });

    $('[name=city_choose]').on('keyup', function () {
        let search = $(this).val(),
            result = '<ul>',
            counter = 0;
        for (let i = 0; i < cities.lenght; i++) {
            if (cities[i].name.toLowerCase().indexOf(search.toLowerCase()) >= 0 && counter < 5) {
                result += '<li> + cities[i].name + </li>';
                counter++;
            }
        }
        result += '</ul>';
        if (!counter) {
            result = 'Ничего не найдено'
        }
        $('#search_result').html(result)

        $('body').on('click', '#search_result li', function () {
            $('.yourCity').html($(this).html());
            chosse_city.style.display = 'none'
        })
    })
    $.ajax({
        url: GEO_API,
        type: 'GET',
        success: function (result) {
            city = result.city.name_ru;
            $('.yourCity').html(city);
        },
        error: function (result) {

        }
    })
})

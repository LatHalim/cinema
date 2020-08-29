"use strict";

$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    nav: true
  });
});
var films = [{
  start: '10.00',
  name: 'Человек паук',
  genre: [0, 1, 2]
}, {
  start: '12.00',
  name: 'Собачья жизнь 2',
  genre: [0, 1, 2]
}, {
  start: '02.00',
  name: 'Люди в черном',
  genre: [0, 1, 2]
}, {
  start: '03.00',
  name: 'Человек паук2',
  genre: [0, 1, 2]
}];
console.log(films[0]);
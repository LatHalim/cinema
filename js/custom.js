$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    nav: true,
  });
});

const closePopupButton = document.getElementById('popup-close');
const openPopupButton = document.getElementById('popup-open');
const sendForm = document.getElementById('submit');
const popup = document.getElementById('popup');

closePopupButton.onclick = function (event) {
  event.preventDefault();
  popup.classList.add('hidden');
}

openPopupButton.onclick = function (event) {
  event.preventDefault();
  popup.classList.remove('hidden');
}
sendForm.onclick = function (event) {
  event.preventDefault();
  let name = document.getElementById('name');
  let nameParent = name.parentNode;
  let email = document.getElementById('email');
  let checkbox = document.getElementById('checkbox');
  nameParent.classList.remove('error');
  nameParent.getElementsByClassName('popup-error-message')[0].innerHTML = ''
  if (!checkInput(name.value)) {
    nameParent.classList.add('error')
    nameParent.getElementsByClassName('popup-error-message')[0].innerHTML = 'Заполните поле Имя'
  }
}

function checkInput(value) {
  if (value)
    return true;
  return false;
}
'use strict';

var PHOTOS = ['https://garda-opt.ru/upload/1c_catalog/images_1c/00002846/white/00002846_1.jpg',
  'http://garda-opt.ru/upload/1c_catalog/images_1c/00000145/white/00000145_1.jpg',
  'http://garda-opt.ru/upload/1c_catalog/images_1c/00000146/white/00000146_1.jpg',
  'http://garda-opt.ru/upload/1c_catalog/images_1c/00000147/white/00000147_1.jpg',
  'http://garda-opt.ru/upload/1c_catalog/images_1c/00000752/white/00000752_1.jpg',
  'http://garda-opt.ru/upload/1c_catalog/images_1c/00000758/white/00000758_1.jpg',
  'http://garda-opt.ru/upload/1c_catalog/images_1c/00001009/white/00001009_1.jpg',
  'http://garda-opt.ru/upload/1c_catalog/images_1c/00001010/white/00001010_1.jpg',
  'http://garda-opt.ru/upload/1c_catalog/images_1c/00001011/white/00001011_1.jpg',
  'http://garda-opt.ru/upload/1c_catalog/images_1c/00001012/white/00001012_1.jpg',
  'http://garda-opt.ru/upload/1c_catalog/images_1c/00001013/white/00001013_1.jpg',
  'http://garda-opt.ru/upload/1c_catalog/images_1c/00001014/white/00001014_1.jpg',
  'http://garda-opt.ru/upload/1c_catalog/images_1c/00001015/white/00001015_1.jpg',
  'http://garda-opt.ru/upload/1c_catalog/images_1c/00001016/white/00001016_1.jpg',
  'http://garda-opt.ru/upload/1c_catalog/images_1c/00001377/white/00001377_1.jpg',
  'http://garda-opt.ru/upload/1c_catalog/images_1c/00001735/white/00001735_1.jpg',
  'http://garda-opt.ru/upload/1c_catalog/images_1c/00001736/white/00001736_1.jpg',
  'http://garda-opt.ru/upload/1c_catalog/images_1c/00001737/white/00001737_1.jpg',
  'http://garda-opt.ru/upload/1c_catalog/images_1c/00001739/white/00001739_1.jpg',
  'http://garda-opt.ru/upload/1c_catalog/images_1c/00001740/white/00001740_1.jpg',
  'http://garda-opt.ru/upload/1c_catalog/images_1c/00001741/white/00001741_1.jpg'
];
var TITLES = ['210154 Подсвечник 12х33', '2230183 Подсвечник 15х15х63', '2230184 Подсвечник 15х15х53',
  '2230172 Канделябр 311784', '210178 Подсвечник 13х295', '111105 Подсвечник хрустальный 10х10х23',
  '111405 Подсвечник хрустальный 10х10х31', '160301 Подсвечник хрустальный 6617см', '160301 Подсвечник хрустальный 6х6х24',
  '131050 Подсвечник хрустальный 9х9х32', '150525 Подсвечник хрустальный 6х6х20', '150645 Подсвечник хрустальный 6х6х255',
  '150832 Подсвечник хрустальный 6х6х315', '110950 Подсвечник хрустальный 9х9х165', '111376 Подсвечник хрустальный 9х9х212',
  '131413 Подсвечник хрустальный 8834', '131612 Подсвечник хрустальный 8х8х43', '110279 Подсвечник хрустальный 12х12х7',
  '211719 Канделябр 501630', '23113034 Канделябр 241133', '990 Подсвечник хрустальный 2994'
];
var MATERIALS = ['хромированный металл', 'хромированный металл, стекло', 'хрусталь', 'металл с медным покрытием'];
var MIN_PRICE = 500;
var MAX_PRICE = 10000;
var NUMBER = 30;
var CARDS_NUMBER = 9;
var NEW_CARDS = 3;

var getRandomInteger = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var getRandomElement = function (elements) {
  var index = getRandomInteger(0, elements.length - 1);
  return elements[index];
};

var getObject = function () {
  return {
    photos: getRandomElement(PHOTOS),
    title: getRandomElement(TITLES),
    materials: getRandomElement(MATERIALS),
    price: getRandomInteger(MIN_PRICE, MAX_PRICE)
  };
};

var getObjectsList = function (number) {
  var objectLists = [];
  for (var i = 0; i < number; i++) {
    objectLists.push(getObject(i));
  };
  return objectLists;
};

var cards = getObjectsList(NUMBER);

var cardTemplate = document.querySelector('#card').content.querySelector('.card');
var renderCard = function (cards) {
  var card = cardTemplate.cloneNode(true);
  card.querySelector('img').src = cards.photos;
  card.querySelector('.card__title').textContent = cards.title;
  card.querySelector('.card__material').textContent = cards.materials;
  card.querySelector('.card__price').textContent = cards.price + '₽';
  return card;
};

var catalogItems = document.querySelectorAll('.catalog__item');

var renderCards = function () {
  for (var i = 0; i < catalogItems.length; i++) {
    catalogItems[i].innerHTML = '';
    catalogItems[i].appendChild(renderCard(cards[i]));
  };
};

renderCards();

var buttonShowMore = document.querySelector('.show-more__btn');
var catalogList = document.querySelector('.catalog__list');
var currentIndex = 1;

buttonShowMore.addEventListener('click', function () {
  for (var x = 0; x < NEW_CARDS; x++) {
    currentIndex++;
    catalogList.appendChild(renderCard(cards[x + currentIndex]));
  };
});



var getPrises = function () {
  var cardPrises = document.querySelectorAll('.card__price');
  var prises = []
  for (var i = 0; i < cardPrises.length; i++) {
    prises.push(cardPrises[i].innerHTML)
  }
  return prises;
};

var prises = getPrises();
console.log(prises);

var sorting = document.querySelector('#sorting');

var sortCards = function () {
  var typeSorting = sorting.value;

  if (typeSorting === 'default') {
    return;
  } else if (typeSorting === 'prise-up') {
    prises.sort(function (a, b) { return a - b });
  } else if (typeSorting === 'prise-down') {
    prises.sort(function (a, b) { return b - a });
  }
};

sorting.addEventListener('change', function () {
  sortCards();
});

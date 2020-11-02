// Создаю моки

const PHOTOS = ['https://garda-opt.ru/upload/1c_catalog/images_1c/00002846/white/00002846_1.jpg',
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
const TITLES = ['210154 Подсвечник 12х33', '2230183 Подсвечник 15х15х63', '2230184 Подсвечник 15х15х53',
  '2230172 Канделябр 311784', '210178 Подсвечник 13х295', '111105 Подсвечник хрустальный 10х10х23',
  '111405 Подсвечник хрустальный 10х10х31', '160301 Подсвечник хрустальный 6617см', '160301 Подсвечник хрустальный 6х6х24',
  '131050 Подсвечник хрустальный 9х9х32', '150525 Подсвечник хрустальный 6х6х20', '150645 Подсвечник хрустальный 6х6х255',
  '150832 Подсвечник хрустальный 6х6х315', '110950 Подсвечник хрустальный 9х9х165', '111376 Подсвечник хрустальный 9х9х212',
  '131413 Подсвечник хрустальный 8834', '131612 Подсвечник хрустальный 8х8х43', '110279 Подсвечник хрустальный 12х12х7',
  '211719 Канделябр 501630', '23113034 Канделябр 241133', '990 Подсвечник хрустальный 2994'
];
const MATERIALS = ['хромированный металл', 'хромированный металл, стекло', 'хрусталь', 'металл с медным покрытием'];
const MIN_PRICE = 500;
const MAX_PRICE = 10000;
const NUMBER = 30;
const CARDS_NUMBER = 9;
const NEW_CARDS = 3;
const ZERO_CARDS = 0;

const getRandomInteger = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

const getRandomElement = function (elements) {
  const index = getRandomInteger(0, elements.length - 1);
  return elements[index];
};

const getObject = function () {
  return {
    photos: getRandomElement(PHOTOS),
    title: getRandomElement(TITLES),
    materials: getRandomElement(MATERIALS),
    price: getRandomInteger(MIN_PRICE, MAX_PRICE)
  };
};

const getObjectsList = function (number) {
  const objectLists = [];
  for (let i = 0; i < number; i++) {
    objectLists.push(getObject(i));
  };
  return objectLists;
};

const cards = getObjectsList(NUMBER);

// Сортирую данные

const cardsArray = cards.slice();

const sorting = document.querySelector('#sorting');

const sortCards = function (cardsArray) {
  let typeSorting = sorting.value;

  if (typeSorting === 'prise-up') {
    cardsArray.sort(function (a, b) {
      return a.price - b.price;
    });
  } else if (typeSorting === 'prise-down') {
    cardsArray.sort(function (a, b) {
      return b.price - a.price;
    });
  };
  return cardsArray;
};

sorting.addEventListener('change', function () {
  let resultSortCards = sortCards(cardsArray);
  renderCards(resultSortCards);
});

// Отрисовываю карточки товара

const cardTemplate = document.querySelector('#card').content.querySelector('.card');

const renderCard = function (cards) {
  const card = cardTemplate.cloneNode(true);
  card.querySelector('img').src = cards.photos;
  card.querySelector('.card__title').textContent = cards.title;
  card.querySelector('.card__material').textContent = cards.materials;
  card.querySelector('.card__price').textContent = cards.price + '₽';
  return card;
};

const catalogList = document.querySelector('.catalog__list');

const renderCards = function (cardsArray) {
  catalogList.innerHTML = '';
  for (let i = 0; i < CARDS_NUMBER; i++) {
    catalogList.appendChild(renderCard(cardsArray[i]));
  };
};

renderCards(cardsArray);

// Добавляю карточки при клике

let currentCardsNumber = cardsArray.length - CARDS_NUMBER;
let currentIndex = 1;

const clickHandler = function () {
  for (let y = 0; y < NEW_CARDS; y++) {
    currentCardsNumber--;
    currentIndex++;
    catalogList.appendChild(renderCard(cardsArray[y + currentIndex]));
  };

  if (currentCardsNumber <= ZERO_CARDS) {
    deleteHandler();
  };
};

const deleteHandler = function () {
  buttonShowMore.removeEventListener('click', clickHandler);
};

const buttonShowMore = document.querySelector('.show-more__btn');
buttonShowMore.addEventListener('click', clickHandler);

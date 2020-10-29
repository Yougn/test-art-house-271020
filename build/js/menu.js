// Реализация меню

let filterSvg = document.querySelectorAll('.filter__svg');

if (filterSvg.length > 0) {
  filterSvg.forEach(it => {
    it.addEventListener('click', evt => {
      evt.preventDefault();
      const filterCategories = it.parentElement.parentElement;
      filterCategories.classList.toggle('filter--open');
    });
  });
};

let submenuSvg = document.querySelectorAll('.submenu .submenu__svg');

if (submenuSvg.length > 0) {
  submenuSvg.forEach(it => {
    it.addEventListener('click', evt => {
      evt.preventDefault();
      const submenuCategories = it.parentElement.parentElement.querySelector('.submenu__level');
      submenuCategories.classList.toggle('submenu__level--open');
      it.classList.toggle('submenu__svg--open');
    });
  });
}

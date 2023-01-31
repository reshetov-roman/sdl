'use strict' 
class Shoping {
  constructor(tabs, tabContents, radioButtonsFilterRedeem, radioButtonsFilterUndo, priceTextRedeem, priceTextUndo, filterReedem, allReedem, filterUndo, allUndo) {
    this.tabs = document.querySelectorAll(tabs);
    this.tabContents = document.querySelectorAll(tabContents);
    this.radioButtonsFilterRedeem = document.querySelectorAll(radioButtonsFilterRedeem);
    this.radioButtonsFilterUndo = document.querySelectorAll(radioButtonsFilterUndo);
    this.priceTextRedeem = document.querySelectorAll(priceTextRedeem);
    this.priceTextUndo = document.querySelectorAll(priceTextUndo);
    this.filterReedem = document.querySelectorAll(filterReedem);
    this.allReedem = document.querySelectorAll(allReedem);
    this.filterUndo = document.querySelectorAll(filterUndo);
    this.allUndo = document.querySelectorAll(allUndo);
  }
  selectTabs() {
    const th = this;
    if(th?.tabs) {
      th.tabContents.forEach((targetId, index) => {
        targetId.id = `tab_${index}`;
        if(targetId.hasAttribute('data-target-active')) {
          targetId.classList.add('active');
        }
      });
      th.tabs.forEach((tab, index) => {
        tab.dataset.tabTarget = `#tab_${index}`;
        if(tab.hasAttribute('data-tab-active')) {
          tab.classList.add('active');
        }
        tab.addEventListener('click', () => {
          const target = document.querySelector(tab.dataset.tabTarget);
            th.tabContents.forEach(tabContent => {
              tabContent.classList.remove('active');
          });
          th.tabs.forEach(tab => {
            tab.classList.remove('active');
          });
          tab.classList.add('active');
          target.classList.add('active');
        });
      });
    }
  }
  radioButtonReedem() {
    const th = this;
    if(th?.radioButtonsFilterRedeem) {
      th.radioButtonsFilterRedeem.forEach((radio, i) => {
        radio.id == i ? radio.checked = true : false;
        radio.id = `redeem_${i}`;
        const setId = radio.parentElement.querySelector('label');
        setId.setAttribute('for', `redeem_${i}`);
        radio.addEventListener('change', e => {
          // console.log(e.target); // get Value radio
        });
      });
    }
  }
  radioButtonUndo() {
    const th = this;
    if(th?.radioButtonsFilterUndo) {
      th.radioButtonsFilterUndo.forEach((radio, i) => {
        radio.id == i ? radio.checked = true : false;
        radio.id = `undo_${i}`; 
        const setId = radio.parentElement.querySelector('label');
        setId.setAttribute('for', `undo_${i}`);
        radio.addEventListener('change', e => {
          // console.log(e.target); // get Value radio
        });
      });
    }

  }
  parsePrice() {
    Number.prototype.toDivide = function() {
        const int = String(Math.trunc(this));
        if(int.length <= 3) return int;
        let space = 0,
            number = '';
    
        for(let i = int.length - 1; i >= 0; i--) {
            if(space == 3) {
                number = ' ' + number;
                space = 0;
            }
            number = int.charAt(i) + number;
            space++;
        }
        
        return number;
    }

    this.priceTextRedeem.forEach(elm => { __returnIntegerParse(elm)} );
    this.priceTextUndo.forEach(elm => { __returnIntegerParse(elm)} );

    function __returnIntegerParse(price) {
      let parseInt = Number(price.innerText);
      price.innerText = parseInt.toDivide();
    }
  }
  filterGoods() {
    const th = this;
    if(th?.filterReedem || th?.filterUndo) {
      __goodsClickFilter(this.filterReedem, this.allReedem);
      __goodsClickFilter(this.filterUndo, this.allUndo);
    }

    function __goodsClickFilter(filter, all) {
      filter.forEach(filter => {
        filter.addEventListener('click', e => {
          all.forEach(item => {
            if(item.classList.contains(e.target.value)) {
              item.style.display = 'block';
            }else {
              item.style.display = 'none';
            }
          });
        });
      });
    }
  }
}


const exampleShoping = new Shoping(
  '[data-tab-target]',
  '[data-tab-content]',
  '.page-shoping-wrapper__main-filter-active--radio',
  '.page-shoping-wrapper__main-filter-not-active--radio',
  '.page-shoping-wrapper__main-products--price >*',
  '.page-shoping-wrapper__main-not-products--price >*',
  '.page-shoping-wrapper__main-filter-active input',
  '.all-reedem',
  '.page-shoping-wrapper__main-filter-not-active input',
  '.all-undo'
);

exampleShoping.selectTabs();
exampleShoping.radioButtonReedem();
exampleShoping.radioButtonUndo();
exampleShoping.parsePrice();
exampleShoping.filterGoods();

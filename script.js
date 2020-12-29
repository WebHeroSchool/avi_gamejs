'use strict';

document.addEventListener("DOMContentLoaded", () => {
  let btnStart = document.querySelector('#start-game');
  let main = document.querySelector('.main-content');
  let page = document.querySelector('.page');
  let wrapper = document.querySelector('.page__wrapper');
  let header = document.querySelector('.page__header');
  let count = 0;
  let isGameShow = false;

  // уровни игры
  let levels = [
    {
      id: 1,
      level: "Простой",
      count: 3
    },
    {
      id: 2,
      level: "Средний",
      count: 6
    },
    {
      id: 3,
      level: "Сложный",
      count: 9
    }
  ];

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
  }

  // создали список уровней
  let createListLevel = () => {
    let list = document.createElement('ul');
    list.className = "list-level";
    for (let i = 0; i < levels.length; i++) {
      let item = document.createElement('li');
      let itemBtn = document.createElement('button');
      itemBtn.className = "btn";

      itemBtn.innerHTML = levels[i].level;

      item.appendChild(itemBtn);
      list.appendChild(item);
    }

    header.after(list);
  }

  // получаем уровень и кол-во карт
  let getGameLevel = (levels, itemName, itemCount) => {
    let listLevel = document.querySelector('.list-level');
    let btnLevels = document.querySelectorAll('.list-level button');

    listLevel.addEventListener('click', (evt) => {
      const target = evt.target;

      btnLevels.forEach((item) => {
        item.classList.remove('btn--sq');
        btnStart.removeAttribute("disabled");

        for (let i = 0; i < levels.length; i++) {
          if (evt.target.innerText == levels[i].level) {
            itemName = levels[i].level;
            itemCount = levels[i].count;
          }
        }
        count = itemCount;
        target.classList.add('btn--sq');
        return console.log(itemName, count);
        
      });
    });
  };

  let createCard = () => {
    let card = document.createElement('a');
    card.className = "card";
    card.href = "#";
    let cardType = document.createElement('div');

    card.appendChild(cardType);

    return card;
  }

  let createCards = () => {

    let list = document.createElement('ul');
    list.className = "list-cards";

    if (count === 6) {
      list.className = "list-cards list-cards--md";
    } else if (count === 9) {
      list.className = "list-cards list-cards--lg";
    }

    for (let i = 0; i < count; i++) {
      let item = document.createElement('li');
      item.className = "list-cards__item";
      item.appendChild(createCard());
      list.appendChild(item);
    }

    wrapper.append(list);

    // рандомно указываем значение карт
    let cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
      
      card.addEventListener('click', (evt) => {
        evt.preventDefault();

        let num = getRandomIntInclusive(0, 1);
        console.log(num);

        (num === 1) ? card.classList.add('card--bug') : card.classList.add('card--empty');

        if (isGameShow) {
          isGameShow = false;
          list.remove();
          page.classList.add('page--bg-card');
          main.classList.remove('hidden');
          btnStart.setAttribute("disabled", "true");
      
        } else {
          isGameShow = true;
          card.querySelector('div').classList.toggle('active');
        }
      });
    });
  };

  createListLevel();
  getGameLevel(levels);

  btnStart.addEventListener('click', () => {

    // очистить экран
    page.classList.remove('page--bg-card');
    main.classList.add('hidden');
    
    //  вывести карты 
    createCards();
  });
});

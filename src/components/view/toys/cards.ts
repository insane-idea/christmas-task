import { favoriteCards } from '../state';

export type ObjectInterface = {
  [key: string]: string | boolean | number;
};

import Animate from '../animation';

class Cards {
  initialData: ObjectInterface[];
  cardData: ObjectInterface;
  drawContainer: HTMLElement;
  favoriteCountContainer: HTMLElement;
  animation: Animate;

  private updateFavoritesQuantity(countElement: HTMLElement) {
    countElement.textContent = favoriteCards.size.toString();
  }

  constructor(
    initialData?: ObjectInterface[],
    cardData?: ObjectInterface,
    drawContainer?: HTMLElement,
    favoriteCountContainer?: HTMLElement
  ) {
    this.initialData = initialData;
    this.cardData = cardData;
    this.drawContainer = drawContainer;
    this.favoriteCountContainer = favoriteCountContainer;
    this.animation = new Animate();
  }

  filterByOrder(initialData: ObjectInterface[], order: number | string): ObjectInterface[] {
    const filteredData: ObjectInterface[] = initialData;

    function nameIncrease(a: ObjectInterface, b: ObjectInterface) {
      const nameA = a.name;
      const nameB = b.name;

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      } else {
        return 0;
      }
    }

    function nameDecrease(a: ObjectInterface, b: ObjectInterface) {
      const nameA = a.name;
      const nameB = b.name;

      if (nameA < nameB) {
        return 1;
      }
      if (nameA > nameB) {
        return -1;
      } else {
        return 0;
      }
    }

    function countIncrease(a: ObjectInterface, b: ObjectInterface) {
      const countA = +a.count;
      const countB = +b.count;

      return countA - countB;
    }

    function countDecrease(a: ObjectInterface, b: ObjectInterface) {
      const countA = +a.count;
      const countB = +b.count;

      return countB - countA;
    }

    if (order == 0) {
      filteredData.sort(nameIncrease);
    } else if (order == 1) {
      filteredData.sort(nameDecrease);
    } else if (order == 2) {
      filteredData.sort(countIncrease);
    } else if (order == 3) {
      filteredData.sort(countDecrease);
    }

    return filteredData;
  }

  createCard(cardData: ObjectInterface): HTMLElement {
    const cardTemplate = `
            <h3 class="card__title">${cardData.name}</h3>
            <div class="card__container">
                <div class="card__interface">
                    <img class="card__img" src="./assets/toys/${cardData.num}.png" alt="">
                    <div class="card__ribbon"></div>
                </div>
                <div class="card__content">
                    <p class="amount">Количество: <span class="amount-data">${cardData.count}</span> </p>
                    <p class="year">Год покупки: <span class="year-data">${cardData.year}</span> </p>
                    <p class="shape">Форма: <span class="shape-data">${cardData.shape}</span> </p>
                    <p class="color">Цвет: <span class="color-data">${cardData.color}</span> </p>
                    <p class="size">Размер: <span class="size-data">${cardData.size}</span> </p>
                    <p class="favourite">Любимая: <span class="favourite-data">${
                      cardData.favorite ? 'да' : 'нет'
                    }</span> </p>
                </div>
            </div>
        `;
    const element = document.createElement('div');
    element.className = 'card';
    element.dataset.num = `${cardData.num}`;
    element.innerHTML = cardTemplate;
    setInterval(() => {
      this.animation.animationOnScroll(element);
    }, 100);
    return element;
  }

  removeCards(cardsContainer: HTMLElement) {
    cardsContainer.innerHTML = '';
  }

  sortFavorites(card: HTMLElement, countElement: HTMLElement) {
    if (favoriteCards.size < 20) {
      if (card.classList.contains('favorite')) {
        card.classList.remove('favorite');
        favoriteCards.delete(+card.dataset.num);
      } else {
        card.classList.add('favorite');
        favoriteCards.add(+card.dataset.num);
      }
    } else {
      if (card.classList.contains('favorite')) {
        card.classList.remove('favorite');
        favoriteCards.delete(+card.dataset.num);
      } else {
        alert('Извините, все слоты заполнены');
      }
    }

    countElement.textContent = favoriteCards.size.toString();
    this.updateFavoritesQuantity(countElement);
  }
}

export default Cards;

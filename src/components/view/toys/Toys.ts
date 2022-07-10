import './toys.scss';
import content from './content';
import Page from '../Page';
import Data from '../../../data';
import Cards, { ObjectInterface } from './cards';
import Buttons from './buttons';
import Animate from '../animation';
import Tree from '../tree/Tree';
import { favoriteCards } from '../state';

// const sortSelect = document.querySelector('.sort-select') as HTMLFormElement;
// let _order: number | string = sortSelect.selectedIndex;

class ToysPage extends Page {
  cards: Cards;
  controlButtons: Buttons;
  animation: Animate;
  tree: Tree;
  sortSelect: HTMLFormElement;
  _order: number | string;

  private resetSort(button: HTMLElement, initialData?: ObjectInterface[]) {
    const favoriteButton = this.container.querySelector('.favorite__check') as HTMLInputElement;
    this.controlButtons.shape = new Set();
    this.controlButtons.color = new Set();
    this.controlButtons.size = new Set();
    this.controlButtons.favorite = false;
    favoriteButton.checked = false;
    button.classList.remove('active-btn');
    this.sortSelect = this.container.querySelector('.sort-select') as HTMLFormElement;
    this._order = this.sortSelect.selectedIndex
    this.sortSelect.options[0].selected = 'selected';
  }

  private cardFilter(cardData: ObjectInterface): boolean {
    const shapeFilters: unknown[] = Array.from(this.controlButtons.shape);
    const colorFilters: unknown[] = Array.from(this.controlButtons.color);
    const sizeFilters: unknown[] = Array.from(this.controlButtons.size);
    const favorite = this.controlButtons.favorite;
    const keys = Object.keys(cardData);
    let result: boolean = true;

    for (let i = 0; i < keys.length; i++) {
      if (favorite) {
        if (!cardData.favorite) {
          result = false;
          break;
        }
      } else {
        if (keys[i] == 'shape') {
          if (shapeFilters.length > 0 && shapeFilters.indexOf(cardData.shape) < 0) {
            result = false;
            break;
          }
        } else if (keys[i] == 'color') {
          if (colorFilters.length > 0 && colorFilters.indexOf(cardData.color) < 0) {
            result = false;
            break;
          }
        } else if (keys[i] == 'size') {
          if (sizeFilters.length > 0 && sizeFilters.indexOf(cardData.size) < 0) {
            result = false;
            break;
          }
        } else {
          continue;
        }
      }
    }
    return result;
  }

  private initButtonsListener(initialData: ObjectInterface[]) {
    const shapeButtonsArr: HTMLElement[] = Array.prototype.slice.call(
      this.container.querySelector('.shape-select').querySelectorAll('.btn')
    );
    const colorButtonsArr: HTMLElement[] = Array.prototype.slice.call(
      this.container.querySelector('.color-select').querySelectorAll('.btn')
    );
    const sizeButtonsArr: HTMLElement[] = Array.prototype.slice.call(
      this.container.querySelector('.size-select').querySelectorAll('.btn')
    );
    const favoriteButton = this.container.querySelector('.favorite__check') as HTMLInputElement;
    const allButtons = shapeButtonsArr.concat(colorButtonsArr, sizeButtonsArr, favoriteButton);
    const sortSelect = this.container.querySelector('.sort-select') as HTMLSelectElement;
    const sortReset = this.container.querySelector('.sort-reset') as HTMLElement;

    this.controlButtons.buttons = allButtons;
    this.controlButtons.buttons.forEach((button: HTMLElement) => {
      button.addEventListener('click', () => {
        this.controlButtons.toggleValueFilters(button);
        this.drawCards(initialData, this._order);
      });

      sortReset.addEventListener('click', () => {
        this.resetSort(button);
        this.drawCards(initialData, this._order);
      });
    });
    sortSelect.addEventListener('change', () => {
      this._order = sortSelect.selectedIndex;
      this.drawCards(initialData, this._order);
    });
  }

  static textObject = {
    HTMLContent: content,
  };

  constructor(tag: string, classes: string, id?: string) {
    super(tag, classes, id);
    this.cards = new Cards();
    this.controlButtons = new Buttons();
    this.animation = new Animate();
    this.tree = new Tree('article', 'content tree-page', 'toys-page');
  }

  showFavorites() {
    favoriteCards.forEach((cardNum: number) => {
      const favoriteCard = this.container.querySelector(`.card[data-num="${cardNum}"]`);
      if (favoriteCard) {
        favoriteCard.classList.add('favorite');
      }
    });
  }

  drawCards(initialData: ObjectInterface[], order?: string | number) {
    const cardsContainer = this.container.querySelector('.cards-container') as HTMLElement;
    const countElement = document.querySelector('.toys-count') as HTMLElement;

    this.cards.removeCards(cardsContainer);
    const sortedData = this.cards.filterByOrder(initialData, order);

    for (let i = 0; i < sortedData.length; i++) {
      const cardData = sortedData[i];

      if (this.cardFilter(cardData)) {
        const card = this.cards.createCard(cardData) as HTMLElement;
        cardsContainer.insertAdjacentElement('beforeend', card);

        card.addEventListener('click', () => {
          this.cards.sortFavorites(card, countElement);
        });

        cardsContainer.append(card);
      }
    }
  }

  render(): HTMLElement {
    this.createContent(ToysPage.textObject.HTMLContent);
    this.initButtonsListener(Data);
    this.drawCards(Data);
    this.showFavorites();
    return this.container;
  }
}

export default ToysPage;

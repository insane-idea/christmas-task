import './main.scss';
import Page from '../Page';
import content from './content';

class MainPage extends Page {
  static textObject = {
    HTMLContent: content,
  };

  constructor(tag: string, classes: string, id?: string) {
    super(tag, classes, id);
  }

  initStartButton() {
    const startButton = this.container.querySelector('.main-page__start-btn');
    startButton.addEventListener('click', () => {
      window.location.hash = 'toys-page';
    });
  }

  render(): HTMLElement {
    this.createContent(MainPage.textObject.HTMLContent);
    this.initStartButton();
    return this.container;
  }
}

export default MainPage;

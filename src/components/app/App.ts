import '@styles/scss/styles.scss';
import Page from '../view/Page';
import MainPage from '../view/main/Main';
import ToysPage from '../view/toys/Toys';
import TreePage from '../view/tree/Tree';
import ErrorPage from '../view/error/Error';

export const enum PageIds {
  MainPage = '#',
  ToysPage = 'toys-page',
  TreePage = 'tree-page',
}

class App {
  private static container = document.getElementById('app') as HTMLElement;
  private initialPage: MainPage;
  ToysPage: ToysPage;
  TreePage: TreePage;
  promise: Promise<unknown>;

  static removeHash() {
    history.pushState('', document.title, window.location.pathname + window.location.search);
  }

  static renderNewPage(pageId: string): void {
    App.container.innerHTML = '';
    let page: Page | null = null;

    if (pageId == PageIds.MainPage || window.location.hash == '') {
      page = new MainPage('article', 'content main-page', pageId);
      App.removeHash();
    } else if (pageId == PageIds.ToysPage) {
      page = new ToysPage('article', 'content toys-page', pageId);
    } else if (pageId == PageIds.TreePage) {
      page = new TreePage('article', 'content tree-page', pageId);
    } else {
      page = new ErrorPage('article', 'content error-page');
    }

    if (page) {
      const pageHTML = page.render();
      App.container.append(pageHTML);
    }
  }

  private changeRoute(): void {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      App.renderNewPage(hash);
    });
  }

  constructor() {
    this.initialPage = new MainPage('article', 'content main-page', 'main-page');
    this.ToysPage = new ToysPage('article', 'content toys-page', 'toys-page');
    this.TreePage = new TreePage('article', 'content tree-page', 'toys-page');
  }

  run() {
    const initialContent = this.initialPage.render();
    App.container.innerHTML = '';
    App.container.insertAdjacentElement('beforeend', initialContent);
    App.removeHash();
    this.changeRoute();
  }
}

export default App;

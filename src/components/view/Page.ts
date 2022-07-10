abstract class Page {
  protected container: HTMLElement;
  static textObject = {};

  constructor(tag: string, classes: string, id?: string) {
    this.container = document.createElement(tag);
    this.container.className = classes;
    this.container.id = id || '';
  }

  protected createContent(template: string) {
    this.container.insertAdjacentHTML('beforeend', template);
  }

  setLocalStorage(name?: string, value?: string) {
    if (name && value) {
      localStorage.setItem(name, value);
    }
  }

  render(): HTMLElement {
    return this.container;
  }
}

export default Page;

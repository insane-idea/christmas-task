import Page from '../Page';
import content from './content';

class ErrorPage extends Page {
  static textObject = {
    HTMLContent: content,
  };

  constructor(tag: string, classes: string, id?: string) {
    super(tag, classes, id);
  }

  render(): HTMLElement {
    this.createContent(ErrorPage.textObject.HTMLContent);
    return this.container;
  }
}

export default ErrorPage;

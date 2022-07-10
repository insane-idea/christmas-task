class toysButtons {
  buttons: HTMLElement[];
  shape: Set<unknown>;
  color: Set<unknown>;
  size: Set<unknown>;
  favorite: boolean;

  constructor(buttons?: HTMLElement[], shape?: unknown, color?: unknown, size?: unknown, favorite?: boolean) {
    this.buttons = buttons;
    this.shape = shape ? new Set().add(shape) : new Set();
    this.color = color ? new Set().add(color) : new Set();
    this.size = size ? new Set().add(size) : new Set();
    this.favorite = favorite || false;
  }

  toggleValueFilters(button: HTMLElement) {
    const favoriteButton = document.querySelector('.favorite__check') as HTMLInputElement;
    const buttonParentClass = button.parentElement.className;

    if (buttonParentClass === 'shape-select') {
      if (this.shape.has(button.dataset.filter)) {
        this.shape.delete(button.dataset.filter);
        button.classList.toggle('active-btn');
      } else {
        this.shape.add(button.dataset.filter);
        button.classList.toggle('active-btn');
      }
    }
    if (buttonParentClass === 'color-select') {
      if (this.color.has(button.dataset.filter)) {
        this.color.delete(button.dataset.filter);
        button.classList.toggle('active-btn');
      } else {
        this.color.add(button.dataset.filter);
        button.classList.toggle('active-btn');
      }
    }
    if (buttonParentClass === 'size-select') {
      if (this.size.has(button.dataset.filter)) {
        this.size.delete(button.dataset.filter);
        button.classList.toggle('active-btn');
      } else {
        this.size.add(button.dataset.filter);
        button.classList.toggle('active-btn');
      }
    }
    if (buttonParentClass === 'favorite-select') {
      if (this.favorite) {
        favoriteButton.checked = false;
        this.favorite = false;
      } else {
        favoriteButton.checked = true;
        this.favorite = true;
      }
    }
  }
}

export default toysButtons;

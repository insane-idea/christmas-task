import './tree.scss';
import Data from '../../../data';
import { ObjectInterface } from '../toys/cards';
import Page from '../Page';
import content from './content';
import { favoriteCards } from '../state';

class TreePage extends Page {
  static audio = document.querySelector('.audio') as HTMLAudioElement;
  static snowInterval: ReturnType<typeof setInterval>;
  static textObject = {
    HTMLContent: content,
  };

  private changeBackgroundImage() {
    const backgroundControls = Array.from(
      this.container.querySelector('.background-controls').children
    ) as HTMLElement[];

    if (backgroundControls.length > 0) {
      backgroundControls.forEach((button: HTMLElement) => {
        button.addEventListener('click', () => {
          const img = new Image();
          img.src = `./assets/bg/${button.dataset.bg}.jpg`;
          img.onload = () => {
            const treeBg = this.container.querySelector('.tree-page__tree') as HTMLElement;
            treeBg.style.backgroundImage = `url(${img.src})`;
          };
        });
      });
    }
  }

  private changeTree() {
    const treeControls = Array.from(this.container.querySelector('.tree-controls').children) as HTMLElement[];

    if (treeControls.length > 0) {
      treeControls.forEach((button: HTMLElement) => {
        button.addEventListener('click', () => {
          const img = new Image();
          img.src = `./assets/tree/${button.dataset.tree}.png`;
          img.onload = () => {
            const tree = this.container.querySelector('.tree') as HTMLElement;
            tree.style.backgroundImage = `url(${img.src})`;
          };
        });
      });
    }
  }

  private initSnow() {
    const snowfall = (document.querySelector('.tree-page__tree').querySelector('.snowfall') as HTMLDivElement) || null;

    if (snowfall) {
      const flake = document.createElement('i');
      flake.classList.add('fas');
      flake.classList.add('fa-snowflake');
      flake.style.left = Math.random() * snowfall.getBoundingClientRect().width + 'px';
      flake.style.animationDuration = Math.random() * 7 + 2 + 's';
      flake.style.opacity = Math.random().toString();
      flake.style.fontSize = Math.random() * 10 + 10 + 'px';
      snowfall.append(flake);
      setTimeout(() => {
        flake.remove();
      }, 5000);
    }
  }

  private toggleSnow() {
    if (localStorage.getItem('snow') == 'disabled') {
      TreePage.snowInterval = setInterval(this.initSnow, 50);
      this.setLocalStorage('snow', 'enabled');
    } else if (localStorage.getItem('snow') == 'enabled') {
      clearInterval(TreePage.snowInterval);
      this.setLocalStorage('snow', 'disabled');
    }
  }

  private toggleSoundButtonImage(playing: 'enabled' | 'disabled'): void {
    const soundBtn = this.container.querySelector('.sound-btn') as HTMLElement;

    if (playing === 'enabled') {
      soundBtn.style.backgroundImage = `url('./assets/svg/audio.svg')`;
    } else if (playing === 'disabled') {
      soundBtn.style.backgroundImage = `url('./assets/svg/mute.svg')`;
    }
  }

  private toggleMusic() {
    if (localStorage.getItem('music') == 'disabled') {
      TreePage.audio.muted = false;
      this.toggleSoundButtonImage('enabled');
      this.setLocalStorage('music', 'enabled');
    } else if (localStorage.getItem('music') == 'enabled') {
      TreePage.audio.muted = true;
      this.toggleSoundButtonImage('disabled');
      this.setLocalStorage('music', 'disabled');
    }
  }

  private disableSnowAndSound() {
    TreePage.snowInterval && clearInterval(TreePage.snowInterval);
    TreePage.audio.muted = true;
    // this.toggleSoundButtonImage('disabled');
    localStorage.setItem('snow', 'disabled');
    localStorage.setItem('music', 'disabled');
  }

  private initLocalStorageData() {
    this.setLocalStorage();
    // window.addEventListener(
    //   'click',
    //   () => {
    //     this.toggleSnow();
    //     this.toggleMusic();
    //   },
    //   { once: true }
    // );
  }

  constructor(tag: string, classes: string, id?: string) {
    super(tag, classes, id);
  }

  setLocalStorage(name?: string, value?: string) {
    if (!localStorage.getItem('snow')) {
      localStorage.setItem('snow', 'disabled');
    }
    if (!localStorage.getItem('music')) {
      localStorage.setItem('music', 'disabled');
    }
    if (name && value) {
      localStorage.setItem(name, value);
    }
  }

  initSecondaries() {
    const snowBtn = this.container.querySelector('.snow-btn') as HTMLElement;
    const soundBtn = this.container.querySelector('.sound-btn') as HTMLElement;
    const resetLs = document.querySelector('.reset-ls') as HTMLElement;

    this.drawFavoriteToys(Data);

    soundBtn.addEventListener('click', () => {
      if (soundBtn) {
        this.toggleMusic();
      }
    });
    snowBtn.addEventListener('click', () => {
      if (snowBtn) {
        this.toggleSnow();
      }
    });
    resetLs.addEventListener('click', this.disableSnowAndSound);

    window.addEventListener('mousemove', this.disableSnowAndSound, { once: true });
    window.addEventListener('hashchange', this.disableSnowAndSound, { once: true });

    TreePage.audio.play();
    this.changeBackgroundImage();
    this.changeTree();
  }

  drawFavoriteToys(initialData: ObjectInterface[]) {
    const toysChoose = this.container.querySelector('.toys-choose') as HTMLElement;

    if (toysChoose) {
      if (favoriteCards.size > 0) {
        toysChoose.innerHTML = '';
        favoriteCards.forEach((number: number) => {
          const toy = document.createElement('div');
          const p = document.createElement('p');

          toy.classList.add('toy');
          toy.style.backgroundImage = `url('./assets/toys/${initialData[+number - 1].num}.png')`;
          p.classList.add('toy__count');
          p.innerHTML = initialData[+number - 1].count.toString();
          toy.append(p);
          toysChoose.append(toy);
        });
      } else {
        toysChoose.innerHTML = '';
        for (let i = 0; i < 20; i++) {
          const toy = document.createElement('div');
          const p = document.createElement('p');

          toy.classList.add('toy');
          toy.style.backgroundImage = `url('./assets/toys/${initialData[i].num}.png')`;
          p.classList.add('toy__count');
          p.innerHTML = initialData[i].count.toString();
          toy.append(p);
          toysChoose.append(toy);
        }
      }
    }
  }

  render(): HTMLElement {
    this.createContent(TreePage.textObject.HTMLContent);
    this.initLocalStorageData();
    this.initSecondaries();
    return this.container;
  }
}

export default TreePage;

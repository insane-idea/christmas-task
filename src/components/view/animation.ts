class Animate {
  startAnimation(animItem: HTMLElement) {
    window.addEventListener('scroll', () => {
      this.animationOnScroll(animItem);
    });
  }

  animationOnScroll(animItem: HTMLElement): void {
    const animItemHeight: number = animItem.offsetHeight;
    const animItemOffset: number = getElementOffset(animItem).top;
    const showCoefficient = 4;

    let animItemPoint: number = window.innerHeight - animItemHeight / showCoefficient;
    if (animItemHeight > window.innerHeight) {
      animItemPoint = window.innerHeight - window.innerHeight / showCoefficient;
    }

    let scrolledEnough =
      window.scrollY > animItemOffset - animItemPoint && window.scrollY < animItemOffset + animItemHeight;
    if (scrolledEnough) {
      animItem.classList.add('active');
    }
    // else if (!animItem.classList.contains('no-hide')) {
    //     animItem.classList.remove('active');
    // }

    function getElementOffset(el: HTMLElement): { [key: string]: number } {
      const rect: DOMRect = el.getBoundingClientRect();
      const scrollLeft: number = window.scrollX || document.documentElement.scrollLeft;
      const scrollTop: number = window.scrollY || document.documentElement.scrollTop;
      return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
    }
  }
}

export default Animate;

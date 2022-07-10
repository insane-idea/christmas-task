const content = `
  <div class="content__container">
    <div class="toys-page__container">
      <div class="filters">
        <div class="value-filter">
          <p class="filters-title">Фильтры по назначению</p>
          <div class="shape-select">
            Форма:
            <button data-filter="шар" class="btn ball"></button>
            <button data-filter="колокольчик" class="btn bell"></button>
            <button data-filter="шишка" class="btn cone"></button>
            <button data-filter="снежинка" class="btn snowflake"></button>
            <button data-filter="фигурка" class="btn figurine"></button>
          </div>
          <div class="color-select">
            Цвет:
            <button data-filter="белый" class="btn white"></button>
            <button data-filter="желтый" class="btn yellow"></button>
            <button data-filter="красный" class="btn red"></button>
            <button data-filter="синий" class="btn blue"></button>
            <button data-filter="зелёный" class="btn green"></button>
          </div>
          <div class="size-select">
            Размер:
            <button data-filter="большой" class="btn large"></button>
            <button data-filter="средний" class="btn middle"></button>
            <button data-filter="малый" class="btn small"></button>
          </div>
          <div class="favorite-select">
            Только любимые:
            <input class="favorite__check" type="checkbox" />
          </div>
        </div>

        <div class="range-filter">
          <p class="filters-title">Фильтры по диапазону</p>
          <p class="amount__title">Количество экземпляров:</p>
          <div class="amount-filter">
            <span class="amount__from">1</span>
            <input class="amount__range" type="range" />
            <span class="amount__to">12</span>
          </div>
          <p class="year__title">Год приобретения:</p>
          <div class="year-filter">
            <span class="year__from">1940</span>
            <input class="year__range" type="range" />
            <span class="year__to">2020</span>
          </div>
        </div>

        <div class="sort-filter">
          <p class="filters-title">Сортировка</p>
          <div class="sort-filter__container">
            <select name="sort-select" id="sort-select" class="sort-select">
              <option value="sort-name-max">По названию от «А» до «Я»</option>
              <option value="sort-name-min">По названию от «Я» до «А»</option>
              <option value="sort-count-max">По возрастанию количества</option>
              <option value="sort-count-min">По убыванию количества</option>
            </select>
            <button class="sort-reset">Сброс фильтров</button>
          </div>
        </div>
      </div>

      <div class="cards-container"></div>
    </div>
  </div>
`;

export default content;

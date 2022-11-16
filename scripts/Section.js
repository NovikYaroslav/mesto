export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // renderNewItem() {
  //     this._renderer(this._items)
  // }

  renderItems(defaultCardList) {
    if (defaultCardList == true) {
      this._items.forEach((item) => {
        this._renderer(item);
      });
    } else {
      this._renderer(this._items);
    }
  }

  addItem(card) {
    this._container.prepend(card);
  }
}

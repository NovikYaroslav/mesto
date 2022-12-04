export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items) {
    items.forEach(this._renderer);
  }

  addInitialItems(card) {
    this._container.append(card);
  }

  addItem(card) {
    this._container.prepend(card);
  }
}

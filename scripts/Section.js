export class Section {
    constructor({items, renderer}, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = containerSelector;
        console.log(this._items)
    }
    
renderNewItem() {
    this._renderer(this._items)
}

renderItems() {
    this._items.forEach((item) => {
        this._renderer(item)
    });
}

addItem(card) {
    this._container.prepend(card)
}

}
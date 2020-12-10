export default class Section {
    constructor({ data, renderer }, containerSelector) {
        this._initialArray = data;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
      }

      renderItems() {
        this._initialArray.forEach(item => {
          const el = this._renderer(item); 
          this.addItem(el);
        });
      }                        

      addItem(element) {
        this._container.prepend(element);
      }
    }



export default class Section {
    constructor({ data, renderer }, containerSelector) {
        this._initialArray = data;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
      }

      renderItems() {
        const renderedItems = this._initialArray.forEach(item => {
              this._renderer(item); 
            });
            this.addItem(renderedItems)
          } 

      addItem(element)  {
         this._container.prepend(element);   
                  }
                }



export default class Popup {
        constructor (popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this)
        }

        open() {
            this._popup.classList.add("popup_is-open");
            document.body.addEventListener("keydown", this._handleEscClose);
        };

        close() {
            this._popup.classList.remove("popup_is-open");
            document.body.addEventListener("keydown", this._handleEscClose);
        };

        _handleEscClose(evt) {
            if (evt.key === "Escape") {
            this.close();
        }
            };



        setEventListeners() {

          this._popup.querySelector(".popup__close-btn").addEventListener("click", () => this.close());

            this._popup.addEventListener("click", (evt) => {
                if (evt.target.classList.contains("popup")) {
                    this.close();
                }
            });

<<<<<<< HEAD
=======
            this._popup.addEventListener("keydown", this._handleEscClose(evt))
>>>>>>> 4ded4217c6d035b3df27166ca48bc5b6e8ff936c
        }
}


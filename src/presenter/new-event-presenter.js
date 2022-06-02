import NewEventButtonView from '../view/new-event-button-view';
import { remove, render, RenderPosition } from '../framework/render';
import { UpdateType, UserAction } from '../utils/settings';
import { nanoid } from 'nanoid';
import EventEditView from '../view/event-edit-view';

export default class NewEventPresenter {
  #eventListComponent = null;
  #newEventButtonComponent = null;
  #eventEditComponent = null;
  #changeData = null;
  #changeMode = null;

  constructor(eventListComponent, newEventButtonComponent, changeData, changeMode) {
    this.#eventListComponent = eventListComponent;
    this.#newEventButtonComponent = newEventButtonComponent;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = () => {
    this.#newEventButtonComponent.setNewEventClickHandler(this.#handleNewEventClick);
    document.addEventListener('keydown', this.#onEscKeydownHandler);
  };

  destroy = () => {
    if (this.#eventEditComponent === null) {
      return;
    }
    remove(this.#eventEditComponent);
    this.#eventEditComponent = null;

    this.#newEventButtonComponent.element.removeAttribute('disabled');
    document.removeEventListener('click', this.#onEscKeydownHandler);
  };

  #handleNewEventClick = () => {
    this.#eventEditComponent = new EventEditView();
    this.#eventEditComponent.setFormSubmitHandler(this.#handleSubmitClick);
    this.#eventEditComponent.setCloseFormHandler(this.#handleResetClick);
    this.#eventEditComponent.setResetHandler(this.#handleResetClick);

    this.#newEventButtonComponent.element.setAttribute('disabled', true);
    this.#changeMode();
    render(this.#eventEditComponent, this.#eventListComponent, RenderPosition.AFTERBEGIN);

  };

  #handleSubmitClick = (event) => {
    this.#changeData(
      UserAction.ADD_EVENT,
      UpdateType.MINOR,
      { id: nanoid(), ...event }
    );
    this.destroy();
  };

  #handleResetClick = () => {
    this.destroy();
  };

  #onEscKeydownHandler = (evt) => {
    if (evt.key === 'Esc' || evt.key === 'Escape') {
      evt.preventDefault();
      this.destroy();
    }

  };
}

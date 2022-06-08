import AppPresenter from './presenter/app-presenter.js';
import EventsModel from './model/events-model.js';
import FiltersModel from './model/filters-model';
import EventsApiService from './api-services/events-api-service';
import DestinationsModel from './model/destinations-model';
import { AUTHORIZATION, END_POINT } from './utils/settings';
import OffersModel from './model/offers-model';
import FiltersPresenter from './presenter/filters-presenter';
import InfoPresenter from './presenter/info-presenter';

const headerInfo = document.querySelector('.trip-main');
const headerControlsFilters = document.querySelector('.trip-controls__filters');

const mainEventsBoard = document.querySelector('.page-main').querySelector('.trip-events');

const eventsModel = new EventsModel(new EventsApiService(END_POINT, AUTHORIZATION));
const filterModel = new FiltersModel();

const filtersPresenter = new FiltersPresenter(headerControlsFilters, eventsModel, filterModel);
const infoPresenter = new InfoPresenter(headerInfo, eventsModel);

const appPresenter = new AppPresenter(
  mainEventsBoard,
  headerInfo,
  filtersPresenter,
  infoPresenter,
  eventsModel,
  filterModel,
);

OffersModel.init()
  .then(() => DestinationsModel.init())
  .then(() => eventsModel.init());
appPresenter.init();

import locations from './store/locations';
import '../css/style.css'
import './plugins'
import formUI from './views/from' 
import currencyUI from './views/currency'
import ticketUi from './views/tickets'

document.addEventListener('DOMContentLoaded', () => {
  initApp();
  const from = formUI.form;

  //events
  addEventListener('submit',(e)=> {
    e.preventDefault();
    onFormSubmit();
  })

  //handler
  async function initApp(){
    await locations.init();
    formUI.setAutoCompliteData(locations.shortCitiesList);
  }

  async function onFormSubmit(){
    //данные формы
    const origin = locations.getCityCodeByKey(formUI.originValue);
    const destination = locations.getCityCodeByKey(formUI.destinationValue);
    const return_date = formUI.returnDateValue;
    const depart_date = formUI.departDateValue;
    const currency = currencyUI.currencyValue;
    await locations.fetchTickets({ origin, destination, depart_date, return_date, currency });
    ticketUi.render_tickets(locations.lastSearch);
  }
})
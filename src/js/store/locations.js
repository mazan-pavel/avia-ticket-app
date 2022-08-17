import api from '../services/apiService';
import {formatDate} from '../helpers/date'
export class Locations {
  constructor(api, helpers) {
    this.api = api;
    this.countries = null;
    this.cities = null;
    this.shortCitiesList = null;
    this.airlines = {};
    this.lastSearch = {};
    this.formatDate = helpers.formatDate;
  }
  async init() {
    const response = await Promise.all([
      this.api.countries(),
      this.api.cities(),
      this.api.airlines(),
    ]);

    const [countries, cities, airlines] = response;
    this.countries = this.serializeCountries(countries);
    this.cities = this.serializeCity(cities);
    this.shortCitiesList = this.createShortCitiesList(this.cities);
    this.airlines = this.serializeAirlines(airlines);
    return response;
  }
  createShortCitiesList(cities) {
    return Object.entries(cities).reduce((acc, [, city]) => {
      acc[city.fullname] = null;
      return acc;
    }, {});
  }
  serializeCity(city) {
    return city.reduce((acc, city) => {
      const country_name = this.getCountryNameByCode(city.country_code);
      city.name = city.name || city.name_translations.en;
      const city_name = city.name || city.name_translations.en;
      const fullname = `${city_name}, ${country_name}`;
      acc[city.code] = {
        ...city,
        country_name,
        fullname
      };

      return acc;
    }, {});
  }

  serializeCountries(countries) {
    if (!countries || !countries.length || !Array.isArray(countries)) return {};
    return countries.reduce((acc, country) => {
      acc[country.code] = country;
      return acc;
    }, {});
  }

  serializeAirlines(airlines) {
    return airlines.reduce((acc, next) => {
      const itemCopy = {...next}
      itemCopy.logo = `https://pics.avs.io/200/200/${itemCopy.code}.png`;
      itemCopy.name = itemCopy.name || itemCopy?.name_translations?.en;
      acc[itemCopy.code] = itemCopy;
      return acc;
    }, {});
  }
  getCityCodeByKey(key) {
    const city = Object.values(this.cities).find(item => item.fullname === key)
    return city.code;
  }
  getCitynameByCodeName(code) {
    return this.cities[code].name;
  }
  getCountryNameByCode(code) {
    return this.countries[code].name;
  }
  getAirlineNameByCode(code) {
    return this.airlines[code] ? this.airlines[code].name : '';
  }
  getAirlineLogoByCode(code) {
    return this.airlines[code] ? this.airlines[code].logo : '';
  }

  async fetchTickets(params) {
    const response = await this.api.prices(params);
    this.lastSearch = this.serializeTickets(response.data);
    console.log(this.lastSearch);
  }

  serializeTickets(tickets) {
    return Object.values(tickets).map(el => {
      return {
        ...el,
        origin_name: this.getCitynameByCodeName(el.origin),
        destination_name: this.getCitynameByCodeName(el.destination),
        airline_logo: this.getAirlineLogoByCode(el.airline),
        airline_name: this.getAirlineNameByCode(el.airline),
        departure_at: this.formatDate(el.departure_at, "dd MMM yyyy hh:mm"),
        return_at: this.formatDate(el.return_at, "dd MMM yyyy hh:mm"),
      };
    })
  }
}

const locations = new Locations(api, { formatDate });

export default locations;

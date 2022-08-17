import locationsInstance, { Locations } from '../locations';
import { formatDate } from '../../helpers/date'
import api, {Api} from '../../services/apiService'

const countries = [{ code: "BY", name: "Belarus" }];
const city = [{ name: "Minsk", country_code: "BY", code: "MSK" }];
const airlines = [
  {
    name: "Belavia",
    country_code: "BY",
    code: "BEL",
  },
];

jest.mock("../../services/apiService", () => {
  const mockApi = {
    countries: jest.fn(() => [{ code: "BY", name: "Belarus" }]),
    cities: jest.fn(() => [{ name: "Minsk", country_code: "BY", code: "MSK" }]),
    airlines: jest.fn(() => [
      { name: "Belavia", country_code: "BY", code: "BEL" },
    ]),
  };
  return {
    Api: jest.fn(() => mockApi)
  }
});

const apiService = new Api();

describe('Locations store test', () => {
    beforeEach(() => { 
      locationsInstance.countries = locationsInstance.serializeCountries(countries);
      locationsInstance.cities = locationsInstance.serializeCity(city);
    });

    it("Check that locationsInstance is locations class", () => {
        expect(locationsInstance).toBeInstanceOf(Locations);
    });
    it("Sucsess locations instance create", () => {
        const instance = new Locations(api, { formatDate });
        expect(instance.countries).toBe(null);
        expect(instance.cities).toBe(null);
        expect(instance.shortCitiesList).toBe(null);
        expect(instance.airlines).toEqual({});
        expect(instance.lastSearch).toEqual({});
        expect(instance.formatDate).toEqual(formatDate);
    });

    it("Check correct country serialize", () => {
        const result = locationsInstance.serializeCountries(countries);
        const expectData = {
          BY: {
            code: "BY",
            name: "Belarus",
          },
        };
        expect(result).toEqual(expectData);
    })

        it("Check correct country serialize incorect data", () => {
          const result = locationsInstance.serializeCountries(null);
          expect(result).toEqual({});
        });

        it("Check correct city serialize", () => {
          const result = locationsInstance.serializeCity(city);
          const expectData = {
            MSK: {
              name: "Minsk",
              country_code: "BY",
              code: "MSK",
              country_name: "Belarus",
              fullname: "Minsk, Belarus",
            },
          };
          expect(result).toEqual(expectData);
        });
        it("Check correct get city by code", () => {
          const result = locationsInstance.getCitynameByCodeName("MSK");
          expect(result).toBe("Minsk");
        });
  it("Check correct work init function", () => {
    const locationsInstance = new Locations(apiService, formatDate)
    expect(locationsInstance.init()).resolves.toEqual([countries, city, airlines ]);
        })
})
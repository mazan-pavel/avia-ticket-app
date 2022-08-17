import api from '../apiService';
import config from '../../config/apiConfig'
import axios from 'axios';

jest.mock('axios');

const cities = [{ name: "Minsk", country_code: "BY", code: "MSK" }];

describe("Test api service", () => {
  it("Sucsess featch cities", async () => {
    axios.get.mockImplementationOnce(() => {
      return Promise.resolve({ data: cities });
    });
      await expect(api.cities()).resolves.toEqual(cities);
      expect(axios.get).toHaveBeenCalledWith(`${config.url}/cities`);
  });
    
    it("Error featch cities", async () => {
        const error = "Api error";
        axios.get.mockImplementationOnce(() => {
          return Promise.reject(new Error(error));
        });
        await expect(api.cities()).rejects.toThrow(error);
      });
});
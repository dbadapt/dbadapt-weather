import { render, screen } from '@testing-library/react';
import OpenWeatherMap from './OpenWeatherMap';

let openWeatherMap = new OpenWeatherMap({
    base_url: process.env.REACT_APP_OPENWEATHERMAP_BASE_URL,
    api_key: process.env.REACT_APP_OPENWEATHERMAP_API_KEY
}); 

test('call OpenWeatherMap.getWeather', () => {
    let result = {}
    result = openWeatherMap
    .getWeather({ q: "Saint Louis County,MO", units: "imperial"}).then(
        result => {
            expect(result).toBeDefined;
            expect(result.body.weather).toBeInstanceOf(Array);
            expect(result.body.main.temp).toBeGreaterThan(-999);
        }
    );
});

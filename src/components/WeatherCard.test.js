import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import WeatherCard from './WeatherCard';

describe('WeatherCard', () => {
  const mockWeatherData = {
    main: { temp: 20, humidity: 50 },
    weather: [{ main: 'Clouds', icon: '04d' }],
    name: 'Berlin',
  };

  it('displays the correct weather information', () => {
    const { getByText } = render(<WeatherCard weather={mockWeatherData} />);
    
    expect(getByText('Berlin')).toBeInTheDocument();
    expect(getByText('Clouds')).toBeInTheDocument();
    expect(getByText('20°C')).toBeInTheDocument();
    expect(getByText('Humidity: 50%')).toBeInTheDocument();
  });

  
  
});

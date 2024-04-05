import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import WeatherApp from './WeatherApp';
import WeatherCard from './WeatherCard';

// Mock the axios library
jest.mock('axios');

// Mock WeatherCard since its functionality is not being tested here
jest.mock('./WeatherCard', () => () => <div>WeatherCard Component</div>);

describe('WeatherApp', () => {
  it('renders correctly and can fetch weather data', async () => {
    // Mock axios response
    const mockedResponse = {
      data: {
        main: { temp: 15 },
        weather: [{ description: 'Cloudy' }],
        name: 'Berlin',
      },
    };
    axios.get.mockResolvedValue(mockedResponse);

    // Render the component
    const { getByLabelText, getByText } = render(<WeatherApp />);

    // Input city name
    fireEvent.change(getByLabelText(/city/i), { target: { value: 'Berlin' } });

    // Click the "Get Weather" button
    fireEvent.click(getByText(/get weather/i));

    // Wait for the WeatherCard component to be displayed
    await waitFor(() => expect(getByText(/WeatherCard Component/i)).toBeInTheDocument());
  });

  it('displays an error message when the API call fails', async () => {
    // Mock axios to return an error
    axios.get.mockRejectedValue(new Error('API call failed'));

    // Render the component
    const { getByLabelText, getByText } = render(<WeatherApp />);

    // Input city name
    fireEvent.change(getByLabelText(/city/i), { target: { value: 'UnknownCity' } });

    // Click the "Get Weather" button
    fireEvent.click(getByText(/get weather/i));

    // Wait for the error message to be displayed
    await waitFor(() => expect(getByText(/error, try again later/i)).toBeInTheDocument());
  });
});

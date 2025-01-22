import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';  // Importa MemoryRouter
import App from './App';
import BookingForm from './BookingForm';
import { initializeTimes, updateTimes } from './timeReducer';

// Prueba para el enlace "learn react"
test('renders learn react link', () => {
  render(
    <MemoryRouter>  {/* Envuelve el componente con MemoryRouter */}
      <App />
    </MemoryRouter>
  );
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

// Prueba del encabezado de BookingForm
test('Renders the BookingForm heading', () => {
  render(
    <BookingForm 
      submitFormData={jest.fn()} 
      availableTimes={["12:00", "13:00"]} 
      setDates={jest.fn()} 
    />
  );
  const headingElement = screen.getByText("Reserve a Table");
  expect(headingElement).toBeInTheDocument();
});

// Simulación e interacción en BookingForm
test('Calls submitFormData on form submission', () => {
  const mockSubmitFormData = jest.fn();
  const mockSetDates = jest.fn();

  render(
    <BookingForm 
      submitFormData={mockSubmitFormData} 
      availableTimes={["12:00", "13:00"]} 
      setDates={mockSetDates} 
    />
  );

  // Cambiar la fecha
  const dateInput = screen.getByRole('textbox', { name: /date/i });
  fireEvent.change(dateInput, { target: { value: '2025-01-25' } });
  expect(mockSetDates).toHaveBeenCalled();

  // Enviar el formulario
  const reserveButton = screen.getByRole('button', { name: /reserve/i });
  fireEvent.click(reserveButton);
  expect(mockSubmitFormData).toHaveBeenCalled();
});

// Reducer tests
describe('Time Reducer Functions', () => {
  test('initializeTimes should return the initial list of times', () => {
    const times = initializeTimes();
    expect(times).toEqual(["12:00", "13:00", "14:00"]);
  });

  test('updateTimes should return the same state if no action is provided', () => {
    const state = ["12:00", "13:00"];
    const action = { type: "UPDATE_TIMES" }; // Sin fecha seleccionada
    const updatedState = updateTimes(state, action);
    expect(updatedState).toEqual(state);
  });

  test('updateTimes should handle action with a date (future logic)', () => {
    const state = ["12:00", "13:00"];
    const action = { type: "UPDATE_TIMES", date: "2025-01-25" };
    const updatedState = updateTimes(state, action);
    expect(updatedState).toEqual(state); // En este caso, aún no hay lógica específica
  });
});

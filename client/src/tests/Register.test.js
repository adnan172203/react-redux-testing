import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from '@testing-library/react';
import RootWrapper from './setup';
import '@testing-library/jest-dom';

import Register from '../pages/register/Register';

describe('register component', () => {
  test('register form input', async() => {
      const dispatch = jest.fn();
    const {
      getByTestId,
      findByText,
      getByPlaceholderText,
      getByRole,
      queryByText,
      getByText,
      store
    } = render(
      <RootWrapper>
        <Register />
      </RootWrapper>
    );


    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText(/your name/i), {
        target: {value: ''},
      });

    });

//     fireEvent.blur(screen.getByPlaceholderText(/your name/i));

//     await act(async () => {
//       fireEvent.submit(getByTestId('register-form'));
//     });


//     expect(  findByText(/"Please provide an email and password"/i)).toBeInTheDocument();
  });
});

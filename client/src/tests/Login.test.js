import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from '@testing-library/react';
import RootWrapper from './setup';
import '@testing-library/jest-dom';
import { login } from '../redux/user/userAction';

import Login from '../pages/login/Login';

import { createMemoryHistory } from 'history';

// demo code

import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];

const initialState = {
  userLogin: {
    userInfo: {
      user: {
        email: '',
        password: '',
      },

      error: {
        message: 'Please provide email and password',
      },
    },
  },

  userRegister: {
    registerInfo: {},
    error: {
      name: '',
    },
  },
};

describe('login component', () => {
  const mockStore = configureStore(middlewares);
  let store = mockStore(initialState);
  const history = createMemoryHistory();
  store.dispatch = jest.fn();

  test('2 input components', () => {
    const { getByPlaceholderText } = render(
      <RootWrapper>
        <Login history={history} />
      </RootWrapper>
    );

    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText(/Password/i)).toBeTruthy();
  });

  test('renders login button', () => {
    const { getByRole } = render(
      <RootWrapper>
        <Login history={history} />
      </RootWrapper>
    );
    expect(getByRole('button', { name: /login/i })).toBeTruthy();
  });

  test('form behaviour', async () => {
    const { getByRole } = render(
      <MemoryRouter>
        <Provider store={store}>
          <Login history={history} />
        </Provider>
      </MemoryRouter>
    );

    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText('Email'), {
        target: { value: '' },
      });

      fireEvent.change(screen.getByPlaceholderText('Password'), {
        target: { value: '' },
      });
    });

    const button = getByRole('button', { name: /login/i });

    await act(async () => {
      fireEvent.click(button);
    });

    store.dispatch(
      login({
        email: '',
        password: '',
      })
    );
    // screen.debug();
    const ermessage = screen.queryByTestId('error_message');
    expect(ermessage).toBeInTheDocument();
  });
});

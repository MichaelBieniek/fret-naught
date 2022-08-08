// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

global.AudioContext = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: () => jest.fn(),
  useDispatch: () => jest.fn(),
}));

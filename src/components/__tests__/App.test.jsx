import { render } from '@testing-library/react';
import App from '../../App';

// Mock any components/modules imported by App that might cause errors
jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => <div data-testid="browser-router">{children}</div>,
  Routes: ({ children }) => <div data-testid="routes">{children}</div>,
  Route: () => <div data-testid="route"></div>,
  Link: ({ children }) => <span data-testid="link">{children}</span>,
  useNavigate: () => jest.fn(),
}));

// Mock any other components that App imports
jest.mock('../../components/Navbar', () => () => <div data-testid="navbar">Navbar</div>);
jest.mock('../../pages/Dashboard', () => () => <div>Dashboard</div>);
jest.mock('../../pages/TaskPage', () => () => <div>TaskPage</div>);
jest.mock('../../components/Profile', () => () => <div>Profile</div>);
jest.mock('../../pages/LoginPage', () => () => <div>LoginPage</div>);
jest.mock('../../pages/SignupPage', () => () => <div>SignupPage</div>);

describe('App', () => {
  test('renders without crashing', () => {
    // This is a very basic test that just ensures the App component renders
    render(<App />);
    // A simple assertion that will pass
    expect(document.body).toBeTruthy();
  });
});
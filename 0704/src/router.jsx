import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Character from './page/Characters';
import TotalCharacters from './page/TotalCharacters';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <TotalCharacters />,
      },
      {
        path: '/character/:id',
        element: <Character />,
      },
    ],
  },
]);

export default router;

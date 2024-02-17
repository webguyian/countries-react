import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { API_BASE_URL, ROUTES } from './const';
import CountryDetail from './components/CountryDetail';
import Main from './components/Main';
import Navbar from './components/Navbar';

const router = createBrowserRouter(
  [
    {
      path: ROUTES.home,
      Component: Main,
      loader: ({ request }) => {
        const endpoint = `${API_BASE_URL}/all`;
        return fetch(endpoint, {
          signal: request.signal
        });
      }
    },
    {
      path: ROUTES.detail,
      Component: CountryDetail,
      loader: ({ params, request }) => {
        const endpoint = `${API_BASE_URL}/alpha/${params.country}`;
        return fetch(endpoint, {
          signal: request.signal
        });
      }
    }
  ],
  {
    basename: '/countries-react/'
  }
);

function App() {
  return (
    <div className="flex flex-col h-full text-[#111517] bg-[#fafafa] dark:text-white dark:bg-[#202c37]">
      <Navbar />
      <main className="flex flex-col min-h-screen h-full p-8 text-center">
        <RouterProvider router={router} />
      </main>
    </div>
  );
}

export default App;

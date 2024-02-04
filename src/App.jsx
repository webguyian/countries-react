import Navbar from './components/Navbar';
import SearchFilter from './components/SearchFilter';
import Countries from './components/Countries';

function App() {
  return (
    <div className="flex flex-col h-full text-[#111517] bg-[#fafafa] dark:text-white dark:bg-[#202c37]">
      <Navbar />
      <main className="flex flex-col h-full p-8 text-center">
        <SearchFilter />
        <Countries />
      </main>
    </div>
  );
}

export default App;

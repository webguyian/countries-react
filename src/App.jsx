import './App.css';
import Navbar from './components/Navbar';
import SearchFilter from './components/SearchFilter';

function App() {
  return (
    <div className="flex flex-col h-screen text-[#111517] bg-[#fafafa] dark:text-white dark:bg-[#202c37]">
      <Navbar />
      <main className="flex flex-col h-full p-8 text-center">
        <SearchFilter />
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
      </main>
    </div>
  );
}

export default App;

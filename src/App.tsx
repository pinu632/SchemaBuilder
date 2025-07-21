import LeftSection from "./Components/LeftSection";
import PreviewSecion from "./Components/PreviewSecion";
import TopBar from "./Components/TopBar";

function App() {
  return (
    <div className="h-screen w-screen grid grid-rows-[60px_1fr] bg-neutral-950 overflow-hidden">
      <nav>
        <TopBar />
      </nav>

      <main className="flex flex-col md:flex-row h-full w-full overflow-hidden">
        <div className="flex-1 overflow-y-auto thin-scrollbar max-h-[calc(100vh-60px)]">
          <LeftSection />
        </div>

        <div className="flex-1 overflow-y-auto thin-scrollbar max-h-[calc(100vh-60px)]">
          <PreviewSecion />
        </div>
      </main>
    </div>
  );
}

export default App;

import { Books } from "./components/Books";
import { BookStats } from "./components/BookStats";
import { Header } from "./components/Header";

function App() {
  return (
    <div className="w-[100vw] min-h-screen bg-background">
      <div className="w-full flex flex-col justify-center items-center p-[40px]">
        {/* Header */}
        <Header />

        {/* stats */}
        <div className="w-full mt-[50px]">
          <BookStats />
        </div>

        {/* Books */}
        <Books />
      </div>
    </div>
  )
}

export default App
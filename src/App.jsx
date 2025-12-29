import Header from './header.jsx'
import Sidebar from './sidebar.jsx'
import Footer from './footer.jsx'

function App() {
  return (
    <div className="h-screen bg-[#0a0a0a] text-white flex flex-col overflow-hidden">
      <Header />
      <div className="flex-1 overflow-hidden">
        <Sidebar />
      </div>
      <Footer />
    </div>
  )
}

export default App

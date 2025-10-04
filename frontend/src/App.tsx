// import Logo from "./assets/";
import DesktopMenu from "./components/DesktopMenu";
import { Menus } from "./utils.ts";

function App() {
  return (
    <div>
      <header className="h-16 text-[15px] fixed inset-0 flex-center bg-[#2A3491]">
        
        <nav className="px-3.5 flex-center-between w-full max-w-7xl mx-auto">
          <div className="flex-center gap-x-3 z-[900] relative">
            <img src="/" alt="/" className="size-8" />
            {/* <img src={Logo} alt="logo" className="size-8" /> */}
            <h3 className="text-lg font-semibold">Spoken Tutorial</h3>
          </div>
        </nav>

        <ul className="flex-center gap-x-1">
          {Menus.map((menu)=>(
            <DesktopMenu menu={menu} key={menu.name} />
          ))}
        </ul>

        <div className="flex-center gap-x-5 ">
          <button className="bg-[#F9C60D] text-gray-900 z-[999] relative px-3 py-1.5 shadow rounded-xl flex-center">
            Login
          </button>
          <button className="bg-black text-white z-[999] relative px-3 py-1.5 shadow rounded-xl flex-center">
            Register
          </button>
          <img src="/" alt="/" className="size-8" />
          {/* <img src={Logo} alt="logo" className="size-8" /> */}
        </div>

      </header>
    </div>
  )
}

export default App

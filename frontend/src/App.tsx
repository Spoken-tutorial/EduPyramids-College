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

        <ul>
          {Menus.map((menu)=>(
            <DesktopMenu menu={menu} key={menu.name} />
          ))}
        </ul>
      
      </header>
    </div>
  )
}

export default App

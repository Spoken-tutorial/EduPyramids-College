import DesktopMenu from "./components/DesktopMenu";
import MobileMenu from "./components/MobileMenu";
import { Menus } from "./utils";

function App() {
  return (
    <div>
      <header className="h-16 text-[15px] fixed inset-x-0 top-0 bg-[#2A3491] z-50">
        <nav className="px-3.5 flex items-center justify-between w-full max-w-7xl mx-auto h-16">
          <div className="flex items-center gap-x-3">
            <img src="/" alt="/" className="size-8" />
            <h3 className="text-lg font-semibold text-white">Spoken Tutorial</h3>
          </div>

          {/* Desktop Menu (only on lg+, hidden below lg) */}
          <ul className="hidden lg:flex items-center gap-x-1 ml-10">
            {Menus.map(menu => (
              <DesktopMenu menu={menu} key={menu.name} />
            ))}
          </ul>

          <div className="flex items-center gap-x-5">
            {/* Hide on small screens */}
            <button className="hidden lg:flex bg-[#F9C60D] text-gray-900 px-3 py-1.5 shadow rounded-xl items-center">
              Login
            </button>
            <button className="hidden lg:flex bg-black text-white px-3 py-1.5 shadow rounded-xl items-center">
              Register
            </button>
            <img src="/" alt="/" className="hidden lg:block size-8" />

            {/* MobileMenu (only below lg) */}
            <div className="flex lg:hidden">
              <MobileMenu Menus={Menus} />
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default App;

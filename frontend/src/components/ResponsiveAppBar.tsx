import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

// ----------- DesktopMenu ------------
export function DesktopMenu({ menu }) {
  const [isHover, setIsHover] = useState(false);
  const hasSubMenu = menu?.subMenu?.length > 0;

  const subMenuAnimate = {
    enter: { opacity: 1, y: 0, display: "block", transition: { duration: 0.25 }},
    exit: { opacity: 0, y: -10, display: "none", transition: { duration: 0.2 }},
  };

  return (
    <motion.li
      className="relative"
      onHoverStart={() => setIsHover(true)}
      onHoverEnd={() => setIsHover(false)}
    >
      <span className="flex items-center gap-1 px-3 py-1 rounded-xl cursor-pointer text-white">
        {menu.name}
        {hasSubMenu && (
          <ChevronDown className={`transition-transform ${isHover ? "rotate-180" : ""}`} />
        )}
      </span>
      {hasSubMenu && (
        <motion.div
          className="absolute left-1/2 transform -translate-x-1/2 top-full mt-4 z-40 min-w-[700px] bg-[#2A3491] rounded-xl shadow-lg px-10 py-8"
          initial="exit"
          animate={isHover ? "enter" : "exit"}
          variants={subMenuAnimate}
        >
          <div className={`grid gap-y-5 gap-x-16 ${menu.gridCols === 3 ? "grid-cols-3" : menu.gridCols === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
            {menu.subMenu.map((sub, i) => (
              <div key={i} className="text-white text-[17px] px-1 py-2 whitespace-nowrap cursor-pointer hover:text-[#F9C60D]">
                {sub.name}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.li>
  );
}

// ----------- MobileMenu ------------
export function MobileMenu({ Menus }) {
  const [isOpen, setIsOpen] = useState(false);
  const [clicked, setClicked] = useState(null);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
    setClicked(null);
  };

  return (
    <>
      <button onClick={toggleDrawer} className="text-white z-[999] relative">
        {isOpen ? <X /> : <Menu />}
      </button>
      {isOpen && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          className="fixed left-0 right-0 top-16 bottom-0 overflow-y-auto h-[calc(100vh-4rem)] bg-[#2A3491] backdrop-blur text-white p-6 z-50"
        >
          <ul>
            {Menus.map(({ name, subMenu }, i) => {
              const hasSubMenu = subMenu?.length > 0;
              const isClicked = clicked === i;
              return (
                <li key={name}>
                  <span
                    onClick={() => setClicked(isClicked ? null : i)}
                    className="flex items-center justify-between p-4 hover:bg-[#F9C60D] hover:text-gray-900 rounded-md cursor-pointer"
                  >
                    {name}
                    {hasSubMenu && (
                      <ChevronDown className={`ml-auto transition-transform ${isClicked ? "rotate-180" : ""}`} />
                    )}
                  </span>
                  {hasSubMenu && isClicked && (
                    <ul className="ml-5">
                      {subMenu.map(({ name }) => (
                        <li
                          key={name}
                          className="p-2 flex items-center hover:bg-[#F9C60D] hover:text-gray-900 rounded-md cursor-pointer gap-x-2"
                        >
                          <span>{name}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </motion.div>
      )}
    </>
  );
}

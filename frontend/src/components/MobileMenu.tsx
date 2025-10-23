import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { motion } from "framer-motion";

export default function MobileMenu({ Menus }) {
  const [isOpen, setIsOpen] = useState(false);
  const [clicked, setClicked] = useState(null);
  // Sub menu drawer
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
    setClicked(null);
  };

  const subMenuDrawer = {
    enter: { height: "auto", overflow: "hidden" },
    exit: { height: 0, overflow: "hidden" }
  };

  return (
    <>
      <button onClick={toggleDrawer} className="text-white z-[999] relative">
        {isOpen ? <X /> : <Menu />}
      </button>
      {/* Only render the sidebar when open (not hidden with styles) */}
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

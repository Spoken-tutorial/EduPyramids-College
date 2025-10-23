import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function DesktopMenu({ menu }) {
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

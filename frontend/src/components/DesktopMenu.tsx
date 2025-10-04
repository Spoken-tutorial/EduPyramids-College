import { ChevronDown } from "lucide-react";

export default function DesktopMenu({ menu }){
  const hasSubMenu = menu?.subMenu?.length>0;
  return <li>
    <span className="flex-center gap-1">
      {/* REPLACE HERE WITH ROUTER LINK AS NEEDED */}
      {menu.name}
      {hasSubMenu && (<ChevronDown className="mt-[0.6px]"/>)}
    </span>
  </li>
}
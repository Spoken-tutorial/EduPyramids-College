import { ChevronDown } from "lucide-react";

export default function DesktopMenu({ menu }){
  const hasSubMenu = menu?.subMenu?.length>0;
  return <li className="group/link">
    
    <span className="flex-center gap-1 cursor-pointer px-3 py-1 rounded-xl">
      {/* REPLACE HERE WITH ROUTER LINK AS NEEDED */}
      {menu.name}
      {hasSubMenu && (<ChevronDown className="mt-[0.6px] group-hover/link:rotate-180 duration-200"/>)}
    </span>
    {
      hasSubMenu && (
        <div className="sub-menu">
          <div>
            {
              menu?.subMenu?.map((subMenu, i)=>(
                <div key={i} className="relative cursor-pointer">
                  <div className="flex-center gap-x-4 group/menubox">
                    <div className="w-fit p-2 rounded-md group-hover/menubox:bg-[#F9C60D] group-hover/menubox:text-gray-900 duration-300">
                      <h6 className="font-semibold">{subMenu?.name}</h6>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      )
    }
  </li>
}
import { Outlet } from "react-router-dom"
import MegaMenu from "../../../src/components/homepage/AppBar"
export default function PublicLayout() {

    return (
       <>
        <MegaMenu />
        <Outlet />
       </>
    )
}
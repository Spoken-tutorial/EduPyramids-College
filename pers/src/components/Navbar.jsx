import React from 'react';
import { NavbarMenu } from '../data/data';
import { CiSearch } from "react-icons/ci";
import { CiLogin } from "react-icons/ci";
import { MdMenu } from 'react-icons/md';
import ResponsiveMenu from './ResponsiveMenu';

const Navbar = () => {
    const [open, setOpen] = React.useState(false);
  return (
    <>
        <nav>
            <div className="flex justify-center items-center bg-[#2A3491]">

                {/* Logo */}
                <div className='text-2xl flex items-center gap-2 font-bold py-8'>
                    <img 
                        src="" 
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <p>Spoken</p>
                    <p className='text-secondary'>Tutorial</p>
                </div>

                {/* Menu */}
                <div className='hidden md:block'>
                    <ul className='flex items-center gap-6 text-white'>
                        {
                            NavbarMenu.map((item) =>{
                                return(
                                    <li key={item.id}>
                                        <a href={item.link} className='inline-block py-1 px-3 hover:text-[#F9C60D] duration-200 font-semibold'>{item.title}</a>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>

                {/* Icons */}
                <div className='flex items-center gap-4'>
                    <button className='text-2xl text-white hover:bg-[#F9C60D] hover:text-white rounded-full font-bold p-1 duration-200'>
                        <CiSearch />
                    </button>
                    <button className='text-2xl text-white hover:bg-[#F9C60D] hover:text-white rounded-full font-bold p-1 duration-200'>
                        <CiLogin />
                    </button>
                </div>

                {/* Mobile view */}
                <div className='md:hidden' onClick={() => setOpen(!open)}>
                    <MdMenu className='text-4xl' />
                </div>

            </div>
        </nav>

        {/* Mobile sidebar */}
        <ResponsiveMenu open = {open} />
    </>
  )
}

export default Navbar

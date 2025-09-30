import React, { useState } from 'react';
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from './SideMenu';

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div className="flex items-center gap-4 bg-white border-b border-gray-200/50 py-4 px-7 sticky top-0 z-30">
      
      {/* Side menu toggle button */}
      <button
        className="block lg:hidden text-black"
        onClick={() => setOpenSideMenu(!openSideMenu)}
      >
        {openSideMenu ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>

      {/* Title right next to button */}
      <h2 className="text-lg font-medium text-black">
        Crack your Dream Company
      </h2>

      {/* Optional: SideMenu overlay */}
      {openSideMenu && (
        <div className="fixed top-[61px] left-0 bg-white z-40">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;

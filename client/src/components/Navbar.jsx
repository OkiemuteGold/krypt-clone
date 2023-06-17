import { useState } from "react";
import PropTypes from "prop-types";

import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { logo } from "../assets/images/images";
import { navLinks } from "../data";

export const NavBarItem = ({ title, classprops }) => (
    <li className={`mx-4 cursor-pointer ${classprops ? classprops : ''}`}>{title}</li>
);

NavBarItem.propTypes = {
    classprops: PropTypes.string,
    title: PropTypes.string,
};

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false);

    return (
        <nav className="w-full flex md:justify-center justify-between items-center py-4">
            <div className="md:flex-[0.5] flex-initial justify-center items-center">
                <img src={logo} alt="logo" className="w-32 cursor-pointer" />
            </div>
            <ul className="text-white md:flex hidden list-none flex-row justify-end items-center flex-initial ml-auto">
                {navLinks?.length > 0 && navLinks.map(
                    (item, index) => (
                        <NavBarItem key={item + index} title={item} />
                    )
                )}
                <li className="bg-[#2952e3] hover:bg-[#2546bd] py-2 px-7 ml-4 rounded-full cursor-pointer">
                    Login
                </li>
            </ul>
            <div className="flex relative">
                {!toggleMenu && (
                    <HiMenuAlt4
                        fontSize={28}
                        className="text-white md:hidden cursor-pointer"
                        onClick={() => setToggleMenu(true)}
                    />
                )}
                {toggleMenu && (
                    <AiOutlineClose
                        fontSize={28}
                        className="text-white md:hidden cursor-pointer"
                        onClick={() => setToggleMenu(false)}
                    />
                )}
                {toggleMenu && (
                    <ul
                        className="z-10 fixed top-0 right-0 p-4 w-[75vw] h-screen shadow-2xl md:hidden list-none flex flex-col justify-start items-center rounded-sm blue-glassmorphism text-white animate-slide-in"
                    >
                        <li className="text-xl w-full mt-2 mb-4">
                            <AiOutlineClose
                                onClick={() => setToggleMenu(false)}
                            />
                        </li>
                        {navLinks?.length > 0 && navLinks.map(
                            (item, index) => (
                                <NavBarItem
                                    key={item + index}
                                    title={item}
                                    classprops="my-4 text-xl"
                                />
                            )
                        )}
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

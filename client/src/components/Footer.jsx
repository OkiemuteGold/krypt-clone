import { AiFillGithub } from "react-icons/ai";
import { logo } from "../assets/images/images";
import { navLinks } from "../data";

const Footer = () => (
    <div className="w-full gradient-bg-footer">
        <div className="main_max_width flex md:justify-center justify-between items-center flex-col p-4">
            <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
                <div className="flex flex-[0.5] sm:justify-start justify-center items-center">
                    <img src={logo} alt="logo" className="w-32" />
                </div>
                <div className="flex flex-1 sm:justify-end justify-center items-center flex-wrap sm:mt-0 mt-6 w-full ml-auto">
                    {navLinks?.length > 0 && navLinks.map(
                        (item, index) => (
                            <p key={item + index} className="text-white text-base text-center mx-2 cursor-pointer">{item}</p>
                        )
                    )}
                </div>
            </div>

            <div className="flex justify-center items-center flex-col text-sm text-center text-white my-5">
                <p className="">Come join us and let&lsquo;s build stuffs together</p>
                <p className="font-medium mt-2">info@og.com</p>
            </div>

            <div className="w-full h-[0.25px] bg-gray-400 mt-6" />

            <div className="w-full flex justify-between items-center mt-3">
                <p className="text-white text-left text-sm">&copy;OGold. All rights reserved</p>
                <p className="text-white text-right">
                    <a href="https://github.com/OkiemuteGold" target="_blank" rel="noopener noreferrer">
                        <AiFillGithub />
                    </a>
                </p>
            </div>
        </div>
    </div>
);

export default Footer;

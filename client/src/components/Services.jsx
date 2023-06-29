import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";

import PropTypes from "prop-types"

const ServiceCard = ({ color, title, icon, subtitle }) => (
    <div className="flex flex-row justify-start items-center white-glassmorphism sm:px-4 px-3 py-4 my-2 cursor-pointer hover:shadow-xl">
        <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
            {icon}
        </div>
        <div className="sm:ml-5 ml-4 flex flex-col flex-1">
            <h3 className="text-white text-lg">{title}</h3>
            <p className="mt-1 text-white text-sm md:w-9/12">
                {subtitle}
            </p>
        </div>
    </div>
);

ServiceCard.propTypes = {
    color: PropTypes.string,
    title: PropTypes.string,
    icon: PropTypes.object,
    subtitle: PropTypes.string
}

const Services = () => (
    <div className="w-full gradient-bg-services">
        <div className="main_max_width flex justify-center items-center">
            <div className="flex mf:flex-row flex-col mf:items-center justify-between md:p-20 py-12 px-2 gap-3">
                <div className="flex-1 flex flex-col justify-start items-start">
                    <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient ">
                        Services that we
                        <br />
                        continue to improve
                    </h1>

                    <p className="text-left mt-3 mb-4 mf:mb-0 text-white font-light md:w-9/12 w-11/12 text-base">
                        The best choice for buying and selling your crypto assets, with the
                        various super friendly services we offer
                    </p>
                </div>

                <div className="flex-1 flex flex-col justify-start mf:items-center">
                    <ServiceCard
                        color="bg-[#2952E3]"
                        title="Security guarantee"
                        icon={<BsShieldFillCheck fontSize={20} className="text-white" />}
                        subtitle="Security is guaranteed. We always maintain privacy and maintain the quality of our products"
                    />

                    <ServiceCard
                        color="bg-[#8945F8]"
                        title="Best exchange rates"
                        icon={<BiSearchAlt fontSize={20} className="text-white" />}
                        subtitle="Security is guaranteed. We always maintain privacy and maintain the quality of our products"
                    />

                    <ServiceCard
                        color="bg-[#F84550]"
                        title="Fastest transactions"
                        icon={<RiHeart2Fill fontSize={20} className="text-white" />}
                        subtitle="Security is guaranteed. We always maintain privacy and maintain the quality of our products"
                    />
                </div>
            </div>
        </div>
    </div>
);

export default Services;

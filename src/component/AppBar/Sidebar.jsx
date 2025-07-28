import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';
import MergeTypeIcon from '@mui/icons-material/MergeType';

function SidebarMenu({ isSidebarOpen }) {
    return (
        <div className={`min-h-screen w-72 bg-white my-4 mr-4 ml-2 rounded-md shadow-lg ${isSidebarOpen ? '' : 'hidden'}`}>
            <ul className="mt-4">
                <NavItem to="/" icon={<DashboardIcon />} text="Dashboard" />
                <NavItem to="/productionplan" icon={<BarChartIcon />} text="Production Plan" />

                <DropdownNavItem text="Setting" icon={<SettingsIcon />}>
                    <NavItem to="/setting/department" icon={<OtherHousesIcon />} text="Departments" />
                    <NavItem to="/setting/machine" icon={<LaptopChromebookIcon />} text="Machines" />
                    <NavItem to="/setting/type" icon={<MergeTypeIcon />} text="Types" />
                </DropdownNavItem>
            </ul>
        </div>
    );
}

const NavItem = ({ to, icon, text }) => {
    const location = useLocation();
    return (
        <li className="my-3 mx-2">
            <Link
                to={to}
                className={`flex items-center rounded-lg px-3 py-2 text-gray-700 hover:text-red-700 ${location.pathname === to ? 'bg-gray-200 font-semibold' : ''
                    }`}
            >
                {icon && <span className="mr-2">{icon}</span>} {text}
            </Link>
        </li>
    );
};

const DropdownNavItem = ({ text, icon, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <li className="my-3 mx-2 select-none">
            <div
                className="flex items-center justify-between rounded-lg px-3 py-2 text-gray-700 cursor-pointer hover:text-red-700"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center">
                    {icon && <span className="mr-2">{icon}</span>} {text}
                </div>
                {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </div>
            {isOpen && <ul className="ml-2 mt-2">{children}</ul>}
        </li>
    );
};

export default SidebarMenu;

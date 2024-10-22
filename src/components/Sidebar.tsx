import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Package, TrendingUp, FileText, User } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: LayoutDashboard, text: 'Dashboard', to: '/' },
    { icon: Package, text: 'Inventory', to: '/inventory' },
    { icon: TrendingUp, text: 'Sales', to: '/sales' },
    { icon: FileText, text: 'Purchase Orders', to: '/purchase-orders' },
    { icon: User, text: 'Profile', to: '/profile' },
  ];

  return (
    <motion.aside
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className="bg-indigo-700 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out"
    >
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-4 py-3 rounded transition duration-200 ${
                    isActive
                      ? 'bg-indigo-800 text-white'
                      : 'text-indigo-100 hover:bg-indigo-600'
                  }`
                }
              >
                <item.icon className="h-5 w-5" />
                <span>{item.text}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </motion.aside>
  );
};

export default Sidebar;
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X } from 'lucide-react';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    // Simulating incoming notifications
    const timer = setInterval(() => {
      const newNotification = {
        id: Date.now(),
        message: `New notification at ${new Date().toLocaleTimeString()}`,
      };
      setNotifications((prev) => [...prev, newNotification]);
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="fixed top-4 right-4 bg-indigo-600 text-white p-2 rounded-full shadow-lg hover:bg-indigo-700 transition duration-300"
      >
        <Bell className="h-6 w-6" />
      </button>

      <AnimatePresence>
        {showNotifications && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-16 right-4 w-80 bg-white rounded-lg shadow-xl overflow-hidden"
          >
            <div className="bg-indigo-600 text-white px-4 py-2 flex justify-between items-center">
              <h3 className="font-semibold">Notifications</h3>
              <button onClick={() => setShowNotifications(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <ul className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
              {notifications.map((notification) => (
                <motion.li
                  key={notification.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  className="px-4 py-3 hover:bg-gray-50 flex justify-between items-center"
                >
                  <span>{notification.message}</span>
                  <button
                    onClick={() => removeNotification(notification.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Notifications;
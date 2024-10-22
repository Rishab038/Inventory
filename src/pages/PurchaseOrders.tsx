import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, Trash2, Printer, Save } from 'lucide-react';

const PurchaseOrders = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [quantity, setQuantity] = useState(1);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5,
  };

  const products = [
    { id: 1, name: 'Product A', price: 10.99, stock: 100 },
    { id: 2, name: 'Product B', price: 15.99, stock: 75 },
    { id: 3, name: 'Product C', price: 20.99, stock: 50 },
  ];

  const addItem = () => {
    if (selectedItem) {
      const product = products.find(p => p.name === selectedItem);
      const existingItem = items.find(item => item.name === selectedItem);

      if (existingItem) {
        setItems(items.map(item =>
          item.name === selectedItem
            ? { ...item, quantity: item.quantity + quantity }
            : item
        ));
      } else {
        setItems([...items, { ...product, quantity }]);
      }

      setSelectedItem('');
      setQuantity(1);
    }
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity > 0) {
      setItems(items.map((item, i) =>
        i === index ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="p-6 space-y-6"
    >
      <h1 className="text-3xl font-bold text-gray-800">Purchase Order</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex space-x-4 mb-4">
          <select
            value={selectedItem}
            onChange={(e) => setSelectedItem(e.target.value)}
            className="flex-grow border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Select an item</option>
            {products.map((product) => (
              <option key={product.id} value={product.name}>
                {product.name} - ${product.price.toFixed(2)} (Stock: {product.stock})
              </option>
            ))}
          </select>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            min="1"
            className="w-20 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={addItem}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Add Item
          </motion.button>
        </div>

        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">${item.price.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <button onClick={() => updateQuantity(index, item.quantity - 1)}>
                      <Minus className="h-4 w-4 text-gray-500" />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(index, item.quantity + 1)}>
                      <Plus className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">${(item.price * item.quantity).toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button onClick={() => removeItem(index)} className="text-red-600 hover:text-red-900">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6 flex justify-between items-center">
          <div className="text-xl font-semibold">
            Total: ${calculateTotal().toFixed(2)}
          </div>
          <div className="space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300 flex items-center"
            >
              <Save className="h-5 w-5 mr-2" />
              Save Order
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 flex items-center"
            >
              <Printer className="h-5 w-5 mr-2" />
              Print Invoice
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PurchaseOrders;
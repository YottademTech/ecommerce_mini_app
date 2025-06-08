import { motion } from 'framer-motion';
import React from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { MenuItem } from '../types';

interface Props {
    item: MenuItem;
    quantity?: number;
    onAdd: () => void;
    onIncrement?: () => void;
    onDecrement?: () => void;
}

const MenuItemCard: React.FC<Props> = ({ item, quantity = 0, onAdd, onIncrement, onDecrement }) => {
    return (
        <motion.div
            className="flex flex-col items-center bg-white dark:bg-zinc-900 rounded-xl p-4 shadow-md relative w-28 h-36 m-2"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05, boxShadow: '0 4px 24px #facc15aa' }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
            <motion.span
                className="text-4xl mb-1"
                whileTap={{ rotateX: 360 }}
                transition={{ type: 'spring', stiffness: 200, damping: 18, duration: 0.7 }}
            >
                {item.emoji}
            </motion.span>
            <span className="font-semibold text-base mb-1 text-center">{item.name}</span>
            <span className="text-xs text-zinc-400 mb-2">₵{item.price.toFixed(2)}</span>
            {item.isNew && (
                <span className="absolute top-2 left-2 bg-green-500 text-xs text-white px-2 py-0.5 rounded-full">NEW</span>
            )}
            {item.featured && (
                <span className="absolute top-2 right-2 bg-yellow-400 text-xs text-black px-2 py-0.5 rounded-full">⭐</span>
            )}
            {quantity > 0 ? (
                <div className="flex items-center justify-center w-full mt-auto gap-2">
                    <motion.button
                        whileTap={{ scale: 0.93 }}
                        className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-1.5 py-0.5 font-bold"
                        onClick={onDecrement}
                    >
                        <FaMinus />
                    </motion.button>
                    <span className="bg-yellow-400 text-black font-bold rounded-full px-2 py-0.5 text-base">{quantity}</span>
                    <motion.button
                        whileTap={{ scale: 0.93 }}
                        className="bg-green-500 hover:bg-green-600 text-white rounded-lg px-1.5 py-0.5 font-bold"
                        onClick={onIncrement}
                    >
                        <FaPlus />
                    </motion.button>
                </div>
            ) : (
                <motion.button
                    whileTap={{ scale: 0.93 }}
                    className={`mt-auto w-full py-0.5 rounded-lg font-bold transition-all duration-200 ${item.isNew ? 'bg-green-500 hover:bg-green-600' : 'bg-yellow-500 hover:bg-yellow-600'} text-white`}
                    onClick={onAdd}
                >
                    {item.isNew ? 'BUY' : 'ADD'}
                </motion.button>
            )}
        </motion.div>
    );
};

export default MenuItemCard; 
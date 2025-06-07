import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import { OrderItem } from '../types';

interface Props {
    order: OrderItem[];
    onAdd: (id: string) => void;
    onRemove: (id: string) => void;
    onClear: () => void;
    onCheckout: () => void;
}

const OrderView: React.FC<Props> = ({ order, onAdd, onRemove, onClear, onCheckout }) => {
    const total = order.reduce((sum, oi) => sum + oi.item.price * oi.quantity, 0);

    return (
        <motion.div
            className="fixed bottom-0 left-0 right-0 bg-zinc-950 border-t border-zinc-800 p-4 z-20"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
            <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-lg">Your Order</span>
                <button className="text-red-400 hover:text-red-600" onClick={onClear} title="Clear Order">
                    <FaTrash />
                </button>
            </div>
            <div className="max-h-32 overflow-y-auto mb-2">
                {order.length === 0 ? (
                    <span className="text-zinc-400">No items yet.</span>
                ) : (
                    <AnimatePresence initial={false}>
                        {order.map(oi => (
                            <motion.div
                                key={oi.item.id}
                                className="flex items-center justify-between py-1"
                                initial={{ opacity: 0, x: 40 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -40 }}
                                transition={{ duration: 0.2 }}
                            >
                                <span className="text-xl mr-2">{oi.item.emoji}</span>
                                <span className="flex-1 text-sm">{oi.item.name}</span>
                                <span className="mx-2">x{oi.quantity}</span>
                                <button className="mx-1 text-green-400 hover:text-green-600" onClick={() => onAdd(oi.item.id)}><FaPlus /></button>
                                <button className="mx-1 text-yellow-400 hover:text-yellow-600" onClick={() => onRemove(oi.item.id)}><FaMinus /></button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                )}
            </div>
            <div className="flex items-center justify-between mt-2">
                <span className="font-bold">Total: ${total.toFixed(2)}</span>
                <motion.button
                    whileTap={{ scale: 0.93 }}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-4 py-1 rounded-lg disabled:opacity-50 transition-all"
                    disabled={order.length === 0}
                    onClick={onCheckout}
                >
                    Checkout
                </motion.button>
            </div>
        </motion.div>
    );
};

export default OrderView; 
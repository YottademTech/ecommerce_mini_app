import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import { OrderItem } from '../types';

interface Props {
    order: OrderItem[];
    onIncrement: (id: string) => void;
    onDecrement: (id: string) => void;
    onRemove: (id: string) => void;
    onClear: () => void;
    onClose: () => void;
    onProceed: (comment: string) => void;
}

const OrderReview: React.FC<Props> = ({ order, onIncrement, onDecrement, onRemove, onClear, onClose, onProceed }) => {
    const [comment, setComment] = useState('');
    const total = order.reduce((sum, oi) => sum + oi.item.price * oi.quantity, 0);

    return (
        <motion.div
            className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-40 min-h-screen"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
            <div className="bg-zinc-900 rounded-none md:rounded-2xl shadow-2xl w-full md:w-96 max-w-full flex flex-col items-center h-full md:h-auto">
                <div className="w-full flex items-center justify-between p-6 pb-2">
                    <span className="font-bold text-lg">Your Order</span>
                    <button className="text-red-400 hover:text-red-600" onClick={onClear} title="Clear Order">
                        <FaTrash />
                    </button>
                </div>
                <div className="w-full flex-1 overflow-y-auto px-6" style={{ maxHeight: 'calc(100vh - 180px)' }}>
                    {order.length === 0 ? (
                        <span className="text-zinc-400">No items yet.</span>
                    ) : (
                        order.map(oi => (
                            <div key={oi.item.id} className="flex items-center justify-between py-1">
                                <span className="text-xl mr-2">{oi.item.emoji}</span>
                                <span className="flex-1 text-sm font-semibold">{oi.item.name}</span>
                                <span className="mx-2">x{oi.quantity}</span>
                                <button className="mx-1 text-green-400 hover:text-green-600" onClick={() => onIncrement(oi.item.id)}><FaPlus /></button>
                                <button className="mx-1 text-yellow-400 hover:text-yellow-600" onClick={() => onDecrement(oi.item.id)}><FaMinus /></button>
                                <button className="mx-1 text-red-400 hover:text-red-600" onClick={() => onRemove(oi.item.id)}><FaTrash /></button>
                                <span className="ml-2 font-bold">${(oi.item.price * oi.quantity).toFixed(2)}</span>
                            </div>
                        ))
                    )}
                    <textarea
                        className="w-full bg-zinc-800 text-white rounded-lg p-2 mb-4 mt-4 resize-none placeholder-zinc-400"
                        rows={2}
                        placeholder="Add comment... (special requests, details, etc.)"
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                    />
                    <div className="w-full flex items-center justify-between mb-4">
                        <span className="font-bold text-lg">Total</span>
                        <span className="font-bold text-lg">${total.toFixed(2)}</span>
                    </div>
                </div>
                {/* Fixed bottom buttons */}
                <div className="w-full px-6 pt-2 pb-4 bg-zinc-900/80 backdrop-blur flex flex-col gap-2 sticky bottom-0 z-10">
                    <motion.button
                        whileTap={{ scale: 0.93 }}
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg text-lg transition-all"
                        onClick={() => onProceed(comment)}
                        disabled={order.length === 0}
                    >
                        CHECKOUT
                    </motion.button>
                    <button className="text-zinc-400 hover:text-zinc-200 text-sm" onClick={onClose}>Back to Menu</button>
                </div>
            </div>
        </motion.div>
    );
};

export default OrderReview; 
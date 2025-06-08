import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import { OrderItem } from '../types';
import Shimmer from './Shimmer';

interface Props {
    order: OrderItem[];
    onIncrement: (id: string) => void;
    onDecrement: (id: string) => void;
    onRemove: (id: string) => void;
    onClear: () => void;
    onProceed: (comment: string) => void;
}

const OrderReview: React.FC<Props> = ({ order, onIncrement, onDecrement, onRemove, onClear, onProceed }) => {
    const [comment, setComment] = useState('');
    const total = order.reduce((sum, oi) => sum + oi.item.price * oi.quantity, 0);
    const [checkoutShimmer, setCheckoutShimmer] = useState(false);

    return (
        <div className="w-full py-6 px-0">
            <div className="bg-white dark:bg-zinc-900 text-black dark:text-white shadow-2xl flex flex-col items-center">
                <div className="w-full flex items-center justify-between p-6 pb-2">
                    <span className="font-bold text-xl">Your Order</span>
                    <button className="text-red-400 hover:text-red-600" onClick={onClear} title="Clear Order">
                        <FaTrash />
                    </button>
                </div>
                <div className="w-full flex-1 overflow-y-auto px-6" style={{ maxHeight: 'calc(100vh - 220px)' }}>
                    {order.length === 0 ? (
                        <span className="text-zinc-700 dark:text-zinc-300">No items yet.</span>
                    ) : (
                        order.map(oi => (
                            <div key={oi.item.id} className="flex items-center justify-between py-1">
                                <span className="text-2xl mr-2">{oi.item.emoji}</span>
                                <span className="flex-1 text-base font-semibold">{oi.item.name}</span>
                                <span className="mx-2">x{oi.quantity}</span>
                                <button className="mx-1 text-green-400 hover:text-green-600" onClick={() => onIncrement(oi.item.id)}><FaPlus /></button>
                                <button className="mx-1 text-yellow-400 hover:text-yellow-600" onClick={() => onDecrement(oi.item.id)}><FaMinus /></button>
                                <button className="mx-1 text-red-400 hover:text-red-600" onClick={() => onRemove(oi.item.id)}><FaTrash /></button>
                                <span className="ml-2 font-bold">₵{(oi.item.price * oi.quantity).toFixed(2)}</span>
                            </div>
                        ))
                    )}
                    <textarea
                        className="w-full bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white rounded-lg p-2 mb-4 mt-4 resize-none placeholder-zinc-400 dark:placeholder-zinc-500"
                        rows={2}
                        placeholder="Add comment... (special requests, details, etc.)"
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                    />
                    <div className="w-full flex items-center justify-between mb-4">
                        <span className="font-bold text-xl">Total</span>
                        <span className="font-bold text-lg">₵{total.toFixed(2)}</span>
                    </div>
                </div>
                <div className="fixed bottom-0 left-0 right-0 flex justify-center z-30 pb-0">
                    <div className="w-full bg-[#f3f3f3] dark:bg-zinc-800 shadow-lg flex items-center justify-center p-2">
                        <motion.button
                            whileTap={{ scale: 0.93 }}
                            className="w-11/12 max-w-md bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-xl text-lg transition-all relative overflow-hidden"
                            onClick={() => onProceed(comment)}
                            disabled={order.length === 0}
                            onMouseEnter={() => setCheckoutShimmer(true)}
                            onMouseLeave={() => setCheckoutShimmer(false)}
                            onMouseDown={() => setCheckoutShimmer(true)}
                            onMouseUp={() => setCheckoutShimmer(false)}
                        >
                            <Shimmer active={checkoutShimmer} />
                            CHECKOUT
                        </motion.button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderReview; 
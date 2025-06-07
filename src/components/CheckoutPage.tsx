import { motion } from 'framer-motion';
import React from 'react';
import { FaCheck } from 'react-icons/fa';
import { OrderItem } from '../types';
import { PaymentInfo } from './PaymentForm';
import { ShippingInfo } from './ShippingForm';

interface Props {
    order: OrderItem[];
    comment?: string;
    shippingInfo?: ShippingInfo | null;
    paymentInfo?: PaymentInfo | null;
    name: string;
    phone: string;
    onNameChange: (name: string) => void;
    onPhoneChange: (phone: string) => void;
    onClose: () => void;
    onConfirm: () => void;
    onEditSection?: (section: string) => void;
}

const isPaymentComplete = (paymentInfo?: PaymentInfo | null) => {
    if (!paymentInfo) return false;
    if (paymentInfo.method === 'card') {
        return !!(paymentInfo.cardNumber && paymentInfo.cardholder && paymentInfo.country && paymentInfo.zip);
    } else {
        return !!(paymentInfo.momoNetwork && paymentInfo.momoNumber && paymentInfo.momoNumber.length === 9);
    }
};

const isShippingComplete = (shippingInfo?: ShippingInfo | null) => {
    if (!shippingInfo) return false;
    return !!(shippingInfo.address1 && shippingInfo.city && shippingInfo.state && shippingInfo.country && shippingInfo.postcode && shippingInfo.name && shippingInfo.phone);
};

const CheckoutPage: React.FC<Props> = ({ order, comment, shippingInfo, paymentInfo, name, phone, onNameChange, onPhoneChange, onClose, onConfirm, onEditSection }) => {
    const total = order.reduce((sum, oi) => sum + oi.item.price * oi.quantity, 0);
    const orderNumber = Math.floor(100000000 + Math.random() * 900000000); // 9-digit order number

    return (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-40 min-h-screen">
            <div className="bg-zinc-900 rounded-none md:rounded-2xl shadow-2xl w-full md:w-96 max-w-full flex flex-col items-center h-full md:h-auto">
                <div className="w-full flex items-center justify-between p-6 pb-2">
                    <span className="font-bold text-lg">Checkout</span>
                    <button className="text-red-400 hover:text-red-600 text-lg" onClick={onClose} aria-label="Close">×</button>
                </div>
                <div className="w-full flex-1 overflow-y-auto px-6" style={{ maxHeight: 'calc(100vh - 180px)' }}>
                    <div className="w-full bg-zinc-800 rounded-xl p-4 mb-4">
                        <div className="flex items-center mb-2">
                            <span className="text-3xl mr-3">{order[0]?.item.emoji || '🍔'}</span>
                            <div>
                                <div className="font-bold">Order #{orderNumber}</div>
                                <div className="text-xs text-zinc-400">Perfect lunch from Durger King.</div>
                                <div className="text-xs text-zinc-400">Durger King</div>
                            </div>
                        </div>
                        {order.map(oi => (
                            <div key={oi.item.id} className="flex items-center justify-between text-sm mb-1">
                                <span>{oi.item.emoji} {oi.item.name} x{oi.quantity}</span>
                                <span>${(oi.item.price * oi.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                        <div className="flex items-center justify-between text-sm mt-2">
                            <span>Free Delivery</span>
                            <span>$0.00</span>
                        </div>
                        <div className="flex items-center justify-between font-bold text-base mt-2">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>
                    <div className="w-full flex flex-col gap-2 mb-4">
                        <button
                            className="flex justify-between items-center w-full bg-zinc-800 rounded-lg px-4 py-3 text-left"
                            onClick={() => onEditSection && onEditSection('payment')}
                        >
                            <span>Payment Method</span>
                            <span className="flex items-center gap-1">
                                {isPaymentComplete(paymentInfo) ? (
                                    <span className="flex items-center justify-center w-4 h-4 bg-green-500 text-white rounded-full"><FaCheck size={10} /></span>
                                ) : (
                                    <span className="text-zinc-400 text-xs truncate max-w-[120px]">{paymentInfo ? `•••• ${paymentInfo.cardNumber?.slice(-4)}` : ''}</span>
                                )}
                                <span className="text-blue-400 ml-1">&gt;</span>
                            </span>
                        </button>
                        <button
                            className="flex justify-between items-center w-full bg-zinc-800 rounded-lg px-4 py-3 text-left"
                            onClick={() => onEditSection && onEditSection('shipping')}
                        >
                            <span>Shipping Information</span>
                            <span className="flex items-center gap-1">
                                {isShippingComplete(shippingInfo) ? (
                                    <span className="flex items-center justify-center w-4 h-4 bg-green-500 text-white rounded-full"><FaCheck size={10} /></span>
                                ) : (
                                    <span className="text-zinc-400 text-xs truncate max-w-[120px]">{shippingInfo ? `${shippingInfo.address1}, ${shippingInfo.city}` : ''}</span>
                                )}
                                <span className="text-blue-400 ml-1">&gt;</span>
                            </span>
                        </button>
                    </div>
                    {comment && (
                        <div className="w-full bg-zinc-800 rounded-lg p-3 mb-4 text-zinc-300 text-sm">
                            <span className="font-semibold">Comment:</span> {comment}
                        </div>
                    )}
                </div>
                {/* Fixed bottom button */}
                <div className="w-full px-6 pt-2 pb-4 bg-zinc-900/80 backdrop-blur flex flex-col gap-2 sticky bottom-0 z-10">
                    <motion.button
                        whileTap={{ scale: 0.93 }}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-2xl text-lg transition-all"
                        onClick={onConfirm}
                    >
                        Pay ${total.toFixed(2)}
                    </motion.button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage; 
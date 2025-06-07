import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';
import { submitOrder } from './api/order';
import { getTelegramUser } from './api/telegram';
import CheckoutPage from './components/CheckoutPage';
import MenuGrid from './components/MenuGrid';
import OrderReview from './components/OrderReview';
import PaymentForm, { PaymentInfo } from './components/PaymentForm';
import ShippingForm, { ShippingInfo } from './components/ShippingForm';
import { MENU_ITEMS } from './data';
import { OrderItem } from './types';

const MainApp: React.FC = () => {
    const [order, setOrder] = useState<OrderItem[]>([]);
    const [checkoutComment, setCheckoutComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null);
    const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();

    const handleAdd = (id: string) => {
        setOrder(prev => {
            const found = prev.find(oi => oi.item.id === id);
            if (found) {
                return prev.map(oi => oi.item.id === id ? { ...oi, quantity: oi.quantity + 1 } : oi);
            } else {
                const item = MENU_ITEMS.find(mi => mi.id === id)!;
                return [...prev, { item, quantity: 1 }];
            }
        });
    };

    const handleIncrement = (id: string) => {
        setOrder(prev => prev.map(oi => oi.item.id === id ? { ...oi, quantity: oi.quantity + 1 } : oi));
    };

    const handleDecrement = (id: string) => {
        setOrder(prev => prev
            .map(oi => oi.item.id === id ? { ...oi, quantity: oi.quantity - 1 } : oi)
            .filter(oi => oi.quantity > 0)
        );
    };

    const handleRemove = (id: string) => {
        setOrder(prev => prev.filter(oi => oi.item.id !== id));
    };

    const handleClear = () => setOrder([]);

    const handleViewOrder = () => navigate('/order');
    const handleProceedToCheckout = (comment: string) => {
        setCheckoutComment(comment);
        navigate('/checkout');
    };
    const handleEditSection = (section: string) => {
        if (section === 'shipping') navigate('/shipping');
        if (section === 'payment') navigate('/payment');
    };
    const handleSaveShipping = (info: ShippingInfo) => {
        setShippingInfo(info);
        navigate(-1);
    };
    const handleSavePayment = (info: PaymentInfo) => {
        setPaymentInfo(info);
        navigate(-1);
    };
    const handleConfirmOrder = async () => {
        setLoading(true);
        setFeedback(null);
        try {
            const user = getTelegramUser();
            await submitOrder(order, user);
            setFeedback('Order sent successfully!');
            setOrder([]);
            setTimeout(() => {
                navigate('/');
                setFeedback(null);
            }, 1800);
        } catch (e) {
            setFeedback('Failed to send order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="font-apple min-h-screen bg-black text-white flex flex-col items-center pb-32">
            <div className="w-full max-w-md mx-auto">
                <div className="flex items-center justify-between py-4 px-4">
                    <button className="text-blue-400 font-bold">Close</button>
                    <div className="text-center">
                        <div className="font-bold text-xl">Durger King</div>
                        <div className="text-xs text-zinc-400">mini app</div>
                    </div>
                    <div style={{ width: 48 }}></div>
                </div>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <MenuGrid
                                    items={MENU_ITEMS}
                                    order={order}
                                    onAdd={handleAdd}
                                    onIncrement={handleIncrement}
                                    onDecrement={handleDecrement}
                                />
                                {order.length > 0 && (
                                    <div className="fixed bottom-4 left-0 right-0 flex justify-center z-30">
                                        <button
                                            className="w-11/12 max-w-md bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-2xl text-lg shadow-xl"
                                            onClick={handleViewOrder}
                                        >
                                            VIEW ORDER
                                        </button>
                                    </div>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/order"
                        element={
                            <OrderReview
                                order={order}
                                onIncrement={handleIncrement}
                                onDecrement={handleDecrement}
                                onRemove={handleRemove}
                                onClear={handleClear}
                                onClose={() => navigate(-1)}
                                onProceed={handleProceedToCheckout}
                            />
                        }
                    />
                    <Route
                        path="/checkout"
                        element={
                            <CheckoutPage
                                order={order}
                                onClose={() => navigate(-1)}
                                onConfirm={handleConfirmOrder}
                                onEditSection={handleEditSection}
                                comment={checkoutComment}
                                shippingInfo={shippingInfo}
                                paymentInfo={paymentInfo}
                                name={name}
                                phone={phone}
                                onNameChange={setName}
                                onPhoneChange={setPhone}
                            />
                        }
                    />
                    <Route
                        path="/shipping"
                        element={
                            <ShippingForm
                                initial={shippingInfo || undefined}
                                onSave={handleSaveShipping}
                                onClose={() => navigate(-1)}
                            />
                        }
                    />
                    <Route
                        path="/payment"
                        element={
                            <PaymentForm
                                initial={paymentInfo || undefined}
                                onSave={handleSavePayment}
                                onClose={() => navigate(-1)}
                            />
                        }
                    />
                </Routes>
            </div>
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-40">
                    <div className="bg-zinc-800 text-white px-6 py-4 rounded-xl shadow-lg text-lg animate-pulse">Sending order...</div>
                </div>
            )}
            {feedback && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-zinc-900 text-white px-8 py-6 rounded-2xl shadow-2xl text-xl font-bold">
                        {feedback}
                    </div>
                </div>
            )}
        </div>
    );
};

const App: React.FC = () => (
    <Router>
        <MainApp />
    </Router>
);

export default App; 
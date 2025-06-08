import React, { useState } from 'react';

export interface PaymentInfo {
    method: 'card' | 'momo';
    cardNumber?: string;
    cardholder?: string;
    country?: string;
    zip?: string;
    saveInfo?: boolean;
    momoNetwork?: 'mtn-momo' | 'airtel-cash' | 'telecel-cash';
    momoNumber?: string;
}

interface Props {
    initial?: PaymentInfo;
    onSave: (info: PaymentInfo) => void;
}

const PaymentForm: React.FC<Props> = ({ initial, onSave }) => {
    const [tab, setTab] = useState<'card' | 'momo'>(initial?.method || 'card');
    const [info, setInfo] = useState<PaymentInfo>(
        initial || {
            method: 'card',
            cardNumber: '',
            cardholder: '',
            country: '',
            zip: '',
            saveInfo: false,
            momoNetwork: 'mtn-momo',
            momoNumber: '',
        }
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setInfo(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleTab = (method: 'card' | 'momo') => {
        setTab(method);
        setInfo(prev => ({ ...prev, method }));
    };

    const handleNetworkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInfo(prev => ({ ...prev, momoNetwork: e.target.value as PaymentInfo['momoNetwork'] }));
    };

    return (
        <div className="w-full max-w-md mx-auto py-6 px-4">
            <form
                className="bg-white dark:bg-zinc-900 text-black dark:text-white shadow-2xl flex flex-col items-center"
                onSubmit={e => {
                    e.preventDefault();
                    onSave(info);
                }}
            >
                <div className="w-full flex items-center justify-between p-6 pb-2">
                    <span className="font-bold text-xl">Payment Method</span>
                </div>
                <div className="w-full px-4">
                    <div className="w-full flex mb-4">
                        <button
                            type="button"
                            className={`flex-1 py-2 rounded-t-lg font-bold ${tab === 'card' ? 'bg-zinc-800 text-white' : 'bg-zinc-700 text-zinc-400'}`}
                            onClick={() => handleTab('card')}
                        >
                            Card
                        </button>
                        <button
                            type="button"
                            className={`flex-1 py-2 rounded-t-lg font-bold ${tab === 'momo' ? 'bg-zinc-800 text-white' : 'bg-zinc-700 text-zinc-400'}`}
                            onClick={() => handleTab('momo')}
                        >
                            Mobile Money
                        </button>
                    </div>
                    {tab === 'card' ? (
                        <>
                            <input className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-lg p-2 text-black dark:text-white mb-2" name="cardNumber" placeholder="1234 5678 1234 5678" value={info.cardNumber || ''} onChange={handleChange} required={tab === 'card'} maxLength={19} />
                            <input className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-lg p-2 text-black dark:text-white mb-2" name="cardholder" placeholder="Cardholder Name" value={info.cardholder || ''} onChange={handleChange} required={tab === 'card'} />
                            <div className="w-full grid grid-cols-2 gap-2 mb-2">
                                <input className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-2 text-black dark:text-white" name="country" placeholder="Country" value={info.country || ''} onChange={handleChange} required={tab === 'card'} />
                                <input className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-2 text-black dark:text-white" name="zip" placeholder="Zip Code" value={info.zip || ''} onChange={handleChange} required={tab === 'card'} />
                            </div>
                            <div className="w-full flex items-center gap-2 mb-4">
                                <input type="checkbox" name="saveInfo" checked={!!info.saveInfo} onChange={handleChange} id="savePaymentInfo" />
                                <label htmlFor="savePaymentInfo" className="text-zinc-300 text-base">Save Payment Information</label>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="w-full flex flex-col gap-2 mb-2">
                                <label className="flex items-center gap-3 bg-zinc-100 dark:bg-zinc-800 rounded-lg px-3 py-2 text-base">
                                    <input type="radio" name="momoNetwork" value="mtn-momo" checked={info.momoNetwork === 'mtn-momo'} onChange={handleNetworkChange} />
                                    <img src="https://d3hxftityr9pmy.cloudfront.net/images/7cc90e71590b4599bf15693bb14948ce.jpeg" alt="MTN Mobile Money" className="w-7 h-7 rounded-full object-cover border border-zinc-700" />
                                    <span>MTN Mobile Money</span>
                                </label>
                                <label className="flex items-center gap-3 bg-zinc-100 dark:bg-zinc-800 rounded-lg px-3 py-2 text-base">
                                    <input type="radio" name="momoNetwork" value="airtel-cash" checked={info.momoNetwork === 'airtel-cash'} onChange={handleNetworkChange} />
                                    <img src="https://d3hxftityr9pmy.cloudfront.net/images/e6df288488f843059080db169b58c8a0.png" alt="AT Money" className="w-7 h-7 rounded-full object-cover border border-zinc-700" />
                                    <span>AT Money</span>
                                </label>
                                <label className="flex items-center gap-3 bg-zinc-100 dark:bg-zinc-800 rounded-lg px-3 py-2 text-base">
                                    <input type="radio" name="momoNetwork" value="telecel-cash" checked={info.momoNetwork === 'telecel-cash'} onChange={handleNetworkChange} />
                                    <img src="https://d3hxftityr9pmy.cloudfront.net/images/b440d192790342df9b0e2f4969e426df.png" alt="Telecel Cash" className="w-7 h-7 rounded-full object-cover border border-zinc-700" />
                                    <span>Telecel Cash</span>
                                </label>
                            </div>
                            <input className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-lg p-2 text-black dark:text-white mb-2" name="momoNumber" placeholder="Mobile Money Number" value={info.momoNumber || ''} onChange={handleChange} required={tab === 'momo'} maxLength={9} />
                        </>
                    )}
                </div>
                <div className="w-full px-6 pt-2 pb-4 bg-white/80 dark:bg-zinc-900/80 backdrop-blur flex flex-col gap-2 sticky bottom-0 z-10">
                    <button
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg text-lg transition-all"
                        type="submit"
                    >
                        Save & Continue
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PaymentForm; 
import React, { useState } from 'react';

export interface ShippingInfo {
    address1: string;
    address2: string;
    city: string;
    state: string;
    country: string;
    postcode: string;
    name: string;
    phone: string;
    saveInfo: boolean;
}

interface Props {
    initial?: ShippingInfo;
    onSave: (info: ShippingInfo) => void;
}

const ShippingForm: React.FC<Props> = ({ initial, onSave }) => {
    const [info, setInfo] = useState<ShippingInfo>(
        initial || {
            address1: '',
            address2: '',
            city: '',
            state: '',
            country: '',
            postcode: '',
            name: '',
            phone: '',
            saveInfo: true,
        }
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setInfo(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    return (
        <div className="w-full max-w-md mx-auto py-6 px-4">
            <form
                className="bg-zinc-900 shadow-2xl w-full md:w-96 max-w-full flex flex-col items-center h-full md:h-auto"
                onSubmit={e => {
                    e.preventDefault();
                    onSave(info);
                }}
            >
                <div className="w-full flex items-center justify-between p-6 pb-2">
                    <span className="font-bold text-xl">Shipping Information</span>
                </div>
                <div className="w-full flex-1 overflow-y-auto px-6" style={{ maxHeight: 'calc(100vh - 180px)' }}>
                    <div className="w-full grid grid-cols-2 gap-2 mb-2">
                        <input className="bg-zinc-800 rounded-lg p-2 text-white text-base" name="address1" placeholder="Address 1" value={info.address1} onChange={handleChange} required />
                        <input className="bg-zinc-800 rounded-lg p-2 text-white text-base" name="address2" placeholder="Address 2" value={info.address2} onChange={handleChange} />
                        <input className="bg-zinc-800 rounded-lg p-2 text-white text-base" name="city" placeholder="City" value={info.city} onChange={handleChange} required />
                        <input className="bg-zinc-800 rounded-lg p-2 text-white text-base" name="state" placeholder="State" value={info.state} onChange={handleChange} required />
                        <input className="bg-zinc-800 rounded-lg p-2 text-white text-base" name="country" placeholder="Country" value={info.country} onChange={handleChange} required />
                        <input className="bg-zinc-800 rounded-lg p-2 text-white text-base" name="postcode" placeholder="Postcode" value={info.postcode} onChange={handleChange} required />
                    </div>
                    <div className="w-full grid grid-cols-2 gap-2 mb-2">
                        <input className="bg-zinc-800 rounded-lg p-2 text-white text-base" name="name" placeholder="First and Last Name" value={info.name} onChange={handleChange} required />
                        <input className="bg-zinc-800 rounded-lg p-2 text-white text-base" name="phone" placeholder="Phone" value={info.phone} onChange={handleChange} required />
                    </div>
                    <div className="w-full flex items-center gap-2 mb-4">
                        <input type="checkbox" name="saveInfo" checked={info.saveInfo} onChange={handleChange} id="saveInfo" />
                        <label htmlFor="saveInfo" className="text-zinc-300 text-base">Save Info</label>
                    </div>
                </div>
                <div className="w-full px-6 pt-2 pb-4 bg-zinc-900/80 backdrop-blur flex flex-col gap-2 sticky bottom-0 z-10">
                    <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg text-lg transition-all">Done</button>
                </div>
            </form>
        </div>
    );
};

export default ShippingForm; 
import React from 'react';
import { MenuItem, OrderItem } from '../types';
import MenuItemCard from './MenuItemCard';

interface Props {
    items: MenuItem[];
    order: OrderItem[];
    onAdd: (id: string) => void;
    onIncrement: (id: string) => void;
    onDecrement: (id: string) => void;
}

const MenuGrid: React.FC<Props> = ({ items, order, onAdd, onIncrement, onDecrement }) => {
    return (
        <div className="grid grid-cols-3 gap-2 justify-items-center py-4">
            {items.map(item => {
                const orderItem = order.find(oi => oi.item.id === item.id);
                return (
                    <MenuItemCard
                        key={item.id}
                        item={item}
                        quantity={orderItem?.quantity || 0}
                        onAdd={() => onAdd(item.id)}
                        onIncrement={() => onIncrement(item.id)}
                        onDecrement={() => onDecrement(item.id)}
                    />
                );
            })}
        </div>
    );
};

export default MenuGrid; 
import axios from 'axios';
import { OrderItem } from '../types';
import { TelegramUser } from './telegram';

const BACKEND_URL = 'https://your-telegraf-backend.com/api/order'; // TODO: Replace with your real endpoint

export async function submitOrder(order: OrderItem[], user: TelegramUser | null) {
  const payload = {
    items: order.map(oi => ({
      id: oi.item.id,
      name: oi.item.name,
      price: oi.item.price,
      quantity: oi.quantity,
    })),
    total: order.reduce((sum, oi) => sum + oi.item.price * oi.quantity, 0),
    user,
  };
  return axios.post(BACKEND_URL, payload);
} 
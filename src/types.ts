export interface MenuItem {
  id: string;
  name: string;
  emoji: string;
  price: number;
  isNew?: boolean;
  featured?: boolean;
}

export interface OrderItem {
  item: MenuItem;
  quantity: number;
} 
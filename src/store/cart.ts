import { create } from "zustand";
import type { CartItem, PizzaItem, PizzaSize } from "@/lib/pizza-data";

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  addItem: (pizza: PizzaItem, size: PizzaSize) => void;
  removeItem: (pizzaId: string, size: PizzaSize) => void;
  updateQuantity: (pizzaId: string, size: PizzaSize, qty: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
  sendToWhatsApp: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,

  setOpen: (open: boolean) => set({ isOpen: open }),

  addItem: (pizza: PizzaItem, size: PizzaSize) => {
    const items = get().items;
    const existing = items.find(
      (i) => i.pizza.id === pizza.id && i.size === size
    );
    if (existing) {
      set({
        items: items.map((i) =>
          i.pizza.id === pizza.id && i.size === size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        ),
      });
    } else {
      set({ items: [...items, { pizza, size, quantity: 1 }] });
    }
  },

  removeItem: (pizzaId: string, size: PizzaSize) => {
    set({
      items: get().items.filter(
        (i) => !(i.pizza.id === pizzaId && i.size === size)
      ),
    });
  },

  updateQuantity: (pizzaId: string, size: PizzaSize, qty: number) => {
    if (qty <= 0) {
      get().removeItem(pizzaId, size);
      return;
    }
    set({
      items: get().items.map((i) =>
        i.pizza.id === pizzaId && i.size === size
          ? { ...i, quantity: qty }
          : i
      ),
    });
  },

  clearCart: () => set({ items: [] }),

  totalItems: () =>
    get().items.reduce((sum, i) => sum + i.quantity, 0),

  totalPrice: () =>
    get().items.reduce(
      (sum, i) => sum + i.pizza.prices[i.size] * i.quantity,
      0
    ),

  sendToWhatsApp: () => {
    const { items, totalPrice } = get();
    if (items.length === 0) return;

    const sizeLabels: Record<PizzaSize, string> = {
      small: 'Small (10")',
      medium: 'Medium (12")',
      large: 'Large (15")',
    };

    let msg = "Hi Pizza Dash! I'd like to order:\n\n";
    items.forEach((item) => {
      msg += `- ${item.quantity}x ${item.pizza.name} (${sizeLabels[item.size]}) — $${item.pizza.prices[item.size] * item.quantity}\n`;
    });
    msg += `\nTotal: $${totalPrice()}\n\nPlease confirm availability and delivery time. Thank you!`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/263776867162?text=${encoded}`, "_blank");
  },
}));
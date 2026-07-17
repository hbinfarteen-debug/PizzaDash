import { create } from "zustand";
import type { CartItem, PizzaItem, PizzaSize, Topping } from "@/lib/pizza-data";

function itemKey(id: string, size: PizzaSize, toppings: Topping[]): string {
  return `${id}|${size}|${toppings.map(t => t.id).sort().join(",")}`;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  addItem: (pizza: PizzaItem, size: PizzaSize, toppings?: Topping[]) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, qty: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
  sendToWhatsApp: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,

  setOpen: (open: boolean) => set({ isOpen: open }),

  addItem: (pizza: PizzaItem, size: PizzaSize, toppings: Topping[] = []) => {
    const items = get().items;
    const key = itemKey(pizza.id, size, toppings);
    const existing = items.find(
      (i) => itemKey(i.pizza.id, i.size, i.toppings) === key
    );
    if (existing) {
      set({
        items: items.map((i) =>
          itemKey(i.pizza.id, i.size, i.toppings) === key
            ? { ...i, quantity: i.quantity + 1 }
            : i
        ),
      });
    } else {
      set({ items: [...items, { pizza, size, quantity: 1, toppings }] });
    }
  },

  removeItem: (key: string) => {
    set({
      items: get().items.filter(
        (i) => itemKey(i.pizza.id, i.size, i.toppings) !== key
      ),
    });
  },

  updateQuantity: (key: string, qty: number) => {
    if (qty <= 0) {
      get().removeItem(key);
      return;
    }
    set({
      items: get().items.map((i) =>
        itemKey(i.pizza.id, i.size, i.toppings) === key
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
      (sum, i) => {
        const base = i.pizza.prices[i.size] * i.quantity;
        const toppingsCost = i.toppings.reduce((t, top) => t + top.price, 0) * i.quantity;
        return sum + base + toppingsCost;
      },
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
      const basePrice = item.pizza.prices[item.size];
      const toppingsCost = item.toppings.reduce((t, top) => t + top.price, 0);
      const lineTotal = (basePrice + toppingsCost) * item.quantity;
      msg += `- ${item.quantity}x ${item.pizza.name} (${sizeLabels[item.size]}): $${lineTotal}\n`;
      if (item.toppings.length > 0) {
        const toppingsStr = item.toppings.map(t => `${t.name} (+$${t.price.toFixed(2)})`).join(", ");
        msg += `  Toppings: ${toppingsStr}\n`;
      }
    });
    msg += `\nTotal: $${totalPrice()}\n\nPlease confirm availability and delivery time. Thank you!`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/263776867162?text=${encoded}`, "_blank");
  },
}));

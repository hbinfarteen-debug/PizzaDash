"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Trash2, MessageCircle, Pencil } from "lucide-react";
import Image from "next/image";
import { useCartStore } from "@/store/cart";
import { SIZE_LABELS, type PizzaSize, type Topping, type CartItem } from "@/lib/pizza-data";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ToppingsModal } from "@/components/pizza-dash/toppings-modal";

function cartItemKey(item: CartItem): string {
  return `${item.pizza.id}|${item.size}|${item.toppings.map(t => t.id).sort().join(",")}`;
}

function toppingsSummary(toppings: Topping[]): string {
  if (toppings.length === 0) return "";
  return toppings.map(t => t.name).join(", ");
}

function toppingsPrice(toppings: Topping[]): number {
  return toppings.reduce((sum, t) => sum + t.price, 0);
}

export function CartDrawer() {
  const { items, isOpen, setOpen, removeItem, updateQuantity, clearCart, totalPrice, totalItems, sendToWhatsApp, editingItem, setEditingItem, updateItemToppings } =
    useCartStore();

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className="flex w-full flex-col bg-cream p-0 sm:max-w-md"
        >
          <SheetHeader className="border-b border-crust/12 px-6 py-5">
            <SheetTitle
              className="text-left text-xl text-ink"
              style={{ fontFamily: "Anton, sans-serif" }}
            >
              Your Order
              {totalItems() > 0 && (
                <span className="ml-2 text-sm font-bold text-muted-text">
                  ({totalItems()} item{totalItems() !== 1 ? "s" : ""})
                </span>
              )}
            </SheetTitle>
          </SheetHeader>

          {items.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-semolina-2">
                <svg width="40" height="40" viewBox="0 0 140 140">
                  <circle cx="70" cy="70" r="66" fill="#e8b95f" opacity="0.3" />
                  <circle cx="70" cy="70" r="50" fill="#c98a3a" opacity="0.2" />
                </svg>
              </div>
              <p className="text-center text-sm font-semibold text-muted-text">
                Your cart is empty
                <br />
                <span className="font-normal">Add some pizza to get started!</span>
              </p>
              <button
                onClick={() => setOpen(false)}
                className="mt-2 rounded-xl bg-ink px-6 py-2.5 text-sm font-bold text-cream transition-colors hover:bg-tomato-dark"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <>
              {/* Cart items */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                <AnimatePresence mode="popLayout">
                  {items.map((item) => {
                    const key = cartItemKey(item);
                    return (
                      <motion.div
                        key={key}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20, height: 0 }}
                        className="mb-4 flex gap-4 rounded-xl border border-crust/12 bg-white p-3"
                      >
                        {/* Mini pizza thumbnail */}
                        <div className="relative flex h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-semolina">
                          <Image
                            src={item.pizza.image}
                            alt={item.pizza.name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>

                        <div className="flex flex-1 flex-col justify-between">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="text-sm font-bold text-ink">{item.pizza.name}</div>
                              <div className="text-xs text-muted-text">{SIZE_LABELS[item.size]}</div>
                              {item.toppings.length > 0 ? (
                                <div className="mt-0.5 flex items-center gap-1.5">
                                  <span className="text-[11px] leading-tight text-muted-text/70">
                                    + {toppingsSummary(item.toppings)}
                                  </span>
                                  <button
                                    onClick={() => {
                                      setEditingItem(item);
                                      setOpen(false);
                                    }}
                                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-muted-text/50 underline transition-colors hover:text-tomato"
                                  >
                                    <Pencil className="h-3 w-3" />
                                    Edit
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => {
                                    setEditingItem(item);
                                    setOpen(false);
                                  }}
                                  className="mt-0.5 inline-flex items-center gap-1 text-[11px] font-semibold text-muted-text/50 underline transition-colors hover:text-tomato"
                                >
                                  <Pencil className="h-3 w-3" />
                                  Add toppings
                                </button>
                              )}
                            </div>
                            <button
                              onClick={() => removeItem(key)}
                              className="text-muted-text transition-colors hover:text-tomato"
                              aria-label="Remove item"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  updateQuantity(key, item.quantity - 1)
                                }
                                className="flex h-7 w-7 items-center justify-center rounded-lg bg-semolina-2 text-ink transition-colors hover:bg-tomato hover:text-cream"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-6 text-center text-sm font-bold">{item.quantity}</span>
                              <button
                                onClick={() =>
                                  updateQuantity(key, item.quantity + 1)
                                }
                                className="flex h-7 w-7 items-center justify-center rounded-lg bg-semolina-2 text-ink transition-colors hover:bg-basil hover:text-cream"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <span className="text-sm font-extrabold text-ink">
                              ${((item.pizza.prices[item.size] + toppingsPrice(item.toppings)) * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Bottom actions */}
              <div className="border-t border-crust/12 px-6 py-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-semibold text-muted-text">Total</span>
                  <span
                    className="text-2xl text-ink"
                    style={{ fontFamily: "Anton, sans-serif" }}
                  >
                    ${totalPrice()}
                  </span>
                </div>

                <button
                  onClick={sendToWhatsApp}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-whatsapp py-3.5 text-base font-extrabold text-white shadow-lg shadow-whatsapp/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-whatsapp/45"
                >
                  <MessageCircle className="h-5 w-5" />
                  Send Order via WhatsApp
                </button>

                <button
                  onClick={clearCart}
                  className="mt-2 w-full rounded-xl py-2.5 text-sm font-semibold text-muted-text transition-colors hover:text-tomato"
                >
                  Clear cart
                </button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Edit modal */}
      {editingItem && (
        <ToppingsModal
          pizza={editingItem.pizza}
          size={editingItem.size}
          initialToppings={editingItem.toppings}
          editMode
          open={!!editingItem}
          onOpenChange={(open) => { if (!open) setEditingItem(null); }}
          onConfirm={(toppings) => {
            updateItemToppings(cartItemKey(editingItem), toppings);
            setEditingItem(null);
            setOpen(true);
          }}
        />
      )}
    </>
  );
}

"use client";

import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { TOPPINGS, SIZE_LABELS, type PizzaItem, type PizzaSize, type Topping } from "@/lib/pizza-data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ToppingsModalProps {
  pizza: PizzaItem;
  size: PizzaSize;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (toppings: Topping[]) => void;
  initialToppings?: Topping[];
  editMode?: boolean;
}

export function ToppingsModal({ pizza, size, open, onOpenChange, onConfirm, initialToppings, editMode }: ToppingsModalProps) {
  const [selected, setSelected] = useState<Topping[]>([]);

  useEffect(() => {
    if (open) {
      setSelected(initialToppings || []);
    }
  }, [open]);

  const toggle = (topping: Topping) => {
    setSelected((prev) =>
      prev.some((t) => t.id === topping.id)
        ? prev.filter((t) => t.id !== topping.id)
        : [...prev, topping]
    );
  };

  const handleConfirm = () => {
    onConfirm(selected);
    setSelected([]);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) setSelected([]);
    onOpenChange(open);
  };

  const toppingsTotal = selected.reduce((sum, t) => sum + t.price, 0);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md rounded-2xl border-crust/12 bg-cream p-0 shadow-2xl">
        <DialogHeader className="border-b border-crust/12 px-6 py-5">
          <DialogTitle
            className="text-xl text-ink"
            style={{ fontFamily: "Anton, sans-serif" }}
          >
            Customize Your Pizza
          </DialogTitle>
          <p className="text-sm text-muted-text">
            {pizza.name} &middot; {SIZE_LABELS[size]}
          </p>
        </DialogHeader>

        <div className="px-6 py-4">
          <h4 className="mb-3 text-xs font-extrabold uppercase tracking-[2px] text-muted-text">
            Extra Toppings
          </h4>
          <div className="space-y-1">
            {TOPPINGS.map((topping) => {
              const isSelected = selected.some((t) => t.id === topping.id);
              return (
                <button
                  key={topping.id}
                  onClick={() => toggle(topping)}
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition-all ${
                    isSelected
                      ? "bg-tomato/8 text-ink ring-1 ring-tomato/30"
                      : "text-muted-text hover:bg-semolina-2 hover:text-ink"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-[4px] border-2 transition-all ${
                        isSelected
                          ? "border-tomato bg-tomato text-cream"
                          : "border-crust/30"
                      }`}
                    >
                      {isSelected && <Check className="h-3 w-3" />}
                    </div>
                    <span className="text-sm font-semibold">{topping.name}</span>
                  </div>
                  <span className="text-xs font-bold">+${topping.price.toFixed(2)}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="border-t border-crust/12 px-6 py-5">
          <div className="mb-4 space-y-1">
            <div className="flex justify-between text-sm text-muted-text">
              <span>{pizza.name} ({SIZE_LABELS[size]})</span>
              <span>${pizza.prices[size].toFixed(2)}</span>
            </div>
            {selected.length > 0 && (
              <div className="flex justify-between text-sm text-muted-text">
                <span>Toppings ({selected.length})</span>
                <span>+${toppingsTotal.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-base font-extrabold text-ink">
              <span>Total</span>
              <span style={{ fontFamily: "Anton, sans-serif" }}>
                ${(pizza.prices[size] + toppingsTotal).toFixed(2)}
              </span>
            </div>
          </div>

          <button
            onClick={handleConfirm}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-ink py-3.5 text-sm font-extrabold text-cream shadow-lg transition-all hover:bg-tomato-dark"
          >
            <Check className="h-4 w-4" />
            {editMode ? "Update Item" : "Add to Cart"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

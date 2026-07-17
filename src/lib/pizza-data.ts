export type PizzaSize = "small" | "medium" | "large";

export interface PizzaItem {
  id: string;
  name: string;
  description: string;
  tag: string;
  prices: Record<PizzaSize, number>;
  image: string;
  toppingType: "pepperoni" | "margherita" | "bbq-chicken" | "veggie" | "hawaiian" | "meat-feast";
  isBestSeller?: boolean;
}

export interface CartItem {
  pizza: PizzaItem;
  size: PizzaSize;
  quantity: number;
}

export const PIZZAS: PizzaItem[] = [
  {
    id: "pepperoni-passion",
    name: "Pepperoni Passion",
    description: "Double pepperoni, mozzarella, slow-roasted tomato",
    tag: "Best seller",
    prices: { small: 10, medium: 15, large: 20 },
    image: "/images/pizzas/pepperoni.png",
    toppingType: "pepperoni",
    isBestSeller: true,
  },
  {
    id: "margherita-supreme",
    name: "Margherita Supreme",
    description: "San Marzano tomato, fresh basil, buffalo mozzarella",
    tag: "Classic",
    prices: { small: 8, medium: 12, large: 16 },
    image: "/images/pizzas/margherita.png",
    toppingType: "margherita",
  },
  {
    id: "bbq-chicken",
    name: "BBQ Chicken",
    description: "Smoky BBQ base, grilled chicken, red onion, cheddar",
    tag: "Smoky",
    prices: { small: 10, medium: 15, large: 20 },
    image: "/images/pizzas/bbq-chicken.png",
    toppingType: "bbq-chicken",
  },
  {
    id: "veggie-delight",
    name: "Veggie Delight",
    description: "Peppers, olives, mushroom, sweetcorn, baby spinach",
    tag: "Garden fresh",
    prices: { small: 8, medium: 12, large: 16 },
    image: "/images/pizzas/veggie-delight.png",
    toppingType: "veggie",
  },
  {
    id: "hawaiian-crown",
    name: "Hawaiian Crown",
    description: "Sweet pineapple, honey-glazed ham, mozzarella",
    tag: "Sweet & savory",
    prices: { small: 10, medium: 15, large: 20 },
    image: "/images/pizzas/hawaiian.png",
    toppingType: "hawaiian",
  },
  {
    id: "meat-feast",
    name: "Meat Feast",
    description: "Pepperoni, ham, beef sausage, bacon, mozzarella",
    tag: "For carnivores",
    prices: { small: 12, medium: 18, large: 24 },
    image: "/images/pizzas/meat-feast.png",
    toppingType: "meat-feast",
  },
];

export const SIZE_LABELS: Record<PizzaSize, string> = {
  small: '10"',
  medium: '12"',
  large: '15"',
};

export const WHATSAPP_NUMBER = "+263776867162";
export const WHATSAPP_LINK = "https://wa.me/263776867162";

export const TESTIMONIALS = [
  {
    name: "Tendai M.",
    role: "Regular Customer",
    text: "Honestly the best pizza in Bulawayo. The dough is perfectly chewy and the toppings are always fresh. I order every Friday without fail.",
    rating: 5,
  },
  {
    name: "Nomsa N.",
    role: "Verified Buyer",
    text: "Ordered for my daughter's birthday party — 6 large pizzas, all gone in 20 minutes. The Meat Feast is absolutely incredible!",
    rating: 5,
  },
  {
    name: "Craig S.",
    role: "Foodie",
    text: "As someone who's traveled across Africa, Pizza Dash holds its own against any pizzeria I've tried. The wood-fired crust is the real deal.",
    rating: 5,
  },
  {
    name: "Linah T.",
    role: "Loyal Customer",
    text: "WhatsApp ordering is so convenient. I message them at 6pm and the pizza arrives hot at my door by 6:45. Consistently amazing quality.",
    rating: 5,
  },
  {
    name: "David K.",
    role: "Office Manager",
    text: "We order for our team lunch every Thursday. The Margherita Supreme is a crowd favourite. Professional service every single time.",
    rating: 5,
  },
];

export const FAQS = [
  {
    q: "What areas in Bulawayo do you deliver to?",
    a: "We deliver across all major suburbs in Bulawayo including Parklands, Hillside, Suburbs, Kumalo, Belmont, Makokoba, and the CBD. If you're unsure, just WhatsApp us your location and we'll confirm!",
  },
  {
    q: "How long does delivery take?",
    a: "Average delivery time is 30–45 minutes depending on your location and order volume. We'll always give you an estimated time when you place your order.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept EcoCash, Visa, Mastercard, and cash on delivery. For EcoCash payments, we'll send you the merchant number when you confirm your order.",
  },
  {
    q: "Can I customize my pizza toppings?",
    a: "Absolutely! While our six signature flavours are designed to be perfect as-is, you can request extra toppings, no onions, extra cheese — just let us know in your WhatsApp message.",
  },
  {
    q: "Do you offer any deals or combos?",
    a: "Yes! We regularly run specials — follow us on Instagram and Facebook to catch our latest deals. We also offer bundle pricing for orders of 3 or more pizzas.",
  },
  {
    q: "Is your dough really proofed for 24 hours?",
    a: "Yes, every single dough ball is cold-fermented for a full 24 hours. This slow proofing process develops the flavour and creates that perfect chewy, airy crust with a crisp exterior.",
  },
];

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Menu", href: "#menu" },
  { label: "About", href: "#about" },
  { label: "Order", href: "#how-to-order" },
  { label: "FAQ", href: "#faq" },
];
export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  category: string;
  features: string[];
  specs: Record<string, string>;
  image: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "online-business",
    name: "Online Business Control System",
    slug: "online-business-tracker",
    price: 499,
    category: "Online Business",
    description: "Track orders, customer payments, sales flow & business performance seamlessly.",
    features: [
      "Revenue breakdown by platform",
      "Ad spend tracking",
      "Subscription management",
      "Monthly profit analysis",
      "Tax estimation"
    ],
    specs: {
      "Compatible with": "Excel 2013+, Google Sheets",
      "Format": ".xlsx",
      "License": "Lifetime Personal/Commercial",
      "Update": "Free Future Updates"
    },
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "boutique",
    name: "Boutique Operations Tracker",
    slug: "boutique-tracker",
    price: 599,
    category: "Boutique",
    description: "Manage inventory, sales activity, customer orders & boutique finances efficiently.",
    features: [
      "Inventory valuation",
      "Seasonal sales tracking",
      "Supplier payment logs",
      "Daily expense ledger",
      "Profit margins per item"
    ],
    specs: {
      "Compatible with": "Excel 2016+",
      "Format": ".xlsx",
      "License": "Lifetime",
      "Delivery": "Instant"
    },
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "freelancer",
    name: "Freelancer Income & Project Tracker",
    slug: "freelancer-tracker",
    price: 299,
    category: "Freelancer",
    description: "Track clients, project workflow, invoices & payment records professionally.",
    features: [
      "Project-wise income tracking",
      "Invoicing status dashboard",
      "Client expense reimbursement",
      "Quarterly tax planner",
      "Savings goal tracker"
    ],
    specs: {
      "Compatible with": "Excel, Google Sheets",
      "Format": ".xlsx",
      "License": "Lifetime",
      "Complexity": "Beginner Friendly"
    },
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "trading",
    name: "TradeFlow Business Ledger",
    slug: "traders-distributor-tracker",
    price: 1499,
    category: "Traders and distributor",
    description: "Monitor stock movement, distributor accounts & business transactions with clarity.",
    features: [
      "Inventory & supply logs",
      "Distribution margins calculator",
      "Win rate and order analytics",
      "Profit & loss ledger",
      "Risk/Reward ratio tracker"
    ],
    specs: {
      "Compatible with": "Excel 2019+",
      "Format": ".xlsx",
      "License": "Personal",
      "Delivery": "Instant"
    },
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=800&auto=format&fit=crop"
  }
];

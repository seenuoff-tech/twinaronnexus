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
    name: "Online Business System",
    slug: "online-business-system",
    price: 1999,
    category: "Online Business",
    description: "Still managing orders, customers and sales manually? Organize your business activities with a simple and structured system designed for growing businesses.",
    features: [
      "Order Tracking",
      "Customer Management",
      "Revenue Monitoring",
      "Sales Reporting",
      "Business Performance Tracking"
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
    id: "freelancer",
    name: "Freelancer Business System",
    slug: "freelancer-business-system",
    price: 999,
    category: "Freelancer",
    description: "Managing multiple clients, projects and payments can become difficult as your business grows. Track clients, income and project activities from one place.",
    features: [
      "Client Tracking",
      "Income Monitoring",
      "Payment Reports",
      "Project Management",
      "Activity Tracking"
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
    id: "boutique",
    name: "Boutique Business System",
    slug: "boutique-business-system",
    price: 2999,
    category: "Boutique",
    description: "Gain better visibility into inventory, sales and profitability. Designed specifically for boutiques and retail businesses.",
    features: [
      "Inventory Management",
      "Sales Tracking",
      "Order Monitoring",
      "Profit Reports",
      "Product Performance Tracking"
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
    id: "trading",
    name: "Traders & Manufacturers System",
    slug: "traders-manufacturers-system",
    price: 4999,
    category: "Traders and manufacturers",
    description: "Monitor sales, inventory, dealer activities and business performance from one place. Designed for growing manufacturers, distributors and trading businesses.",
    features: [
      "Dealer Tracking",
      "Outstanding Reports",
      "Inventory Monitoring",
      "Sales Performance Tracking",
      "Business Reporting"
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

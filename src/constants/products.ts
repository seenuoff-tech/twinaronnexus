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
  whoIsFor: string[];
  challenges: string[];
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
      "Track Customers",
      "Monitor Sales",
      "Manage Orders",
      "View Business Performance",
      "Organize Daily Operations"
    ],
    specs: {
      "License": "Single Purchase Usage",
      "Access": "Download & Use",
      "Format": ".xlsx",
      "Compatibility": "Excel / Google Sheets"
    },
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    whoIsFor: [
      "Small Business Owners",
      "Home-Based Businesses",
      "Online Sellers",
      "Service Providers",
      "Startups",
      "Entrepreneurs managing customers, orders and sales manually"
    ],
    challenges: [
      "Customer information scattered across multiple files",
      "Difficulty tracking orders and sales",
      "Lack of business visibility",
      "Manual reporting processes"
    ]
  },
  {
    id: "freelancer",
    name: "Freelancer Business System",
    slug: "freelancer-business-system",
    price: 999,
    category: "Freelancer",
    description: "Organize client information, project status, invoices and payments in one place. Designed for freelancers, consultants and service professionals.",
    features: [
      "Client Tracking",
      "Income Monitoring",
      "Payment Reports",
      "Project Management",
      "Activity Tracking"
    ],
    specs: {
      "Usage": "Single Purchase",
      "User Type": "Freelancers & Consultants",
      "Format": ".xlsx",
      "Compatibility": "Excel / Google Sheets"
    },
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop",
    whoIsFor: [
      "Freelancers",
      "Consultants",
      "Coaches & Trainers",
      "Marketing Professionals",
      "Designers & Developers",
      "Independent Service Providers managing multiple clients and projects"
    ],
    challenges: [
      "Managing multiple clients manually",
      "Tracking payments and invoices",
      "Monitoring project progress",
      "Organizing business records"
    ]
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
      "Usage": "Single Purchase",
      "Delivery": "Digital Download",
      "Format": ".xlsx",
      "Compatibility": "Excel"
    },
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop",
    whoIsFor: [
      "Boutique Owners",
      "Retail Store Owners",
      "Fashion Businesses",
      "Apparel Sellers",
      "Beauty & Lifestyle Stores",
      "Businesses looking to track inventory, sales and profitability"
    ],
    challenges: [
      "Inventory management challenges",
      "Difficulty tracking sales trends",
      "Stock monitoring issues",
      "Lack of profitability visibility"
    ]
  },
  {
    id: "trading",
    name: "Traders & Manufacturers System",
    slug: "traders-manufacturers-system",
    price: 4999,
    category: "Traders and manufacturers",
    description: "Track sales, stock movement, dealer performance and outstanding payments from a single business management system.",
    features: [
      "Dealer Management",
      "Outstanding Tracking",
      "Inventory Visibility",
      "Sales Performance Monitoring",
      "Business Reporting"
    ],
    specs: {
      "Usage": "Single Purchase",
      "Format": ".xlsx",
      "Compatibility": "Excel",
      "Delivery": "Digital Download"
    },
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=800&auto=format&fit=crop",
    whoIsFor: [
      "Manufacturers",
      "Distributors",
      "Wholesalers",
      "Traders",
      "Exporters",
      "Businesses managing inventory, dealers and sales operations"
    ],
    challenges: [
      "Dealer tracking difficulties",
      "Outstanding payment monitoring",
      "Inventory visibility issues",
      "Manual business reporting"
    ]
  }
];

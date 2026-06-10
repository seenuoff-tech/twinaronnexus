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
  previews: string[];
  whoIsFor: string[];
  whoIsForDescription: string;
  challenges: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: "online-business",
    name: "Online Business Management Template",
    slug: "online-business-system",
    price: 1999,
    category: "Online Business",
    description: "Track customers, orders, sales and business performance through a structured business management template designed for growing businesses.",
    features: [
      "Customer Records",
      "Sales Performance",
      "Order Tracking",
      "Business Reporting",
      "Daily Operations"
    ],
    specs: {
      "License": "Single Purchase Usage",
      "Access": "Download & Use",
      "Format": ".xlsx",
      "Compatibility": "Excel / Google Sheets"
    },
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    previews: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop"
    ],
    whoIsFor: [
      "Small Business Owners",
      "Home-Based Businesses",
      "Online Sellers",
      "Service Providers",
      "Startups",
      "Entrepreneurs managing customers, orders and sales manually"
    ],
    whoIsForDescription: "Designed for small business owners, startups, online sellers, and service providers looking to streamline operations and improve daily visibility.",
    challenges: [
      "Customer information scattered across multiple files",
      "Difficulty tracking orders and sales progress",
      "Lack of real-time business performance visibility",
      "Manual and time-consuming reporting processes",
      "Delayed follow-ups with customers due to missing logs",
      "No centralized, secure business record database",
      "Inconsistent sales tracking across different channels",
      "Difficulty measuring business growth and key metrics"
    ]
  },
  {
    id: "freelancer",
    name: "Freelancer Business System",
    slug: "freelancer-business-system",
    price: 999,
    category: "Freelancer",
    description: "Manage Clients, Projects, Invoices, Payments and Business Performance from a single dashboard. Built for Freelancers, Consultants, Coaches and Independent Professionals who want to save time and grow faster.",
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
    previews: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop"
    ],
    whoIsFor: [
      "Freelancers",
      "Consultants",
      "Coaches & Trainers",
      "Marketing Professionals",
      "Designers & Developers",
      "Independent Service Providers managing multiple clients and projects"
    ],
    whoIsForDescription: "Designed for freelancers, consultants, coaches, and independent professionals looking to manage clients, projects, and invoices in one organized place.",
    challenges: [
      "Managing multiple clients manually with text documents",
      "Tracking payments, invoice due dates, and client dues",
      "Monitoring project progress and milestone deliverables",
      "Organizing historical business records and tax info",
      "Unclear income projection and payment schedules",
      "Difficulty tracking billable hours and task efficiency",
      "Inefficient follow-ups for outstanding invoice payments",
      "Hours wasted on manual administrative work weekly"
    ]
  },
  {
    id: "boutique",
    name: "Boutique Business System",
    slug: "boutique-business-system",
    price: 2999,
    category: "Boutique",
    description: "Track Inventory, Sales, Orders & Profitability in One Simple Dashboard. Built for Boutique Owners who want complete visibility over stock movement, sales performance and business growth.",
    features: [
      "Product Inventory Tracker",
      "Daily Sales Tracker",
      "Order Management System",
      "Purchase Tracker",
      "Customer Database",
      "Stock Alert Dashboard",
      "Best Selling Product Analysis",
      "Monthly Profit & Loss Summary",
      "Executive Business Dashboard"
    ],
    specs: {
      "Usage": "Single Purchase",
      "Delivery": "Digital Download",
      "Format": ".xlsx",
      "Compatibility": "Excel"
    },
    image: "/img/boutique_dashboard_main.png",
    previews: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop",
      "/img/boutique_inventory_sheet.png",
      "/img/boutique_dashboard_main.png"
    ],
    whoIsFor: [
      "Boutique Owners",
      "Retail Store Owners",
      "Fashion Businesses",
      "Apparel Sellers",
      "Beauty & Lifestyle Stores",
      "Businesses looking to track inventory, sales and profitability"
    ],
    whoIsForDescription: "Designed for boutique owners and retail businesses looking to gain clear visibility into inventory, sales, and overall profitability.",
    challenges: [
      "Inventory management challenges and stockouts",
      "Difficulty tracking sales trends over weeks and months",
      "Stock monitoring issues and manual count discrepancy",
      "Lack of product-level profitability visibility",
      "Difficulty identifying top-selling and slow-moving items",
      "Inefficient customer order fulfillment tracking",
      "Difficulty managing customer preferences and history",
      "Manual bookkeeping prone to errors and calculation slips",
      "Excess inventory blocking cash flow",
      "Difficulty forecasting demand",
      "Lack of product-wise profit visibility",
      "No consolidated business dashboard"
    ]
  },
  {
    id: "trading",
    name: "Traders & Manufacturers System",
    slug: "traders-manufacturers-system",
    price: 4999,
    category: "Traders and manufacturers",
    description: "Manage inventory, dealer performance, outstanding payments and sales operations from a single business tracking system.",
    features: [
      "Dealer Management",
      "Outstanding Tracking",
      "Inventory Visibility",
      "Sales Performance Monitoring",
      "Business Performance Reporting"
    ],
    specs: {
      "Usage": "Single Purchase",
      "Format": ".xlsx",
      "Compatibility": "Excel",
      "Delivery": "Digital Download"
    },
    image: "/img/traders_warehouse_main.png",
    previews: [
      "/img/traders_warehouse_main.png",
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=800&auto=format&fit=crop"
    ],
    whoIsFor: [
      "Manufacturers",
      "Distributors",
      "Wholesalers",
      "Traders",
      "Exporters",
      "Importers",
      "Businesses managing inventory, dealers and sales operations"
    ],
    whoIsForDescription: "Designed for manufacturers, traders, distributors, and wholesalers looking to track dealer performance, inventory, and outstanding payments.",
    challenges: [
      "Dealer tracking difficulties and communication gap",
      "Outstanding payment monitoring and credit tracking",
      "Inventory visibility issues across multiple storage blocks",
      "Manual business reporting which delays key decisions",
      "Inconsistent tracking of raw materials and finished goods",
      "Delayed updates on order processing and supply status",
      "Difficulty measuring dealer-wise sales performance",
      "Lack of centralized dashboard for high-level operations",
      "Difficulty tracking stock movement across locations"
    ]
  }
];

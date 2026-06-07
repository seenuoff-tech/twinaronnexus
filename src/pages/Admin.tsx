import React, { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  Package, 
  TrendingUp, 
  Users, 
  Settings,
  Plus,
  Search,
  MoreVertical,
  Download,
  Trash2,
  DollarSign,
  Briefcase,
  Layers,
  AlertCircle,
  Sparkles,
  ShoppingBag,
  Database,
  ArrowUpRight,
  Filter,
  CheckCircle,
  Clock,
  X,
  CreditCard,
  Edit,
  Activity
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { PRODUCTS, Product } from "../constants/products";
import { formatCurrency, cn } from "../lib/utils";
import { motion, AnimatePresence } from "motion/react";

// Initial set of robust, realistic mock orders for historical tracking
const INITIAL_ORDERS = [
  { id: "TXN-7419", date: "2026-05-18", customer: "Aditya Hegde", email: "aditya.h@startupspace.in", productSlug: "online-business-system", product: "Online Business System", amount: 1999, status: "completed", gateway: "Razorpay" },
  { id: "TXN-6812", date: "2026-05-17", customer: "Pooja Sharma", email: "pooja.sharma@luxe-apparel.com", productSlug: "boutique-business-system", product: "Boutique Business System", amount: 2999, status: "completed", gateway: "Razorpay" },
  { id: "TXN-5904", date: "2026-05-17", customer: "Siddharth Mehta", email: "sid.mehta@nexusagency.org", productSlug: "traders-manufacturers-system", product: "Traders & Manufacturers System", amount: 4999, status: "completed", gateway: "Razorpay" },
  { id: "TXN-4311", date: "2026-05-16", customer: "David Miller", email: "david@millerfreelance.co", productSlug: "freelancer-business-system", product: "Freelancer Business System", amount: 999, status: "completed", gateway: "UPI Direct" },
  { id: "TXN-3298", date: "2026-05-15", customer: "Rohan Varma", email: "rohan@thegourmettable.in", productSlug: "online-business-system", product: "Online Business System", amount: 1999, status: "pending", gateway: "Razorpay Card" },
  { id: "TXN-2104", date: "2026-05-14", customer: "Aparna Nair", email: "aparna@naircreations.com", productSlug: "online-business-system", product: "Online Business System", amount: 1999, status: "completed", gateway: "Razorpay" },
  { id: "TXN-1055", date: "2026-05-12", customer: "Marcus Aurelius", email: "stoic@romeglobal.net", productSlug: "traders-manufacturers-system", product: "Traders & Manufacturers System", amount: 4999, status: "completed", gateway: "Razorpay International" }
];

const CUSTOMER_NAMES = [
  "Vikram Aditya", "Ananya Deshmukh", "Nikhil Kamath", "Divya Tejas", 
  "Suresh Raina", "Elena Rostova", "Karan Johar", "Zayn Malik", 
  "Aarav Singhania", "Meera Krishnan", "Chris Evans", "Sarah Jenkins"
];

const CUSTOMER_EMAILS = [
  "vikram@adityacapital.com", "ananya@creativehub.co", "nikhil@zerodirectional.in", "divya@tejasretail.com",
  "suresh@rainasports.net", "elena@rostova-trading.ru", "karan@dharmaprocurement.com", "zayn@pillowtalk.org",
  "aarav@singhaniatech.com", "meera@krishnansolar.in", "chris@shieldconsulting.us", "sarah@jenkinssheets.com"
];

export default function Admin() {
  // Try loading from localStorage to maintain stateful dashboards, fallback to initial constants
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem("nexus_products");
    return saved ? JSON.parse(saved) : PRODUCTS;
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("nexus_orders");
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [activeTab, setActiveTab] = useState<"dashboard" | "products" | "orders" | "settings">("dashboard");
  
  // Search & Filter State
  const [productSearch, setProductSearch] = useState("");
  const [productCategoryFilter, setProductCategoryFilter] = useState("all");
  const [orderSearch, setOrderSearch] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState("all");

  // System Configuration Control states
  const [discountCode, setDiscountCode] = useState("NEXUS50");
  const [discountValue, setDiscountValue] = useState(50);
  const [siteCurrency, setSiteCurrency] = useState("INR");
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [licenseUpgradeNotice, setLicenseUpgradeNotice] = useState(true);

  // Modals status
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form states for creating new template
  const [newProductName, setNewProductName] = useState("");
  const [newProductCategory, setNewProductCategory] = useState("Online Business");
  const [newProductPrice, setNewProductPrice] = useState(499);
  const [newProductDesc, setNewProductDesc] = useState("");
  const [newProductFeatures, setNewProductFeatures] = useState("");
  const [newProductImage, setNewProductImage] = useState("");

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("nexus_products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("nexus_orders", JSON.stringify(orders));
  }, [orders]);

  // Compute stats on-the-fly from actual state for full architecture integrity!
  const totalRevenue = orders
    .filter((o: any) => o.status === "completed")
    .reduce((sum: number, o: any) => sum + Number(o.amount), 0);

  const completedOrdersCount = orders.filter((o: any) => o.status === "completed").length;
  const pendingOrdersCount = orders.filter((o: any) => o.status === "pending").length;
  const refundOrdersCount = orders.filter((o: any) => o.status === "refunded").length;

  const averageOrderValue = completedOrdersCount > 0 ? Math.round(totalRevenue / completedOrdersCount) : 0;
  
  // Rough multiplier for download simulator
  const simulatedDownloads = completedOrdersCount * 5 + pendingOrdersCount;

  // Generate unique product categories
  const categories = ["all", ...Array.from(new Set(products.map(p => p.category)))];

  // Handler for dynamic product addition
  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName.trim() || !newProductPrice) return;

    const slug = newProductName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    const generatedId = `custom-${Date.now()}`;
    const defaultImg = newProductImage.trim() !== "" ? newProductImage : "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop";

    // Build product spec
    const itemFeatures = newProductFeatures
      .split(",")
      .map(f => f.trim())
      .filter(f => f.length > 0);

    const newProg: Product = {
      id: generatedId,
      name: newProductName,
      slug: slug,
      price: Number(newProductPrice),
      category: newProductCategory,
      description: newProductDesc || "Professional financial spreadsheet tracker from TwinaronNexus.",
      features: itemFeatures.length > 0 ? itemFeatures : ["Complete dynamic cashflow", "Automated Excel equations", "Printable dashboards"],
      specs: {
        "Compatible with": "Excel 2016+, Google Sheets",
        "Format": ".xlsx",
        "License": "Lifetime Personal Use",
        "Delivery": "Instant Mail Drop"
      },
      image: defaultImg
    };

    setProducts(prev => [newProg, ...prev]);
    setIsNewProductModalOpen(false);

    // Reset fields
    setNewProductName("");
    setNewProductPrice(499);
    setNewProductDesc("");
    setNewProductFeatures("");
    setNewProductImage("");
  };

  // Delete product action Handler
  const handleDeleteProduct = (id: string) => {
    if (confirm("Are you sure you want to retire this financial template?")) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  // Inline Price adjustments handler
  const handleUpdatePrice = (id: string, newPrice: number) => {
    if (isNaN(newPrice) || newPrice <= 0) return;
    setProducts(prev => prev.map(p => p.id === id ? { ...p, price: newPrice } : p));
  };

  // Checkout simulator triggers a custom random order matching standard templates
  const simulateRandomCheckout = () => {
    if (products.length === 0) return;
    const itemRandom = products[Math.floor(Math.random() * products.length)];
    const randomCustomer = CUSTOMER_NAMES[Math.floor(Math.random() * CUSTOMER_NAMES.length)];
    const randomEmail = CUSTOMER_EMAILS[Math.floor(Math.random() * CUSTOMER_EMAILS.length)];
    
    // Choose status with completed bias
    const statuses = ["completed", "completed", "completed", "completed", "pending"];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const gateways = ["Razorpay", "UPI Direct", "Razorpay Card", "Razorpay International"];
    const gateway = gateways[Math.floor(Math.random() * gateways.length)];

    const dateStr = new Date().toISOString().split('T')[0];
    const newOrder = {
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      date: dateStr,
      customer: randomCustomer,
      email: randomEmail,
      productSlug: itemRandom.slug,
      product: itemRandom.name,
      amount: itemRandom.price,
      status: status,
      gateway: gateway
    };

    setOrders(prev => [newOrder, ...prev]);
  };

  // Clear orders to restore defaults
  const handleResetSimulation = () => {
    if (confirm("Reset current simulator database to starting defaults?")) {
      setOrders(INITIAL_ORDERS);
      setProducts(PRODUCTS);
    }
  };

  // Generate data coordinates dynamically for charts
  const categoriesChartData = React.useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, templates: value }));
  }, [products]);

  // Aggregate revenue based on date for the AreaChart
  const revenueChartData = React.useMemo(() => {
    // Collect order sums grouped by date
    const dateMap: Record<string, number> = {};
    orders
      .filter((o: any) => o.status === "completed")
      .forEach((o: any) => {
        dateMap[o.date] = (dateMap[o.date] || 0) + Number(o.amount);
      });

    // Make sure we have a sequential display or sorted list of dates
    return Object.entries(dateMap)
      .map(([date, sum]) => ({ date, "Revenue Amount": sum }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [orders]);

  // Filter lists
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(productSearch.toLowerCase()) || 
                          p.category.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCategory = productCategoryFilter === "all" || p.category === productCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  const filteredOrders = orders.filter((o: any) => {
    const matchesSearch = o.customer.toLowerCase().includes(orderSearch.toLowerCase()) || 
                          o.product.toLowerCase().includes(orderSearch.toLowerCase()) ||
                          o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
                          o.email.toLowerCase().includes(orderSearch.toLowerCase());
    const matchesStatus = orderStatusFilter === "all" || o.status === orderStatusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="pt-24 min-h-screen bg-slate-50 text-slate-800 selection:bg-premium-yellow/30 selection:text-premium-yellow">
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-[#F3AE1B]/10 via-[#F3AE1B]/20 to-transparent blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Upper Brand Badge and Control bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-6 border-b border-slate-200 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] bg-premium-yellow/10 text-premium-yellow font-mono px-2 py-0.5 rounded-full border border-premium-yellow/20 font-bold tracking-widest uppercase">
                Enterprise Ledger
              </span>
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] text-slate-500 font-mono">NODE_LIVE</span>
            </div>
            <h1 className="text-4xl font-extrabold font-display tracking-tight text-slate-900 m-0">
              Twinaron<span className="text-premium-yellow">Nexus</span> Admin
            </h1>
            <p className="text-sm text-slate-600 mt-1">Control sheet templates inventory, check dynamic revenue graphs, and inspect live customer checkouts.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button 
              onClick={simulateRandomCheckout}
              className="group flex items-center gap-2 bg-gradient-to-r from-premium-yellow to-amber-500 text-black px-4 py-2.5 rounded-xl text-xs font-black shadow-[0_0_20px_rgba(243,174,27,0.25)] hover:shadow-[0_0_30px_rgba(243,174,27,0.4)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              id="simulateSaleBtn"
            >
              <Sparkles className="h-4 w-4 animate-spin" />
              SIMULATE CUSTOMER SALE
            </button>
            <button
              onClick={handleResetSimulation}
              className="flex items-center gap-1.5 border border-slate-200 hover:border-slate-350 bg-slate-100/50 hover:bg-slate-100 text-slate-650 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all"
              title="Reset metrics state to system preset defaults"
            >
              <Database className="h-3.5 w-3.5" />
              Reset State
            </button>
          </div>
        </div>

        {/* License Promo Ribbon */}
        {licenseUpgradeNotice && (
          <div className="mb-8 flex items-center justify-between p-4 bg-gradient-to-r from-slate-100 to-slate-200/50 border border-premium-yellow/30 rounded-2xl text-slate-800 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-lg bg-premium-yellow/15 flex items-center justify-center flex-none mt-0.5">
                <AlertCircle className="h-4.5 w-4.5 text-premium-yellow" />
              </div>
              <div>
                <p className="text-xs font-bold font-display text-slate-900">PROMPT-TO-BUILD SIMULATOR ENABLED</p>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                  This administrative panel is writing storage variables inside sandbox <code className="text-premium-yellow font-mono bg-slate-200/50 px-1 py-0.5 rounded">localStorage</code>. Any products edited, deleted, or random sales triggered are preserved locally in real-time.
                </p>
              </div>
            </div>
            <button 
              onClick={() => setLicenseUpgradeNotice(false)}
              className="text-slate-400 hover:text-slate-700 p-1"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Outer Tab Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Side Menu Navigation */}
          <nav className="lg:col-span-3 space-y-1 bg-white border border-slate-200 shadow-sm rounded-3xl p-4">
            <p className="px-4 py-2 text-[10px] font-black tracking-widest text-slate-400 uppercase font-mono">Control Modules</p>
            {[
              { id: "dashboard", label: "KPI Overview & Graphs", icon: LayoutDashboard },
              { id: "products", label: "Template Inventory", icon: Package, count: products.length },
              { id: "orders", label: "Ledger Transactions", icon: TrendingUp, count: orders.length },
              { id: "settings", label: "Campaign & Coupon", icon: Settings },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-3 rounded-xl text-left text-sm font-semibold transition-all group",
                  activeTab === tab.id 
                    ? "bg-premium-yellow text-black font-black shadow-[0_4px_12px_rgba(243,174,27,0.15)]" 
                    : "text-slate-655 hover:bg-slate-100 hover:text-slate-900"
                )}
              >
                <div className="flex items-center gap-3">
                  <tab.icon className={cn("h-4.5 w-4.5", activeTab === tab.id ? "text-black" : "text-slate-400 group-hover:text-premium-yellow")} />
                  <span>{tab.label}</span>
                </div>
                {tab.count !== undefined && (
                  <span className={cn(
                    "text-[10px] font-bold px-2 py-0.5 rounded-full font-mono",
                    activeTab === tab.id ? "bg-black/10 text-black" : "bg-slate-100 text-slate-600"
                  )}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}

            <div className="pt-6 mt-6 border-t border-slate-200 px-4">
              <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase font-mono mb-3">Live System Status</p>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Campaign Discount</span>
                  <span className="text-premium-yellow font-extrabold font-mono">{discountValue}% Off</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Database health</span>
                  <span className="text-emerald-600 font-bold font-mono">Optimal</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Sandbox currency</span>
                  <span className="text-slate-800 font-bold">{siteCurrency}</span>
                </div>
              </div>
            </div>
          </nav>

          {/* Main Work Area Panel */}
          <div className="lg:col-span-9 space-y-8">
            
            {/* MODULE 1: INTERACTIVE KEY-STAT METRICS & CHARTS (DASHBOARD TAB) */}
            {activeTab === "dashboard" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                {/* Statistics Ribbons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { 
                      label: "Total Dynamic Revenue", 
                      value: formatCurrency(totalRevenue), 
                      sub: `Formulated across ${completedOrdersCount} sales`,
                      status: "Completed",
                      icon: DollarSign,
                      color: "text-emerald-500"
                    },
                    { 
                      label: "Simulated Downloads", 
                      value: simulatedDownloads.toString(), 
                      sub: "Asset fulfillment courier count",
                      status: "Direct Deliver",
                      icon: Download,
                      color: "text-blue-400"
                    },
                    { 
                      label: "Average Order Ticket", 
                      value: formatCurrency(averageOrderValue), 
                      sub: "Sovereign client spending cap",
                      status: "Calculated",
                      icon: Users,
                      color: "text-premium-yellow"
                    },
                    { 
                      label: "Catalogs Active", 
                      value: products.length.toString(), 
                      sub: "Excel sheet configurations live",
                      status: "Secured",
                      icon: Briefcase,
                      color: "text-amber-500"
                    }
                  ].map((stat, i) => (
                    <div key={i} className="glass p-5 rounded-2xl border-slate-200/60 relative overflow-hidden group hover:border-premium-yellow/30 transition-all hover:bg-slate-50/50 shadow-sm">
                      <div className="absolute top-0 right-0 p-4 pointer-events-none opacity-5">
                        <stat.icon className="h-16 w-16 text-slate-400" />
                      </div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black font-mono mb-2">{stat.label}</p>
                      <h3 className="text-2xl font-black font-display tracking-tight text-slate-900 mb-1">{stat.value}</h3>
                      <p className="text-[10px] text-slate-500 leading-tight block">{stat.sub}</p>
                      
                      <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[9px] font-mono text-slate-500">
                        <span>{stat.status}</span>
                        <ArrowUpRight className={cn("h-3 w-3", stat.color)} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Main Graph Grid (Recharts) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* Revenue Curve Over Time */}
                  <div className="lg:col-span-8 glass rounded-3xl p-6 border-slate-200/60 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                      <div>
                        <h4 className="text-base font-bold font-display text-slate-900">Dynamic Sales Revenue Runway</h4>
                        <p className="text-[11px] text-slate-500">Total checkout earnings accumulated by receipt date (Indian Rupees)</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex h-2.5 w-2.5 rounded-full bg-premium-yellow" />
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Gross Revenue</span>
                      </div>
                    </div>

                    <div className="w-full h-72">
                      {revenueChartData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={revenueChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#F3AE1B" stopOpacity={0.4}/>
                                <stop offset="95%" stopColor="#F3AE1B" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
                            <XAxis 
                              dataKey="date" 
                              stroke="#64748b" 
                              fontSize={10} 
                              fontFamily="JetBrains Mono, monospace"
                              tickLine={false} 
                            />
                            <YAxis 
                              stroke="#64748b" 
                              fontSize={10} 
                              fontFamily="JetBrains Mono, monospace"
                              tickLine={false}
                              axisLine={false}
                              tickFormatter={(val) => `₹${val}`}
                            />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: "#FFFFFF", 
                                borderColor: "rgba(243,174,27,0.3)", 
                                borderRadius: "12px",
                                color: "#1e293b",
                                fontSize: "11px",
                                fontFamily: "sans-serif"
                              }}
                              itemStyle={{ color: "#F3AE1B" }}
                              labelStyle={{ color: "#64748b", fontWeight: "bold" }}
                            />
                            <Area 
                              type="monotone" 
                              dataKey="Revenue Amount" 
                              stroke="#F3AE1B" 
                              strokeWidth={3} 
                              fillOpacity={1} 
                              fill="url(#colorRevenue)" 
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center text-gray-500">
                          <AlertCircle className="h-10 w-10 text-white/10 mb-2" />
                          <p className="text-xs">No transaction records on file. Simulate checkout above!</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Category Spreadsheet Allocation */}
                  <div className="lg:col-span-4 glass rounded-3xl p-6 border-slate-200/60 shadow-sm flex flex-col justify-between">
                    <div>
                      <h4 className="text-base font-bold font-display text-slate-900">Structure Mix</h4>
                      <p className="text-[11px] text-slate-500">Asset volume distributed by ledger categories</p>
                    </div>

                    <div className="w-full h-52 my-4">
                      {categoriesChartData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={categoriesChartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" horizontal={false} vertical={false} />
                            <XAxis 
                              dataKey="name" 
                              stroke="#64748b" 
                              fontSize={8} 
                              tickLine={false} 
                              tickFormatter={(val) => val.split(' ')[0]} // abbreviate if too long
                            />
                            <YAxis stroke="#64748b" fontSize={8} tickLine={false} axisLine={false} />
                            <Tooltip
                              cursor={{ fill: "rgba(0,0,0,0.02)" }}
                              contentStyle={{ 
                                backgroundColor: "#FFFFFF", 
                                borderColor: "rgba(0,0,0,0.05)", 
                                borderRadius: "10px",
                                color: "#1e293b",
                                fontSize: "10px"
                              }}
                            />
                            <Bar dataKey="templates" fill="#143265" rx={4}>
                              {categoriesChartData.map((entry, index) => (
                                <Cell 
                                  key={`cell-${index}`} 
                                  fill={index % 2 === 0 ? "#F3AE1B" : "#3b82f6"} 
                                />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      ) : (
                        <div className="h-full flex items-center justify-center text-slate-550 text-xs">No dynamic data to build</div>
                      )}
                    </div>

                    <div className="space-y-2 pt-3 border-t border-slate-200/60">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="flex items-center gap-1.5 text-slate-500">
                          <span className="h-2 w-2 rounded-full bg-[#F3AE1B]" />
                          Core Finance Guides
                        </span>
                        <span className="font-bold text-slate-800 font-mono">Gold Mix</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="flex items-center gap-1.5 text-slate-500">
                          <span className="h-2 w-2 rounded-full bg-[#3b82f6]" />
                          Secondary Niches
                        </span>
                        <span className="font-bold text-slate-800 font-mono">Blue Mix</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section: Live Feed / Recent Sales Feed overview */}
                <div className="glass rounded-[2rem] p-8 border-slate-200/60 shadow-sm text-slate-800">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold font-display text-slate-900">Live Transactions Activity Signal</h3>
                      <p className="text-xs text-slate-500 mt-0.5">Real-time payment gateway dispatches</p>
                    </div>
                    <button 
                      onClick={() => setActiveTab("orders")}
                      className="text-premium-yellow hover:text-slate-900 transition-colors text-xs font-bold font-mono tracking-tight"
                    >
                      Inspect Full Ledger →
                    </button>
                  </div>

                  <div className="space-y-3">
                    {orders.slice(0, 4).map((order: any, idx: number) => (
                      <div key={order.id + idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50/30 hover:bg-slate-50 border border-slate-200/60 rounded-2xl transition-all">
                        <div className="flex items-start gap-4">
                          <div className={cn(
                            "h-10 w-10 rounded-xl flex items-center justify-center text-xs font-black shrink-0",
                            order.status === "completed" ? "bg-emerald-500/15 text-emerald-600 border border-emerald-500/20" : 
                            order.status === "refunded" ? "bg-rose-500/15 text-rose-600 border border-rose-500/20" :
                            "bg-amber-500/15 text-amber-600 border border-amber-500/20"
                          )}>
                            {order.customer.split(' ').map((n: string) => n[0]).join('')}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-bold text-sm text-slate-900">{order.customer}</p>
                              <span className="text-[9px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 font-mono">{order.id}</span>
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5">{order.product}</p>
                          </div>
                        </div>

                        <div className="flex sm:flex-col items-center sm:items-end justify-between mt-3 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-0 border-slate-200/60">
                          <span className="text-sm font-extrabold text-slate-900 font-mono">{formatCurrency(order.amount)}</span>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] text-slate-500 font-mono">{order.date}</span>
                            <span className={cn(
                              "text-[8px] uppercase tracking-widest px-1.5 py-0.5 rounded font-black",
                              order.status === "completed" ? "bg-emerald-100 text-emerald-800 border border-emerald-500/20" : 
                              order.status === "refunded" ? "bg-rose-100 text-rose-800 border border-rose-500/20" :
                              "bg-amber-100 text-amber-800 border border-amber-500/20"
                            )}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* MODULE 2: TEMPLATE INVENTORY (PRODUCTS TAB) */}
            {activeTab === "products" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Product controls feed toolbar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-slate-200/80 p-4 rounded-2xl shadow-sm">
                  
                  {/* Search Bar input */}
                  <div className="relative w-full sm:w-72">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Filter by template name..." 
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 hover:border-slate-350 rounded-xl pl-10 pr-4 py-2.5 text-xs outline-none focus:border-premium-yellow/50 transition-colors text-slate-800 focus:bg-white" 
                    />
                    {productSearch && (
                      <button 
                        onClick={() => setProductSearch("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-800 text-xs font-semibold"
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  {/* Filter selectors */}
                  <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
                    <Filter className="h-4 w-4 text-slate-400 block shrink-0" />
                    <div className="flex items-center gap-1.5">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setProductCategoryFilter(cat)}
                          className={cn(
                            "px-3 py-1.5 rounded-lg text-[10px] uppercase tracking-wider font-extrabold whitespace-nowrap transition-all border",
                            productCategoryFilter === cat 
                              ? "bg-premium-yellow text-black border-premium-yellow shadow-sm" 
                              : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900"
                          )}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setIsNewProductModalOpen(true)}
                    className="flex items-center gap-2 bg-gradient-to-r from-premium-yellow to-amber-500 text-black px-4 py-2.5 rounded-xl text-xs font-black shadow-[0_4px_12px_rgba(243,174,27,0.2)] hover:shadow-[0_4px_16px_rgba(243,174,27,0.3)] hover:-translate-y-0.5 active:translate-y-0 transition-all shrink-0 w-full sm:w-auto justify-center"
                  >
                    <Plus className="h-4 w-4 stroke-[3]" />
                    ADD NEW TEMPLATE
                  </button>
                </div>

                {/* Interactive publish form overlay modal */}
                {isNewProductModalOpen && (
                  <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
                    <motion.div 
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="bg-white border border-slate-200/80 p-8 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto relative shadow-2xl"
                    >
                      <button 
                        onClick={() => setIsNewProductModalOpen(false)}
                        className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
                      >
                        <X className="h-5 w-5" />
                      </button>

                      <h3 className="text-2xl font-bold font-display text-slate-900 mb-2">Publish New Excel Template</h3>
                      <p className="text-xs text-slate-500 mb-6">Create another professional dashboard spreadsheet. It will appear across client storefronts instantly.</p>

                      <form onSubmit={handleCreateProduct} className="space-y-4">
                        <div>
                          <label className="block text-[10px] font-black uppercase text-slate-500 tracking-wider mb-1.5">Template Commercial Title *</label>
                          <input 
                            required
                            type="text" 
                            placeholder="e.g., Venture Capital Runway Dashboard" 
                            value={newProductName}
                            onChange={(e) => setNewProductName(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 hover:border-slate-350 rounded-xl px-4 py-3 text-sm outline-none focus:border-premium-yellow/50 text-slate-800 focus:bg-white transition-all"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-black uppercase text-slate-500 tracking-wider mb-1.5">Category *</label>
                            <select 
                              value={newProductCategory}
                              onChange={(e) => setNewProductCategory(e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 hover:border-slate-350 rounded-xl px-4 py-3 text-sm outline-none focus:border-premium-yellow/50 text-slate-800 focus:bg-white transition-all"
                            >
                              <option value="Online Business">Online Business</option>
                              <option value="Boutique">Boutique</option>
                              <option value="Freelancer">Freelancer</option>
                              <option value="Traders and distributor">Traders and distributor</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-[10px] font-black uppercase text-slate-500 tracking-wider mb-1.5">Default price (INR) *</label>
                            <input 
                              required
                              type="number" 
                              min="99"
                              max="15000"
                              placeholder="499" 
                              value={newProductPrice}
                              onChange={(e) => setNewProductPrice(Number(e.target.value))}
                              className="w-full bg-slate-50 border border-slate-200 hover:border-slate-350 rounded-xl px-4 py-3 text-sm outline-none focus:border-premium-yellow/50 text-slate-800 font-mono focus:bg-white transition-all"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-black uppercase text-slate-500 tracking-wider mb-1.5">Description Abstract</label>
                          <textarea 
                            rows={2}
                            placeholder="Brief marketing copy summarizing spreadsheet benefits..." 
                            value={newProductDesc}
                            onChange={(e) => setNewProductDesc(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 hover:border-slate-350 rounded-xl px-4 py-3 text-sm outline-none focus:border-premium-yellow/50 text-slate-800 focus:bg-white transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-black uppercase text-slate-500 tracking-wider mb-1.5">Features list (comma-separated)</label>
                          <input 
                            type="text" 
                            placeholder="Multi-currency logs, Ad-Spend projections, Cashflow graphs" 
                            value={newProductFeatures}
                            onChange={(e) => setNewProductFeatures(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 hover:border-slate-350 rounded-xl px-4 py-3 text-sm outline-none focus:border-premium-yellow/50 text-slate-800 focus:bg-white transition-all"
                          />
                          <p className="text-[9px] text-slate-400 mt-1">Separate specific bullet points with commas to structure specifications automatically</p>
                        </div>

                        <div>
                          <label className="block text-[10px] font-black uppercase text-slate-500 tracking-wider mb-1.5">Cover Image URL (Optional)</label>
                          <input 
                            type="text" 
                            placeholder="https://images.unsplash.com/... (or left blank for standard texture)" 
                            value={newProductImage}
                            onChange={(e) => setNewProductImage(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 hover:border-slate-350 rounded-xl px-4 py-3 text-xs outline-none focus:border-premium-yellow/50 text-slate-800 font-mono focus:bg-white transition-all"
                          />
                        </div>

                        <div className="pt-4 flex gap-3">
                          <button
                            type="button"
                            onClick={() => setIsNewProductModalOpen(false)}
                            className="w-1/2 py-3.5 border border-slate-200 hover:border-slate-300 rounded-xl text-xs font-bold text-slate-650 hover:bg-slate-50 transition-all"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="w-1/2 py-3.5 bg-gradient-to-r from-premium-yellow to-amber-500 text-black rounded-xl text-xs font-black hover:shadow-md transition-all"
                          >
                            Publish Template
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  </div>
                )}

                {/* Interactive templates lists grid */}
                <div className="glass rounded-[2.5rem] p-8">
                  <h3 className="text-xl font-bold font-display text-slate-900 mb-6">Spreadsheets Inventory Catalogue</h3>
                  
                  {filteredProducts.length > 0 ? (
                    <div className="space-y-4">
                      {filteredProducts.map((p) => (
                        <div 
                          key={p.id} 
                          className="flex flex-col lg:flex-row lg:items-center justify-between p-5 bg-slate-50/50 hover:bg-slate-50 border border-slate-150 rounded-3xl transition-all gap-4 shadow-xs"
                        >
                          <div className="flex items-center gap-4">
                            <div className="h-14 w-14 rounded-2xl overflow-hidden shrink-0 border border-slate-200 bg-slate-100">
                              <img src={p.image} className="h-full w-full object-cover transition-transform group-hover:scale-105" alt="" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="font-bold text-sm text-slate-900 font-display tracking-tight leading-tight">{p.name}</h4>
                                <span className="text-[9px] bg-premium-yellow/10 text-premium-yellow border border-premium-yellow/20 px-2 py-0.5 rounded-full font-mono uppercase font-black">
                                  {p.category}
                                </span>
                              </div>
                              <p className="text-xs text-slate-500 mt-1 line-clamp-1 max-w-lg leading-relaxed">{p.description}</p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between lg:justify-end gap-6 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-150">
                            {/* Inline pricing tweaks */}
                            <div className="text-left lg:text-right">
                              <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold font-mono">Price (INR)</span>
                              <div className="flex items-center gap-1.5 mt-1">
                                <span className="text-xs text-slate-400 font-mono">₹</span>
                                <input 
                                  type="number" 
                                  value={p.price} 
                                  onChange={(e) => handleUpdatePrice(p.id, Number(e.target.value))}
                                  className="w-16 bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5 text-xs text-slate-800 text-center font-bold font-mono focus:border-premium-yellow/50 focus:bg-white transition-all" 
                                />
                              </div>
                            </div>

                            {/* Specifications breakdown preview */}
                            <div className="hidden sm:block text-left lg:text-right">
                              <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-medium">Format</span>
                              <span className="text-xs text-slate-800 font-mono font-bold mt-1 block">{p.specs["Format"] || ".xlsx"}</span>
                            </div>

                            <button 
                              onClick={() => handleDeleteProduct(p.id)}
                              className="text-slate-450 hover:text-rose-600 p-2.5 rounded-xl hover:bg-rose-50 transition-all"
                              title="Retire/Archive sheet"
                            >
                              <Trash2 className="h-4.5 w-4.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16 text-slate-500">
                      <AlertCircle className="h-10 w-10 text-slate-200 mx-auto mb-3" />
                      <p className="text-sm">No spreadsheet templates found matching your search filters.</p>
                      <button onClick={() => { setProductSearch(""); setProductCategoryFilter("all"); }} className="text-premium-yellow text-xs hover:underline mt-2">Clear search presets</button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* MODULE 3: LEDGER TRANSACTIONS (ORDERS TAB) */}
            {activeTab === "orders" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Transaction Filters toolbar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200/80 p-4 rounded-2xl shadow-sm">
                  {/* Search orders */}
                  <div className="relative w-full sm:w-72">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Search Transaction ID, email, user..." 
                      value={orderSearch}
                      onChange={(e) => setOrderSearch(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 hover:border-slate-350 rounded-xl pl-10 pr-4 py-2.5 text-xs outline-none focus:border-premium-yellow/50 transition-colors text-slate-800 focus:bg-white" 
                    />
                  </div>

                  {/* Status filter selection tabs */}
                  <div className="flex items-center gap-1.5 shrink-0 overflow-x-auto w-full sm:w-auto">
                    {[
                      { id: "all", label: "All Receipts" },
                      { id: "completed", label: "Completed" },
                      { id: "pending", label: "Pending" },
                      { id: "refunded", label: "Refunded" },
                    ].map((status) => (
                      <button
                        key={status.id}
                        onClick={() => setOrderStatusFilter(status.id)}
                        className={cn(
                          "px-3 py-1.5 rounded-lg text-[10px] uppercase tracking-wider font-extrabold whitespace-nowrap transition-all border",
                          orderStatusFilter === status.id 
                            ? "bg-premium-yellow text-black border-premium-yellow font-black shadow-sm" 
                            : "bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-900 border-slate-200"
                        )}
                      >
                        {status.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Spreadsheet ledger representation table */}
                <div className="glass rounded-[2rem] overflow-hidden">
                  <div className="p-6 border-b border-slate-200/80 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold font-display text-slate-900">Full Financial Transactions Ledger</h3>
                      <p className="text-xs text-slate-500 mt-0.5">Double-entry simulator reflecting customer credit card / UPI checkpoints</p>
                    </div>
                    <span className="text-[10px] bg-slate-50 text-slate-650 px-3 py-1 rounded-full border border-slate-200 font-mono">
                      {filteredOrders.length} records isolation
                    </span>
                  </div>

                  {filteredOrders.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50 text-[9px] uppercase font-bold text-slate-500 tracking-widest border-b border-slate-200/85">
                            <th className="px-6 py-4 font-mono font-black">Transaction ID</th>
                            <th className="px-6 py-4">Fulfillment Client</th>
                            <th className="px-6 py-4">Purchased Product</th>
                            <th className="px-6 py-4 font-mono text-center">Receipt Date</th>
                            <th className="px-6 py-4">Total Price</th>
                            <th className="px-6 py-4">Gateway</th>
                            <th className="px-6 py-4 text-right">Status State</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {filteredOrders.map((order: any, idx: number) => (
                            <tr key={order.id + idx} className="text-xs bg-white hover:bg-slate-50/50 transition-colors">
                              {/* ID */}
                              <td className="px-6 py-4 font-mono font-bold text-slate-500">
                                {order.id}
                              </td>
                              
                              {/* Customer */}
                              <td className="px-6 py-4">
                                <div className="font-bold text-slate-900">{order.customer}</div>
                                <div className="text-[10px] text-slate-500 mt-0.5">{order.email}</div>
                              </td>

                              {/* Product */}
                              <td className="px-6 py-4 min-w-[180px]">
                                <span className="font-semibold text-slate-800 leading-tight block truncate max-w-xs">{order.product}</span>
                              </td>

                              {/* Date */}
                              <td className="px-6 py-4 font-mono text-slate-500 text-center">
                                {order.date}
                              </td>

                              {/* Amount */}
                              <td className="px-6 py-4 font-black font-mono text-slate-900">
                                {formatCurrency(order.amount)}
                              </td>

                              {/* Gateway */}
                              <td className="px-6 py-4 text-slate-550 text-[10px] font-mono">
                                {order.gateway || "Razorpay API"}
                              </td>

                              {/* Actions / Status badges */}
                              <td className="px-6 py-4 text-right">
                                <span className={cn(
                                  "inline-block text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full font-extrabold font-mono border",
                                  order.status === "completed" ? "bg-emerald-100 text-emerald-800 border-emerald-200" : 
                                  order.status === "refunded" ? "bg-rose-100 text-rose-800 border-rose-200" :
                                  "bg-amber-100 text-amber-800 border-amber-200"
                                )}>
                                  {order.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-20 p-8 text-slate-550">
                      <TrendingUp className="h-16 w-16 text-slate-200 mx-auto mb-6" />
                      <h3 className="text-xl font-bold font-display mb-2 text-slate-900">No Ledger Entries matches</h3>
                      <p className="text-slate-500 text-xs">There are no sales satisfying the current parameters. Trigger random sandbox receipts!</p>
                      <button 
                        onClick={simulateRandomCheckout}
                        className="mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-premium-yellow to-amber-500 text-black px-4 py-2 rounded-xl text-xs font-bold shadow-sm"
                      >
                        <Sparkles className="h-4 w-4" /> Simulate sale
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* MODULE 4: CAMPAIGN SETTINGS (SETTINGS TAB) */}
            {activeTab === "settings" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="glass rounded-[2rem] p-8 space-y-8">
                  {/* Title block */}
                  <div>
                    <h3 className="text-xl font-bold font-display text-slate-900">Storefront Campaigns & Controls</h3>
                    <p className="text-xs text-slate-500 mt-1">Configure checkout systems, discount coupons, API testing, or flip site status parameters.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                    
                    {/* Column 1: Promo Coupon controls */}
                    <div className="space-y-6">
                      <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider font-mono flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-premium-yellow" />
                        PROMO CODE MANAGEMENT
                      </h4>

                      <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-655 mb-1.5 font-display">Active Global Discount Code</label>
                          <div className="flex gap-2">
                            <input 
                              type="text" 
                              value={discountCode}
                              onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                              className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-premium-yellow/50 text-slate-800 font-mono flex-1 text-center font-extrabold focus:bg-white transition-all" 
                            />
                            <div className="bg-premium-yellow/15 border border-premium-yellow/20 px-4 py-2.5 rounded-xl text-xs text-premium-yellow font-black font-mono">
                              ACTIVE
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-655 mb-1.5 font-display flex justify-between">
                            <span>Markdown Percents Multiplier</span>
                            <span className="text-premium-yellow font-mono">{discountValue}% OFF</span>
                          </label>
                          <input 
                            type="range" 
                            min="10" 
                            max="80" 
                            value={discountValue}
                            onChange={(e) => setDiscountValue(Number(e.target.value))}
                            className="w-full h-1 bg-slate-250 rounded-lg appearance-none cursor-pointer accent-premium-yellow" 
                          />
                          <p className="text-[10px] text-slate-500 mt-1">Directly overrides calculations across the checkout templates detail sheet.</p>
                        </div>
                      </div>
                    </div>

                    {/* Column 2: Sandbox checkout settings */}
                    <div className="space-y-6">
                      <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider font-mono flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-premium-yellow" />
                        SANDBOX ENVIRONMENT PARAMS
                      </h4>

                      <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-655 mb-1.5 font-display">System Currency</label>
                          <select 
                            value={siteCurrency}
                            onChange={(e) => setSiteCurrency(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-premium-yellow/50 text-slate-800 font-mono focus:ring-1 focus:ring-premium-yellow focus:border-premium-yellow transition-all"
                          >
                            <option value="INR">INR (₹) - Standard Local</option>
                            <option value="USD">USD ($) - International Base</option>
                            <option value="EUR">EUR (€) - Eurozone</option>
                          </select>
                        </div>

                        {/* Toggle site mode */}
                        <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
                          <div>
                            <span className="block text-xs font-bold text-slate-900 font-display">Maintenance Safe-Lock</span>
                            <span className="text-[9px] text-slate-550 mt-1 block">Toggles mock checkout gateways instantly</span>
                          </div>
                          <button
                            onClick={() => setMaintenanceMode(!maintenanceMode)}
                            className={cn(
                              "w-12 h-6 rounded-full p-1 transition-colors duration-300 relative",
                              maintenanceMode ? "bg-[#F3AE1B]" : "bg-slate-200"
                            )}
                          >
                            <div className={cn(
                              "h-4 w-4 bg-white rounded-full transition-transform duration-300 shadow-sm",
                              maintenanceMode ? "translate-x-6" : "translate-x-0"
                            )} />
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* System API Diagnostics telemetry mock */}
                  <div className="bg-slate-50 border border-slate-250 p-6 rounded-2xl">
                    <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider font-mono flex items-center gap-2 mb-4">
                      <Activity className="h-4 w-4 text-premium-yellow" />
                      PAYMENT GATEWAY DEPLOYMENT DIAGNOSTICS
                    </h4>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-4 bg-white border border-slate-200 rounded-xl text-center shadow-xs">
                        <span className="text-[9px] text-slate-500 block font-bold font-mono">RAZORPAY GATEWAY</span>
                        <span className="text-xs font-extrabold text-emerald-600 mt-2 block font-mono">● ENCRYPTED (SSL)</span>
                      </div>
                      <div className="p-4 bg-white border border-slate-200 rounded-xl text-center shadow-xs">
                        <span className="text-[9px] text-slate-500 block font-bold font-mono">ROUTER LATENCY</span>
                        <span className="text-xs font-extrabold text-slate-800 mt-2 block font-mono">0.24 seconds</span>
                      </div>
                      <div className="p-4 bg-white border border-slate-200 rounded-xl text-center shadow-xs">
                        <span className="text-[9px] text-slate-500 block font-bold font-mono">AUTO SECURITY CORE</span>
                        <span className="text-xs font-extrabold text-emerald-600 mt-2 block font-mono">TLS 1.3 PASSWAY</span>
                      </div>
                      <div className="p-4 bg-white border border-slate-200 rounded-xl text-center shadow-xs">
                        <span className="text-[9px] text-slate-500 block font-bold font-mono">EXCEL API PARSES</span>
                        <span className="text-xs font-extrabold text-slate-800 mt-2 block font-mono">Active (100%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}

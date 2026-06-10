import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

// Lazy Razorpay initialization
let _razorpay: Razorpay | null = null;
function getRazorpay() {
  if (!_razorpay) {
    const key_id = process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;
    if (!key_id || !key_secret) {
      console.warn("RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET is missing. Payment features will be disabled.");
      return null;
    }
    _razorpay = new Razorpay({ key_id, key_secret });
  }
  return _razorpay;
}

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Create Razorpay Order
  app.post("/api/payment/order", async (req, res) => {
    try {
      const { amount, currency = "INR", receipt } = req.body;
      const rzp = getRazorpay();
      
      if (!rzp) {
        return res.status(500).json({ error: "Razorpay not configured" });
      }

      const order = await rzp.orders.create({
        amount: amount * 100, // amount in smallest currency unit
        currency,
        receipt,
      });

      res.json(order);
    } catch (error) {
      console.error("Order creation error:", error);
      res.status(500).json({ error: "Failed to create order" });
    }
  });

  // Verify Payment
  app.post("/api/payment/verify", async (req, res) => {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
      const secret = process.env.RAZORPAY_KEY_SECRET;

      if (!secret) {
        return res.status(500).json({ error: "Razorpay secret not configured" });
      }

      const body = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac("sha256", secret)
        .update(body.toString())
        .digest("hex");

      if (expectedSignature === razorpay_signature) {
        // Payment is genuine
        // In a real app, you'd save this to a DB and trigger digital delivery
        res.json({ status: "success", message: "Payment verified successfully" });
      } else {
        res.status(400).json({ status: "failure", message: "Invalid signature" });
      }
    } catch (error) {
      console.error("Verification error:", error);
      res.status(500).json({ error: "Verification failed" });
    }
  });

  // Digital Delivery (Example)
  app.get("/api/download/:paymentId", (req, res) => {
    // In a real app, you'd verify the paymentId in your DB first
    // Then stream the file
    res.json({ 
      url: "https://example.com/download/template.xlsx", 
      message: "Here is your download link. In production, this would be a secure, time-limited URL." 
    });
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch(console.error);

export default function Privacy() {
  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <h1 className="font-display text-4xl font-bold mb-8 text-black">Privacy Policy</h1>
        <div className="prose max-w-none space-y-6 text-black text-base md:text-lg">
          <p>Last updated: May 15, 2026</p>
          
          <section>
            <h2 className="text-xl font-bold text-black mb-4">1. Information We Collect</h2>
            <p>At TwinaronNexus, we collect minimal information to process your orders. This includes your name, email address, and phone number provided during the Razorpay checkout process.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-black mb-4">2. Payment Security</h2>
            <p>All payments are processed through Razorpay. We do not store your credit card, debit card, or UPI information on our servers. Razorpay is a PCI-DSS compliant payment gateway.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-black mb-4">3. Data Usage</h2>
            <p>Your email is used primarily to deliver your digital products and for critical support communications. We do not sell your personal data to third parties.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-black mb-4">4. Cookies Policy</h2>
            <p>We use essential cookies to maintain your session and understand how you interact with our website to improve our services.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-black mb-4">5. Contact Information</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at info@twinaronnexus.com.</p>
          </section>
        </div>
      </div>
    </div>
  );
}

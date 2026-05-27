export default function Refund() {
  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <h1 className="font-display text-4xl font-bold mb-8 text-slate-900">Refund & Return Policy</h1>
        <div className="prose max-w-none space-y-6 text-slate-600">
          <p>Last updated: May 15, 2026</p>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">1. Digital Products Policy</h2>
            <p>Due to the nature of digital downloads, all sales are final. Once a download link has been sent or accessed, we are unable to provide a refund.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">2. Refund Eligibility</h2>
            <p>Refunds are only considered in exceptional circumstances, such as:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>A duplicate payment for the same product.</li>
              <li>A failure of the download delivery system that cannot be resolved within 48 hours.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">3. Technical Support</h2>
            <p>If you encounter any issues with opening or using the file, please contact us immediately. We will provide technical support to ensure you can access your purchase.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">4. Duplicate Payment Handling</h2>
            <p>If you have accidentally paid twice for the same product, please reach out with both transaction IDs, and we will process a refund for the duplicate amount within 5-7 working days.</p>
          </section>
        </div>
      </div>
    </div>
  );
}

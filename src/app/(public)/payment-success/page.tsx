export default function PaymentSuccess({
  searchParams: { amount },
}: {
  searchParams: { amount: string };
}) {
  return (
    <div className="flex items-center justify-center min-h-screen text-white">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">Thank you!</h1>
        <p className="text-lg mb-6">You successfully sent</p>
        <p className="text-lg mb-6 text-black font-bold p-2 bg-white rounded-lg">
          ${amount}
        </p>
        <div className="animate-bounce text-3xl">✅</div>
      </div>
    </div>
  );
}

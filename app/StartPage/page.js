import Link from "next/link";

export default function StartPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4">
      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            MyShop
          </h1>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Welcome to Your Shopping Destination!
          </h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Discover amazing products at unbeatable prices. Join thousands of
            satisfied customers who trust us for quality and service.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link
            href="/Products"
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            🛍️ Start Shopping
          </Link>

          <Link
            href="/login"
            className="border-2 border-blue-500 text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            🔐 Sign In
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
            <div className="text-2xl mb-3">🚚</div>
            <h3 className="font-semibold text-gray-800 mb-2">Free Shipping</h3>
            <p className="text-gray-600 text-sm">On orders over $50</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
            <div className="text-2xl mb-3">🔒</div>
            <h3 className="font-semibold text-gray-800 mb-2">Secure Payment</h3>
            <p className="text-gray-600 text-sm">100% protected</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
            <div className="text-2xl mb-3">⭐</div>
            <h3 className="font-semibold text-gray-800 mb-2">
              Quality Products
            </h3>
            <p className="text-gray-600 text-sm">Curated selection</p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-500 text-sm">
            New customer?{" "}
            <Link
              href="/Signup"
              className="text-blue-600 hover:text-blue-700 font-semibold underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

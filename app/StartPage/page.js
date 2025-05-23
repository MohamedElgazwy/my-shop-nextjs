export default function StartPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 text-center px-4">
      <h1 className="text-4xl font-bold text-blue-700 mb-4">Welcome Back!</h1>
      <p className="text-lg text-gray-700 mb-6">
        You have been successfully logged out.
      </p>
      <a
        href="/Products"
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-500 transition"
      >
        Go to Products
      </a>
    </div>
  );
}

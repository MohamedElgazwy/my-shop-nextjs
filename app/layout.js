import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ProductsProvider } from "./context/ProductsContext";

export const metadata = {
  title: "MyShop",
  description: "Discover amazing products at unbeatable prices",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-50">
        <AuthProvider>
          <CartProvider>
            <ProductsProvider>
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Footer />
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 3000,
                  style: {
                    background: "#363636",
                    color: "#fff",
                  },
                  success: {
                    duration: 3000,
                    theme: {
                      primary: "green",
                      secondary: "black",
                    },
                  },
                }}
              />
            </ProductsProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

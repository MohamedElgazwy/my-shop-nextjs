function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-black text-white py-8 mt-16">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col items-center space-y-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Made with 💖 by <span className="font-mono">Mohamed Aljazwi</span>
          </h2>
          <p className="text-gray-400 text-sm max-w-md">
            Your trusted destination for quality products and exceptional
            shopping experience
          </p>
          <div className="flex space-x-6 mt-4">
            <span className="text-gray-400 hover:text-white transition cursor-pointer">
              Terms
            </span>
            <span className="text-gray-400 hover:text-white transition cursor-pointer">
              Privacy
            </span>
            <span className="text-gray-400 hover:text-white transition cursor-pointer">
              Contact
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-black text-white py-6 sm:py-8 mt-8 sm:mt-16">
      <div className="container mx-auto px-2 sm:px-4 text-center">
        <div className="flex flex-col items-center space-y-2 sm:space-y-4">
          <h2 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Made with by Mohamed Aljazwi
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm max-w-md">
            Your trusted destination for quality products and exceptional
            shopping experience
          </p>
          <div className="flex space-x-3 sm:space-x-6 mt-2 sm:mt-4 text-xs sm:text-sm">
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

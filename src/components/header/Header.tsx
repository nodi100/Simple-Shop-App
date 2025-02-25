import Link from "next/link";

const Header = () => {
  return (
    <header className="sticky top-0 left-0 w-full flex items-center justify-between px-6 py-4 bg-blue-500 shadow-md z-50">
      <Link
        href="/"
        className=" text-white text-xl font-semibold hover:text-gray-600"
      >
        Home
      </Link>

      <Link
        href="/cart"
        className="text-white text-lg font-semibold hover:text-gray-600"
      >
        My Cart
      </Link>
    </header>
  );
};

export default Header;

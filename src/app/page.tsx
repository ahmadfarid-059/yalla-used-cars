import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <header>
      <h1 className="text-2xl font-bold">Welcome to the Yalla Motors</h1>
      <p className="mt-2 text-gray-600">
        This is the main landing page of our application.
      </p>
      <Link
        href="/used-cars"
        className="text-blue-500 hover:underline mt-4 inline-block"
      >
        Browse Used Cars
      </Link>
    </header>
  );
};

export default Home;
export const metadata = {
  title: "Home",
  description: "Welcome to the home page",
};

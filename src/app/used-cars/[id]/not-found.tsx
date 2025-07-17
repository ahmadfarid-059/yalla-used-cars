import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-red-600">404 - Not Found</h1>
      <p className="mt-4 text-gray-600">
        The page you are looking for does not exist.
      </p>
      <a href="/used-cars" className="mt-6 text-blue-500 hover:underline">
        Go back to Used Cars
      </a>
    </div>
  );
};

export default NotFound;

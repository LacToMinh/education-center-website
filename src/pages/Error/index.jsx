import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-dvh grid place-items-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-2">404</h1>
        <p className="mb-6 text-zinc-600">Trang không tồn tại.</p>
        <Link to="/" className="px-4 py-2 rounded bg-indigo-600 text-white">
          Về trang chủ
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-center px-4 bg-slate-50">
      <h1 className="absolute bottom-0 text-9xl md:text-[12rem] font-black text-slate-100 select-none pointer-events-none z-0">
        404
      </h1>
      <div className="relative z-10">
        <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <i className="ri-compass-discover-line text-4xl text-white"></i>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">Page Not Found</h1>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-semibold hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl"
        >
          <i className="ri-home-4-line text-xl"></i>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import ErrorBoundary from "./ErrorBoundary";

const ContentFallback = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00529b]"></div>
  </div>
);

const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <ErrorBoundary>
        <Suspense fallback={<ContentFallback />}>
          <Outlet />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default PublicLayout;

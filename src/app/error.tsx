"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="text-center max-w-md">
        <h2 className="text-xl font-bold text-[#212b32] mb-2">Something went wrong</h2>
        <p className="text-sm text-[#425563] mb-4">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="bg-[#005eb8] text-white font-semibold text-sm px-5 py-2 rounded hover:bg-[#003087] transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

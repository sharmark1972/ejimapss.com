'use client';

import { useEffect } from 'react';

export default function AdminRedirect() {
  useEffect(() => {
    window.location.href = process.env.NEXT_PUBLIC_ADMIN_URL || 'http://localhost:3004';
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">Redirecting to Admin Panel...</p>
    </div>
  );
}

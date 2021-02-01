import Link from 'next/link';
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="fixed inset-0 z-50 w-full bg-white shadow h-16">
      <div className="flex justify-center">
        <Link href="/">
          <a>
            <div>yanao.dev</div>
          </a>
        </Link>
      </div>
    </header>
  );
};

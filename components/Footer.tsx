import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <section>
      <footer className="bg-slate-900 border-t border-slate-800 py-7">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-slate-500 text-sm">
              © 2025 SkillSwap. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Footer;

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Users, Menu, X } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

interface NavItem {
  name: string;
  path: string;
}

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter(); // ✅ useRouter instance

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems: NavItem[] = [
    { name: "Home", path: "/" },
    { name: "Browse Users", path: "/browse" },
    ...(session ? [{ name: "Dashboard", path: "/dashboard" }] : []),
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-gray-900/60 backdrop-blur-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Users className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" />
            <span className="text-xl font-bold text-gradient">SkillSwap</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                className={`relative px-3 py-2 text-md font-medium transition-all duration-300 ${
                  pathname === item.path
                    ? "text-teal-400 border-b-2 border-teal-400"
                    : "text-white hover:text-teal-400"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Login/Logout */}
          <div className="hidden md:block">
            {!session ? (
              <button
                onClick={() => router.push("/auth/signin")} // ✅ navigate to signin
                className="text-md px-7 py-1 rounded-full border-2 border-teal-500/30 hover:border-teal-500/50 hover:bg-teal-500/10 hover:cursor-pointer transition-all duration-300 inline-flex items-center"
              >
                Login / Signup
              </button>
            ) : (
              <button
                onClick={() => signOut()}
                className="text-md px-7 py-1 rounded-full border-2 border-teal-500/30 hover:border-teal-500/50 hover:bg-teal-500/10 hover:cursor-pointer transition-all duration-300 inline-flex items-center"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-border/50 bg-card/50 hover:bg-card transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-lg border-b border-border/50">
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === item.path
                    ? "text-teal-400"
                    : "text-white hover:text-teal-400"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-3 border-t border-border/50">
              {!session ? (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    router.push("/auth/signin"); // ✅ navigate on mobile too
                  }}
                  className="w-full btn-glow"
                >
                  Login / Signup
                </button>
              ) : (
                <button onClick={() => signOut()} className="w-full btn-glow">
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

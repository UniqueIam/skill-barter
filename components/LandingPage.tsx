"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import {
  ArrowRight,
  Users,
  Zap,
  Shield,
  Globe,
  Star,
  ChevronRight,
} from "lucide-react";

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const features = [
    {
      icon: Users,
      title: "Connect with Experts",
      description:
        "Find skilled professionals ready to share their knowledge and learn from you.",
    },
    {
      icon: Zap,
      title: "Instant Skill Exchange",
      description:
        "Trade your expertise for new skills in a seamless, efficient process.",
    },
    {
      icon: Shield,
      title: "Verified Profiles",
      description:
        "All users are verified with ratings and reviews to ensure quality exchanges.",
    },
    {
      icon: Globe,
      title: "Global Community",
      description: "Connect with talented individuals from around the world.",
    },
  ];

  const stats = [
    { value: "10K+", label: "Active Users" },
    { value: "50K+", label: "Skills Exchanged" },
    { value: "4.9★", label: "Average Rating" },
    { value: "150+", label: "Countries" },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative animated-bg min-h-screen flex items-center justify-center overflow-hidden">
        {/* Dynamic Background Effect */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(20, 184, 166, 0.15), transparent 40%)`,
          }}
        />

        <div
          className={`relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center ${
            isLoaded ? "fade-in" : ""
          }`}
        >
          <div className="space-y-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full glass-card text-sm mb-8 mt-20">
              <Star className="h-4 w-4 text-teal-400 mr-2" />
              <span className="text-teal-300">
                Trusted by 10,000+ professionals worldwide
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold leading-tight">
              <span className="text-gradient">Exchange Skills,</span>
              <br />
              <span className="text-white">Expand Horizons</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Connect with talented individuals worldwide and trade your
              expertise for new skills in our premium skill-swapping platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <Link href="/users">
                <button className="btn-glow text-lg px-10 py-4 rounded-full font-semibold group inline-flex items-center">
                  Browse Users
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
              </Link>

              <Link href="/about">
                <button className="text-lg px-10 py-4 rounded-full font-semibold border-2 border-teal-500/30 hover:border-teal-500/50 hover:bg-teal-500/10 transition-all duration-300 inline-flex items-center">
                  Learn More
                  <ChevronRight className="ml-2 h-5 w-5" />
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-teal-400/40 rounded-full"
            />
          ))}
        </div>

        {/* Floating Geometric Shapes */}
        <div className="absolute top-20 left-10 floating-element">
          <div className="w-20 h-20 border-2 border-teal-400/20 rounded-full" />
        </div>
        <div
          className="absolute top-40 right-20 floating-element"
          style={{ animationDelay: "2s" }}
        >
          <div className="w-16 h-16 border-2 border-teal-400/20 rotate-45" />
        </div>
        <div
          className="absolute bottom-40 left-20 floating-element"
          style={{ animationDelay: "4s" }}
        >
          <div className="w-12 h-12 bg-teal-400/10 rounded-full" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-900/50 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-400 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Why Choose <span className="text-gradient">SkillSwap?</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Our platform revolutionizes how professionals share knowledge and
              grow together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="glass-card p-8 text-center group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative inline-flex items-center justify-center w-16 h-16 mb-6">
                  <div className="absolute inset-0 bg-teal-400/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <feature.icon className="h-8 w-8 text-teal-400 relative z-10 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">
                  {feature.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 bg-slate-800/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              What Our <span className="text-gradient">Community</span> Says
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                text: "SkillSwap transformed my career. I learned React from a senior developer and taught UI/UX design in return. Amazing platform!",
                name: "Vivek Tiwari",
                role: "Frontend Developer",
              },
              {
                text: "The quality of professionals on this platform is outstanding. Every skill exchange has been valuable and well-structured.",
                name: "Gaurav Tiwari",
                role: "Full Stack Developer",
              },
              {
                text: "I've connected with experts from 15 countries. The global community aspect makes learning so much more enriching.",
                name: "Abhimanyu",
                role: "Data Scientist",
              },
            ].map((testimonial, index) => (
              <div key={index} className="glass-card p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-teal-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-slate-300 mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <div className="font-semibold text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-slate-400">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 animated-bg relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to <span className="text-gradient">Start Swapping?</span>
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals already exchanging skills and
            building meaningful connections.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/users">
              <button className="btn-glow text-lg px-10 py-4 rounded-full font-semibold">
                Explore Community
              </button>
            </Link>
            <Link href="/profile">
              <button className="text-lg px-10 py-4 rounded-full font-semibold border-2 border-teal-500/30 hover:border-teal-500/50 hover:bg-teal-500/10 transition-all duration-300">
                Create Profile
              </button>
            </Link>
          </div>
        </div>

        {/* Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-32 h-32 bg-teal-400/5 rounded-full blur-xl" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-teal-400/5 rounded-full blur-xl" />
        </div>
      </section>
    </div>
  );
};

export default Home;

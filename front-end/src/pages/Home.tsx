"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Code2,
  Users,
  Terminal,
  Eye,
  Shield,
  Database,
  FolderTree,
  Globe,
  Github,
  Mail,
  Menu,
  X,
  ArrowRight,
  CheckCircle,
  Zap,
  Settings,
  Play,
  Square,
  ChevronRight,
  Cpu,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [terminalText, setTerminalText] = useState("");
  const [currentLine, setCurrentLine] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  const terminalCommands = useMemo(
    () => [
      "$ npm create V-Code-app my-project",
      "$ cd my-project",
      "$ npm run dev",
      "✨ Server running on http://localhost:3000",
      "🚀 Ready for collaboration!",
    ],
    []
  );

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Terminal typing animation
  useEffect(() => {
    if (currentLine < terminalCommands.length) {
      const command = terminalCommands[currentLine];
      let charIndex = 0;

      const typeInterval = setInterval(() => {
        if (charIndex <= command.length) {
          setTerminalText((prev) => {
            const lines = prev.split("\n");
            lines[currentLine] = command.slice(0, charIndex);
            return lines.join("\n");
          });
          charIndex++;
        } else {
          clearInterval(typeInterval);
          setTimeout(() => {
            setCurrentLine((prev) => prev + 1);
            setTerminalText((prev) => prev + "\n");
          }, 1000);
        }
      }, 50);

      return () => clearInterval(typeInterval);
    }
  }, [currentLine, terminalCommands]);

  const features = [
    {
      icon: Code2,
      title: "Multi-language Support",
      description:
        "Supports JavaScript, Python, C++, and more via Docker-based sandboxes.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Users,
      title: "Real-time Collaboration",
      description:
        "Built using Monaco Editor with Socket.io/WebRTC for live editing.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: FolderTree,
      title: "File System Tree UI",
      description:
        "Upload, manage, and organize files and folders like a local IDE.",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Terminal,
      title: "Built-in Terminal",
      description:
        "Full bash shell inside Docker containers for running commands.",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: Eye,
      title: "Live Preview",
      description: "Auto-refreshing browser preview for frontend apps.",
      gradient: "from-indigo-500 to-blue-500",
    },
    {
      icon: Shield,
      title: "Auth System",
      description: "Secure login with JWT, OAuth (Google/GitHub).",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      icon: Database,
      title: "Persistent Storage",
      description: "Projects saved to backend DB and file system.",
      gradient: "from-teal-500 to-green-500",
    },
    {
      icon: Globe,
      title: "Team Mode",
      description:
        "Invite collaborators, grant roles, and work together in real time.",
      gradient: "from-rose-500 to-pink-500",
    },
  ];

  const stats = [
    { number: "10K+", label: "Active Developers", icon: Users },
    { number: "50M+", label: "Lines of Code", icon: Code2 },
    { number: "99.9%", label: "Uptime", icon: Cpu },
    { number: "150+", label: "Countries", icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl transition-all duration-1000 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
      </div>

      {/* Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrollY > 50
            ? "bg-background/80 backdrop-blur-xl border-b border-border/50"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-50 animate-pulse" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                V-Code
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="hover:text-primary transition-all duration-300 hover:scale-105"
              >
                Features
              </a>
              <a
                href="#about"
                className="hover:text-primary transition-all duration-300 hover:scale-105"
              >
                About
              </a>
              <a
                href="#contact"
                className="hover:text-primary transition-all duration-300 hover:scale-105"
              >
                Contact
              </a>
              <Link to={"/sign-in"} className="cursor-pointer">
                <Button
                  variant="outline"
                  className="mr-2 hover:scale-105 transition-transform cursor-pointer"
                >
                  Sign In
                </Button>
              </Link>
              <Link to={"/register"} className="cursor-pointer">
                <Button className="cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Get Started
                </Button>
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-border/50 backdrop-blur-xl">
              <nav className="flex flex-col space-y-4 mt-4">
                <a
                  href="#features"
                  className="hover:text-primary transition-colors"
                >
                  Features
                </a>
                <a
                  href="#about"
                  className="hover:text-primary transition-colors"
                >
                  About
                </a>
                <a
                  href="#contact"
                  className="hover:text-primary transition-colors"
                >
                  Contact
                </a>
                <div className="flex flex-col space-y-2 pt-4">
                  <Link to={"/sign-in"} className="cursor-pointer">
                    <Button variant="outline">Sign In</Button>
                  </Link>

                  <Link to={"/register"} className="cursor-pointer">
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-500">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-20 px-4 z-10">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-8">
              <div className="animate-fade-in-up">
                <div className="inline-flex items-center bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
                  <Zap className="w-4 h-4 mr-2 text-blue-500" />
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    Next-Gen Development Platform
                  </span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                    Code Together,
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Build Faster
                  </span>
                </h1>

                <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
                  A browser-based, real-time collaborative code editor that
                  supports multiple languages, terminal access, and live
                  preview. Code, compile, and collaborate without local setup.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to={"/code"}>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-lg px-8 py-4 group shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      Start Coding Now
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-8 py-4 hover:bg-muted/50 backdrop-blur-sm border-border/50 hover:scale-105 transition-all duration-300"
                  >
                    <Play className="mr-2 w-5 h-5" />
                    Watch Demo
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Column - Interactive Code Editor Mockup */}
            <div className="relative">
              <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-xl shadow-2xl overflow-hidden">
                {/* Editor Header */}
                <div className="flex items-center justify-between p-4 border-b border-border/50">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>3 collaborators</span>
                  </div>
                </div>

                {/* Code Content */}
                <div className="p-4 font-mono text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-muted-foreground">1</span>
                      <span className="text-blue-500">import</span>
                      <span className="text-foreground">React</span>
                      <span className="text-muted-foreground">from</span>
                      <span className="text-green-500">'react'</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-muted-foreground">2</span>
                      <span className="text-blue-500">import</span>
                      <span className="text-foreground">useState</span>
                      <span className="text-muted-foreground">from</span>
                      <span className="text-green-500">'react'</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-muted-foreground">3</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-muted-foreground">4</span>
                      <span className="text-purple-500">function</span>
                      <span className="text-yellow-500">App</span>
                      <span className="text-foreground">() {}</span>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <span className="text-muted-foreground">5</span>
                      <span className="text-blue-500">const</span>
                      <span className="text-foreground">
                        [count, setCount] =
                      </span>
                      <span className="text-yellow-500">useState</span>
                      <span className="text-foreground">(0)</span>
                      <div className="w-2 h-5 bg-primary animate-pulse ml-1"></div>
                    </div>
                  </div>
                </div>

                {/* Terminal Section */}
                <div className="border-t border-border/50 bg-card/30">
                  <div className="flex items-center justify-between p-2 border-b border-border/30">
                    <div className="flex items-center space-x-2">
                      <Terminal className="w-4 h-4" />
                      <span className="text-sm font-medium">Terminal</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button className="p-1 hover:bg-muted/50 rounded">
                        <Play className="w-3 h-3" />
                      </button>
                      <button className="p-1 hover:bg-muted/50 rounded">
                        <Square className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <div className="p-3 font-mono text-sm h-32 overflow-hidden">
                    <pre className="text-green-500 whitespace-pre-wrap">
                      {terminalText}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium animate-bounce">
                Live Preview
              </div>
              <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse">
                Real-time Sync
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center group hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm border border-border/50">
                    <stat.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
              <Zap className="w-4 h-4 mr-2 text-red-500" />
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                Problem Statement
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Setting Up Local Environments is a Pain
              </span>
            </h2>

            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              Different OS, broken dependencies, version mismatches, and zero
              collaboration. Hours wasted on setup instead of actual coding.
              Sound familiar?
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Settings,
                  title: "Complex Setup",
                  desc: "Hours spent configuring environments instead of coding",
                },
                {
                  icon: X,
                  title: "No Collaboration",
                  desc: "Sharing code through screenshots and copy-paste",
                },
                {
                  icon: Database,
                  title: "Version Conflicts",
                  desc: '"It works on my machine" syndrome',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group relative bg-card/50 backdrop-blur-xl border border-border/50 p-6 rounded-xl hover:scale-105 transition-all duration-300 hover:shadow-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-orange-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="w-6 h-6 text-red-500" />
                    </div>
                    <h3 className="font-semibold mb-2 text-lg">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
              <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
              <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                Key Features
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                Everything You Need to Code
              </span>
            </h2>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features that make coding collaborative, efficient, and
              enjoyable
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group relative bg-card/50 backdrop-blur-xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />
                <CardContent className="relative p-6 z-10">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg`}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2 text-lg group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <ChevronRight className="w-5 h-5 text-primary" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="relative bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-border/50 rounded-3xl p-12 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Ready to Transform Your Coding Experience?
                </span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of developers who have already made the switch to
                collaborative coding
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-lg px-8 py-4 group shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-4 backdrop-blur-sm border-border/50 hover:bg-muted/50 hover:scale-105 transition-all duration-300"
                >
                  Schedule Demo
                </Button>
                <Toaster />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/50 backdrop-blur-xl relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-50" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                V-Code
              </span>
            </div>

            <div className="flex items-center space-x-6">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border/50 text-center text-muted-foreground">
            <p>&copy; 2024 V-Code. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

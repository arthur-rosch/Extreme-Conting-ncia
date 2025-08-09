"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: "#servico", label: "Serviço" },
    { href: "#preco", label: "Preço" },
    { href: "#faq", label: "FAQ" },
  ]

  return (
    <div className="fixed top-0 left-0 right-0 z-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="bg-black/20 border border-white/25 rounded-3xl px-6 py-3 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-4 group">

              <Image
                src="https://www.extremecontingencia.com/wp-content/uploads/2025/06/extremecontingencia.webp"
                alt="Profile"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />

            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-10">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-white/70 hover:text-white transition-all duration-300 font-medium text-base relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white/80 group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
              <div className="flex items-center space-x-3 text-white/70 hover:text-white transition-colors duration-300 cursor-pointer">
                <div className="w-6 h-4 rounded-sm overflow-hidden border border-white/10">
                  <div className="w-full h-full bg-gradient-to-r from-red-500 via-white to-red-500"></div>
                </div>
                <span className="font-medium text-base">English</span>
              </div>
            </nav>

            {/* Mobile Navigation */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="text-white/80 hover:text-white hover:bg-white/10 rounded-full">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[320px] bg-black/90 border-white/10 backdrop-blur-xl">
                <nav className="flex flex-col space-y-8 mt-12">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-white/70 hover:text-white transition-colors duration-300 font-medium text-lg py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}

                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </header>
      </div>
    </div>
  )
}

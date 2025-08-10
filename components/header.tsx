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
          </div>
        </header>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import Image from 'next/image'
import { BMAccount } from '@/lib/types'

const columns = [
  { id: "1-10k", title: "1 a 10k Gastos", color: "text-amber-300", bgColor: "bg-amber-400/20", borderColor: "border-amber-400/30" },
  { id: "10k-30k", title: "10k a 30k Gastos", color: "text-slate-300", bgColor: "bg-slate-400/20", borderColor: "border-slate-400/30" },
  { id: "30k-70k", title: "30k a 70k Gastos", color: "text-rose-300", bgColor: "bg-rose-400/20", borderColor: "border-rose-400/30" },
  { id: "70k-100k", title: "70k a 100k Gastos", color: "text-violet-300", bgColor: "bg-violet-400/20", borderColor: "border-violet-400/30" },
  { id: "100k-500k", title: "100 a 500k gastos", color: "text-cyan-300", bgColor: "bg-cyan-400/20", borderColor: "border-cyan-400/30" },
  { id: "500k+", title: "500k+ Gastos", color: "text-pink-300", bgColor: "bg-pink-400/20", borderColor: "border-pink-400/30" }
]

export function BMKanbanBoard() {
  const formatBRL = (v: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 2
    }).format(v)


  const [bmAccounts, setBmAccounts] = useState<BMAccount[]>([])
  // const [selectedAccount, setSelectedAccount] = useState<BMAccount | null>(null)
  const [activeTab, setActiveTab] = useState<'google' | 'meta'>('meta')

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch('/api/bm')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data: BMAccount[] = await response.json()
        setBmAccounts(data)
      } catch (error) {
        console.error("Failed to fetch BM accounts:", error)
      }
    }

    fetchAccounts()
  }, [])

  const getAccountsByStatus = (status: string) => {
    return bmAccounts.filter(account => account.status === status && account.platform === activeTab)
  }

  const formatDescription = (description: string, maxLines: number = 5) => {
    const lines = description.split('\n')
    if (lines.length <= maxLines) return description
    return lines.slice(0, maxLines).join('\n') + '\n...'
  }

  const scrollLeft = () => {
    const container = document.getElementById('kanban-container')
    if (container) {
      container.scrollBy({ left: -400, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    const container = document.getElementById('kanban-container')
    if (container) {
      container.scrollBy({ left: 400, behavior: 'smooth' })
    }
  }

  function parseWhatsFormatting(text: string) {
    if (!text) return "";
    return text
      .replace(/`(.+?)`/g, "<code>$1</code>")     // monospace
      .replace(/\*(.+?)\*/g, "<strong>$1</strong>") // bold
      .replace(/_(.+?)_/g, "<em>$1</em>")           // italic
      .replace(/~(.+?)~/g, "<s>$1</s>")             // strike
      .replace(/\n/g, "<br/>");                     // quebra de linha
  }


  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: '#010B18' }}>
      <div className="max-w-full mx-auto pt-24">

        {/* Scroll Navigation */}
        <div className="flex items-center justify-center gap-6 mb-12">
          <Button
            variant="ghost"
            size="icon"
            onClick={scrollLeft}
            className="text-white/60 hover:text-white hover:bg-white/5 rounded-full w-12 h-12 transition-all duration-300"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <span className="text-white/40 text-sm font-medium">Navegue pelas categorias</span>

          <Button
            variant="ghost"
            size="icon"
            onClick={scrollRight}
            className="text-white/60 hover:text-white hover:bg-white/5 rounded-full w-12 h-12 transition-all duration-300"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Tabs for Google/Meta */}
        <div className="flex justify-center mb-8">
          <Tabs
            defaultValue="meta"
            onValueChange={(value) => setActiveTab(value as 'google' | 'meta')}
            className="w-[400px]"
          >
            <TabsList className="grid w-full grid-cols-2 bg-white/[0.05] border border-white/[0.1] rounded-xl p-1">
              <TabsTrigger
                value="meta"
                className="data-[state=active]:bg-white/[0.1] data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg flex items-center gap-2 py-2"
              >
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Meta_Platforms_Inc._logo_%28cropped%29.svg/250px-Meta_Platforms_Inc._logo_%28cropped%29.svg.png"
                  alt="Meta Logo"
                  width={20}
                  height={20}
                />
                Meta
              </TabsTrigger>
              <TabsTrigger
                value="google"
                className="data-[state=active]:bg-white/[0.1] data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg flex items-center gap-2 py-2"
              >
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Google_Ads_logo.svg/500px-Google_Ads_logo.svg.png"
                  alt="Google Logo"
                  width={20}
                  height={20}
                />
                Google
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>


        {/* Kanban Board - Horizontal Scroll */}
        <div
          id="kanban-container"
          className="flex gap-8 overflow-x-auto pb-6 scrollbar-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {columns.map((column) => (
            <div key={column.id} className="flex-shrink-0 w-96 space-y-6">
              {/* Column Header */}
              <div className="sticky top-0 z-10 pb-4">
                <Badge className={`${column.bgColor} ${column.color} border ${column.borderColor} text-sm px-6 py-3 font-medium rounded-2xl w-full justify-center backdrop-blur-sm`}>
                  {column.title}
                </Badge>
              </div>

              {/* Cards */}
              <div className="space-y-4">
                {getAccountsByStatus(column.id).map((account) => (
                  <Card
                    key={account.id}
                    className="bg-white/[0.02] border-white/[0.05] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 cursor-pointer rounded-2xl backdrop-blur-sm group"

                  >
                    <CardHeader className="pb-3">
                      <h4 className="font-medium text-white/90 text-sm leading-tight group-hover:text-white transition-colors duration-300">
                        {account.title}
                      </h4>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div
                        className="text-white/60 text-xs leading-relaxed whitespace-pre-wrap font-mono group-hover:text-white/70 transition-colors duration-300"
                        dangerouslySetInnerHTML={{ __html: parseWhatsFormatting(account.description) }}
                      />


                      <div className="flex justify-between items-end pt-3 border-t border-white/[0.05]">
                        <div>
                          <p className="text-xl font-semibold text-white/95 group-hover:text-white transition-colors duration-300">{formatBRL(account.priceBRL)}</p>
                        </div>
                        <Badge className={`${column.bgColor} ${column.color} border-0 text-xs px-3 py-1.5 rounded-full`}>
                          {column.title.split(' ')[0]} {column.title.split(' ')[1]} {column.title.split(' ')[2]}
                        </Badge>
                      </div>
                      <div className="flex justify-end gap-2 pt-4 border-t border-white/[0.05]">
                        <Button className="bg-green-600 text-white hover:bg-green-700">
                          <ShoppingCart className="mr-2 h-4 w-4" /> whatsapp
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {getAccountsByStatus(column.id).length === 0 && (
                  <div className="text-center py-12 text-white/30 text-sm">
                    Nenhuma conta disponível
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>




      </div>
    </div>
  )
}

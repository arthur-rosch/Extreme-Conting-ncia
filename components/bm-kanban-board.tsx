"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Filter, ShoppingCart, Instagram, MessageCircle, Eye, X } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Image from "next/image"
import { BMAccount } from "@/lib/types"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

type Platform = "google" | "meta"

/** Colunas (inclui Vendidas) */
const columns = [
  { id: "1-10k", title: "1 a 10k Gastos", color: "text-amber-300", bgColor: "bg-amber-400/20", borderColor: "border-amber-400/30" },
  { id: "10k-30k", title: "10k a 30k Gastos", color: "text-slate-300", bgColor: "bg-slate-400/20", borderColor: "border-slate-400/30" },
  { id: "30k-70k", title: "30k a 70k Gastos", color: "text-rose-300", bgColor: "bg-rose-400/20", borderColor: "border-rose-400/30" },
  { id: "70k-100k", title: "70k a 100k Gastos", color: "text-violet-300", bgColor: "bg-violet-400/20", borderColor: "border-violet-400/30" },
  { id: "100k-500k", title: "100 a 500k gastos", color: "text-cyan-300", bgColor: "bg-cyan-400/20", borderColor: "border-cyan-400/30" },
  { id: "500k+", title: "500k+ Gastos", color: "text-pink-300", bgColor: "bg-pink-400/20", borderColor: "border-pink-400/30" },
  { id: "sold", title: "Vendidas", color: "text-emerald-300", bgColor: "bg-emerald-400/20", borderColor: "border-emerald-400/30" },
] as const

/** Labels do picker mobile (parecido com o print) */
const MOBILE_LABELS: Record<string, string> = {
  "1-10k": "1 a 10k Gastos",
  "10k-30k": "10k a 30k Gastos",
  "30k-70k": "30k a 70k Gastos",
  "70k-100k": "70k a 100k Gastos",
  "100k-500k": "100k a 500k gastos",
  "500k+": "500k+ Gastos",
  "sold": "Vendidas",
}

const WHATSAPP_URL =
  process.env.NEXT_PUBLIC_WHATSAPP_URL ??
  "https://wa.me/47984473369?text=" + encodeURIComponent("Olá! Quero saber mais sobre as BMs.");

const INSTAGRAM_URL =
  process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://www.instagram.com/extreme.contingencia/";


/** Map de status -> coluna */
const statusToColumnId: Record<string, string> = {
  ONE_10K: "1-10k",
  TENK_30K: "10k-30k",
  THIRTYK_70K: "30k-70k",
  SEVENTYK_100K: "70k-100k",
  HUNDREDK_500K: "100k-500k",
  FIVEHUNDREDK_PLUS: "500k+",
  SOLD: "sold",
}

type BMAccountWithStatusId = BMAccount & { statusId?: string }

// ---- helpers ----
const formatBRL = (v: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 2 }).format(v)

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}
function parseWhatsFormatting(text: string) {
  const safe = escapeHtml(text ?? "")
  return safe
    .replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(/\*(.+?)\*/g, "<strong>$1</strong>")
    .replace(/_(.+?)_/g, "<em>$1</em>")
    .replace(/~(.+?)~/g, "<s>$1</s>")
    .replace(/\n/g, "<br/>")
}

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(`(max-width:${breakpoint - 1}px)`)
    const onChange = (e: MediaQueryListEvent | MediaQueryList) =>
      setIsMobile((e as MediaQueryList).matches ?? (e as any).matches)
    onChange(mq)
    mq.addEventListener?.("change", onChange as any)
    return () => mq.removeEventListener?.("change", onChange as any)
  }, [breakpoint])
  return isMobile
}

// Detecta "vendida" de forma tolerante
function isSold(acc: any) {
  const v = acc?.saleStatus ?? acc?.sale_status ?? acc?.status
  if (typeof v === "string") {
    const s = v.toUpperCase()
    if (["SOLD", "VENDIDA", "VENDIDO", "SOLD_OUT", "SOLD-OUT", "SOLDOUT"].includes(s)) return true
  }
  return acc?.sold === true || acc?.isSold === true
}

export function BMKanbanBoard() {
  const [bmAccounts, setBmAccounts] = useState<BMAccountWithStatusId[]>([])
  const [activeTab, setActiveTab] = useState<Platform>("meta")
  const isMobile = useIsMobile()

  /** Mobile: apenas 1 coluna ativa de cada vez */
  const [mobileColumn, setMobileColumn] = useState<string>(columns[0].id)
  const [pickerOpen, setPickerOpen] = useState(false)
  
  /** Modal da BM selecionada */
  const [selectedBM, setSelectedBM] = useState<BMAccountWithStatusId | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // fetch com paginação
  useEffect(() => {
    let mounted = true
    const controller = new AbortController()

    async function fetchAll() {
      try {
        const pageSize = 100
        let page = 1
        let totalPages = 1
        const acc: BMAccount[] = []

        do {
          const res = await fetch(`/api/bm?page=${page}&pageSize=${pageSize}`, { signal: controller.signal })
          if (!res.ok) throw new Error(`HTTP ${res.status}`)
          const data = await res.json()
          const items: BMAccount[] = Array.isArray(data) ? data : data?.items ?? []
          acc.push(...items)
          totalPages = (Array.isArray(data) ? 1 : data?.totalPages) ?? 1
          page += 1
        } while (page <= totalPages)

        if (!mounted) return

        const normalized = acc.map((item) => {
          const sold = isSold(item)
          const statusId = sold ? "sold" : (statusToColumnId[(item as any).status] ?? (item as any).status)
          return { ...item, statusId }
        })

        setBmAccounts(normalized)

        // ajusta tab inicial conforme dados
        const platforms = new Set(normalized.map((a) => a.platform as Platform))
        if (!platforms.has(activeTab) && platforms.size > 0) {
          setActiveTab([...platforms][0] as Platform)
        }
      } catch (e) {
        if ((e as any)?.name !== "AbortError") {
          console.error("Failed to fetch all BM accounts:", e)
          setBmAccounts([])
        }
      }
    }

    fetchAll()
    return () => {
      mounted = false
      controller.abort()
    }
  }, []) // sem deps

  const getAccountsByStatus = (statusId: string) =>
    bmAccounts.filter(
      (acc) => acc.statusId === statusId && (acc.platform as unknown as Platform) === activeTab
    )

  const scroll = (dx: number) => {
    const el = document.getElementById("kanban-container")
    if (el) el.scrollBy({ left: dx, behavior: "smooth" })
  }

  const openBMModal = (account: BMAccountWithStatusId) => {
    setSelectedBM(account)
    setIsModalOpen(true)
  }

  const generateWhatsAppLink = (account: BMAccountWithStatusId) => {
    const message = `Olá! Tenho interesse na BM: ${(account as any).title}\n\nHash: ${account.hash || 'N/A'}\nPreço: ${formatBRL((account as any).priceBRL ?? 0)}\n\nPoderia me dar mais informações?`
    return `https://wa.me/47984473369?text=${encodeURIComponent(message)}`
  }

  const renderColumn = (columnId: string) => {
    const column = columns.find((c) => c.id === columnId)!
    return (
      <div key={column.id} className={`flex-shrink-0 ${isMobile ? "w-full" : "w-[22rem] md:w-96"} space-y-4 md:space-y-6`}>
        {/* Column header */}
        <div className="sticky top-0 z-10 pb-2 md:pb-4 backdrop-blur-sm">
          <Badge
            className={`${column.bgColor} ${column.color} border ${column.borderColor} text-xs md:text-sm px-4 md:px-6 py-2 md:py-3 font-medium rounded-2xl w-full justify-center`}
          >
            {column.title}
          </Badge>
        </div>

        {/* Cards */}
        <div className="space-y-3 md:space-y-4">
          {getAccountsByStatus(column.id).map((account) => (
            <Card
              key={account.id}
              className="bg-white/[0.02] border-white/[0.05] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 cursor-pointer rounded-2xl backdrop-blur-sm group"
              onClick={() => openBMModal(account)}
            >
              <CardHeader className="pb-3 text-white/90">
                <div className="font-medium text-white/90 text-sm leading-tight group-hover:text-white transition-colors duration-300" dangerouslySetInnerHTML={{ __html: parseWhatsFormatting((account as any).title) }} />
                {account.hash}
              </CardHeader>

              <CardContent className="space-y-4">
                <div
                  className="prose prose-invert max-w-none text-[11px] md:text-xs leading-relaxed whitespace-pre-wrap text-white"
                  dangerouslySetInnerHTML={{ __html: parseWhatsFormatting((account as any).description) }}
                />

                <div className="flex justify-between items-end pt-3 border-t border-white/[0.05]">
                  <p className="text-lg md:text-xl font-semibold text-white/95 group-hover:text-white transition-colors duration-300">
                    {formatBRL((account as any).priceBRL ?? 0)}
                  </p>
                  <Badge className={`${column.bgColor} ${column.color} border-0 text-[10px] md:text-xs px-2.5 md:px-3 py-1.5 rounded-full`}>
                    {column.title.split(" ").slice(0, 3).join(" ")}
                  </Badge>
                </div>

                <div className="flex justify-center pt-4 border-t border-white/[0.05]">
                  <div className="text-xs text-white/50 flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    Clique para ver detalhes
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {getAccountsByStatus(column.id).length === 0 && (
            <div className="text-center py-10 md:py-12 text-white/30 text-xs md:text-sm">Nenhuma conta disponível</div>
          )}
        </div>
      </div>
    )
  }

  const visibleIds = isMobile ? [mobileColumn] : columns.map(c => c.id)

  return (
    <div className="min-h-screen p-6 md:p-8" style={{ backgroundColor: "#010B18" }}>
      <div className="mx-auto w-full max-w-[1400px] pt-8 md:pt-16 mt-28">
        {/* Header + Tabs */}
        <div className="flex flex-col items-center gap-6 md:gap-8">
          {/* Setas só no desktop */}
          {!isMobile && (
            <div className="flex items-center justify-center gap-6">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => scroll(-400)}
                className="text-white/60 hover:text-white hover:bg-white/5 rounded-full w-10 h-10 md:w-12 md:h-12 transition-all duration-300"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              <span className="text-white/50 text-xs md:text-sm font-medium">Navegue pelas categorias</span>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => scroll(400)}
                className="text-white/60 hover:text-white hover:bg-white/5 rounded-full w-10 h-10 md:w-12 md:h-12 transition-all duration-300"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          )}

          {/* CTAs sociais acima das Tabs */}
          <div className="flex w-full justify-center gap-3 md:gap-4 flex-wrap">
            <Button
              asChild
              className="rounded-2xl px-4 md:px-5 h-9 md:h-10 bg-[#25D366] hover:bg-[#1FB357] text-white font-medium shadow-sm"
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="Abrir WhatsApp">
                <MessageCircle className="mr-2 h-4 w-4" />
                WhatsApp
              </a>
            </Button>

            <Button
              asChild
              className="rounded-2xl px-4 md:px-5 h-9 md:h-10 bg-[#E1306C] hover:bg-[#c22459] text-white font-medium shadow-sm"
            >
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Abrir Instagram">
                <Instagram className="mr-2 h-4 w-4" />
                Instagram
              </a>
            </Button>
          </div>


          {/* Tabs plataforma */}
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as Platform)} className="w-[320px] md:w-[420px]">
            <TabsList className="grid w-full grid-cols-2 bg-white/[0.05] border border-white/[0.1] rounded-xl p-1">
              <TabsTrigger
                value="meta"
                className="data-[state=active]:bg-white/[0.1] data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg flex items-center gap-2 py-2"
              >
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Meta_Platforms_Inc._logo_%28cropped%29.svg/250px-Meta_Platforms_Inc._logo_%28cropped%29.svg.png"
                  alt="Meta Logo"
                  width={18}
                  height={18}
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
                  width={18}
                  height={18}
                />
                Google
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Picker único no MOBILE */}
          {isMobile && (
            <div className="w-full flex items-center justify-center">
              <Sheet open={pickerOpen} onOpenChange={setPickerOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10">
                    <Filter className="mr-2 h-4 w-4" />
                    <span className="truncate max-w-[200px]">
                      {MOBILE_LABELS[mobileColumn] ?? columns.find(c => c.id === mobileColumn)?.title}
                    </span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[65vh] bg-[#0a1220] text-white border-white/10">
                  <SheetHeader><SheetTitle>Escolha a categoria</SheetTitle></SheetHeader>

                  <div className="mt-4">
                    <RadioGroup
                      value={mobileColumn}
                      onValueChange={(v) => { setMobileColumn(v); setPickerOpen(false) }}
                      className="space-y-2"
                    >
                      {columns.map(col => (
                        <label
                          key={col.id}
                          className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-3"
                        >
                          <div className="flex items-center gap-3">
                            <RadioGroupItem id={`opt-${col.id}`} value={col.id} />
                            <Label htmlFor={`opt-${col.id}`} className="text-white cursor-pointer">
                              {MOBILE_LABELS[col.id] ?? col.title}
                            </Label>
                          </div>
                        </label>
                      ))}
                    </RadioGroup>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          )}
        </div>

        {/* Board */}
        <div
          id="kanban-container"
          className={`${isMobile ? "mt-6 flex flex-col gap-6" : "mt-8 md:mt-10 flex gap-6 md:gap-8 overflow-x-auto pb-6 scrollbar-none"}`}
          style={isMobile ? undefined : { scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {visibleIds.map(renderColumn)}
        </div>

        {/* Modal de Detalhes da BM */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="bg-white/[0.02] border-white/[0.05] text-white max-w-lg max-h-[85vh] overflow-hidden backdrop-blur-sm rounded-2xl">
            {selectedBM && (() => {
              const column = columns.find(c => c.id === selectedBM.statusId)
              return (
                <div className="p-6 space-y-6">
                  {/* Título */}
                  <div 
                    className="text-xl md:text-2xl font-semibold text-white/90 leading-tight text-center"
                    dangerouslySetInnerHTML={{ __html: parseWhatsFormatting((selectedBM as any).title) }}
                  />

                  {/* Badge da Categoria com cores dinâmicas */}
                  {column && (
                    <div className="text-center">
                      <Badge className={`${column.bgColor} ${column.color} border ${column.borderColor} px-4 py-2 rounded-full`}>
                        {column.title}
                      </Badge>
                    </div>
                  )}

                  {/* Preço */}
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-white/95">
                      {formatBRL((selectedBM as any).priceBRL ?? 0)}
                    </div>
                  </div>

                  {/* Hash */}
                  {selectedBM.hash && (
                    <div className="text-center">
                      <div className="text-white/60 font-mono text-sm bg-white/[0.02] rounded-lg px-4 py-2 inline-block border border-white/[0.05]">
                        {selectedBM.hash}
                      </div>
                    </div>
                  )}

                  {/* Descrição */}
                  <div className="max-h-48 overflow-y-auto">
                    <div 
                      className="text-sm leading-relaxed text-white/80 text-center"
                      dangerouslySetInnerHTML={{ __html: parseWhatsFormatting((selectedBM as any).description || 'Sem descrição disponível') }}
                    />
                  </div>

                  {/* Botão de Ação com cores da categoria */}
                  <div className="pt-4">
                    <Button
                      asChild
                      className={`w-full ${column?.bgColor || 'bg-white/10'} hover:opacity-80 text-white font-medium rounded-2xl h-12 border-0`}
                    >
                      <a 
                        href={selectedBM ? generateWhatsAppLink(selectedBM) : '#'}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <MessageCircle className="h-5 w-5" />
                        Quero essa BM!
                      </a>
                    </Button>
                  </div>
                </div>
              )
            })()}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

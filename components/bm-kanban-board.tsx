"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { BMAccount } from "@/lib/types"

type Platform = "google" | "meta"

// Prisma -> Coluna (IDs como no seu array `columns`)
const statusToColumnId: Record<string, string> = {
  ONE_10K: "1-10k",
  TENK_30K: "10k-30k",
  THIRTYK_70K: "30k-70k",
  SEVENTYK_100K: "70k-100k",
  HUNDREDK_500K: "100k-500k",
  FIVEHUNDREDK_PLUS: "500k+",
}

type BMAccountWithStatusId = BMAccount & { statusId?: string }

const columns = [
  { id: "1-10k", title: "1 a 10k Gastos", color: "text-amber-300", bgColor: "bg-amber-400/20", borderColor: "border-amber-400/30" },
  { id: "10k-30k", title: "10k a 30k Gastos", color: "text-slate-300", bgColor: "bg-slate-400/20", borderColor: "border-slate-400/30" },
  { id: "30k-70k", title: "30k a 70k Gastos", color: "text-rose-300", bgColor: "bg-rose-400/20", borderColor: "border-rose-400/30" },
  { id: "70k-100k", title: "70k a 100k Gastos", color: "text-violet-300", bgColor: "bg-violet-400/20", borderColor: "border-violet-400/30" },
  { id: "100k-500k", title: "100 a 500k gastos", color: "text-cyan-300", bgColor: "bg-cyan-400/20", borderColor: "border-cyan-400/30" },
  { id: "500k+", title: "500k+ Gastos", color: "text-pink-300", bgColor: "bg-pink-400/20", borderColor: "border-pink-400/30" },
]

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
    .replace(/`(.+?)`/g, "<code>$1</code>") // monospace
    .replace(/\*(.+?)\*/g, "<strong>$1</strong>") // bold
    .replace(/_(.+?)_/g, "<em>$1</em>") // italic
    .replace(/~(.+?)~/g, "<s>$1</s>") // strike
    .replace(/\n/g, "<br/>") // br
}

export function BMKanbanBoard() {
  const [bmAccounts, setBmAccounts] = useState<BMAccountWithStatusId[]>([])
  const [activeTab, setActiveTab] = useState<Platform>("meta")

  // fetch com fallback p/ paginação
  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    async function fetchAll() {
      try {
        const pageSize = 100; // ajusta se precisar
        let page = 1;
        let totalPages = 1;
        const acc: BMAccount[] = [];

        do {
          const res = await fetch(`/api/bm?page=${page}&pageSize=${pageSize}`, {
            signal: controller.signal,
          });
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const data = await res.json();

          const items: BMAccount[] = Array.isArray(data) ? data : data?.items ?? [];
          acc.push(...items);

          totalPages = (Array.isArray(data) ? 1 : data?.totalPages) ?? 1;
          page += 1;
        } while (page <= totalPages);

        if (!mounted) return;

        // normaliza status -> id da coluna
        const normalized = acc.map((item) => ({
          ...item,
          statusId: statusToColumnId[(item as any).status] ?? (item as any).status,
        }));

        setBmAccounts(normalized);

        // garante que a aba ativa exista nos dados
        const platforms = new Set(normalized.map((a) => a.platform as Platform));
        if (!platforms.has(activeTab) && platforms.size > 0) {
          // e.g., só veio "google"
          setActiveTab([...platforms][0] as Platform);
        }
      } catch (e) {
        if ((e as any)?.name !== "AbortError") {
          console.error("Failed to fetch all BM accounts:", e);
          setBmAccounts([]);
        }
      }
    }

    fetchAll();
    return () => {
      mounted = false;
      controller.abort();
    };
  }, []); // sem deps


  const getAccountsByStatus = (statusId: string) =>
    bmAccounts.filter((acc) => acc.statusId === statusId && (acc.platform as unknown as Platform) === activeTab)

  const scroll = (dx: number) => {
    const el = document.getElementById("kanban-container")
    if (el) el.scrollBy({ left: dx, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen p-6 md:p-8" style={{ backgroundColor: "#010B18" }}>
      <div className="mx-auto w-full max-w-[1400px] pt-8 md:pt-16">
        {/* Header + Tabs */}
        <div className="flex flex-col items-center gap-6 md:gap-8">
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

          <Tabs defaultValue="meta" onValueChange={(v) => setActiveTab(v as Platform)} className="w-[320px] md:w-[420px]">
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
        </div>

        {/* Board */}
        <div
          id="kanban-container"
          className="mt-8 md:mt-10 flex gap-6 md:gap-8 overflow-x-auto pb-6 scrollbar-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {columns.map((column) => (
            <div key={column.id} className="flex-shrink-0 w-[22rem] md:w-96 space-y-4 md:space-y-6">
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
                  >
                    <CardHeader className="pb-3">
                      <h4 className="font-medium text-white/90 text-sm leading-tight group-hover:text-white transition-colors duration-300">
                        {account.title}
                      </h4>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div
                        className="prose prose-invert max-w-none text-[11px] md:text-xs leading-relaxed whitespace-pre-wrap text-white"
                        dangerouslySetInnerHTML={{ __html: parseWhatsFormatting(account.description) }}
                      />

                      <div className="flex justify-between items-end pt-3 border-t border-white/[0.05]">
                        <p className="text-lg md:text-xl font-semibold text-white/95 group-hover:text-white transition-colors duration-300">
                          {formatBRL(account.priceBRL)}
                        </p>
                        <Badge className={`${column.bgColor} ${column.color} border-0 text-[10px] md:text-xs px-2.5 md:px-3 py-1.5 rounded-full`}>
                          {column.title.split(" ").slice(0, 3).join(" ")}
                        </Badge>
                      </div>

                      <div className="flex justify-end gap-2 pt-4 border-t border-white/[0.05]">
                        <Button className="bg-green-600 text-white hover:bg-green-700 h-8 md:h-9 text-xs md:text-sm">
                          <ShoppingCart className="mr-2 h-3.5 w-3.5 md:h-4 md:w-4" /> whatsapp
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {getAccountsByStatus(column.id).length === 0 && (
                  <div className="text-center py-10 md:py-12 text-white/30 text-xs md:text-sm">Nenhuma conta disponível</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

import { Header } from "@/components/header"
import { BMKanbanBoard } from "@/components/bm-kanban-board"

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#010B18' }}>
      <Header />
      <main>
        <BMKanbanBoard />
      </main>

    </div>
  )
}

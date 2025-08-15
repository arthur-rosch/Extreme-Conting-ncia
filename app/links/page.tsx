import Image from "next/image"
import Link from "next/link"
import assets from "../../assets/1.jpeg"
import { Facebook, Instagram, Youtube } from "lucide-react"
import { Avatar, AvatarImage } from "@/components/ui/avatar"

export default function LinksPage() {
  const links = [
    {
      title: "Comunidade Ativos com Gastos",
      url: "https://chat.whatsapp.com/DTwXTTIQLnFEhyii89Fpqk",
      bgColor: "bg-blue-600 hover:bg-blue-700"
    },
    {
      title: "Loja | Compre seus ativos aqui!",
      url: "/", // Substituir pelo link da loja que você fez
      bgColor: "bg-blue-600 hover:bg-blue-700"
    },
    {
      title: "Suporte | Está com alguma dúvida?",
      url: "https://wa.me/47984473369",
      bgColor: "bg-blue-600 hover:bg-blue-700"
    },
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#010B18' }}>
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
        {/* Logo e Perfil */}
        <div className="flex flex-col items-center mb-8">
          <div className="mb-4">
            <Avatar className="w-32 h-32">
              <AvatarImage src={assets.src} className="w-full h-full object-cover" />
            </Avatar>
          </div>
          
          <h2 className="text-white text-xl font-semibold mb-2">@extreme.contingencia</h2>
          <p className="text-white/80 text-center max-w-md text-sm">
          Estrutura de contingência completa para sua operação!
          </p>
        </div>

        {/* Título Principal */}
        <h1 className="text-white text-3xl font-bold mb-12 text-center">
          Links | Extreme Contingência
        </h1>

        {/* Botões de Links */}
        <div className="w-full max-w-md space-y-4 mb-16">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                block w-full px-6 py-4 rounded-2xl text-white font-medium text-center
                transition-all duration-200 transform hover:scale-105
                ${link.bgColor}
                shadow-lg hover:shadow-xl
              `}
            >
              {link.title}
            </Link>
          ))}
        </div>

        {/* Rodapé com Logo e Redes Sociais */}
        <div className="flex flex-col items-center space-y-4">
          {/* Logo pequena */}
          <div className="flex items-center space-x-2">
            <Image
                src="https://www.extremecontingencia.com/wp-content/uploads/2025/06/extremecontingencia.webp"
                alt="Profile"
                width={40}
                height={40}
                className="w-full h-full object-cover"
            />
          </div>

          {/* Ícones Sociais */}
          <div className="flex space-x-4">

            <Link
              href="https://www.instagram.com/extreme.contingencia/"
              className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
            >
              <Instagram className="w-5 h-5 text-white" />
            </Link>
    
          </div>

x
        </div>
      </div>
    </div>
  )
}

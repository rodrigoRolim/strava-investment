import { House, Map, PiggyBank } from "lucide-react";
import Link from "next/link";
import { Running, RunningIcon, Walking } from "./icons";

export default function BottomNavigation() {
  return (
    <nav
      role="navigation"
      className="
        fixed bottom-3 left-1/2 z-50
        -translate-x-1/2
        w-[95%] max-w-md
        rounded-2xl
        bg-white/90 backdrop-blur
        shadow-lg
        px-6 py-3
        flex justify-between items-center
      "
    >
      <Link
        href="/panel"
        aria-label="Ir para a tela inicial"
        className="
          flex flex-col items-center gap-1
          text-gray-500
          transition-colors
          hover:text-orange-600
        "
      >
        <Walking className="w-6 h-6" />
        <span className="text-[11px] font-medium">Início</span>
      </Link>

      {/* Botão central - destaque */}
      <Link
        href="/distance-tracker"
        aria-label="Ir para a tela do rastreador"
        className="
          flex flex-col items-center gap-1
          -mt-8
        "
      >
        <div
          className="
            w-14 h-14
            rounded-full
            bg-orange-600
            flex items-center justify-center
            shadow-md
          "
        >
          <Map className="w-7 h-7 text-white" />
        </div>
        <span className="text-[11px] font-semibold text-orange-600">
          Atividade
        </span>
      </Link>

      <Link
        href="/withdraw"
        aria-label="Ir para a tela de saque"
        className="
          flex flex-col items-center gap-1
          text-gray-500
          transition-colors
          hover:text-orange-600
        "
      >
        <PiggyBank className="w-6 h-6" />
        <span className="text-[11px] font-medium">Saque</span>
      </Link>
    </nav>
  )
}
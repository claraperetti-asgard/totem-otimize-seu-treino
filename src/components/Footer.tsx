import cimerian from '../assets/logo-cimerian.png'

export default function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-white/10 bg-[#16233A] px-16 py-8">
      <div className="flex flex-col items-center gap-3">
        <img
          src={cimerian}
          alt="Cimerian"
          className="h-12 w-auto object-contain"
        />
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">
          Otimize Seu Treino
        </p>
      </div>
    </footer>
  )
}

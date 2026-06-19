export default function Footer() {
  return (
    <footer className="bg-textDark text-background py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
      </div>
      {/* Copyright */}
      <div className="text-center mt-12 pt-6 border-t border-white/10 opacity-50 text-sm">
        &copy; {new Date().getFullYear()} Silvereng Construtora. Todos os direitos reservados.
      </div>
    </footer>
  );
}

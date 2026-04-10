import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { path: '/', label: 'Accueil' },
  { path: '/diagnostic', label: 'Diagnostic' },
  { path: '/resultats', label: 'Résultats' },
  { path: '/actions', label: 'Plan d\'actions' },
  { path: '/urgence', label: 'Fiches d\'urgence' },
];

export default function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-primary text-white shadow-lg no-print">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-white no-underline">
          <Shield className="w-7 h-7" />
          <span className="text-lg font-bold hidden sm:inline">Prévention Climat</span>
        </Link>

        <button
          className="sm:hidden p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <nav className="hidden sm:flex gap-1">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors no-underline ${
                location.pathname === item.path
                  ? 'bg-white/20 text-white'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {menuOpen && (
        <nav className="sm:hidden border-t border-white/20 px-4 py-2 flex flex-col gap-1">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className={`px-3 py-2 rounded text-sm font-medium no-underline ${
                location.pathname === item.path
                  ? 'bg-white/20 text-white'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

import React from 'react';
import { FileText, Shield, Sparkles, Terminal } from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onOpenReportModal: () => void;
  onOpenAboutModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onOpenReportModal,
  onOpenAboutModal
}) => {
  const navItems = [
    { id: 'navegador', label: 'Bússola Emocional' },
    { id: 'ponto_escolha', label: 'Ponto de Escolha' },
    { id: 'pbat', label: 'Diário PBAT' },
    { id: 'ferramentas', label: 'Ferramentas SOS' },
    { id: 'biblioteca', label: 'Psicoeducação' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0f142a]/85 backdrop-blur-md border-b border-[#82e5ff]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4 h-18">
        {/* Zone 2: 4-5 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-semibold tracking-wide">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id)}
                className={`transition-all duration-150 whitespace-nowrap shrink-0 pb-1 border-b-2 font-medium ${
                  isActive
                    ? 'text-[#02bbff] border-[#02bbff] font-bold glow-cyan'
                    : 'text-[#b4c0d9] border-transparent hover:text-[#82e5ff] hover:border-[#82e5ff]/40'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenAboutModal}
            title="Sobre este material · AyA Clínica Integrada"
            className="px-3 py-2 text-xs font-medium text-[#82e5ff] hover:text-white bg-[#130169]/40 hover:bg-[#130169]/80 border border-[#82e5ff]/30 rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <Shield className="w-3.5 h-3.5 text-[#02bbff]" />
            <span className="hidden sm:inline">Sobre este material</span>
            <span className="sm:hidden">Sobre</span>
          </button>

          <button
            type="button"
            onClick={onOpenReportModal}
            className="px-3.5 sm:px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#b104dc] to-[#130169] rounded-lg hover:from-[#b104dc] hover:to-[#422774] border border-[#ce57df]/50 shadow-[0_0_15px_rgba(206,87,223,0.3)] transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5 text-[#82e5ff]" />
            <span className="hidden sm:inline">Relatório da Sessão</span>
            <span className="sm:hidden">Relatório</span>
          </button>
        </div>
      </div>

      {/* Mobile nav bar below header */}
      <div className="md:hidden flex items-center gap-1.5 px-4 py-2.5 border-t border-[#82e5ff]/10 overflow-x-auto no-scrollbar bg-[#0f142a]">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectTab(item.id)}
              className={`px-3 py-1.5 text-xs rounded-lg whitespace-nowrap shrink-0 transition-all font-medium ${
                isActive
                  ? 'bg-gradient-to-r from-[#b104dc] to-[#130169] text-white border border-[#ce57df]/50 font-bold'
                  : 'text-[#b4c0d9] hover:text-white bg-[#130169]/30'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};

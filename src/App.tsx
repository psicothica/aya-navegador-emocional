import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { EmotionNavigator } from './components/EmotionNavigator';
import { ChoicePointInteractive } from './components/ChoicePointInteractive';
import { PbatDailyTracker } from './components/PbatDailyTracker';
import { QuickToolsSos } from './components/QuickToolsSos';
import { PsychoeducationLibrary } from './components/PsychoeducationLibrary';
import { TherapistReportModal } from './components/TherapistReportModal';
import { AboutMaterialModal } from './components/AboutMaterialModal';
import { PBATLogEntry, ChoicePointRecord } from './types/therapy';
import { INITIAL_PBAT_LOGS, INITIAL_CHOICE_POINTS } from './data/initialData';
import { PsicothicaLogo } from './components/PsicothicaLogo';
import { Sparkles, Terminal, Flame, Zap, ShieldAlert, Heart } from 'lucide-react';

const PBAT_STORAGE_KEY = 'psicothica_pbat_logs_v1';
const CHOICE_POINT_STORAGE_KEY = 'psicothica_choice_points_v1';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('navegador');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  // PBAT logs state - only real patient entries, never invented mock data
  const [pbatLogs, setPbatLogs] = useState<PBATLogEntry[]>(() => {
    try {
      const saved = localStorage.getItem(PBAT_STORAGE_KEY);
      if (saved) {
        const parsed: PBATLogEntry[] = JSON.parse(saved);
        // Clean out any legacy mock data so the patient only sees their own real data
        return parsed.filter(item => !item.id.startsWith('pbat-00'));
      }
    } catch {
      // Fallback
    }
    return INITIAL_PBAT_LOGS;
  });

  // Choice point records state - only real patient entries
  const [choicePoints, setChoicePoints] = useState<ChoicePointRecord[]>(() => {
    try {
      const saved = localStorage.getItem(CHOICE_POINT_STORAGE_KEY);
      if (saved) {
        const parsed: ChoicePointRecord[] = JSON.parse(saved);
        // Clean out any legacy mock data
        return parsed.filter(item => !item.id.startsWith('cp-00'));
      }
    } catch {
      // Fallback
    }
    return INITIAL_CHOICE_POINTS;
  });

  // Prefill flow between Navigator and Choice Point
  const [prefillChoicePoint, setPrefillChoicePoint] = useState<{
    situation: string;
    emotion: string;
    hookThought: string;
    action: string;
    value: string;
    helper: string;
  } | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(PBAT_STORAGE_KEY, JSON.stringify(pbatLogs));
    } catch {
      // Storage error
    }
  }, [pbatLogs]);

  useEffect(() => {
    try {
      localStorage.setItem(CHOICE_POINT_STORAGE_KEY, JSON.stringify(choicePoints));
    } catch {
      // Storage error
    }
  }, [choicePoints]);

  const handleAddPbatLog = (entry: PBATLogEntry) => {
    setPbatLogs((prev) => [...prev, entry]);
  };

  const handleDeletePbatLog = (id: string) => {
    setPbatLogs((prev) => prev.filter((item) => item.id !== id));
  };


  const handleAddChoicePoint = (record: ChoicePointRecord) => {
    setChoicePoints((prev) => [record, ...prev]);
  };

  const handleDeleteChoicePoint = (id: string) => {
    setChoicePoints((prev) => prev.filter((item) => item.id !== id));
  };

  const handleToggleShareChoicePoint = (id: string) => {
    setChoicePoints((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, sharedWithTherapist: !item.sharedWithTherapist } : item
      )
    );
  };

  const handleSendToChoicePoint = (prefill: {
    situation: string;
    emotion: string;
    hookThought: string;
    action: string;
    value: string;
    helper: string;
  }) => {
    setPrefillChoicePoint(prefill);
    setCurrentTab('ponto_escolha');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0f142a] text-[#e1eefc] bg-grid-cyber selection:bg-[#ce57df]/40 selection:text-[#82e5ff]">
      {/* Top Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenReportModal={() => setIsReportModalOpen(true)}
        onOpenAboutModal={() => setIsAboutModalOpen(true)}
      />

      {/* Cyber/Analog Friction Banner with the exact requested phrase */}
      <div className="bg-gradient-to-r from-[#0f142a] via-[#130169]/60 to-[#0f142a] border-b border-[#82e5ff]/15 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-tech font-bold text-[#82e5ff] flex items-center gap-1.5 glow-cyan">
              <Zap className="w-3.5 h-3.5 text-[#02bbff]" />
              ECOSSISTEMA PSICOTHICA
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="font-analog font-bold text-base text-[#ec9eff] tracking-wide">
              sinta a dor e aja mesmo assim, apesar dela.
            </span>
          </div>

          <div className="flex items-center gap-3 font-tech text-[11px] text-[#82e5ff]">
            <span>{choicePoints.length} encruzilhadas mapeadas</span>
            <span aria-hidden="true" className="text-slate-600">/</span>
            <span>{pbatLogs.length} avaliações diárias</span>
          </div>
        </div>
      </div>

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {currentTab === 'navegador' && (
          <EmotionNavigator onSendToChoicePoint={handleSendToChoicePoint} />
        )}

        {currentTab === 'ponto_escolha' && (
          <ChoicePointInteractive
            records={choicePoints}
            onAddRecord={handleAddChoicePoint}
            onDeleteRecord={handleDeleteChoicePoint}
            onToggleShare={handleToggleShareChoicePoint}
            prefillData={prefillChoicePoint}
            onClearPrefill={() => setPrefillChoicePoint(null)}
          />
        )}

        {currentTab === 'pbat' && (
          <PbatDailyTracker
            logs={pbatLogs}
            onAddLog={handleAddPbatLog}
            onDeleteLog={handleDeletePbatLog}
            onOpenReportModal={() => setIsReportModalOpen(true)}
          />
        )}

        {currentTab === 'ferramentas' && (
          <QuickToolsSos />
        )}

        {currentTab === 'biblioteca' && (
          <PsychoeducationLibrary />
        )}
      </main>

      {/* Clinical & Institutional Footer */}
      <footer className="mt-auto border-t border-[#82e5ff]/15 bg-[#0f142a]/95 backdrop-blur-md py-6 text-xs text-[#e1eefc]/75">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <PsicothicaLogo size="sm" showWordmark={false} />
              <div>
                <div className="font-display font-bold text-white uppercase text-xs tracking-wider">
                  AyA Clínica Integrada · Programa Ramificar
                </div>
                <div className="text-[11px] text-[#ec9eff] font-medium mt-0.5">
                  Desenvolvido por Alanne Raquel Fragoso de Farias, psicóloga (CRP 13/9646)
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => setIsAboutModalOpen(true)}
                className="px-3 py-1.5 rounded-lg bg-[#130169]/50 hover:bg-[#130169] text-[#82e5ff] hover:text-white border border-[#82e5ff]/30 text-[11px] font-tech font-bold transition-all flex items-center gap-1.5"
              >
                <span>Sobre este material (Avisos Legais & Autoria)</span>
              </button>

              <a
                href="tel:188"
                className="px-3 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300 hover:text-red-100 border border-red-500/30 text-[11px] font-tech font-bold transition-all flex items-center gap-1"
                title="Centro de Valorização da Vida - Ligação Gratuita 24h"
              >
                <span>SOS CVV 188 · SAMU 192</span>
              </a>
            </div>
          </div>

          <div className="pt-3 border-t border-[#82e5ff]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-[#e1eefc]/60">
            <p>
              Material informativo e de apoio. Seus dados ficam salvos exclusivamente neste navegador/aparelho.
            </p>
            <div className="flex items-center gap-2 font-tech text-[#82e5ff]/70">
              <span>Versão 1.0</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Revisado em Outubro/2026</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Therapist Report Modal */}
      <TherapistReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        pbatLogs={pbatLogs}
        choicePoints={choicePoints}
        clientName="Cliente em Acompanhamento"
      />

      {/* Sobre este material Modal */}
      <AboutMaterialModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />
    </div>
  );
}

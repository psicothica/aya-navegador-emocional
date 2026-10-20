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
import { PsiHeader } from './psi-kit/PsiHeader';
import { PsiFooter } from './psi-kit/PsiFooter';
import {
  store, PBAT_KEY, CHOICE_KEY, lerLogsPbat, lerPontosDeEscolha, exportarBackup, importarBackup,
} from './storage';
import { Sparkles, Terminal, Flame, Zap, ShieldAlert, Heart } from 'lucide-react';

const KIT_ASSETS = `${import.meta.env.BASE_URL}psi-kit/`;

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('navegador');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  // Registros do paciente (só dele, nunca dados inventados). Leitura e gravação via psi-storage.
  const [pbatLogs, setPbatLogs] = useState<PBATLogEntry[]>(lerLogsPbat);
  const [choicePoints, setChoicePoints] = useState<ChoicePointRecord[]>(lerPontosDeEscolha);

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
    store.set(PBAT_KEY, pbatLogs);
  }, [pbatLogs]);

  useEffect(() => {
    store.set(CHOICE_KEY, choicePoints);
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

  const handleExportBackup = () => exportarBackup();

  const handleImportBackup = async (file: File): Promise<string> => {
    const { novos, jaExistiam } = await importarBackup(file);
    setPbatLogs(lerLogsPbat());
    setChoicePoints(lerPontosDeEscolha());
    const extra = jaExistiam ? ` (${jaExistiam} já estavam aqui e foram mantidos.)` : '';
    return `Backup importado: ${novos} registro(s) novo(s).${extra}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0f142a] text-[#e1eefc] bg-grid-cyber selection:bg-[#ce57df]/40 selection:text-[#82e5ff]">
      {/* Cabeçalho Psicothica (kit): completo fora do iframe, compacto dentro */}
      <PsiHeader appName="Navegador Emocional" assetsBase={KIT_ASSETS} />

      {/* Navegação do app */}
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
            onExportBackup={handleExportBackup}
            onImportBackup={handleImportBackup}
          />
        )}

        {currentTab === 'ferramentas' && (
          <QuickToolsSos />
        )}

        {currentTab === 'biblioteca' && (
          <PsychoeducationLibrary />
        )}
      </main>

      {/* Rodapé Psicothica (kit) */}
      <PsiFooter appName="Navegador Emocional" version="1.0.0" revisedAt="out/2026" />

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

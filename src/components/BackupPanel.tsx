import React, { useRef, useState } from 'react';
import { Download, Upload } from 'lucide-react';

interface BackupPanelProps {
  onExport: () => string;
  /** Importa o arquivo e devolve a mensagem de sucesso; lança Error com a mensagem de recusa. */
  onImport: (file: File) => Promise<string>;
}

/**
 * Backup do diário em arquivo JSON. Tudo é feito com botões type="button" (nada de <form>) e sem
 * navegação, para funcionar dentro do iframe do AyAClin.
 */
export const BackupPanel: React.FC<BackupPanelProps> = ({ onExport, onImport }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<{ text: string; error: boolean } | null>(null);

  const handleExport = () => {
    const nome = onExport();
    setMessage({ text: `Arquivo gerado: ${nome}. Guarde-o com cuidado: ele leva o que você escreveu.`, error: false });
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    try {
      setMessage({ text: await onImport(file), error: false });
    } catch (err) {
      setMessage({ text: err instanceof Error ? err.message : 'Não foi possível importar o arquivo.', error: true });
    }
  };

  return (
    <section
      aria-labelledby="backup-title"
      className="glass-panel rounded-2xl p-4 sm:p-5 border border-[#82e5ff]/20 space-y-3"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 id="backup-title" className="font-display text-base font-bold text-white uppercase">
            Backup do diário
          </h3>
          <p className="text-xs text-[#b4c0d9] max-w-xl">
            Seus registros ficam só neste aparelho. Exporte um arquivo para guardar uma cópia ou levar para outro
            aparelho; importar acrescenta os registros do arquivo aos que já estão aqui.
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={handleExport}
            className="px-3.5 py-2 text-xs font-tech font-bold text-[#82e5ff] bg-[#130169]/60 hover:bg-[#130169] border border-[#02bbff]/40 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap"
          >
            <Download className="w-4 h-4 text-[#02bbff]" aria-hidden="true" />
            <span>Exportar backup (.json)</span>
          </button>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="px-3.5 py-2 text-xs font-tech font-bold text-[#82e5ff] bg-[#130169]/60 hover:bg-[#130169] border border-[#02bbff]/40 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap"
          >
            <Upload className="w-4 h-4 text-[#02bbff]" aria-hidden="true" />
            <span>Importar backup</span>
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={handleFile}
            aria-label="Escolher arquivo de backup"
          />
        </div>
      </div>
      {message && (
        <p
          role="status"
          className={`text-xs font-tech rounded-lg px-3 py-2 border ${
            message.error
              ? 'text-[#ffd6d6] bg-[#4a0e17]/60 border-[#ff7a7a]/40'
              : 'text-[#82e5ff] bg-[#130169]/40 border-[#02bbff]/30'
          }`}
        >
          {message.text}
        </p>
      )}
    </section>
  );
};

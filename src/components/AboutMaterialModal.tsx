import React from 'react';
import { X, Shield, PhoneCall, AlertTriangle, Cpu, HardDrive, BookOpen, ExternalLink, HeartHandshake } from 'lucide-react';
import { PsicothicaLogo } from './PsicothicaLogo';

interface AboutMaterialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutMaterialModal: React.FC<AboutMaterialModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-modal-title"
      className="fixed inset-0 z-50 bg-[#0f142a]/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
    >
      <div className="w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[#0f142a] border border-[#ce57df]/50 shadow-[0_25px_70px_rgba(0,0,0,0.85)] p-5 sm:p-7 space-y-6 relative text-white">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar modal"
          className="absolute top-4 right-4 text-[#82e5ff] hover:text-white p-2 rounded-xl hover:bg-[#130169]/60 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-4 border-b border-[#82e5ff]/20">
          <PsicothicaLogo size="md" showWordmark={false} />
          <div>
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-tech text-[#ce57df] mb-1">
              <span className="uppercase font-bold tracking-wider">AyA Clínica Integrada · Programa Ramificar</span>
              <span aria-hidden="true" className="text-slate-600">/</span>
              <span className="text-[#82e5ff]">Versão 1.0</span>
            </div>
            <h2 id="about-modal-title" className="font-display text-xl sm:text-2xl font-extrabold text-white uppercase tracking-tight">
              Sobre este material
            </h2>
          </div>
        </div>

        {/* Authorship & Institution Card */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-[#130169]/80 via-[#220d52]/60 to-[#130169]/80 border border-[#ce57df]/40 space-y-2">
          <div className="flex items-center gap-2 text-xs font-tech font-bold text-[#ec9eff]">
            <HeartHandshake className="w-4 h-4 text-[#ce57df]" />
            <span>DESENVOLVIMENTO & RESPONSABILIDADE TÉCNICA</span>
          </div>
          <p className="text-sm text-slate-100 font-medium leading-relaxed">
            Desenvolvido por <strong className="text-white font-bold">Alanne Raquel Fragoso de Farias</strong>, psicóloga (<span className="text-[#82e5ff] font-tech font-bold">CRP 13/9646</span>), para a <strong className="text-white font-bold">AyA Clínica Integrada · Programa Ramificar</strong>.
          </p>
        </div>

        {/* Clarifying Disclaimer */}
        <div className="p-4 rounded-xl bg-[#090d20] border border-[#82e5ff]/25 space-y-2">
          <div className="flex items-center gap-2 text-xs font-tech font-bold text-[#82e5ff]">
            <Shield className="w-4 h-4 text-[#02bbff]" />
            <span>FINALIDADE INFORMATIVA E DE APOIO</span>
          </div>
          <p className="text-sm text-[#e1eefc]/90 leading-relaxed">
            Este é um material informativo e de apoio. Ele não substitui avaliação, diagnóstico ou acompanhamento profissional, e não oferece promessa de cura ou de resultado.
          </p>
        </div>

        {/* AI Transparency */}
        <div className="p-4 rounded-xl bg-[#090d20] border border-[#ce57df]/25 space-y-2">
          <div className="flex items-center gap-2 text-xs font-tech font-bold text-[#ce57df]">
            <Cpu className="w-4 h-4 text-[#ce57df]" />
            <span>ELABORAÇÃO & TECNOLOGIA</span>
          </div>
          <p className="text-sm text-[#e1eefc]/90 leading-relaxed">
            O conteúdo e a interface foram elaborados com o auxílio de ferramentas de inteligência artificial e revisados pela profissional responsável.
          </p>
        </div>

        {/* Data Privacy & Local Storage */}
        <div className="p-4 rounded-xl bg-[#090d20] border border-[#82e5ff]/25 space-y-2">
          <div className="flex items-center gap-2 text-xs font-tech font-bold text-[#02bbff]">
            <HardDrive className="w-4 h-4 text-[#02bbff]" />
            <span>PRIVACIDADE E ARMAZENAMENTO LOCAL</span>
          </div>
          <p className="text-sm text-[#e1eefc]/90 leading-relaxed">
            Seus dados ficam só neste aparelho. Nada do que você escreve aqui é enviado para a AyA nem para terceiros. Se você baixar um arquivo, ele levará o que você escreveu: guarde-o com cuidado.
          </p>
        </div>

        {/* Emergency / Crisis Notice */}
        <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-[#450a0a]/80 via-[#260303]/90 to-[#450a0a]/80 border-2 border-red-500/60 space-y-3 shadow-[0_0_25px_rgba(239,68,68,0.2)]">
          <div className="flex items-center gap-2 text-xs font-tech font-bold text-red-300">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
            <span>EM SITUAÇÃO DE CRISE OU SOFRIMENTO INTENSO</span>
          </div>
          <p className="text-sm text-red-100 leading-relaxed font-medium">
            Se você estiver em sofrimento intenso ou em risco, procure ajuda agora:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            <a
              href="tel:188"
              className="flex items-center justify-between p-3 rounded-lg bg-black/40 hover:bg-black/60 border border-red-400/40 text-white font-tech transition-all"
            >
              <div className="flex items-center gap-2.5">
                <PhoneCall className="w-4 h-4 text-red-400" />
                <div>
                  <div className="font-bold text-sm text-white">CVV — 188</div>
                  <div className="text-[11px] text-red-200">Ligação gratuita, 24 horas</div>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-red-300" />
            </a>

            <a
              href="tel:192"
              className="flex items-center justify-between p-3 rounded-lg bg-black/40 hover:bg-black/60 border border-red-400/40 text-white font-tech transition-all"
            >
              <div className="flex items-center gap-2.5">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <div>
                  <div className="font-bold text-sm text-white">SAMU — 192</div>
                  <div className="text-[11px] text-red-200">Emergência médica 24h</div>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-red-300" />
            </a>
          </div>
          <div className="text-[11px] text-red-200/90 pt-1">
            Ou dirija-se à emergência (UPA / Pronto-Socorro / Hospital) mais próxima de sua localidade.
          </div>
        </div>

        {/* Version & Medical Disclaimer */}
        <div className="space-y-3 p-4 rounded-xl bg-[#130169]/30 border border-[#82e5ff]/20">
          <div className="flex items-center justify-between text-xs font-tech text-[#82e5ff]">
            <span className="font-bold">Versão 1.0 · revisado em Outubro/2026</span>
          </div>
          <p className="text-xs text-[#e1eefc]/80 leading-relaxed">
            As informações sobre diagnóstico e tratamento médico têm caráter apenas informativo e se baseiam em literatura científica publicada [referências ao final]. Decisões sobre medicação ou tratamento devem ser tomadas com seu(sua) médico(a).
          </p>
        </div>

        {/* References */}
        <div className="pt-2 border-t border-[#82e5ff]/20 space-y-2">
          <div className="flex items-center gap-2 text-xs font-tech font-bold text-[#82e5ff]">
            <BookOpen className="w-3.5 h-3.5 text-[#02bbff]" />
            <span>REFERÊNCIAS CIENTÍFICAS E BASES TEÓRICAS</span>
          </div>
          <ul className="text-[11px] text-[#e1eefc]/70 space-y-1.5 list-disc pl-4 font-mono leading-relaxed">
            <li>
              Hayes, S. C., Strosahl, K. D., & Wilson, K. G. (2012). <em>Acceptance and Commitment Therapy: The Process and Practice of Mindful Change</em> (2nd ed.). Guilford Press.
            </li>
            <li>
              Hofmann, S. G., & Hayes, S. C. (2019). <em>Process-Based CBT: The Science and Core Clinical Competencies of Cognitive Behavioral Therapy</em>. Context Press / New Harbinger.
            </li>
            <li>
              Harris, R. (2019). <em>ACT Made Simple: An Easy-to-Read Primer on Acceptance and Commitment Therapy</em> (2nd ed.). New Harbinger Publications.
            </li>
            <li>
              Linehan, M. M. (2015). <em>DBT Skills Training Manual</em> (2nd ed.). Guilford Press.
            </li>
            <li>
              Ciarrochi, J., Bilich, L., & Godsell, C. (2010). Psychological flexibility as a mechanism of change in Acceptance and Commitment Therapy. In <em>Assessing Mindfulness and Acceptance Processes in Clients</em>.
            </li>
          </ul>
        </div>

        {/* Footer actions */}
        <div className="pt-3 border-t border-[#82e5ff]/20 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold font-tech text-white bg-gradient-to-r from-[#b104dc] to-[#130169] rounded-xl hover:from-[#ce57df] hover:to-[#422774] border border-[#ce57df]/50 transition-all shadow-[0_0_15px_rgba(206,87,223,0.3)]"
          >
            Entendido e Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

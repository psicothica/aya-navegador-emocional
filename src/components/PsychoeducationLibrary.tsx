import React, { useState } from 'react';
import { BookOpen, Clock, Search, Sparkles, CheckCircle2 } from 'lucide-react';
import { PSYCHOEDUCATION_ARTICLES } from '../data/psychoeducation';

export const PsychoeducationLibrary: React.FC = () => {
  const [selectedArticleId, setSelectedArticleId] = useState<string>(PSYCHOEDUCATION_ARTICLES[0].id);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'Todos os Temas' },
    { id: 'Fundamentos Integrados', label: 'Fundamentos Integrados' },
    { id: 'Processos Centrais', label: 'Processos Centrais' },
    { id: 'Ativação & Hábitos', label: 'Ativação & Hábitos' },
    { id: 'Ponto de Escolha', label: 'Ponto de Escolha' }
  ];

  const filteredArticles = PSYCHOEDUCATION_ARTICLES.filter((art) => {
    const matchesCategory = selectedCategory === 'all' || art.category === selectedCategory;
    const matchesSearch = 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.abstract.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const activeArticle = PSYCHOEDUCATION_ARTICLES.find((a) => a.id === selectedArticleId) || PSYCHOEDUCATION_ARTICLES[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-tech text-[#02bbff] mb-1">
            <span>PSICOEDUCAÇÃO CRUA // SEM PROTOCOLO PASTEURIZADO</span>
            <span aria-hidden="true" className="text-slate-600">/</span>
            <span>CIÊNCIA BASEADA EM EVIDÊNCIAS</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
            Biblioteca de <span className="text-[#ce57df] glow-magenta">Fundamentos</span>
          </h2>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-[#02bbff] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar conceito ou sintoma..."
            className="w-full text-xs pl-9 pr-3 py-2 bg-[#0f142a] text-white border border-[#82e5ff]/25 rounded-xl focus:outline-none focus:border-[#02bbff]"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 text-xs font-tech font-bold rounded-xl transition-all whitespace-nowrap border ${
              selectedCategory === cat.id
                ? 'bg-gradient-to-r from-[#b104dc] to-[#130169] text-white border-[#ce57df] shadow-[0_0_12px_rgba(206,87,223,0.35)]'
                : 'glass-panel text-[#b4c0d9] hover:text-white border-[#82e5ff]/15 hover:border-[#82e5ff]/35'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Two Column Layout: Article List & Active Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Article Index */}
        <div className="lg:col-span-5 space-y-2.5">
          {filteredArticles.map((article) => {
            const isSelected = article.id === activeArticle.id;
            return (
              <button
                key={article.id}
                type="button"
                onClick={() => setSelectedArticleId(article.id)}
                className={`w-full text-left p-4 rounded-2xl border transition-all ${
                  isSelected
                    ? 'bg-[#130169]/50 border-[#02bbff] shadow-[0_0_15px_rgba(2,187,255,0.3)] ring-1 ring-[#02bbff]'
                    : 'glass-panel border-[#82e5ff]/15 hover:border-[#82e5ff]/35'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-tech text-[#ec9eff] mb-1">
                  <span>{article.category}</span>
                  <span className="flex items-center gap-1 text-[#82e5ff]">
                    <Clock className="w-3 h-3" />
                    <span>{article.readTime}</span>
                  </span>
                </div>
                <h4 className="font-display text-sm font-bold text-white line-clamp-2">
                  {article.title}
                </h4>
                <p className="text-[11px] text-[#b4c0d9] line-clamp-2 mt-1">
                  {article.abstract}
                </p>
              </button>
            );
          })}
        </div>

        {/* Right: Active Article Reading View in Cyber Glass */}
        <div className="lg:col-span-7 glass-panel rounded-2xl p-6 sm:p-7 border border-[#82e5ff]/20 shadow-[0_12px_40px_rgba(0,0,0,0.4)] space-y-6">
          <div className="pb-4 border-b border-[#82e5ff]/15">
            <div className="flex items-center gap-2 text-xs font-tech text-[#02bbff] mb-1">
              <span>{activeArticle.category}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>LEITURA DE {activeArticle.readTime.toUpperCase()}</span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {activeArticle.title}
            </h3>
            <p className="text-xs text-[#b4c0d9] mt-2 leading-relaxed">
              {activeArticle.abstract}
            </p>
          </div>

          {/* Key Points Box */}
          <div className="p-4 bg-[#130169]/40 rounded-xl border border-[#ce57df]/30 space-y-2">
            <span className="font-tech text-xs font-bold text-[#ce57df] uppercase flex items-center gap-1.5 glow-magenta">
              <Sparkles className="w-4 h-4 text-[#ec9eff]" />
              Pontos de Choque para Fixar no Córtex:
            </span>
            <ul className="space-y-1.5 text-xs text-[#e1eefc]">
              {activeArticle.keyPoints.map((pt, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#02bbff] shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Article Sections */}
          <div className="space-y-5">
            {activeArticle.sections.map((sec, i) => (
              <div key={i} className="space-y-2 text-xs">
                <h4 className="font-display text-sm font-bold text-white uppercase tracking-wide">
                  {sec.heading}
                </h4>
                <p className="text-[#e1eefc] leading-relaxed text-justify">
                  {sec.text}
                </p>
                {sec.clinicalTakeaway && (
                  <div className="p-3 bg-[#04223d]/70 rounded-xl border border-[#02bbff]/30 text-[#82e5ff] font-signature text-base">
                    &ldquo;{sec.clinicalTakeaway}&rdquo; — Psicothica
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

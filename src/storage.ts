import { create } from './psi-kit/psi-storage';
import { PBATLogEntry, ChoicePointRecord } from './types/therapy';
import { INITIAL_PBAT_LOGS, INITIAL_CHOICE_POINTS } from './data/initialData';

/**
 * Armazenamento do Navegador Emocional, via psi-storage (psicothica-kit).
 * Todas as chaves ficam sob o prefixo `psi.navegador-emocional.v1.` (o localStorage é compartilhado
 * com os outros apps de psicothica.github.io; cada app só toca nas próprias chaves).
 */
export const APP_SLUG = 'navegador-emocional';
export const PBAT_KEY = 'pbat-logs';
export const CHOICE_KEY = 'choice-points';

export const store = create({ slug: APP_SLUG, appName: 'Navegador Emocional', version: '1.0.0' });

/* ---------- migração única das chaves antigas DESTE app ---------- */

const CHAVES_ANTIGAS = [
  { de: 'psicothica_pbat_logs_v1', para: PBAT_KEY },
  { de: 'psicothica_choice_points_v1', para: CHOICE_KEY },
];
// Upload de logomarca (recurso removido nesta versão): guardava uma imagem em data URL só deste app.
const LOGO_PERSONALIZADA_ANTIGA = 'psicothica_custom_logo';

/**
 * Copia as chaves antigas deste app para o prefixo novo, CONFERE a cópia e só então remove as antigas
 * (via store.migrate, que também marca a migração como feita para não repetir). Se a conferência
 * falhar, não marca e não apaga nada: tenta de novo na próxima abertura. Nenhuma chave de outro app
 * é lida, movida ou apagada.
 */
export function migrarChavesAntigas(): void {
  if (!store.persistent) return;
  try {
    const conferidas: { from: string; to: string }[] = [];
    let falhou = false;
    for (const k of CHAVES_ANTIGAS) {
      const bruto = localStorage.getItem(k.de);
      if (bruto === null) continue;
      const destino = store.prefix + k.para;
      if (localStorage.getItem(destino) === null) localStorage.setItem(destino, bruto);
      if (localStorage.getItem(destino) === bruto) conferidas.push({ from: k.de, to: k.para });
      else falhou = true;
    }
    if (falhou) return;
    store.migrate(conferidas);
    localStorage.removeItem(LOGO_PERSONALIZADA_ANTIGA);
  } catch {
    // storage indisponível no meio do caminho: o aviso do helper já cobre
  }
}
migrarChavesAntigas();

/* ---------- leitura (mesmos filtros de antes: nada de dados de exemplo antigos) ---------- */

export function lerLogsPbat(): PBATLogEntry[] {
  const salvo = store.get<PBATLogEntry[] | null>(PBAT_KEY, null);
  if (Array.isArray(salvo)) return salvo.filter((item) => !String(item.id).startsWith('pbat-00'));
  return INITIAL_PBAT_LOGS;
}

export function lerPontosDeEscolha(): ChoicePointRecord[] {
  const salvo = store.get<ChoicePointRecord[] | null>(CHOICE_KEY, null);
  if (Array.isArray(salvo)) return salvo.filter((item) => !String(item.id).startsWith('cp-00'));
  return INITIAL_CHOICE_POINTS;
}

/* ---------- backup: exportar / importar ---------- */

export function exportarBackup(): string {
  return store.download();
}

const ehObjetoComId = (x: unknown): x is { id: string } =>
  !!x && typeof x === 'object' && typeof (x as { id?: unknown }).id === 'string' && (x as { id: string }).id.length > 0;

export type ResultadoImportacao = { novos: number; jaExistiam: number };

/**
 * Importa um arquivo exportado por ESTE app. Arquivo de outro app (ou de formato desconhecido) é recusado
 * com mensagem clara, sem gravar nada. Os registros do arquivo são ACRESCENTADOS aos existentes (por id):
 * importar nunca apaga o que já está no aparelho.
 */
export async function importarBackup(arquivo: File): Promise<ResultadoImportacao> {
  const texto = await arquivo.text();
  let pacote: unknown;
  try {
    pacote = JSON.parse(texto);
  } catch {
    throw new Error('Não foi possível ler o arquivo. Verifique se ele está íntegro.');
  }
  const p = pacote as { kit?: string; app?: string; data?: Record<string, unknown> } | null;
  if (!p || p.kit !== 'psicothica-kit' || p.app !== APP_SLUG || !p.data || typeof p.data !== 'object') {
    // O helper recusa com a mensagem certa (outro app, formato desconhecido). Nada é gravado.
    store.importJSON(pacote);
    throw new Error('Este arquivo não é um backup do Navegador Emocional. Nada foi importado.');
  }
  const pbat = p.data[PBAT_KEY];
  const choice = p.data[CHOICE_KEY];
  if (pbat === undefined && choice === undefined) {
    throw new Error('Este arquivo não tem registros do Navegador Emocional. Nada foi importado.');
  }
  for (const lista of [pbat, choice]) {
    if (lista !== undefined && (!Array.isArray(lista) || !lista.every(ehObjetoComId))) {
      throw new Error('O arquivo tem registros inválidos. Nada foi importado.');
    }
  }

  let novos = 0;
  let jaExistiam = 0;
  const juntar = <T extends { id: string }>(atuais: T[], recebidos: unknown): T[] => {
    if (!Array.isArray(recebidos)) return atuais;
    const ids = new Set(atuais.map((x) => x.id));
    const acrescentar = (recebidos as T[]).filter((x) => {
      if (ids.has(x.id)) {
        jaExistiam++;
        return false;
      }
      novos++;
      return true;
    });
    return [...atuais, ...acrescentar];
  };
  if (pbat !== undefined) {
    const todos = juntar(lerLogsPbat(), pbat);
    todos.sort((a, b) => `${a.date} ${a.time ?? ''}`.localeCompare(`${b.date} ${b.time ?? ''}`));
    store.set(PBAT_KEY, todos);
  }
  if (choice !== undefined) {
    const todos = juntar(lerPontosDeEscolha(), choice);
    todos.sort((a, b) => (b.timestamp ?? 0) - (a.timestamp ?? 0));
    store.set(CHOICE_KEY, todos);
  }
  return { novos, jaExistiam };
}

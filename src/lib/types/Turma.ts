import type { Aluno } from './Aluno';

export interface Turma {
  id: number;
  identificador: string;
  sala: string;
  disciplinas: Record<string, string>;
  alunos: Aluno[];
  temoporadaLetiva: string;
}

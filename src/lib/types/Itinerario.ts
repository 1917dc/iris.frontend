import type { Aluno } from './Aluno';
import type { Disciplina } from './Disciplina';
import type { Horario } from './Horario';

export interface Itinerario {
  id: number;
  nome: string;
  tipo: string;
  qtdVagas: number;
  disciplinas: Disciplina[];
  horarios: Horario[];
  alunos: Aluno[];
}

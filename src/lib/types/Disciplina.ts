import type { Professor } from './Professor';

export interface Disciplina {
  id: number;
  professor: Professor;
  nome: string;
}

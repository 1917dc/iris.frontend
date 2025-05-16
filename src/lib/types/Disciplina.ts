import type { Professor } from './Professor';

export interface Disciplina {
    id: number;
    identificador: string;
    sala: string;
    disciplina: string;
    professor: Professor;
}

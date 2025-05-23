import { z } from 'zod';

export const registerSchema = z.object({
  nome: z.string(),
  tipo: z.string(),
  qtdVagas: z.number(),
  horarios: z.array(z.object({
      diaDaSemana: z.string(),
      comeco: z.string(),
      fim: z.string()
  }))
});


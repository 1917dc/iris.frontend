<script lang="ts">
  import type { PageData } from "./$types";
  import { MessageSquareWarning } from 'lucide-svelte';

  export let data: PageData;
  const { disciplinas } = data;
</script>

<div class="mt-12 ml-10 mr-10">
  <div
    class="bg-secondary h-48 rounded-2xl pl-10 pr-10 flex items-center justify-between"
  >
    <div class="text-white">
      <div class="inline">
        <h1 class="text-4xl font-medium">
          Bem-vindo(a) de volta, <span class="font-black"
            >{data.user?.nome ?? "NOME"}</span
          >
        </h1>

        <h2 class="mt-3">
          Login feito como <span class="font-bold"
            >{data.user?.role ?? "ROLE"}</span
          >
        </h2>
      </div>
    </div>

    <img
      src="/ilustracoes/personagem/beto/png/1x/beto16.png"
      alt="beto"
      class="h-auto max-h-full select-none"
    />
  </div>
  <div>
    {#if disciplinas.length > 0}
      <ul>
        {#each disciplinas as disciplina (disciplina.id)}
          <li>
            <strong>{disciplina.disciplina}</strong> (Código: {disciplina.identificador})
            <br />
            {#if disciplina.professor.enabled}
              Professor: {disciplina.professor.nome}
            {:else}
              Professor: indefinido
            {/if}
            - Sala: {disciplina.sala}
            <br />
            Alunos: {disciplina.alunos.length > 0 ? disciplina.alunos.length : 'Nenhum aluno registrado'}
          </li>
        {/each}
      </ul>
    {:else}
      <div class="flex flex-col justify-center items-center h-64 bg-gray-100 rounded-lg shadow-md mt-8">
        <MessageSquareWarning class="text-gray-600 mb-6" size={50} />
        <p class="text-2xl text-center text-gray-600">Ainda não há disciplinas cadastradas</p>
      </div>
    {/if}
  </div>
</div>

<script lang="ts">
  import type { PageData } from "./$types";
  import { MessageSquareWarning } from 'lucide-svelte';

  export let data: PageData;
  const { disciplinas } = data;
</script>

<svelte:head>
  <title>Coordenador | Listagem de Disciplinas</title>
</svelte:head>

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

  {#if disciplinas.length > 0}
    <div class="grid gap-4 grid-cols-3 m-10 mx-0">
        {#each disciplinas as disciplina (disciplina.id)}
          <div class="bg-gray-200 shadow-no-blur-sm rounded-lg p-8 flex flex-col justify-between h-56" id="card">
            <h2 class="text-3xl font-semibold text-primary mb-2">{disciplina.nome}</h2>
            {#if disciplina.professor.enabled}
              <p class="text-xl font-medium">Professor(a): {disciplina.professor.nome}</p>
            {:else}
              <p class="text-xl font-medium">Professor(a): indefinido</p>
            {/if}
          </div>
        {/each}
    </div>
  {:else}
    <div class="flex flex-col justify-center items-center h-64 bg-gray-100 rounded-lg shadow-md mt-8">
      <MessageSquareWarning class="text-gray-600 mb-6" size={50} />
      <p class="text-2xl text-center text-gray-600">Ainda não há disciplinas cadastradas</p>
    </div>
  {/if}
</div>

<style>
  #card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  #card:hover {
    transform: translateY(-10px);
  }
</style>
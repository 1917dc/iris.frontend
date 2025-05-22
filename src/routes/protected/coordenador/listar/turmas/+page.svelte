<script lang="ts">
  import type { PageData } from "./$types";
  import { MessageSquareWarning, X } from "lucide-svelte";

  export let data: PageData;
  const { turmas } = data;

  let turmaSelecionada: any = null;
  let showModal = false;

  console.log(turmas);

  const abrirModal = (turma) => {
    turmaSelecionada = turma;
    showModal = true;
  };

  const fecharModal = () => {
    showModal = false;
    turmaSelecionada = null;
  };
</script>

<svelte:head>
  <title>Coordenador | Registro de Turmas</title>
</svelte:head>

<div class="mt-12 ml-10 mr-10">
  <div class="h-24 flex items-center justify-between">
    <div>
      <div class="inline">
        <h1 class="text-5xl font-semibold text-primary">Registro de Turmas</h1>

        <h2 class="mt-3">
          Inclui turmas com professores ou alunos desabilitados.
        </h2>
      </div>
    </div>
  </div>
  {#if turmas.length > 0}
    <div class="grid gap-4 grid-cols-3 m-10 mx-0">
      {#each turmas as turma}
        <div
          class="bg-gray-200 shadow-no-blur-sm rounded-lg p-8 flex flex-col justify-between h-56"
          id="card"
        >
          <h2 class="text-3xl font-semibold text-primary mb-2">
            Turma: {turma.identificador}
          </h2>
          <p class="text-xl font-medium">Sala: {turma.sala}</p>
          <p class="text-xl font-medium">
            Temporada Letiva: {turma.temoporadaLetiva}
          </p>

          <button
            class="mt-4 p-2 bg-primary text-white rounded-md hover:bg-primary-dark w-40 ml-auto"
            on:click={() => abrirModal(turma)}
          >
            Ver mais
          </button>
        </div>
      {/each}
    </div>
  {:else}
    <div
      class="flex flex-col justify-center items-center h-64 bg-gray-100 rounded-lg shadow-md mt-8"
    >
      <MessageSquareWarning class="text-gray-600 mb-6" size={50} />
      <p class="text-2xl text-center text-gray-600">
        Ainda não há turmas cadastradas
      </p>
    </div>
  {/if}

  {#if showModal}
    <div
      class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
    >
      <div class="bg-white rounded-lg p-8 w-4/5 md:w-1/2">
        <div class="flex justify-between">
          <h2 class="text-2xl font-semibold text-primary">
            Detalhes da Turma: {turmaSelecionada.identificador}
          </h2>
          <button
            class="text-xl font-bold text-gray-600"
            on:click={fecharModal}
          >
            <X />
          </button>
        </div>

        <div class="mt-4">
          <h3 class="text-xl font-semibold">Sala:</h3>
          <p>{turmaSelecionada.sala}</p>

          <h3 class="text-xl font-semibold mt-4">Temporada Letiva:</h3>
          <p>{turmaSelecionada.temoporadaLetiva}</p>

          <h3 class="text-xl font-semibold mt-4">Disciplinas:</h3>
          <ul>
            {#each Object.entries(turmaSelecionada.disciplinas) as [disciplinaNome, professor]}
              <li class="text-lg">
                <strong>{disciplinaNome}</strong> - Professor: {professor}
              </li>
            {/each}
          </ul>

          <h3 class="text-xl font-semibold mt-4">Alunos:</h3>
          {#if turmaSelecionada.alunos.length > 0}
            <ul>
              {#each turmaSelecionada.alunos as aluno (aluno.id)}
                <li>{aluno.nome}</li>
              {/each}
            </ul>
          {:else}
            <p>Nenhum aluno registrado.</p>
          {/if}
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  #card {
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
  }

  #card:hover {
    transform: translateY(-10px);
  }
</style>

<script lang="ts">
  import type { PageData } from "./$types";
  import { MessageSquareWarning, X, ListFilter } from "lucide-svelte";

  export let data: PageData;
  const { turmas } = data;

  let turmaSelecionada: any = null;
  let showModal = false;

  let searchQuery = "";
  let showFilters = false;
  let selectedSala = '';
  let selectedTemporada = '';

  const abrirModal = (turma) => {
    turmaSelecionada = turma;
    showModal = true;
  };

  const fecharModal = () => {
    showModal = false;
    turmaSelecionada = null;
  };

  $: filteredTurmas = turmas.filter((turma) => {
    const matchesSearch =
      turma.identificador.toLowerCase().includes(searchQuery.toLowerCase()) ||
      turma.sala.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSala = selectedSala ? turma.sala === selectedSala : true;
    const matchesTemporada = selectedTemporada ? turma.temoporadaLetiva === selectedTemporada : true;

    return matchesSearch && matchesSala && matchesTemporada;
  });
</script>

<svelte:head>
  <title>Coordenador | Turmas</title>
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
  <div class="h-22 flex items-center justify-between">
    <div class="inline">
      <div class="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mt-3 rounded-lg" role="alert">
        <p class="font-bold">Importante!</p>
        <p>Inclui turmas com professores ou alunos desabilitados.</p>
      </div>
    </div>
  </div>
  <div class="mt-8 flex items-center space-x-2">
    <input
      type="text"
      placeholder="Pesquisar por turma..."
      bind:value={searchQuery}
      class="w-[94%] bg-gray-200 shadow-no-blur-sm rounded-lg p-4 flex flex-col justify-between h-[4rem] focus:outline-none focus:ring-2 focus:ring-primary"
    />
    <button 
      class="bg-gray-200 shadow-no-blur-sm rounded-lg p-4 flex items-center justify-center h-[4rem] focus:ring-2 focus:ring-primary w-[6%]"
      on:click={() => showFilters = !showFilters}
    >
      <ListFilter class="text-gray-500" />
    </button>
  </div>

  {#if showFilters}
    <div class="mt-4 bg-gray-200 shadow-md rounded-lg p-4">
      <div class="mb-4">
        <label for="temporada" class="block text-gray-700 font-semibold">Temporada Letiva</label>
        <select
          id="temporada"
          bind:value={selectedTemporada}
          class="w-full mt-2 p-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-700"
        >
          <option value="">Todas</option>
          {#each Array.from(new Set(turmas.map(t => t.temoporadaLetiva))) as temporada}
            <option value={temporada}>{temporada}</option>
          {/each}
        </select>
      </div>
      <div class="mb-4">
        <label for="sala" class="block text-gray-700 font-semibold">Sala</label>
        <select
          id="sala"
          bind:value={selectedSala}
          class="w-full mt-2 p-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-700"
        >
          <option value="">Todas</option>
          {#each Array.from(new Set(turmas.map(t => t.sala))) as sala}
            <option value={sala}>{sala}</option>
          {/each}
        </select>
      </div>
    </div>
  {/if}
  {#if filteredTurmas.length > 0}
    <div class="grid gap-4 grid-cols-3 m-5 mx-0">
      {#each filteredTurmas as turma}
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
        <div class="flex justify-between items-center border-b pb-4 mb-4">
          <h2 class="text-2xl font-bold text-gray-800">
            Detalhes da Turma: {turmaSelecionada.identificador}
          </h2>
          <button
            class="text-gray-500 hover:text-red-500 transition"
            on:click={fecharModal}
          >
            <X class="w-6 h-6"/>
          </button>
        </div>

        <div class="mt-4">
          <h3 class="text-xl font-semibold">Sala:</h3>
          <p>{turmaSelecionada.sala}</p>

          <h3 class="text-xl font-semibold mt-4">Temporada Letiva:</h3>
          <p>{turmaSelecionada.temoporadaLetiva}</p>

          <h3 class="text-xl font-semibold mt-4">Disciplinas:</h3>
          <ul class="list-disc list-inside">
            {#each Object.entries(turmaSelecionada.disciplinas) as [disciplinaNome, professor]}
              <li class="text-lg">
                <strong>{disciplinaNome}</strong> – Professor(a): {professor}
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
            <p class="italic text-gray-600">Nenhum aluno registrado.</p>
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

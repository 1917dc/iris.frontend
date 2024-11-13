<script lang="ts">
  import { jwtDecode } from "jwt-decode";
  import { Search, Plus } from "lucide-svelte";
  import type { Token } from "$lib/types/Token.ts";
  import { fade } from "svelte/transition";

  export let data;
  const user: Token = jwtDecode(data.token);

  const disciplines = [
    { name: "Português", professor: "Professor A", className: "Turma A" },
    { name: "Matemática", professor: "Professor B", className: "Turma B" },
    { name: "Química", professor: "Professor C", className: "Turma C" },
    { name: "História", professor: "Professor D", className: "Turma D" },
    { name: "Geografia", professor: "Professor E", className: "Turma E" },
    { name: "Inglês", professor: "Professor F", className: "Turma F" },
  ];
</script>

<svelte:head>
  <title>Disciplinas</title>
</svelte:head>

<div class="flex mt-12 ml-10 mr-10">
  <div
    class="bg-secondary h-48 w-8/12 rounded-2xl pl-10 pr-10 flex items-center justify-between"
  >
    <div class="text-white">
      <div class="inline">
        <h1 class="text-4xl font-medium">
          Bem-vindo(a) de volta, <span class="font-black">{user.nome}</span>
        </h1>
        <h2 class="mt-3">
          Login feito como <span class="font-bold">{user.role}</span>
        </h2>
      </div>
    </div>
    <img
      src="/pessoas.svg"
      alt="Pessoas trabalhando"
      class="h-auto max-h-full select-none"
    />
  </div>
  <div class="bg-secondary h-48 w-4/12 rounded-2xl p-14 ml-5 relative">
    <div>
      <h1 class="text-white text-4xl text-end font-bold">
        Adicionar uma <br />Disciplina<br />
      </h1>
      <button class="btn bg-white text-xl m-0 absolute bottom-5 left-5"
        ><Plus /></button
      >
    </div>
  </div>
</div>
<div class="ml-10 mr-10 mt-5 flex">
  <input
    class="input w-full bg-gray-200 shadow-no-blur-sm"
    placeholder="Pesquise turmas"
  />
  <button
    class="btn btn-primary bg-primary ml-2 shadow-no-blur-sm square-button"
    ><Search /></button
  >
</div>

<!-- Este é o começo dos cards das disciplinas -->
<div class="grid gap-4 grid-cols-4 m-10" in:fade={{ duration: 800 }}>
  {#each disciplines as { name, professor, className }, index}
    <div
      class="bg-gray-200 shadow-no-blur-sm rounded-lg p-4 flex flex-col justify-between h-50
          {index % 6 === 2 ? 'col-span-2 order-last' : ''}
          {index % 6 === 5 ? 'col-span-2 order-first' : ''}
          {index % 6 !== 2 && index % 6 !== 5 ? 'col-span-1' : ''}"
    >
      <h2 class="text-2xl font-semibold text-primary mb-2">{name}</h2>
      <p class="text-lg font-medium">Professor: {professor}</p>
      <p class="text-lg font-medium">Turma: {className}</p>
      <button
        class="mt-4 p-2 bg-primary text-white rounded-md hover:bg-primary-dark w-40 ml-auto"
      >
        ABRIR
      </button>
    </div>
  {/each}
</div>

<style>
  :global(.bg-primary) {
    background-color: #1e3a8a;
  }
  :global(.hover\:bg-primary-dark:hover) {
    background-color: #1c2f5d;
  }

  .grid {
    gap: 1rem;
  }
  :global(.order-first) {
    order: -1;
  }
  :global(.order-last) {
    order: 1;
  }
  .square-button {
    width: 3.125rem;
    height: 3.125rem;
    padding: 0;
  }
</style>

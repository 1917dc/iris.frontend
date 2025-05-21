<script lang="ts">
  import type { PageData } from "./$types";
  import { MessageSquareWarning } from "lucide-svelte";

  export let data: PageData;

  console.log(data);

  const { turmas } = data;
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

  {#if turmas.length > 0}
    <div class="grid gap-4 grid-cols-3 m-10 mx-0">
      {#each turmas as turma (turma.id)}
        <div
          class="bg-gray-200 shadow-no-blur-sm rounded-lg p-8 flex flex-col justify-between h-56"
          id="card"
        >
          <div>
            <h2 class="text-3xl font-semibold text-primary mb-2">
              {turma.disciplinas[data.user?.nome]}
            </h2>
            <h5 class="text-xl font-semibold text-primary mb-2">
              {turma.identificador}
            </h5>
          </div>
          <button class="btn btn-primary ml-52"> Abrir </button>
        </div>
      {/each}
    </div>
  {:else}
    <div
      class="flex flex-col justify-center items-center h-64 bg-gray-100 rounded-lg shadow-md mt-8"
    >
      <MessageSquareWarning class="text-gray-600 mb-6" size={50} />
      <p class="text-2xl text-center text-gray-600">
        Ainda não há disciplinas cadastradas
      </p>
    </div>
  {/if}
</div>

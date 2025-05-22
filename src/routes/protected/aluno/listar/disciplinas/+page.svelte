<script lang="ts">
    import type { PageData } from "./$types";
    import { X } from "lucide-svelte";
  
    export let data: PageData;
    const { studentData } = data;
</script>
  
<svelte:head>
    <title>Aluno | Listagem de Disciplinas</title>
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
            Você está na turma: <span class="font-bold"
              >{studentData.identificador ?? "TURMA"}</span
            >
          </h2>
          <h2>
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
  
    <div class="grid gap-4 grid-cols-3 m-10 mx-0">
      {#each Object.entries(studentData.disciplinas) as [disciplina, professor]}
        <div
          class="bg-gray-200 shadow-no-blur-sm rounded-lg p-8 flex flex-col justify-between h-52"
          id="card"
        >
          <h2 class="text-3xl font-semibold text-primary mb-8">
              {disciplina}
          </h2>
          <p class="text-xl font-medium">Professor(a): {professor}</p>
          <p class="text-xl font-medium">
              Temporada Letiva: {studentData.temporadaLetiva}
          </p>
        </div>
      {/each}
    </div>
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
  
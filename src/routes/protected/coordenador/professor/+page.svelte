<script lang="ts">
    import { Search, Plus } from "lucide-svelte";
    import {fade} from "svelte/transition";

    export let data;
    const user = data.user;

    const professores = [
        { name: "João Silva", disciplinas: ["Português", " Literatura"] },
        { name: "Maria Oliveira", disciplinas: ["Matemática", " Física"] },
        { name: "Pedro Souza", disciplinas: ["Química", " Biologia"] },
        { name: "Fernanda Costa", disciplinas: ["História", " Geografia"] },
        { name: "Ana Santos", disciplinas: "Educação Física" },
        { name: "Lucas Almeida", disciplinas: ["Inglês", " Filosofia"] },
    ];
</script>

<svelte:head>
    <title>Professor</title>
</svelte:head>

<div class="flex mt-12 ml-10 mr-10">
    <div class="bg-[#14315E] h-48 w-8/12 rounded-2xl pl-10 pr-10 flex items-center justify-between">
        <div class="text-white">
            <div class="inline">
                <h1 class="text-4xl font-medium">
                    Bem-vindo(a) de volta, <span class="font-black">{user.name}</span>
                </h1>
                <h2 class="mt-3">Login feito como <span class="font-bold">{user.typeUser}</span></h2>
            </div>
        </div>
        <img src="/pessoas.svg" alt="Pessoas trabalhando" class="h-auto max-h-full">
    </div>
    <div class="bg-[#14315E] h-48 w-4/12 rounded-2xl p-14 ml-5 relative">
        <div>
            <h1 class="text-white text-4xl text-end font-bold">
                Adicionar um <br />Docente<br />
            </h1>
            <a href="/protected/coordenador/register/professor">
                <button class="btn bg-white text-xl m-0 absolute bottom-5 left-5"><Plus /></button>
            </a>
        </div>
    </div>
</div>
<div class="ml-10 mr-10 mt-5 flex">
    <input
            class="input w-full bg-gray-200 shadow-no-blur-sm"
            placeholder="Pesquise docentes"
    />
    <button class="btn btn-primary bg-primary ml-2 shadow-no-blur-sm square-button"><Search /></button>
</div>

<!-- Este é o começo dos cards dos professores -->
<div class="grid gap-4 grid-cols-4 m-10" in:fade={{ duration: 800}}>
    {#each professores as { name, disciplinas }, index}
        <div
                class="bg-gray-200 shadow-no-blur-sm rounded-lg p-4 flex flex-col justify-between h-50
          {index % 6 === 2 ? 'col-span-2 order-last' : ''}
          {index % 6 === 5 ? 'col-span-2 order-first' : ''}
          {index % 6 !== 2 && index % 6 !== 5 ? 'col-span-1' : ''}"
        >
            <h2 class="text-2xl font-semibold text-primary mb-2">{name}</h2>
            <p class="text-lg font-medium">Disciplinas: {disciplinas}</p>
            <button class="mt-4 p-2 bg-primary text-white rounded-md hover:bg-primary-dark w-40 ml-auto">
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
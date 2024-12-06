<script lang="ts">
    import { jwtDecode } from "jwt-decode";
    import { Search, Plus } from "lucide-svelte";
    import type { Token } from "$lib/types/Token.ts";
    import { fade } from "svelte/transition";

    export let data;
    const user: Token = jwtDecode(data.token);

    const eletivas = [
        { name: "Eletiva 1" },
        { name: "Eletiva 2" },
        { name: "Eletiva 3" },
        { name: "Eletiva 4" },
        { name: "Eletiva 5" },
        { name: "Eletiva 6" },
        { name: "Eletiva 7" },
        { name: "Eletiva 8" },
        { name: "Eletiva 9" },
        { name: "Eletiva 10" },
        { name: "Eletiva 11" },
        { name: "Eletiva 12" }
    ];

</script>

<svelte:head>
    <title>Eletivas</title>
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
                Adicionar uma <br />Eletiva<br />
            </h1>
            <a href="/protected/coordenador/register/eletiva">
                <button class="btn bg-white text-xl m-0 absolute bottom-5 left-5"
                ><Plus /></button
                >
            </a>
        </div>
    </div>
</div>
<div class="ml-10 mr-10 mt-5 flex">
    <input
            class="input w-full bg-gray-200 shadow-no-blur-sm"
            placeholder="Pesquise eletivas"
    />
    <button
            class="btn btn-primary bg-primary ml-2 shadow-no-blur-sm square-button"
    ><Search /></button
    >
</div>

<!-- Este é o começo dos cards -->
<div class="flex flex-col gap-3 m-10" in:fade={{ duration: 800 }}>
    {#each eletivas as { name }}
        <div class="bg-gray-200 shadow-no-blur-sm rounded-lg p-4 flex justify-between items-center" id="card">
            <h2 class="text-2xl font-semibold text-primary">{name}</h2>
            <button class="btn btn-primary bg-primary text-white">Entrar</button>
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

    #card {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    #card:hover {
        transform: translateY(-10px);
    }

    .square-button {
        width: 3.125rem;
        height: 3.125rem;
        padding: 0;
    }
</style>

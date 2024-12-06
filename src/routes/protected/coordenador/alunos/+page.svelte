<script lang="ts">
    import { jwtDecode } from "jwt-decode";
    import { Search, Plus } from "lucide-svelte";
    import type { Token } from "$lib/types/Token.ts";
    import { fade } from "svelte/transition";

    export let data;
    const user: Token = jwtDecode(data.token);

    const estudantes = [
        { name: "João Silva", matricula: "2023001", className: "Turma A" },
        { name: "Maria Oliveira", matricula: "2023002", className: "Turma A" },
        { name: "Carlos Santos", matricula: "2023003", className: "Turma B" },
        { name: "Ana Costa", matricula: "2023004", className: "Turma B" },
        { name: "Lucas Almeida", matricula: "2023005", className: "Turma C" },
        { name: "Fernanda Souza", matricula: "2023006", className: "Turma C" },
        { name: "Gabriel Pereira", matricula: "2023007", className: "Turma D" },
        { name: "Juliana Rocha", matricula: "2023008", className: "Turma D" },
        { name: "Pedro Lima", matricula: "2023009", className: "Turma E" },
        { name: "Patrícia Mendes", matricula: "2023010", className: "Turma E" },
        { name: "Rafael Barbosa", matricula: "2023011", className: "Turma F" },
        { name: "Larissa Martins", matricula: "2023012", className: "Turma F" },
        { name: "Eduardo Silva", matricula: "2023013", className: "Turma A" },
        { name: "Beatriz Pereira", matricula: "2023014", className: "Turma A" },
        { name: "Ricardo Costa", matricula: "2023015", className: "Turma B" },
        { name: "Isabela Oliveira", matricula: "2023016", className: "Turma B" },
        { name: "Marcos Santos", matricula: "2023017", className: "Turma C" },
        { name: "Carla Martins", matricula: "2023018", className: "Turma C" },
        { name: "Felipe Almeida", matricula: "2023019", className: "Turma D" },
        { name: "Camila Rocha", matricula: "2023020", className: "Turma D" }
    ];

    const turmas = [
        "Turma A",
        "Turma B",
        "Turma C",
        "Turma D",
        "Turma E",
        "Turma F"
    ];

</script>

<svelte:head>
    <title>Estudantes</title>
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
                Adicionar um <br />Estudante<br />
            </h1>
            <a href="/protected/coordenador/register/aluno">
                <button class="btn bg-white text-xl m-0 absolute bottom-5 left-5"
                ><Plus /></button
                >
            </a>
        </div>
    </div>
</div>
<div class="ml-10 mr-10 mt-5 flex">
    <div class="relative w-1/4">
        <select
                class="select w-full bg-gray-200 shadow-no-blur-sm pl-8 text-lg text-primary"
                aria-label="Turma"
        >
            <option value="" disabled selected>Turma</option>
            {#each turmas as turma}
                <option value={turma}>{turma}</option>
            {/each}
        </select>
        <i class="fas fa-chevron-down absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500"></i>
    </div>

    <input
            class="ml-2 input w-3/4 bg-gray-200 shadow-no-blur-sm text-lg text-primary"
            placeholder="Pesquise estudantes"
    />
    <button
            class="btn btn-primary bg-primary ml-2 shadow-no-blur-sm square-button"
    ><Search /></button>
</div>

<!-- Este é o começo dos cards -->
<div class="flex flex-col gap-3 m-10" in:fade={{ duration: 800 }}>
    {#each estudantes as { name, matricula, className }}
        <div class="bg-gray-200 shadow-no-blur-sm rounded-lg p-4 flex justify-between items-center" id="card">
            <div>
                <h2 class="text-2xl font-semibold text-primary mb-2">{name}</h2>
                <p class="text-lg font-medium">Matrícula: {matricula}</p>
                <p class="text-lg font-medium">Turma: {className}</p>
            </div>
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

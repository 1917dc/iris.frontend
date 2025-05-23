<script lang="ts">
    import type { PageData } from "./$types";
    import { MessageSquareWarning, X } from "lucide-svelte";
  
    export let data: PageData;
    const { itinerarios } = data;

    let itinerarioSelecionado: any = null;
    let showModal = false;

    const abrirModal = (itinerario) => {
        itinerarioSelecionado = itinerario;
        showModal = true;
    };

    const fecharModal = () => {
        showModal = false;
        itinerarioSelecionado = null;
    };
</script>
  
<svelte:head>
    <title>Aluno | Listagem de Itinerários</title>
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

    {#if itinerarios.length > 0}
        <div class="grid gap-4 grid-cols-3 m-10 mx-0">
        {#each itinerarios as itinerario}
            <div
            class="bg-gray-200 shadow-no-blur-sm rounded-lg p-8 flex flex-col justify-between h-52"
            id="card"
            >
                <h2 class="text-3xl font-semibold text-primary mb-8">
                    {itinerario.nome}
                </h2>
                <p class="text-xl font-medium">Tipo: {itinerario.tipo}</p>

                <button
                    class="mt-4 p-2 bg-primary text-white rounded-md hover:bg-primary-dark w-40 ml-auto"
                    on:click={() => abrirModal(itinerario)}
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
            Você ainda não está matriculado(a) em um itinerário
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
                {itinerarioSelecionado.nome}
            </h2>
            <button
                class="text-xl font-bold text-gray-600"
                on:click={fecharModal}
            >
                <X />
            </button>
            </div>

            <div class="mt-4">
                <h3 class="text-xl font-semibold">Tipo:</h3>
                <p>{itinerarioSelecionado.tipo}</p>

                <h3 class="text-xl font-semibold mt-4">Disciplinas:</h3>
                <ul>
                    {#each Object.entries(itinerarioSelecionado.disciplinas) as [disciplinaNome, professor]}
                        <li class="text-lg">
                            <strong>{disciplinaNome}</strong> - Professor(a): {professor}
                        </li>
                    {/each}
                </ul>

                <ul>
                    {#each itinerarioSelecionado.horarios as horario}
                        {#each Object.entries(horario) as [chave, valor]}
                            {#if chave === "id"}
                                <li class="text-lg">
                                    <h3 class="text-xl font-semibold mt-4">Dias e Horários:</h3>
                                </li>
                            {:else if chave === "diaDaSemana"}
                                <li class="text-lg">
                                    Dia da semana: <strong>{valor}</strong>
                                </li>
                            {:else if chave === "comeco"}
                                <li class="text-lg">
                                    Horário de início: <strong>{valor}</strong>
                                </li>
                            {:else if chave === "fim"}
                                <li class="text-lg">
                                    Horário de término: <strong>{valor}</strong>
                                </li>
                            {/if}
                        {/each}
                    {/each}
                </ul>

                <h3 class="text-xl font-semibold mt-4">Alunos:</h3>
                {#if itinerarioSelecionado.alunos.length > 0}
                    <ul>
                    {#each itinerarioSelecionado.alunos as aluno}
                        <li>{aluno}</li>
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
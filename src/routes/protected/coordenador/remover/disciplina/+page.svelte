<script lang="ts">
    import type { Disciplina } from "$lib/types/Disciplina";
    import { MessageSquareWarning } from "lucide-svelte";
    import type { PageData } from "./$types";
  
    export let data: PageData;
    const { disciplinas } = data;
  
    let modal: HTMLDialogElement | null = null;
    let selectedDisciplina: Disciplina | null = null;
  
    const openModal = (disciplina: Disciplina) => {
        selectedDisciplina = disciplina;
      modal?.showModal();
    };
  
    const closeModal = () => {
      modal?.close();
      selectedDisciplina = null;
    };
  </script>
  
  <svelte:head>
    <title>Coordenador | Deleção de Disciplina</title>
  </svelte:head>
  
  <main>
    <div
    class="flex items-center justify-center mb-12"
    >
      <h1 class="mt-14 text-4xl font-semibold text-primary">
        Remoção de Disciplina
      </h1>
    </div>

    {#if disciplinas.length > 0}
        <div class="flex items-center justify-center">
        <ul class="w-1/2">
            {#each disciplinas as disciplina}
                <div class="bg-gray-200 mt-4 mb-4 pl-4 pr-4 rounded-md">
                <li class="flex justify-between pt-4 pb-4 select-none">
                    <div class="inline">
                    <p>
                        <span class="font-bold text-primary">Nome:</span>
                        {disciplina.nome}
                    </p>
                    <p>
                        <span class="font-bold text-primary">Professor: </span>{disciplina.professor.nome}
                    </p>
                    </div>
                    <button
                    class="btn btn-primary"
                    on:click={() => openModal(disciplina)}
                    >
                    Remover
                    </button>
                </li>
                </div>
            {/each}
        </ul>
        </div>
    {:else}
        <div class="flex flex-col justify-center items-center h-64 bg-gray-100 rounded-lg shadow-md mt-8 mx-10">
        <MessageSquareWarning class="text-gray-600 mb-6" size={50} />
        <p class="text-2xl text-center text-gray-600">Não há disciplinas a serem removidas</p>
        </div>
    {/if}
  
    <dialog bind:this={modal} class="modal">
      <div class="modal-box">
        <h3 class="text-lg font-bold">Aviso!</h3>
        <p class="py-4">
          Você tem certeza que deseja excluir a disciplina <br /><span
            class="font-bold">{selectedDisciplina?.nome}</span
          > do sistema?
        </p>
        <div class="modal-action">
          <form method="POST" action="?/delete">
            <input type="hidden" name="nome" value={selectedDisciplina?.nome} />
            <button type="submit" class="btn btn-success"> Confirmar </button>
            <button type="button" class="btn btn-error" on:click={closeModal}>
              Cancelar
            </button>
          </form>
        </div>
      </div>
    </dialog>
  </main>
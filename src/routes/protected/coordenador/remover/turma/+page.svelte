<script lang="ts">
    import type { Turma } from "$lib/types/Turma";
    import { MessageSquareWarning } from "lucide-svelte";
    import type { PageData } from "./$types";
  
    export let data: PageData;
    const { turmas } = data;
  
    let modal: HTMLDialogElement | null = null;
    let selectedTurma: Turma | null = null;
  
    const openModal = (turma: Turma) => {
      selectedTurma = turma;
      modal?.showModal();
    };
  
    const closeModal = () => {
      modal?.close();
      selectedTurma = null;
    };
  </script>
  
  <svelte:head>
    <title>Coordenador | Deleção de Turma</title>
  </svelte:head>
  
  <main>
    <div
    class="flex items-center justify-center mb-12"
    >
      <h1 class="mt-14 text-4xl font-semibold text-primary">
        Remoção de Turma
      </h1>
    </div>
  
    {#if turmas.length > 0}
      <div class="flex items-center justify-center">
        <ul class="w-1/2">
          {#each turmas as turma}
              <div class="bg-gray-200 mt-4 mb-4 pl-4 pr-4 rounded-md">
                <li class="flex justify-between pt-4 pb-4 select-none">
                  <div class="inline">
                    <p>
                      <span class="font-bold text-primary">Turma:</span>
                      {turma.identificador}
                    </p>
                    <p>
                      <span class="font-bold text-primary">Temporada Letiva: </span>{turma.temoporadaLetiva}
                    </p>
                  </div>
                  <button
                    class="btn btn-primary"
                    on:click={() => openModal(turma)}
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
        <p class="text-2xl text-center text-gray-600">Não há turmas a serem removidas</p>
        </div>
    {/if}
  
    <dialog bind:this={modal} class="modal">
      <div class="modal-box">
        <h3 class="text-lg font-bold">Aviso!</h3>
        <p class="py-4">
          Você tem certeza que deseja mesmo excluir a turma <br /><span
            class="font-bold">{selectedTurma?.identificador}</span
          > do sistema?
        </p>
        <div class="modal-action">
          <form method="POST" action="?/delete">
            <input type="hidden" name="identificador" value={selectedTurma?.identificador} />
            <button type="submit" class="btn btn-success"> Confirmar </button>
            <button type="button" class="btn btn-error" on:click={closeModal}>
              Cancelar
            </button>
          </form>
        </div>
      </div>
    </dialog>
  </main>
  
<script lang="ts">
    import type { Itinerario } from "$lib/types/Itinerario";
    import { MessageSquareWarning } from "lucide-svelte";
    import type { PageData } from "./$types";
  
    export let data: PageData;
    const { itinerarios } = data;
  
    let modal: HTMLDialogElement | null = null;
    let selectedItinerario: Itinerario | null = null;
  
    const openModal = (itinerario: Itinerario) => {
      selectedItinerario = itinerario;
      modal?.showModal();
    };
  
    const closeModal = () => {
      modal?.close();
      selectedItinerario = null;
    };
</script>
  
<svelte:head>
    <title>Coordenador | Deleção de Itinerário</title>
</svelte:head>
  
<main>
    <div
    class="flex items-center justify-center mb-12"
    >
      <h1 class="mt-14 text-4xl font-semibold text-primary">
        Remoção de Itinerário
      </h1>
    </div>
  
    {#if itinerarios.length > 0}
      <div class="flex items-center justify-center">
        <ul class="w-1/2">
          {#each itinerarios as itinerario}
              <div class="bg-gray-200 mt-4 mb-4 pl-4 pr-4 rounded-md">
                <li class="flex justify-between pt-4 pb-4 select-none">
                  <div class="inline">
                    <p>
                      <span class="font-bold text-primary">Nome:</span>
                      {itinerario.nome}
                    </p>
                    <p>
                      <span class="font-bold text-primary">Tipo: </span>{itinerario.tipo}
                    </p>
                  </div>
                  <button
                    class="btn btn-primary"
                    on:click={() => openModal(itinerario)}
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
        <p class="text-2xl text-center text-gray-600">Não há itinerários a serem removidas</p>
        </div>
    {/if}
  
    <dialog bind:this={modal} class="modal">
      <div class="modal-box">
        <h3 class="text-lg font-bold">Aviso!</h3>
        <p class="py-4">
          Você tem certeza que deseja mesmo excluir o itinerário <br /><span
            class="font-bold">{selectedItinerario?.nome}</span
          > do sistema?
        </p>
        <div class="modal-action">
          <form method="POST" action="?/delete">
            <input type="hidden" name="nome" value={selectedItinerario?.nome} />
            <button type="submit" class="btn btn-success"> Confirmar </button>
            <button type="button" class="btn btn-error" on:click={closeModal}>
              Cancelar
            </button>
          </form>
        </div>
      </div>
    </dialog>
</main>
  
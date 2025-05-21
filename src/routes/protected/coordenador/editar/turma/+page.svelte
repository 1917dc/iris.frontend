<script lang="ts">
    import type { Turma } from "$lib/types/Turma";
    import { MessageSquareWarning } from "lucide-svelte";
    import type { PageData } from "./$types";
    import { superForm } from "sveltekit-superforms";
  
    export let selectedTurma: Turma | null = null;
    export let data: PageData;
  
    const { turmas } = data;
  
    let modal: HTMLDialogElement | null = null;
    let localTurma: Turma | null = selectedTurma;
  
    const openModal = (turma: Turma) => {
      localTurma = turma;
      modal?.showModal();
    };
  
    const closeModal = () => {
      modal?.close();
    };
  
    let showPassword = false;
  
    function togglePasswordVisibility() {
      showPassword = !showPassword;
    }
  
    const { form, errors, enhance } = superForm({
      identificador: localTurma?.identificador ?? "",
      sala: localTurma?.sala ?? "",
      temporadaLetiva: localTurma?.temoporadaLetiva ?? "",
    });
  
    const confirmSubmit = () => {
      const formElement = document.getElementById("editForm") as HTMLFormElement;
      
      if (formElement) {
        formElement.submit();
      }
    };
  </script>
  
  <svelte:head>
    <title>Coordenador | Edição de Turma</title>
  </svelte:head>
  
  <main>
    <div
    class="flex items-center justify-center mb-12"
    >
      <h1 class="mt-14 text-4xl font-semibold text-primary">
        Edição de Turma
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
                    class="btn btn-primary" type="button"
                    on:click={() => openModal(turma)}
                    >
                    Editar
                    </button>
                </li>
                </div>
            {/each}
        </ul>
        </div>
    {:else}
        <div class="flex flex-col justify-center items-center h-64 bg-gray-100 rounded-lg shadow-md mt-8 mx-10">
        <MessageSquareWarning class="text-gray-600 mb-6" size={50} />
        <p class="text-2xl text-center text-gray-600">Não há turmas a serem editadas</p>
        </div>
    {/if}
  
    <dialog bind:this={modal} class="modal">
      <div class="modal-box">
        <h3 class="text-lg font-bold">Insira os dados abaixo</h3>
        <form
          id="editForm"
          method="POST"
          action="?/edit"
          class="form-control"
          use:enhance
        >
          <div class="mb-4">
            <label class="label-text" for="text">Identificador</label>
            <label class="input input-bordered flex items-center gap-2">
              <input
                name="identificador"
                type="text"
                class="grow"
                value={localTurma?.identificador}
                disabled
              />
            </label>
            <input type="hidden" name="identificador" value={localTurma?.identificador} />
          </div>
  
          <div class="mb-4">
            <label class="label-text" for="text">Sala</label>
            <label class="input input-bordered flex items-center gap-2">
              <input
                name="sala"
                type="text"
                class="grow"
                spellcheck="false"
                autocomplete="off"
                value={localTurma?.sala}
              />
            </label>
            {#if $errors.sala}
              <p class="text-error text-sm m-0 ml-1 mt-2">{$errors.sala}</p>
            {/if}
          </div>

          <div class="mb-4">
            <label class="label-text" for="text">Temporada Letiva</label>
            <label class="input input-bordered flex items-center gap-2">
              <input
                name="temporadaLetiva"
                type="text"
                class="grow"
                spellcheck="false"
                autocomplete="off"
                value={localTurma?.temoporadaLetiva}
              />
            </label>
            {#if $errors.temporadaLetiva}
              <p class="text-error text-sm m-0 ml-1 mt-2">{$errors.temporadaLetiva}</p>
            {/if}
          </div>
  
          <div class="modal-action">
            <button type="button" class="btn btn-success" on:click={confirmSubmit}>
              Confirmar
            </button>
            <button type="button" class="btn btn-error" on:click={closeModal}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </dialog>
  </main>
  
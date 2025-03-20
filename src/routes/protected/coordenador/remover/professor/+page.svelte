<script lang="ts">
  import { enhance } from "$app/forms";
  import type { Professor } from "$lib/types/Professor";
  import type { PageData } from "./$types";
  import { imask } from "@imask/svelte";
  import SuperDebug, { superForm } from "sveltekit-superforms";

  export let data: PageData;
  const { professores } = data;
  const { form, errors } = superForm(data.form);

  let modal: HTMLDialogElement | null = null;
  let selectedProfessor: Professor | null = null;

  const openModal = (professor: Professor) => {
    selectedProfessor = professor;
    modal?.showModal();
  };

  const closeModal = () => {
    modal?.close();
    selectedProfessor = null;
  };
</script>

<main>
  <div class="flex items-center justify-center">
    <ul class="w-1/2">
      {#each professores as professor}
        <div class="bg-gray-200 mt-4 mb-4 pl-4 pr-4 rounded-md">
          <li class="flex justify-between pt-4 pb-4 select-none">
            <div class="inline">
              <p>
                <span class="font-bold text-primary">Nome:</span>
                {professor.nome}
              </p>
              <p>
                <span class="font-bold text-primary">CPF: </span>{professor.cpf}
              </p>
            </div>
            <button
              class="btn btn-primary"
              on:click={() => openModal(professor)}
            >
              Remover
            </button>
          </li>
        </div>
      {/each}
    </ul>
  </div>

  <dialog bind:this={modal} class="modal">
    <div class="modal-box">
      <h3 class="text-lg font-bold">Aviso!</h3>
      <p class="py-4">
        Você tem certeza que deseja mesmo apagar o professor <strong
          >{selectedProfessor?.nome}</strong
        > do banco de dados?
      </p>
      <div class="modal-action">
        <form method="POST" action="?/delete">
          <input type="hidden" name="cpf" value={selectedProfessor?.cpf} />
          <button type="button" class="btn btn-success" on:click={closeModal}>
            Cancelar
          </button>
          <button type="submit" class="btn btn-error"> Confirmar </button>
        </form>
      </div>
    </div>
  </dialog>
</main>

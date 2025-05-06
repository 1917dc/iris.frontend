<script lang="ts">
  import type { Professor } from "$lib/types/Professor";
  import type { PageData } from "./$types";

  export let data: PageData;
  const { professores } = data;

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
              Editar
            </button>
          </li>
        </div>
      {/each}
    </ul>
  </div>

  <dialog bind:this={modal} class="modal">
    <div class="modal-box">
      <h3 class="text-lg font-bold">Insira os dados abaixo</h3>
      <p class="py-4">
        Você tem certeza que deseja mesmo apagar o professor <br /><span
          class="font-bold">{selectedProfessor?.nome}</span
        > do sistema?
      </p>
      <div class="modal-action">
        <form method="POST" action="?/delete">
          <input type="hidden" name="cpf" value={selectedProfessor?.cpf} />
          <button type="submit" class="btn btn-success"> Confirmar </button>
          <button type="button" class="btn btn-error" on:click={closeModal}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  </dialog>
</main>

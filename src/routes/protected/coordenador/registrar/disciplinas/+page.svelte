<script lang="ts">
  import type { PageData } from "./$types";
  import { superForm } from "sveltekit-superforms";
  import { Book, School, SquarePen } from "lucide-svelte";

  export let data: PageData;
  const { professores } = data;

  const openModal = () => {
    const modal = document.getElementById("modal_confirm") as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  const closeModal = () => {
    const modal = document.getElementById("modal_confirm") as HTMLDialogElement;
    if (modal) {
      modal.close();
    }
  };

  const confirmSubmit = () => {
    const formElement = document.getElementById(
      "registerForm"
    ) as HTMLFormElement;
    if (formElement) {
      formElement.submit();
    }
  };
</script>

<div>
  <div class="prose m-auto select-none">
    <form class="form-control" id="registerForm" method="post" action="?/post">
      <label class="input input-bordered flex items-center gap-2 my-4">
        <input
          required
          type="text"
          class="grow"
          placeholder="Identificador da turma"
          name="identificador"
        />
        <SquarePen />
      </label>

      <label class="input input-bordered flex items-center gap-2 my-4">
        <input
          required
          type="text"
          class="grow"
          placeholder="Sala da turma"
          name="sala"
        />
        <School />
      </label>

      <label class="input input-bordered flex items-center gap-2 my-4">
        <input
          required
          type="text"
          class="grow"
          placeholder="Nome da disciplina"
          name="disciplina"
        />
        <Book />
      </label>

      <label class="form-control my-4">
        <select required class="select select-bordered">
          <option disabled selected>Atribua um professor</option>
          {#each professores as professor}
            <option>{professor.nome}</option>
          {/each}
        </select>
      </label>

      <button class="btn btn-primary" on:click={openModal}
        >Registrar Disciplina</button
      >
    </form>

    <dialog id="modal_confirm" class="modal">
      <div class="modal-box prose">
        <h1 class="text-lg font-black">Aviso:</h1>
        <p>
          Ao confirmar esse diálogo, as alterações serão enviadas. Verifique se
          os dados estão realmente corretos.
        </p>
        <div class="modal-action">
          <button class="btn btn-success" on:click={confirmSubmit}
            >Confirmar</button
          >
          <button class="btn btn-error" on:click={closeModal}>Cancelar</button>
        </div>
      </div>
    </dialog>
  </div>
</div>

<script lang="ts">
    import type { PageData } from "./$types";
    import { superForm } from "sveltekit-superforms";
    import { CalendarDays, School, SquarePen } from "lucide-svelte";
  
    export let data: PageData;
    const { form, enhance } = superForm(data.form);
  
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
  
  <svelte:head>
    <title>Coordenador | Cadastro de Turma</title>
  </svelte:head>
  
  <div class="mt-[15vh] mx-[5vw]">
    <div
    class="flex items-center justify-center mb-12"
    >
      <h1 class="text-4xl font-semibold text-primary">
        Cadastro de Turma
      </h1>
    </div>
  
    <div class="prose m-auto select-none">
      <form class="form-control" id="registerForm" method="post" action="?/post" use:enhance>
        <label class="input input-bordered flex items-center gap-2 my-4">
          <input
            name="identificador"
            type="text"
            class="grow"
            placeholder="Identificador da turma. Ex: 3° A"
            bind:value={$form.identificador}
          />
          <SquarePen />
        </label>
  
        <label class="input input-bordered flex items-center gap-2 my-4">
          <input
            name="sala"
            type="text"
            class="grow"
            placeholder="Sala da turma. Ex: 302"
            bind:value={$form.sala}
          />
          <School />
        </label>
  
        <label class="input input-bordered flex items-center gap-2 my-4">
          <input
            name="temporadaLetiva"
            type="text"
            class="grow"
            placeholder="Temporada Letiva. Ex: 2025"
            bind:value={$form.temporadaLetiva}
          />
          <CalendarDays />
        </label>
  
        <button type="button" class="btn btn-primary" on:click={openModal}
          >Cadastrar Turma</button
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
  
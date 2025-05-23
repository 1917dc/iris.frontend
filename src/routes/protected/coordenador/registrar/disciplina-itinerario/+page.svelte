<script lang="ts">
    import type { PageData } from "./$types";
    import { superForm } from "sveltekit-superforms";
    import { Book, Plus } from "lucide-svelte";
  
    export let data: PageData;
    const { professores } = data;
    const { itinerarios } = data;
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
    <title>Coordenador | Cadastro de Disciplina - Itinerário</title>
</svelte:head>
  
<div class="mt-[15vh] mx-[5vw]">
    <div
    class="flex items-center justify-center mb-12"
    >
      <h1 class="text-4xl font-semibold text-primary">
        Cadastro de Disciplina (Itinerário)
      </h1>
    </div>
  
    <div class="prose m-auto select-none">
      <div style="text-align: right;">
        <a href="/protected/coordenador/registrar/itinerario">
          <button type="button" class="btn btn-primary"
            ><Plus />Itinerário</button
          >
        </a>
      </div>
      <form class="form-control" id="registerForm" method="post" action="?/post" use:enhance>
        <label class="input input-bordered flex items-center gap-2 my-4">
          <input
            name="disciplina"
            type="text"
            class="grow"
            placeholder="Nome da disciplina"
            bind:value={$form.disciplina}
          />
          <Book />
        </label>
  
        <label class="form-control my-4">
          <select name="professor" class="select select-bordered w-full" bind:value={$form.professor} required>
            <option disabled selected value="">Atribua a um professor</option>
            {#each data.professores as professor}
              {#if professor.enabled}
                <option value={professor.cpf}>{professor.nome}</option>
              {/if}
            {/each}
          </select>
        </label>
  
        <label class="form-control my-4">
          <select name="nomeItinerario" class="select select-bordered w-full" bind:value={$form.nomeItinerario} required>
            <option disabled selected value="">Selecione um itinerário</option>
            {#each data.itinerarios as nomeItinerario}
              <option value={nomeItinerario.nome}>{nomeItinerario.nome}</option>
            {/each}
          </select>
        </label>
  
        <button type="button" class="btn btn-primary" on:click={openModal}
          >Cadastrar Disciplina</button
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
  
<script lang="ts">
    import type { PageData } from "./$types";
    import { superForm } from "sveltekit-superforms";
    import { Book, Plus } from "lucide-svelte";
    import { date } from "zod";
  
    export let data: PageData;
    const { itinerarios } = data;
    const { turmas } = data;
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
    <title>Coordenador | Cadastro de Período de Inscrição</title>
</svelte:head>
  
<div class="mt-[15vh] mx-[5vw]">
    <div
    class="flex items-center justify-center mb-12"
    >
      <h1 class="text-4xl font-semibold text-primary">
        Cadastro de Período de Inscrição
      </h1>
    </div>
  
    <div class="prose m-auto select-none">
      <form class="form-control" id="registerForm" method="post" action="?/post" use:enhance>
        <label for="dataFim" class="form-label mb-4 mb-0 mt-0">Data de Término</label>
        <label class="input input-bordered flex items-center gap-2 my-0 mb-4">
          <input
            name="dataFim"
            type="date"
            class="grow"
            bind:value={$form.dataFim}
            required
          />
        </label>
  
        <label class="form-control mb-3">
          <label for="itinerariosNome" class="form-label my-4 mb-2 mt-0">Escolha os itinerários</label>
            <div class="space-y-2">
                {#each data.itinerarios as itinerario}
                <label class="flex items-center space-x-2">
                    <input 
                    type="checkbox" 
                    name="itinerariosNome" 
                    value={itinerario.nome} 
                    bind:group={$form.itinerariosNome} 
                    class="checkbox checkbox-bordered transition-all duration-300"
                    />
                    <span>{itinerario.nome}</span>
                </label>
                {/each}
            </div>
          </label>

        <label class="form-control mb-6">
          <label for="turmasPermitidasNome" class="form-label my-4 mb-2 mt-0">Selecione as turmas permitidas</label>
            <div class="space-y-2">
                {#each data.turmas as turma}
                <label class="flex items-center space-x-2">
                    <input 
                    type="checkbox" 
                    name="turmasPermitidasNome" 
                    value={turma.identificador} 
                    bind:group={$form.turmasPermitidasNome} 
                    class="checkbox checkbox-bordered transition-all duration-300"
                    />
                    <span>{turma.identificador}</span>
                </label>
                {/each}
            </div>
          </label>
  
        <button type="button" class="btn btn-primary" on:click={openModal}
          >Cadastrar</button
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
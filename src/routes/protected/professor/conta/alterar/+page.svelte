<script lang="ts">
    import type { Professor } from "$lib/types/Professor";
    import type { PageData } from "./$types";
    import { superForm } from "sveltekit-superforms";
    import { Eye, EyeOff } from "lucide-svelte";

    export let data: PageData;
  
    const { professor } = data;
  
    let showPassword = false;

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
  
    function togglePasswordVisibility() {
      showPassword = !showPassword;
    }
  
    const { form, errors, enhance } = superForm({
      cpf: professor?.cpf ?? "",
      name: professor?.nome ?? "",
      password: "",
      confirm: "",
    });
  
    const confirmSubmit = () => {
      const formElement = document.getElementById("editForm") as HTMLFormElement;
      
      if (formElement) {
        formElement.submit();
      }
    };
</script>
  
<svelte:head>
    <title>Professor | Alterar Conta</title>
</svelte:head>
  
<div class="mt-[10vh] mx-[5vw]">
    <div
    class="flex items-center justify-center mb-12"
    >
      <h1 class="text-4xl font-semibold text-primary">
        Alterar Conta
      </h1>
    </div>
  
    <div class="prose m-auto select-none">
      <form
        id="editForm"
        method="POST"
        action="?/edit"
        class="form-control"
        use:enhance
      >
        <div class="mb-4">
          <label class="label-text" for="cpf">CPF</label>
          <label class="input input-bordered flex items-center gap-2">
            <input
              name="cpf"
              type="text"
              class="grow"
              value={professor?.cpf}
              disabled
            />
          </label>
          <input type="hidden" name="cpf" value={professor?.cpf} />
        </div>
  
        <div class="mb-4">
          <label class="label-text" for="name">Nome</label>
          <label class="input input-bordered flex items-center gap-2">
            <input
              name="name"
              type="text"
              class="grow"
              spellcheck="false"
              autocomplete="off"
              value={professor?.nome}
            />
          </label>
          {#if $errors.name}
            <p class="text-error text-sm m-0 ml-1 mt-2">{$errors.name}</p>
          {/if}
        </div>
  
        <div class="mb-4">
          <label class="label-text" for="Senha">Senha</label>
          <label class="input input-bordered flex items-center gap-2">
            {#if showPassword}
              <input
                name="password"
                type="text"
                class="grow"
                placeholder="Senha"
                spellcheck="false"
                autocomplete="off"
                bind:value={$form.password}
              />
            {:else}
              <input
                name="password"
                type="password"
                class="grow"
                placeholder="Senha"
                spellcheck="false"
                autocomplete="off"
                bind:value={$form.password}
              />
            {/if}
            <button type="button" on:click={togglePasswordVisibility}>
              {#if showPassword}
                <Eye />
              {:else}
                <EyeOff />
              {/if}
            </button>
          </label>
          {#if $errors.password}
            <p class="text-error text-sm m-0 ml-1 mt-2">{$errors.password}</p>
          {/if}
        </div>
  
        <div class="mb-4">
          <label class="label-text" for="confirm">Confirmar senha</label>
          <label class="input input-bordered flex items-center gap-2">
            <input
              name="confirm"
              type="password"
              class="grow"
              placeholder="Confirmar senha"
              spellcheck="false"
              autocomplete="off"
              bind:value={$form.confirm}
            />
          </label>
          {#if $errors.confirm}
            <p class="text-error text-sm mt-2">{$errors.confirm}</p>
          {/if}
        </div>
  
        <button class="btn btn-primary" type="button" on:click={openModal}>
          Salvar
        </button>
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
  
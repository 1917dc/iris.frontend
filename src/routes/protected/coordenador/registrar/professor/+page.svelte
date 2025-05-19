<script lang="ts">
  import type { PageData } from "./$types";
  import { superForm } from "sveltekit-superforms";
  import { imask } from "@imask/svelte";
  import { Eye, EyeOff } from "lucide-svelte";

  export let data: PageData;

  const { form, errors, enhance } = superForm(data.form, {});

  const options = {
    mask: "000{.}000{.}000{-}00",
    lazy: true,
  };

  let showPassword = false;

  function togglePasswordVisibility() {
    showPassword = !showPassword;
  }

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
  <title>Coordenador | Cadastro de Professor</title>
</svelte:head>

<div class="mt-[20vh] mx-[5vw]">
  <div class="prose m-auto select-none">
    <form
      id="registerForm"
      method="post"
      action="?/post"
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
            placeholder="000.000.000-00"
            spellcheck="false"
            autocomplete="off"
            maxlength={14}
            bind:value={$form.cpf}
            use:imask={options}
          />
        </label>
        {#if $errors.cpf}
          <p class="text-error text-sm m-0 ml-1 mt-2">{$errors.cpf}</p>
        {/if}
      </div>

      <div class="mb-4">
        <label class="label-text" for="name">Nome</label>
        <label class="input input-bordered flex items-center gap-2">
          <input
            name="name"
            type="text"
            class="grow"
            placeholder="John Doe"
            spellcheck="false"
            autocomplete="off"
            bind:value={$form.name}
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
        {#if $errors?._errors}
          <p class="text-error text-sm mt-2">{$errors?._errors}</p>
        {/if}
      </div>

      <button class="btn btn-primary" type="button" on:click={openModal}>
        Registrar Professor
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

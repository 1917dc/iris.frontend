<script lang="ts">
  import type { PageData } from "./$types";
  import { superForm } from "sveltekit-superforms";
  import { imask } from "@imask/svelte";

  export let data: PageData;
  const { form, errors, enhance } = superForm(data.form, {
    resetForm: true,

    taintedMessage: () => {
      return new Promise(() => {
        window.confirm("Você deseja mesmo sair sem salvar as alterações?");
      });
    },

    onSubmit: ({ formElement, cancel }) => {
      showModal = true;

      return new Promise((resolve) => {
        resolveSubmit = resolve;
      }).then((confirmed) => {
        if (confirmed) {
          formElement.submit();
        } else {
          cancel();
        }
      });
    },
  });

  const options = {
    mask: "000{.}000{.}000{-}00",
    lazy: true,
  };

  let showModal = false;
  let showPassword = false;
  let resolveSubmit: (value: boolean) => void;

  function confirmSubmit() {
    showModal = false;
    resolveSubmit(true);
  }

  function cancelSubmit() {
    showModal = false;
    resolveSubmit(false);
  }

  $: if (showModal) {
    const dialog = document.getElementById(
      "modal_confirm",
    ) as HTMLDialogElement;
    dialog.showModal();
  }

  function togglePasswordVisibility() {
    showPassword = !showPassword;
  }
</script>

<svelte:head>
  <title>Cadastro - Professor</title>
</svelte:head>
<div class="justify-center">
  <div class="prose m-auto select-none">
    <h1 class="text-center text-primary mt-20">Cadastro de Professor</h1>
    <form method="post" action="?/register" class="form-control" use:enhance>
      <div class="m-3">
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
      <div class="m-3">
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
      <div class="m-3">
        <div>
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
                <svg
                  class="h-4 w-4 opacity-70"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              {:else}
                <svg
                  class="h-4 w-4 opacity-70"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              {/if}
            </button>
          </label>
        </div>
        {#if $errors.password}
          <p class="text-error text-sm m-0 ml-1 mt-2">{$errors.password}</p>
        {/if}
      </div>
      <div class="m-3">
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
      <button class="btn btn-primary m-10" type="submit"
        >Registrar Professor</button
      >
    </form>
    <dialog id="modal_confirm" class="modal">
      <div class="modal-box prose">
        <h1 class="text-lg font-black">Aviso:</h1>
        <p class="font">
          Ao confirmar esse diálogo, as alterações serão enviadas, verifique se
          os dados estão realmente corretos.
        </p>
        <div class="modal-action">
          <form method="dialog">
            <button class="btn btn-success" on:click={confirmSubmit}
              >Confirmar</button
            >
            <button class="btn btn-error" on:click={cancelSubmit}
              >Cancelar</button
            >
          </form>
        </div>
      </div>
    </dialog>
  </div>
</div>

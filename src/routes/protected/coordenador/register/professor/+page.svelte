<script lang="ts">
  import type { PageData } from "./$types";
  import { superForm } from "sveltekit-superforms";
  import { imask } from "@imask/svelte";
  import { Eye, EyeOff } from "lucide-svelte";

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
      "modal_confirm"
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
    <form method="post" action="?/post" class="form-control" use:enhance>
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
                <Eye />
              {:else}
                <EyeOff />
              {/if}
            </button>
          </label>
        </div>
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
      <button class="btn btn-primary" type="submit">Registrar Professor</button>
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

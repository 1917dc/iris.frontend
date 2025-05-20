<script lang="ts">
  import type { Professor } from "$lib/types/Professor";
  import type { PageData } from "./$types";
  import { superForm } from "sveltekit-superforms";
  import { Eye, EyeOff } from "lucide-svelte";

  export let selectedProfessor: Professor | null = null;
  export let data: PageData;

  const { professores } = data;

  let modal: HTMLDialogElement | null = null;
  let localProfessor: Professor | null = selectedProfessor;

  const openModal = (professor: Professor) => {
    localProfessor = professor;
    modal?.showModal();
  };

  const closeModal = () => {
    modal?.close();
  };

  let showPassword = false;

  function togglePasswordVisibility() {
    showPassword = !showPassword;
  }

  const { form, errors, enhance } = superForm({
    cpf: localProfessor?.cpf ?? "",
    name: localProfessor?.nome ?? "",
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
  <title>Coordenador | Edição de Professor</title>
</svelte:head>

<main>
  <div class="flex items-center justify-center">
    <ul class="w-1/2">
      {#each professores as professor}
        {#if professor.enabled}
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
                class="btn btn-primary" type="button"
                on:click={() => openModal(professor)}
              >
                Editar
              </button>
            </li>
          </div>
        {/if}
      {/each}
    </ul>
  </div>

  <dialog bind:this={modal} class="modal">
    <div class="modal-box">
      <h3 class="text-lg font-bold">Insira os dados abaixo</h3>
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
              value={localProfessor?.cpf}
              disabled
            />
          </label>
          <input type="hidden" name="cpf" value={localProfessor?.cpf} />
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
              value={localProfessor?.nome}
            />
          </label>
          {#if $errors.name}
            <p class="text-error text-sm m-0 ml-1 mt-2">{$errors.name}</p>
          {/if}
        </div>

        <div class="mb-4">
          <label class="label-text" for="password">Senha</label>
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
            <p class="text-error text-sm m-0 ml-1 mt-2">{$errors.confirm}</p>
          {/if}
        </div>

        <div class="modal-action">
          <button type="button" class="btn btn-success" on:click={confirmSubmit}>
            Confirmar
          </button>
          <button type="button" class="btn btn-error" on:click={closeModal}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </dialog>
</main>

<script lang="ts">
  import type { PageData } from "./$types";
  import { imask } from "@imask/svelte";
  import SuperDebug, { superForm } from "sveltekit-superforms";

  export let data: PageData;
  const { form, errors, enhance } = superForm(data.form);

  const options = {
    mask: "000{.}000{.}000{-}00",
    lazy: true,
  };
</script>

<main>
  <div class="flex justify-center items-center min-h-[calc(100vh-6rem)]">
    <form class="form-control" action="?/post" method="POST">
      <label class="w-full max-w-xs">
        <div class="label">
          <span class="label-text">Qual CPF deseja remover?</span>
        </div>
        <input
          name="cpf"
          type="text"
          placeholder="000.000.000-00"
          spellcheck="false"
          autocomplete="off"
          maxlength={14}
          bind:value={$form.cpf}
          use:imask={options}
          class="grow input input-bordered w-full max-w-xs"
        />
        <div class="label"></div>
      </label>
      {#if $errors.cpf}
        <p class="text-error text-sm">{$errors.cpf}</p>
      {/if}
      <button class="btn btn-wide btn-primary" type="submit">Buscar</button>
    </form>
  </div>
</main>

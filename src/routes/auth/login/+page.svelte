<script lang="ts">
  import type { PageData } from "./$types";
  import SuperDebug, { superForm } from "sveltekit-superforms";
  import { imask } from "@imask/svelte";
  import Logo from "$lib/components/Logo.svelte";

  export let data: PageData;
  const { form, errors, enhance } = superForm(data.form);

  const options = {
    mask: "000{.}000{.}000{-}00",
    lazy: true,
  };
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<body class="bg-accent h-screen m-0">
  <div class="h-80 w-80">
    <Logo></Logo>
  </div>
  <div class="h-80 w-80 bg-white">
    <form method="post" action="?/login" class="form-control">
      <div class="m-5">
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
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        </label>
        {#if $errors.cpf}
          <p class="text-error text-sm ml-1">{$errors.cpf}</p>
        {/if}
      </div>

      <div class="m-5">
        <label class="label-text" for="Senha">Senha</label>
        <label class="input input-bordered flex items-center gap-2">
          <input
            name="password"
            type="password"
            class="grow"
            placeholder="Senha"
            spellcheck="false"
            autocomplete="off"
            bind:value={$form.password}
          />
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
              d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
            />
          </svg>
        </label>
        {#if $errors.password}
          <p class="text-error text-sm">{$errors.password}</p>
        {/if}
      </div>
      <button class="btn btn-primary m-5" type="submit">Entrar</button>
    </form>
  </div>
</body>

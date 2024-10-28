<script lang="ts">
  import type { PageData } from "./$types";
  import SuperDebug, { superForm } from "sveltekit-superforms";
  import { imask } from "@imask/svelte";
  import { User } from "lucide-svelte";
  import { Lock } from "lucide-svelte";

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

<body class="bg-slate-100 h-screen m-0">
  <!-- div que contém os blocos de texto-->
  <div class="flex justify-center h-screen items-center select-none">
    <div class="grid-cols-1 grid-rows-3">
      <div
        class="bg-primary h-96 w-96 rounded-2xl row-start-1 mb-5 shadow-no-blur-lg"
      ></div>
      <div class="pr-5 flex flex-col items-center">
        <div
          class="flex items-center justify-center h-96 w-96 bg-primary rounded-2xl shadow-no-blur-lg"
        >
          <div class="font-rubik text-white">
            <h1 class="-mb-28" style="font-size: 11rem;">ÍR</h1>
            <h1 class="m-auto" style="font-size: 11rem;">IS</h1>
          </div>
        </div>
        <div class="bg-slate-100 h-96 w-96 rounded-2xl row-start-3 mt-5"></div>
      </div>
    </div>
    <!--     div que contém o form de login -->
    <div class="grid-cols-1 grid-rows-3 select-none">
      <div class="bg-slate-100 h-96 w-96 rounded-2xl row-start-1 mb-5"></div>
      <div
        class="h-96 w-96 bg-primary rounded-2xl shadow-no-blur-lg row-span-2 pt-10 pb-10 pl-5 pr-5"
      >
        <form method="post" action="?/login" class="form-control">
          <div class="m-5">
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
              <User class="h-4 w-4 opacity-70"></User>
            </label>
            {#if $errors.cpf}
              <p class="text-error text-sm">{$errors.cpf}</p>
            {/if}
          </div>

          <div class="m-5">
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
              <Lock class="h-4 w-4 opacity-70"></Lock>
            </label>
            {#if $errors.password}
              <p class="text-error text-sm">{$errors.password}</p>
            {/if}
          </div>
          <button class="btn text-primary m-5" type="submit">Entrar</button>
        </form>
      </div>
      <div class="h-96 w-96 bg-primary rounded-2xl mt-5"></div>
    </div>
  </div>
</body>

<script lang="ts">
    import type { Professor } from "$lib/types/Professor";
    import type { PageData } from "./$types";
  
    export let data: PageData;
    const { professores } = data;
</script>
  
<svelte:head>
    <title>Professor | Listagem de Professores</title>
</svelte:head>
  
<main>
    <div
    class="flex items-center justify-center mb-12"
    >
      <h1 class="mt-14 text-4xl font-semibold text-primary">
        Listagem de Professores
      </h1>
    </div>
  
    <div class="flex items-center justify-center">
      <ul class="w-1/2">
        {#each professores as professor}
            <div class="bg-gray-200 mt-4 mb-4 pl-4 pr-4 rounded-md">
                <li class="flex justify-between pt-4 pb-4 select-none">
                    <div class="inline">
                    <p>
                        <span class="font-extrabold text-primary">Nome:</span>
                        {professor.nome}
                    </p>
                    <p>
                        <span class="font-extrabold text-primary">Tipo: </span>{professor.role}
                    </p>
                    </div>
                </li>
            </div>
        {/each}
      </ul>
    </div>
</main>
  
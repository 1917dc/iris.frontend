<script lang="ts">
    import { PencilLine } from "lucide-svelte";
    import type { PageData } from "./$types";
  
</script>
  
<svelte:head>
    <title>Coordenador | Acompanhamento de Período de Inscrição</title>
</svelte:head>
  
<main>
  <div class="flex items-center justify-center mb-12">
    <h1 class="mt-14 text-4xl font-semibold text-primary">
      Acompanhamento de Período de Inscrição
    </h1>
  </div>
  
  <div class="flex items-center justify-center">
    <ul class="w-full md:w-1/2">
      <div class="grid gap-6 m-10 mx-0">
        <div
          class="bg-gray-100 shadow-lg rounded-lg p-8 flex flex-col justify-between h-auto"
          id="card"
        >
          <p class="text-xl font-semibold text-primary">
            Itinerários: <span class="font-medium text-gray-700">Teste 1, Teste 2, Teste 3</span>
          </p>
          <p class="text-xl font-semibold text-primary mt-4">
            Turmas permitidas: <span class="font-medium text-gray-700">301, 302, 303</span>
          </p>
          <p class="text-xl font-semibold text-primary mt-4">
            Data término: <span class="font-medium text-gray-700">26/05/2025</span>
          </p>
          
          <button
            class="mt-6 p-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors duration-300 transform hover:scale-105 w-24 ml-auto flex justify-center items-center"
          >
            <PencilLine class="w-5 h-5" />
          </button>
        </div>
      </div>
    </ul>
  </div>  
</main>
  
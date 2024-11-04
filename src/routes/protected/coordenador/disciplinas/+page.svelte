<script lang="ts">
  import { FilePlus, Search } from "lucide-svelte";

  export let data;

  const user = data.user;
</script>

<div class="flex mt-12 ml-10 mr-10">
  <div class="bg-primary h-60 w-8/12 rounded-2xl p-10">
    <div class="flex items-center text-white">
      <div class="inline">
        <h1 class="text-4xl font-medium">
          Bem-vindo(a) de volta, <span class="font-black">{user.name}</span>
        </h1>
        <h2>Login feito como <span class="font-bold">{user.typeUser}</span></h2>
      </div>
    </div>
  </div>
  <div class="bg-primary h-60 w-4/12 rounded-2xl p-10 ml-5">
    <div>
      <h1 class="text-white text-4xl text-end font-bold">
        Adicionar uma <br />Disciplina<br />
      </h1>
      <button class="btn bg-white text-xl"><FilePlus /></button>
    </div>
  </div>
</div>
<div class="ml-10 mr-10 mt-5 flex">
  <input
    class="input w-full bg-gray-200 shadow-no-blur-sm"
    placeholder="Pesquise turmas"
  />
  <button class="btn btn-primary ml-2 shadow-no-blur-sm"><Search /></button>
</div>

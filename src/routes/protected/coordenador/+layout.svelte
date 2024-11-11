<script>
  import "tailwindcss/tailwind.css";
  import { page } from "$app/stores";
  import { initFlash } from "sveltekit-flash-message";
  import toast, { Toaster } from "svelte-french-toast";
  import { LogOut } from "lucide-svelte";

  const flash = initFlash(page);

  $: if ($flash) {
    switch ($flash.type) {
      case "success":
        toast.success($flash.message);
        break;
      case "error":
        toast.error($flash.message);
        break;
    }
  }

  $: currentPath = $page.url.pathname;
</script>

<svelte:head>
  <title>Coordenador</title>
</svelte:head>

<Toaster />
<main>
  <div>
    <div class="navbar pl-10 pr-10">
      <div class="navbar-start select-none">
        <div>
          <div
            class="h-16 w-16 rounded-md bg-primary flex items-center justify-center shadow-no-blur-sm square-button"
          >
            <div class="font-rubik text-white text-xl">
              <h1 class="-mb-3">ÍR</h1>
              <h1>IS</h1>
            </div>
          </div>
        </div>
      </div>
      <div class="navbar-center select-none">
        <a href="/protected/coordenador/disciplinas"
           class="m-0.5 text-base btn {currentPath === '/protected/coordenador/disciplinas' ? 'btn-primary bg-primary' : 'btn-ghost'}">
          Disciplinas
        </a>
        <a href="/protected/coordenador/professor"
           class="m-0.5 text-base btn {currentPath === '/protected/coordenador/professor' ? 'btn-primary bg-primary' : 'btn-ghost'}">
          Professores
        </a>
        <a href="/protected/coordenador/register/professor"
           class="m-0.5 text-base btn {currentPath === '/protected/coordenador/register/professor' ? 'btn-primary bg-primary' : 'btn-ghost'}">
          Estudantes
        </a>
        <a href="/protected/coordenador/register/professor"
           class="m-0.5 text-base btn {currentPath === '/protected/coordenador/register/professor' ? 'btn-primary bg-primary' : 'btn-ghost'}">
          Eletivas
        </a>
        <a href="/protected/coordenador/register/professor"
           class="m-0.5 text-base btn {currentPath === '/protected/coordenador/register/professor' ? 'btn-primary bg-primary' : 'btn-ghost'}">
          Cronograma
        </a>
      </div>
      <div class="navbar-end select-none">
        <form action="/auth/logout">
          <button class="btn btn-primary bg-primary shadow-no-blur-sm square-button"><LogOut /></button>
        </form>
      </div>
    </div>
  </div>
  <slot />
</main>

<style>
  .square-button {
    width: 3.125rem;
    height: 3.125rem;
    padding: 0;
  }
</style>

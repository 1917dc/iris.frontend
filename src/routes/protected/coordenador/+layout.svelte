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
</script>

<svelte:head>
  <title>Coordenador</title>
</svelte:head>
<Toaster />
<main>
  <div>
    <div class="navbar">
      <div class="navbar-start select-none">
        <div>
          <div
            class="h-16 w-16 rounded-md bg-primary flex items-center justify-center shadow-no-blur-sm"
          >
            <div class="font-rubik text-white text-2xl">
              <h1 class="-mb-3">ÍR</h1>
              <h1>IS</h1>
            </div>
          </div>
        </div>
      </div>
      <div class="navbar-center select-none">
        <a href="coordenador/register/professor" class="">Professores</a>
      </div>
      <div class="navbar-end select-none">
        <form action="/auth/logout">
          <button class="btn btn-primary shadow-no-blur-sm"><LogOut /></button>
        </form>
      </div>
    </div>
  </div>
  <slot />
</main>

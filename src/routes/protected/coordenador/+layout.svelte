<script>
  import "tailwindcss/tailwind.css";
  import { AlignJustify, ChevronRight } from "lucide-svelte";
  import { page } from "$app/stores";
</script>

<svelte:head>
  <title>Coordenador</title>
</svelte:head>
<main>
  <div>
    <div class="navbar bg-base-100">
      <div class="flex-none">
        <div class="drawer mr-2">
          <input id="my-drawer" type="checkbox" class="drawer-toggle" />
          <div class="drawer-content">
            <!-- Page content here -->
            <label for="my-drawer" class="btn btn-ghost w-14 h-14 drawer-button"
              ><AlignJustify /></label
            >
          </div>
          <div class="drawer-side">
            <label
              for="my-drawer"
              aria-label="close sidebar"
              class="drawer-overlay"
            ></label>
            <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
              <!-- Sidebar content here -->
              <li>
                <a
                  href="/protected/coordenador/register/professor"
                  class="flex justify-between {$page.url.pathname ===
                  '/protected/coordenador/register/professor'
                    ? 'bg-primary text-white'
                    : 'bg-base-200 text-black'} hover:text-black"
                >
                  Registrar professor

                  <ChevronRight />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="flex-1">
        <div>
          <div
            class="h-16 w-16 rounded-md bg-primary flex items-center justify-center shadow-no-blur-sm square-button"
          >
            <div class="font-rubik text-white text-xl">
              <a href="/protected/coordenador/">
                <h1 class="-mb-3">ÍR</h1>
                <h1>IS</h1>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <slot />
  </div>
</main>

<style>
  .square-button {
    width: 3.125rem;
    height: 3.125rem;
    padding: 0;
  }
</style>

<script lang="ts">
  import "tailwindcss/tailwind.css";
  import {
    AlignJustify,
    ChevronRight,
    LogOut,
    Github,
    UsersRound,
    BookCopy,
  } from "lucide-svelte";
  import { SidebarItem } from "$lib/components/sidebar-item";
  import { page } from "$app/stores";
</script>

<svelte:head>
  <title>Coordenador</title>
</svelte:head>
<main>
  <div>
    <div class="navbar bg-base-100">
      <div class="navbar-start">
        <div class="drawer mr-2">
          <input id="my-drawer" type="checkbox" class="drawer-toggle" />
          <div class="drawer-content">
            <!-- Page content here -->
            <label
              for="my-drawer"
              class="btn btn-primary w-14 h-14 rounded-md shadow-no-blur-sm drawer-button"
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
              <SidebarItem
                urlPath={"/protected/coordenador/register/professor"}
              >
                <svelte:fragment slot="icon"><UsersRound /></svelte:fragment>
                <svelte:fragment slot="title"
                  >Registrar professor</svelte:fragment
                >
              </SidebarItem>
              <SidebarItem urlPath={"/protected/coordenador/disciplinas"}>
                <svelte:fragment slot="icon"><BookCopy /></svelte:fragment>
                <svelte:fragment slot="title">Disciplinas</svelte:fragment>
              </SidebarItem>
              <div class="mt-auto">
                <div class="flex justify-center">
                  <div class="flex items-center">
                    <p>© 2024 Projeto Íris</p>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      class="btn btn-link"
                      href="https://github.com/1917dc/iris"><Github></Github></a
                    >
                  </div>
                </div>
              </div>
            </ul>
          </div>
        </div>
      </div>
      <div class="navbar-center">
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
      <div class="navbar-end">
        <form action="/auth/logout" method="POST">
          <button
            type="submit"
            class="btn btn-primary h-14 w-14 rounded-md shadow-no-blur-sm"
            ><LogOut />
          </button>
        </form>
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

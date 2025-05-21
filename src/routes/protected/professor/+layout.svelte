<script lang="ts">
  import "tailwindcss/tailwind.css";
  import {
    LogOut,
    UserRound,
    BookText,
    UserRoundPen,
    Layers,
    CircleUser,
  } from "lucide-svelte";
  import { Sidebar, SidebarItem } from "$lib/components/sidebar";
  import { HomeButton } from "$lib/components/home-button";
  import type { Category } from "$lib/types/CategoriesCoordenador";

  let activeCategory: Category;

  function toggleCategory(current: Category, selected: Category) {
    return current === selected ? "none" : selected;
  }
</script>

<svelte:head>
  <title>Coordenador</title>
</svelte:head>

<main>
  <div>
    <div class="navbar bg-base-100">
      <div class="navbar-start">
        <Sidebar>
          <div class="mb-3">
            <button
              class="text-lg font-semibold w-full text-left px-4 py-2 flex items-center justify-between"
              on:click={() =>
                (activeCategory = toggleCategory(
                  activeCategory,
                  "disciplinas"
                ))}
            >
              <span>Disciplinas</span>
              <BookText />
            </button>
            {#if activeCategory === "disciplinas"}
              <div class="space-y-1">
                <SidebarItem
                  urlPath={"/protected/professor/listar/disciplinas"}
                >
                  <svelte:fragment slot="title">Visualizar</svelte:fragment>
                </SidebarItem>
              </div>
            {/if}
          </div>
          <div class="mb-3">
            <button
              class="text-lg font-semibold w-full text-left px-4 py-2 flex items-center justify-between"
              on:click={() =>
                (activeCategory = toggleCategory(activeCategory, "turmas"))}
            >
              <span>Turmas</span>
              <BookText />
            </button>
            {#if activeCategory === "turmas"}
              <div class="space-y-1">
                <SidebarItem urlPath={"/protected/professor/listar/turmas"}>
                  <svelte:fragment slot="title">Visualizar</svelte:fragment>
                </SidebarItem>
              </div>
            {/if}
          </div>
        </Sidebar>
      </div>
      <div class="navbar-center">
        <HomeButton urlPath="/protected/professor/listar/turmas" />
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

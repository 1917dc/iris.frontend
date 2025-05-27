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
  import type { Category } from "$lib/types/CategoriesAluno";

  let activeCategory: Category;

  function toggleCategory(current: Category, selected: Category) {
    return current === selected ? "none" : selected;
  }

  function confirmLogout(event: SubmitEvent) {
    const confirmation = window.confirm("Deseja mesmo sair?");
    if (!confirmation) {
      event.preventDefault();
    }
  }
</script>
  
<svelte:head>
    <title>Aluno</title>
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
                  (activeCategory = toggleCategory(activeCategory, "disciplinas"))}
              >
                <span>Disciplinas</span>
                <BookText />
              </button>
              {#if activeCategory === "disciplinas"}
                <div class="space-y-1">
                  <SidebarItem urlPath={"/protected/aluno/listar/disciplinas"}>
                    <svelte:fragment slot="title">Visualizar</svelte:fragment>
                  </SidebarItem>
                </div>
              {/if}
            </div>
            <div class="mb-3">
              <button
                class="text-lg font-semibold w-full text-left px-4 py-2 flex items-center justify-between"
                on:click={() =>
                  (activeCategory = toggleCategory(activeCategory, "itinerarios"))}
              >
                <span>Itinerário</span>
                <Layers />
              </button>
              {#if activeCategory === "itinerarios"}
                <div class="space-y-1">
                  <SidebarItem urlPath={"/protected/aluno/listar/itinerarios"}>
                    <svelte:fragment slot="title">Visualizar</svelte:fragment>
                  </SidebarItem>
                  <SidebarItem urlPath={"/protected/aluno/registrar/inscricao-itinerario"}>
                    <svelte:fragment slot="title">Inscrição</svelte:fragment>
                  </SidebarItem>
                </div>
              {/if}
            </div>
          </Sidebar>
        </div>
        <div class="navbar-center">
          <HomeButton urlPath="/protected/aluno/listar/disciplinas" />
        </div>
        <div class="navbar-end">
          <form action="/auth/logout" method="POST" on:submit={confirmLogout}>
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
  
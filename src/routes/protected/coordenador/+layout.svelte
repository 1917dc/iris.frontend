<script lang="ts">
  import "tailwindcss/tailwind.css";
  import {
    LogOut,
    UserRound,
    BookText,
    UserRoundPen,
    Layers,
    CircleUser,
    BookCopy,
    ClipboardPenLine,
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
                (activeCategory = toggleCategory(activeCategory, "disciplina"))}
            >
              <span>Disciplina</span>
              <BookText />
            </button>
            {#if activeCategory === "disciplina"}
              <div class="space-y-1">
                <SidebarItem
                  urlPath={"/protected/coordenador/registrar/disciplinas"}
                >
                  <svelte:fragment slot="title">Registrar</svelte:fragment>
                </SidebarItem>
                <SidebarItem
                  urlPath={"/protected/coordenador/listar/disciplinas"}
                >
                  <svelte:fragment slot="title">Visualizar</svelte:fragment>
                </SidebarItem>
                <SidebarItem
                  urlPath={"/protected/coordenador/remover/disciplina"}
                >
                  <svelte:fragment slot="title">Remover</svelte:fragment>
                </SidebarItem>
              </div>
            {/if}
          </div>
          <div class="mb-3">
            <button
              class="text-lg font-semibold w-full text-left px-4 py-2 flex items-center justify-between"
              on:click={() =>
                (activeCategory = toggleCategory(activeCategory, "turma"))}
            >
              <span>Turma</span>
              <Layers />
            </button>
            {#if activeCategory === "turma"}
              <div class="space-y-1">
                <SidebarItem urlPath={"/protected/coordenador/listar/turmas"}>
                  <svelte:fragment slot="title">Visualizar</svelte:fragment>
                </SidebarItem>
                <SidebarItem urlPath={"/protected/coordenador/remover/turma"}>
                  <svelte:fragment slot="title">Remover</svelte:fragment>
                </SidebarItem>
                <SidebarItem urlPath={"/protected/coordenador/editar/turma"}>
                  <svelte:fragment slot="title">Editar</svelte:fragment>
                </SidebarItem>
              </div>
            {/if}
          </div>
          <div class="mb-3">
            <button
              class="text-lg font-semibold w-full text-left px-4 py-2 flex items-center justify-between"
              on:click={() =>
                (activeCategory = toggleCategory(activeCategory, "disciplina-itinerario"))}
            >
              <span>Itinerário</span>
              <BookCopy />
            </button>
            {#if activeCategory === "disciplina-itinerario"}
              <div class="space-y-1">
                <SidebarItem
                  urlPath={"/protected/coordenador/registrar/disciplina-itinerario"}
                >
                  <svelte:fragment slot="title">Registrar</svelte:fragment>
                </SidebarItem>
                <SidebarItem
                  urlPath={"/protected/coordenador/listar/itinerario"}
                >
                  <svelte:fragment slot="title">Visualizar</svelte:fragment>
                </SidebarItem>
                <SidebarItem
                  urlPath={"/protected/coordenador/remover/itinerario"}
                >
                  <svelte:fragment slot="title">Remover</svelte:fragment>
                </SidebarItem>
              </div>
            {/if}
          </div>
          <div class="mb-3">
            <button
              class="text-lg font-semibold w-full text-left px-4 py-2 flex items-center justify-between"
              on:click={() =>
                (activeCategory = toggleCategory(activeCategory, "inscricao"))}
            >
              <span>Inscrições</span>
              <ClipboardPenLine />
            </button>
            {#if activeCategory === "inscricao"}
              <div class="space-y-1">
                <SidebarItem
                  urlPath={"/protected/coordenador/registrar/periodo-inscricao"}
                >
                  <svelte:fragment slot="title">Registrar</svelte:fragment>
                </SidebarItem>
                <SidebarItem
                  urlPath={"/protected/coordenador/editar/inscricao"}
                >
                  <svelte:fragment slot="title">Acompanhar</svelte:fragment>
                </SidebarItem>
              </div>
            {/if}
          </div>
          <div class="mb-3">
            <button
              class="text-lg font-semibold w-full text-left px-4 py-2 flex items-center justify-between"
              on:click={() =>
                (activeCategory = toggleCategory(activeCategory, "professor"))}
            >
              <span>Professor</span>
              <UserRound />
            </button>
            {#if activeCategory === "professor"}
              <div class="space-y-1">
                <SidebarItem
                  urlPath={"/protected/coordenador/registrar/professor"}
                >
                  <svelte:fragment slot="title">Registrar</svelte:fragment>
                </SidebarItem>
                <SidebarItem
                  urlPath={"/protected/coordenador/remover/professor"}
                >
                  <svelte:fragment slot="title">Remover</svelte:fragment>
                </SidebarItem>
                <SidebarItem
                  urlPath={"/protected/coordenador/editar/professor"}
                >
                  <svelte:fragment slot="title">Editar</svelte:fragment>
                </SidebarItem>
              </div>
            {/if}
          </div>
          <div class="mb-3">
            <button
              class="text-lg font-semibold w-full text-left px-4 py-2 flex items-center justify-between"
              on:click={() =>
                (activeCategory = toggleCategory(activeCategory, "aluno"))}
            >
              <span>Aluno</span>
              <UserRoundPen />
            </button>
            {#if activeCategory === "aluno"}
              <div class="space-y-1">
                <SidebarItem urlPath={"/protected/coordenador/remover/aluno"}>
                  <svelte:fragment slot="title">Remover</svelte:fragment>
                </SidebarItem>
                <SidebarItem urlPath={"/protected/coordenador/editar/aluno"}>
                  <svelte:fragment slot="title">Editar</svelte:fragment>
                </SidebarItem>
              </div>
            {/if}
          </div>
          <div class="mb-3">
            <button
              class="text-lg font-semibold w-full text-left px-4 py-2 flex items-center justify-between"
              on:click={() =>
                (activeCategory = toggleCategory(
                  activeCategory,
                  "coordenador"
                ))}
            >
              <span>Coordenador</span>
              <CircleUser />
            </button>
            {#if activeCategory === "coordenador"}
              <div class="space-y-1">
                <SidebarItem
                  urlPath={"/protected/coordenador/editar/coordenador"}
                >
                  <svelte:fragment slot="title">Editar</svelte:fragment>
                </SidebarItem>
              </div>
            {/if}
          </div>
        </Sidebar>
      </div>
      <div class="navbar-center">
        <HomeButton urlPath="/protected/coordenador/listar/disciplinas" />
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

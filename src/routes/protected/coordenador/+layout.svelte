<script lang="ts">
  import "tailwindcss/tailwind.css";
  import { LogOut, UserRound, BookText, UserRoundPen, Layers } from "lucide-svelte";
  import { Sidebar, SidebarItem } from "$lib/components/sidebar";
  import { HomeButton } from "$lib/components/home-button";

  let activeCategory: "none" | "professor" | "aluno" | "disciplina" | "turma" = "none";
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
              on:click={() => activeCategory = activeCategory === "disciplina" ? "none" : "disciplina"}
            >
              <span>Disciplina</span>
              <BookText/>
            </button>
            {#if activeCategory === "disciplina"}
              <div class="space-y-1">
                <SidebarItem urlPath={"/protected/coordenador/registrar/disciplinas"}>
                  <svelte:fragment slot="title">Registrar</svelte:fragment>
                </SidebarItem>
                <SidebarItem urlPath={"/protected/coordenador/listar/disciplinas"}>
                  <svelte:fragment slot="title">Visualizar</svelte:fragment>
                </SidebarItem>
                <SidebarItem urlPath={"/protected/coordenador/remover/disciplina"}>
                  <svelte:fragment slot="title">Remover</svelte:fragment>
                </SidebarItem>
              </div>
            {/if}
          </div>

          <div class="mb-3">
            <button
              class="text-lg font-semibold w-full text-left px-4 py-2 flex items-center justify-between"
              on:click={() => activeCategory = activeCategory === "turma" ? "none" : "turma"}
            >
              <span>Turma</span>
              <Layers/>
            </button>
            {#if activeCategory === "turma"}
              <div class="space-y-1">
                <SidebarItem urlPath={"/protected/coordenador/listar/turmas"}>
                  <svelte:fragment slot="title">Visualizar</svelte:fragment>
                </SidebarItem>
                <SidebarItem urlPath={"/protected/coordenador/remover/turma"}>
                  <svelte:fragment slot="title">Remover</svelte:fragment>
                </SidebarItem>
              </div>
            {/if}
          </div>

          <div class="mb-3">
            <button
              class="text-lg font-semibold w-full text-left px-4 py-2 flex items-center justify-between"
              on:click={() => activeCategory = activeCategory === "professor" ? "none" : "professor"}
            >
              <span>Professor</span>
              <UserRound/>
            </button>
            {#if activeCategory === "professor"}
              <div class="space-y-1">
                <SidebarItem urlPath={"/protected/coordenador/registrar/professor"}>
                  <svelte:fragment slot="title">Registrar</svelte:fragment>
                </SidebarItem>
                <SidebarItem urlPath={"/protected/coordenador/remover/professor"}>
                  <svelte:fragment slot="title">Remover</svelte:fragment>
                </SidebarItem>
                <SidebarItem urlPath={"/protected/coordenador/editar/professor"}>
                  <svelte:fragment slot="title">Editar</svelte:fragment>
                </SidebarItem>
              </div>
            {/if}
          </div>
          <div class="mb-3">
            <button
              class="text-lg font-semibold w-full text-left px-4 py-2 flex items-center justify-between"
              on:click={() => activeCategory = activeCategory === "aluno" ? "none" : "aluno"}
            >
              <span>Aluno</span>
              <UserRoundPen/>
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

<script lang="ts">
  import "tailwindcss/tailwind.css";
  import { LogOut, UserRoundPlus, BookCopy, UserRoundX } from "lucide-svelte";
  import { Sidebar, SidebarItem } from "$lib/components/sidebar";
  import { HomeButton } from "$lib/components/home-button";

  const coordenador = "/protected/coordenador";
</script>

<svelte:head>
  <title>Coordenador</title>
</svelte:head>

<main>
  <div>
    <div class="navbar bg-base-100">
      <div class="navbar-start">
        <Sidebar>
          <SidebarItem urlPath={"/protected/coordenador/registrar/professor"}>
            <svelte:fragment slot="title">Professor - Registrar</svelte:fragment
            >
          </SidebarItem>
          <SidebarItem urlPath={"/protected/coordenador/remover/professor"}>
            <svelte:fragment slot="title">Professor - Remover</svelte:fragment>
          </SidebarItem>
          <SidebarItem urlPath={"/protected/coordenador/editar/professor"}>
            <svelte:fragment slot="title">Professor - Editar</svelte:fragment>
          </SidebarItem>
          <SidebarItem urlPath={"/protected/coordenador/disciplinas"}>
            <svelte:fragment slot="title">Disciplinas</svelte:fragment>
          </SidebarItem>
        </Sidebar>
      </div>
      <div class="navbar-center">
        <HomeButton urlPath="/protected/coordenador" />
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

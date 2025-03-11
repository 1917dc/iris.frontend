<script lang="ts">
  import "tailwindcss/tailwind.css";
  import { LogOut, UsersRound, BookCopy } from "lucide-svelte";
  import { Sidebar, SidebarItem } from "$lib/components/sidebar";
  import { Icon } from "$lib/components/Icon";
</script>

<svelte:head>
  <title>Coordenador</title>
</svelte:head>

<main>
  <div>
    <div class="navbar bg-base-100">
      <div class="navbar-start">
        <Sidebar>
          <SidebarItem urlPath={"/protected/coordenador/register/professor"}>
            <svelte:fragment slot="icon"><UsersRound /></svelte:fragment>
            <svelte:fragment slot="title">Professor</svelte:fragment>
          </SidebarItem>
          <SidebarItem urlPath={"/protected/coordenador/disciplinas"}>
            <svelte:fragment slot="icon"><BookCopy /></svelte:fragment>
            <svelte:fragment slot="title">Disciplinas</svelte:fragment>
          </SidebarItem>
        </Sidebar>
      </div>
      <div class="navbar-center">
        <Icon urlPath="/protected/coordenador" />
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

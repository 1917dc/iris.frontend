<script lang="ts">
  import { page } from "$app/state";

  const imgPath = "/ilustracoes/erro/png/1x/";
</script>

<div class="flex items-center justify-center min-h-screen select-none">
  {#if page.status === 404}
    <img src={imgPath + "error01.png"} />
  {/if}
  {#if page.status === 500}
    <div class="text-center max-w-md px-4">
      <img src={imgPath + "error08.png"} />
      <h1 class="text-primary text-5xl font-bold">{page.status}</h1>
    </div>
  {/if}
</div>

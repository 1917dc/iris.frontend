<script lang="ts">
  import { page } from "$app/stores";
  import { ChevronRight } from "lucide-svelte";

  export let urlPath: string = "";
</script>

<li>
  <a
    href={urlPath}
    class="flex justify-between {$page.url.pathname === urlPath
      ? 'bg-primary text-white font-bold'
      : 'bg-base-200 text-black'} hover:text-black"
  >
    <div class="flex items-center gap-4 font-medium">
      <slot name="icon" />
      <slot name="title" />
    </div>

    <ChevronRight />
  </a>
</li>

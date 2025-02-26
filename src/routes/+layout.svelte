<script>
  import "tailwindcss/tailwind.css";
  import { page } from "$app/stores";
  import { initFlash } from "sveltekit-flash-message";
  import toast, { Toaster } from "svelte-french-toast";

  const flash = initFlash(page);

  $: if ($flash) {
    switch ($flash.type) {
      case "success":
        toast.success($flash.message);
        break;
      case "error":
        toast.error($flash.message);
        break;
    }
  }
</script>

<svelte:head>
  <title>Íris</title>
</svelte:head>

<Toaster />
<main>
  <slot />
</main>

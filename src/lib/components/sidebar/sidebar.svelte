<script lang="ts">
  import { AlignJustify, Github } from "lucide-svelte";
</script>

<div class="drawer">
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
    <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"
    ></label>
    <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
      <slot />
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

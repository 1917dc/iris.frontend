<script lang="ts">
  export let data;

  const user = data.user;
</script>

<div class="bg-primary h-80 w-screen rounded-2xl">
  <div class="flex items-center text-white">
    <div class="inline">
      <h1>Bem-vindo(a) de volta, {user.name}</h1>
      <h2>Login feito como {user.typeUser}</h2>
    </div>
  </div>
</div>

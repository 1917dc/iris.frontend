<script lang="ts">
    import type { Aluno } from "$lib/types/Aluno";
    import type { PageData } from "./$types";
  
    export let data: PageData;
    const { alunos } = data;
  
    let modal: HTMLDialogElement | null = null;
    let selectedAluno: Aluno | null = null;
  
    const openModal = (aluno: Aluno) => {
      selectedAluno = aluno;
      modal?.showModal();
    };
  
    const closeModal = () => {
      modal?.close();
      selectedAluno = null;
    };
  </script>

<svelte:head>
  <title>Coordenador | Deleção de Aluno</title>
</svelte:head>
  
  <main>
    <div class="flex items-center justify-center">
      <ul class="w-1/2">
        {#each alunos as aluno}
          {#if aluno.enabled}
            <div class="bg-gray-200 mt-4 mb-4 pl-4 pr-4 rounded-md">
              <li class="flex justify-between pt-4 pb-4 select-none">
                <div class="inline">
                  <p>
                    <span class="font-bold text-primary">Nome:</span>
                    {aluno.nome}
                  </p>
                  <p>
                    <span class="font-bold text-primary">CPF: </span>{aluno.cpf}
                  </p>
                </div>
                <button
                  class="btn btn-primary" type="button"
                  on:click={() => openModal(aluno)}
                >
                  Remover
                </button>
              </li>
            </div>
          {/if}
        {/each}
      </ul>
    </div>
  
    <dialog bind:this={modal} class="modal">
      <div class="modal-box">
        <h3 class="text-lg font-bold">Aviso!</h3>
        <p class="py-4">
          Você tem certeza que deseja mesmo desabilitar o aluno <br /><span
            class="font-bold">{selectedAluno?.nome}</span
          > do sistema?
        </p>
        <div class="modal-action">
          <form method="POST" action="?/delete">
            <input type="hidden" name="cpf" value={selectedAluno?.cpf} />
            <button type="submit" class="btn btn-success"> Confirmar </button>
            <button type="button" class="btn btn-error" on:click={closeModal}>
              Cancelar
            </button>
          </form>
        </div>
      </div>
    </dialog>
  </main>
  
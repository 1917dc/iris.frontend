<script lang="ts">
    import type { Aluno } from "$lib/types/Aluno";
    import type { PageData } from "./$types";
    import { superForm } from "sveltekit-superforms";
    import { Eye, EyeOff, MessageSquareWarning } from "lucide-svelte";
  
    export let selectedAluno: Aluno | null = null;
    export let data: PageData;

    const { alunos } = data;
    const { turmas } = data;
  
    let modal: HTMLDialogElement | null = null;
    let localAluno: Aluno | null = selectedAluno;
  
    const openModal = (aluno: Aluno) => {
        localAluno = aluno;
        modal?.showModal();
    };
  
    const closeModal = () => {
        modal?.close();
    };

    let showPassword = false;

    function togglePasswordVisibility() {
        showPassword = !showPassword;
    }

    const { form, errors, enhance } = superForm({
        cpf: localAluno?.cpf ?? "",
        nome: localAluno?.nome ?? "",
        turmaIdentificador: localAluno?.turmaIdentificador ?? "",
        senha: "",
        confirm: "",
    });

    const confirmSubmit = () => {
        const formElement = document.getElementById("editForm") as HTMLFormElement;
        
        if (formElement) {
        formElement.submit();
        }
    };
</script>

<svelte:head>
  <title>Coordenador | Edição de Aluno</title>
</svelte:head>
  
<main>
    {#if alunos.length > 0 && alunos.some(aluno => aluno.enabled)}
        <div
        class="flex items-center justify-center mb-12"
        >
            <h1 class="mt-14 text-4xl font-semibold text-primary">
                Edição de Aluno
            </h1>
        </div>
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
                                    Editar
                                </button>
                            </li>
                        </div>
                    {/if}
                {/each}
            </ul>
        </div>
    {:else}
        <div class="mx-10 flex flex-col justify-center items-center h-64 bg-gray-100 rounded-lg shadow-md mt-8">
        <MessageSquareWarning class="text-gray-600 mb-6" size={50} />
        <p class="text-2xl text-center text-gray-600">Não há alunos a serem editados</p>
        </div>
    {/if}

    <dialog bind:this={modal} class="modal">
        <div class="modal-box">
            <h3 class="text-lg font-bold">Insira os dados abaixo</h3>
            <form
                id="editForm"
                method="POST"
                action="?/edit"
                class="form-control"
                use:enhance
            >
                <div class="mb-4">
                    <label class="label-text" for="cpf">CPF</label>
                    <label class="input input-bordered flex items-center gap-2">
                        <input
                            name="cpf"
                            type="text"
                            class="grow"
                            value={localAluno?.cpf}
                            disabled
                        />
                    </label>
                    <input type="hidden" name="cpf" value={localAluno?.cpf} />
                </div>

                <div class="mb-4">
                    <label class="label-text" for="name">Nome</label>
                    <label class="input input-bordered flex items-center gap-2">
                        <input
                            name="nome"
                            type="text"
                            class="grow"
                            spellcheck="false"
                            autocomplete="off"
                            value={localAluno?.nome}
                        />
                    </label>
                    {#if $errors.nome}
                        <p class="text-error text-sm m-0 ml-1 mt-2">{$errors.nome}</p>
                    {/if}
                </div>

                <div class="mb-4">
                    <label class="label-text" for="text">Turma</label>
                    <label class="form-control">
                        <select
                            name="turmaIdentificador"
                            class="select select-bordered w-full input input-bordered text-gray-600 focus:ring focus:ring-primary-300"
                            
                        >
                            <option value={localAluno?.turmaIdentificador} disabled selected>Selecione uma turma</option>
                            {#each turmas as turma}
                                <option value={turma.identificador}>{turma.identificador}</option>
                            {/each}
                        </select>
                    </label>
                    {#if $errors.turmaIdentificador}
                        <p class="text-error text-sm m-0 ml-1 mt-2">{$errors.turmaIdentificador}</p>
                    {/if}
                </div>
          
                <div class="mb-4">
                    <label class="label-text" for="password">Senha</label>
                    <label class="input input-bordered flex items-center gap-2">
                        {#if showPassword}
                            <input
                                name="senha"
                                type="text"
                                class="grow"
                                placeholder="Senha"
                                spellcheck="false"
                                autocomplete="off"
                                bind:value={$form.senha}
                            />
                        {:else}
                            <input
                                name="senha"
                                type="password"
                                class="grow"
                                placeholder="Senha"
                                spellcheck="false"
                                autocomplete="off"
                                bind:value={$form.senha}
                            />
                        {/if}
                        <button type="button" on:click={togglePasswordVisibility}>
                            {#if showPassword}
                                <Eye />
                            {:else}
                                <EyeOff />
                            {/if}
                        </button>
                    </label>
                    {#if $errors.senha}
                        <p class="text-error text-sm m-0 ml-1 mt-2">{$errors.senha}</p>
                    {/if}
                </div>
          
                <div class="mb-4">
                    <label class="label-text" for="confirm">Confirmar senha</label>
                    <label class="input input-bordered flex items-center gap-2">
                        <input
                            name="confirm"
                            type="password"
                            class="grow"
                            placeholder="Confirmar senha"
                            spellcheck="false"
                            autocomplete="off"
                            bind:value={$form.confirm}
                        />
                    </label>
                    {#if $errors.confirm}
                        <p class="text-error text-sm m-0 ml-1 mt-2">{$errors.confirm}</p>
                    {/if}
                </div>
          
                <div class="modal-action">
                    <button type="button" class="btn btn-success" on:click={confirmSubmit}>
                        Confirmar
                    </button>
                    <button type="button" class="btn btn-error" on:click={closeModal}>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    </dialog>
</main>
<script lang="ts">
    import type { Aluno } from "$lib/types/Aluno";
    import type { PageData } from "./$types";
    import { superForm } from "sveltekit-superforms";
    import { Eye, EyeOff } from "lucide-svelte";
  
    export let selectedAluno: Aluno | null = null;
    export let data: PageData;

    const { alunos } = data;
  
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
        name: localAluno?.nome ?? "",
        sala: localAluno?.sala ?? "",
        password: "",
        confirm: "",
    });

    const confirmSubmit = () => {
        const formElement = document.getElementById("editForm") as HTMLFormElement;
        
        if (formElement) {
        formElement.submit();
        }
    };
</script>
  
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
                                Editar
                            </button>
                        </li>
                    </div>
                {/if}
            {/each}
        </ul>
    </div>

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
                            name="name"
                            type="text"
                            class="grow"
                            spellcheck="false"
                            autocomplete="off"
                            value={localAluno?.nome}
                        />
                    </label>
                    {#if $errors.name}
                        <p class="text-error text-sm m-0 ml-1 mt-2">{$errors.name}</p>
                    {/if}
                </div>

                <div class="mb-4">
                    <label class="label-text" for="name">Sala</label>
                    <label class="input input-bordered flex items-center gap-2">
                        <input
                            name="sala"
                            type="text"
                            class="grow"
                            spellcheck="false"
                            autocomplete="off"
                            value={localAluno?.sala}
                        />
                    </label>
                    {#if $errors.sala}
                        <p class="text-error text-sm m-0 ml-1 mt-2">{$errors.sala}</p>
                    {/if}
                </div>
          
                <div class="mb-4">
                    <label class="label-text" for="password">Senha</label>
                    <label class="input input-bordered flex items-center gap-2">
                        {#if showPassword}
                            <input
                                name="password"
                                type="text"
                                class="grow"
                                placeholder="Senha"
                                spellcheck="false"
                                autocomplete="off"
                                bind:value={$form.password}
                            />
                        {:else}
                            <input
                                name="password"
                                type="password"
                                class="grow"
                                placeholder="Senha"
                                spellcheck="false"
                                autocomplete="off"
                                bind:value={$form.password}
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
                    {#if $errors.password}
                        <p class="text-error text-sm m-0 ml-1 mt-2">{$errors.password}</p>
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
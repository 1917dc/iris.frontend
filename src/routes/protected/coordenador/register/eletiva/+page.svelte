<script lang="ts">

</script>

<svelte:head>
    <title>Cadastro - Eletiva</title>
</svelte:head>
<div class="justify-center">
    <div class="prose m-auto select-none">
        <h1 class="text-center text-primary mt-20">Cadastro de Eletiva</h1>
        <form method="post" action="?/register" class="form-control">

            <div class="m-3">
                <label class="label-text" for="electiveName">Nome</label>
                <label class="input input-bordered flex items-center gap-2">
                    <input
                            name="electiveName"
                            type="text"
                            class="grow"
                            placeholder="Introdução à Programação, Filosofia Contemporânea"
                            spellcheck="false"
                            autocomplete="off"
                    />
                </label>
            </div>

            <div class="m-3">
                <label class="label-text" for="knowledgeArea">Área do Conhecimento</label>
                <label class="input input-bordered flex items-center gap-2">
                    <input
                            name="knowledgeArea"
                            type="text"
                            class="grow"
                            placeholder="Ciências, Humanidades, Tecnologia"
                            spellcheck="false"
                            autocomplete="off"
                    />
                </label>
            </div>

            <div class="m-3">
                <label class="label-text" for="professors">Professor Responsável</label>
                <label class="input input-bordered flex items-center gap-2">
                    <input
                            name="professors"
                            type="text"
                            class="grow"
                            placeholder="Maria Souza"
                            spellcheck="false"
                            autocomplete="off"
                    />
                </label>
            </div>

            <div class="m-3">
                <label class="label-text" for="prerequisites">Pré-requisitos</label>
                <label class="input input-bordered flex items-center gap-2">
                    <select name="class" class="grow">
                        <option value="">Selecione</option>
                        <option value="1">Matemática Básica</option>
                        <option value="2">Física Básica</option>
                        <option value="3">Algoritmos</option>
                    </select>
                </label>
            </div>

            <div class="m-3">
                <label class="label-text" for="workload">Carga Horária</label>
                <label class="input input-bordered flex items-center gap-2">
                    <input
                            name="workload"
                            type="number"
                            min="1"
                            max="40"
                            class="grow"
                            placeholder="2 horas semanais"
                            spellcheck="false"
                    />
                </label>
            </div>

            <div class="m-3">
                <label class="label-text" for="availableSlots">Vagas Disponíveis</label>
                <label class="input input-bordered flex items-center gap-2">
                    <input
                            name="availableSlots"
                            type="number"
                            min="1"
                            class="grow"
                            placeholder="30"
                            spellcheck="false"
                    />
                </label>
            </div>

            <button class="btn btn-primary m-10" type="submit">
                Registrar Eletiva
            </button>
        </form>

        <dialog id="modal_confirm" class="modal">
            <div class="modal-box prose">
                <h1 class="text-lg font-black">Aviso:</h1>
                <p class="font">
                    Ao confirmar esse diálogo, as alterações serão enviadas, verifique se
                    os dados estão realmente corretos.
                </p>
                <div class="modal-action">
                    <form method="dialog">
                        <button class="btn btn-success">
                            Confirmar
                        </button>
                        <button class="btn btn-error">
                            Cancelar
                        </button>
                    </form>
                </div>
            </div>
        </dialog>
    </div>
</div>
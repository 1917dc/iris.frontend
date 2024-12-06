<script lang="ts">

</script>

<svelte:head>
    <title>Cadastro - Aluno</title>
</svelte:head>
<div class="justify-center">
    <div class="prose m-auto select-none">
        <h1 class="text-center text-primary mt-20">Cadastro de Aluno</h1>
        <form method="post" action="?/register" class="form-control">

            <div class="m-3">
                <label class="label-text" for="fullName">Nome Completo</label>
                <label class="input input-bordered flex items-center gap-2">
                    <input
                            name="fullName"
                            type="text"
                            class="grow"
                            placeholder="Georgiana Soares"
                            spellcheck="false"
                            autocomplete="off"
                    />
                </label>
            </div>

            <div class="m-3">
                <label class="label-text" for="dob">Data de Nascimento</label>
                <label class="input input-bordered flex items-center gap-2">
                    <input
                            name="dob"
                            type="date"
                            class="grow"
                            spellcheck="false"
                    />
                </label>
            </div>

            <div class="m-3">
                <label class="label-text">Sexo</label>
                <div class="flex items-center gap-3">
                    <label class="cursor-pointer">
                        <input name="gender" type="radio" value="masculino" class="radio" />
                        Masculino
                    </label>
                    <label class="cursor-pointer">
                        <input name="gender" type="radio" value="feminino" class="radio" />
                        Feminino
                    </label>
                    <label class="cursor-pointer">
                        <input name="gender" type="radio" value="outro" class="radio" />
                        Outro
                    </label>
                </div>
            </div>

            <div class="m-3">
                <label class="label-text" for="address">Endereço</label>
                <label class="input input-bordered flex items-center gap-2">
                    <input
                            name="address"
                            type="text"
                            class="grow"
                            placeholder="Rua das Flores, 123"
                            spellcheck="false"
                            autocomplete="off"
                    />
                </label>
            </div>

            <div class="m-3">
                <label class="label-text" for="phone">Telefone</label>
                <label class="input input-bordered flex items-center gap-2">
                    <input
                            name="phone"
                            type="tel"
                            class="grow"
                            placeholder="(12) 93456-7891"
                            spellcheck="false"
                            autocomplete="off"
                    />
                </label>
            </div>

            <div class="m-3">
                <label class="label-text" for="class">Turma</label>
                <label class="input input-bordered flex items-center gap-2">
                    <select name="class" class="grow">
                        <option value="">Selecione a Turma</option>
                        <option value="1">1º Ano</option>
                        <option value="2">2º Ano</option>
                        <option value="3">3º Ano</option>
                    </select>
                </label>
            </div>

            <div class="m-3">
                <label class="label-text" for="class">Matrícula</label>
                <label class="input input-bordered flex items-center gap-2">
                    <input
                            name="class"
                            type="text"
                            class="grow"
                            placeholder="ABC123ZH"
                            spellcheck="false"
                            autocomplete="off"
                    />
                </label>
            </div>

            <button class="btn btn-primary m-10" type="submit">
                Registrar Aluno
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
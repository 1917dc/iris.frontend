<script lang="ts">
    import type { PageData } from "./$types";
    import { superForm } from "sveltekit-superforms";
    import { SquarePen } from "lucide-svelte";
  
    export let data: PageData;
    const { form, enhance } = superForm(data.form);
  
    const openModal = () => {
      const modal = document.getElementById("modal_confirm") as HTMLDialogElement;
      if (modal) {
        modal.showModal();
      }
    };
  
    const closeModal = () => {
      const modal = document.getElementById("modal_confirm") as HTMLDialogElement;
      if (modal) {
        modal.close();
      }
    };
  
    const confirmSubmit = () => {
        const validHorarios = horarios.filter(horario => 
            horario.diaDaSemana && horario.comeco && horario.fim
        );

        if (validHorarios.length === 0) {
            alert("Por favor, adicione pelo menos um horário válido.");
            return;
        }

      $form.horarios = horarios;

      const formElement = document.getElementById(
        "registerForm"
      ) as HTMLFormElement;
      if (formElement) {
        formElement.submit();
      }
    };

    const diasDaSemana = [
        { label: "Segunda-feira", value: "1" },
        { label: "Terça-feira", value: "2" },
        { label: "Quarta-feira", value: "3" },
        { label: "Quinta-feira", value: "4" },
        { label: "Sexta-feira", value: "5" },
        { label: "Sábado", value: "6" },
        { label: "Domingo", value: "7" },
    ];

    let horarios = $form.horarios ?? [
        { diaDaSemana: "", comeco: "", fim: "" }
    ];

    function addHorario() {
        horarios = [...horarios, { diaDaSemana: "", comeco: "", fim: "" }];
    }

    function removeHorario(index: number) {
        horarios = horarios.filter((_, i) => i !== index);
    }
</script>
  
<svelte:head>
    <title>Coordenador | Cadastro de Itinerário</title>
</svelte:head>
  
<div class="mt-[8vh] mx-[5vw]">
    <div
    class="flex items-center justify-center mb-12"
    >
      <h1 class="text-4xl font-semibold text-primary">
        Cadastro de Itinerário
      </h1>
    </div>
  
    <div class="prose m-auto select-none">
      <form class="form-control" id="registerForm" method="post" action="?/post" use:enhance>
        <label class="input input-bordered flex items-center gap-2 my-4">
          <input
            name="nome"
            type="text"
            class="grow"
            placeholder="Nome do itinerário"
            bind:value={$form.nome}
          />
          <SquarePen />
        </label>
  
        <label class="input input-bordered flex items-center gap-2 my-4">
            <select
                name="tipo"
                class="grow bg-transparent"
                bind:value={$form.tipo}
                required
            >
                <option value="" disabled selected hidden>Selecione o tipo</option>
                <option value="Trilha">Trilha</option>
                <option value="Oficina">Oficina</option>
            </select>
        </label>
          
  
        <label class="input input-bordered flex items-center gap-2 my-4">
          <input
            name="qtdVagas"
            type="number"
            class="grow"
            min="1"
            placeholder="Quantidade de vagas"
            bind:value={$form.qtdVagas}
          />
        </label>


        <h3 class="font-bold mt-6 mb-2">Horários</h3>
        {#each horarios as horario, index}
            <div class="flex gap-2 mb-4 items-center">
                <select
                    class="select select-bordered"
                    bind:value={horario.diaDaSemana}
                    required
                >
                    <option value="" disabled selected hidden>Dia da semana</option>
                    {#each diasDaSemana as dia}
                        <option value={dia.value}>{dia.label}</option>
                    {/each}
                </select>

                <input
                    type="time"
                    bind:value={horario.comeco}
                    class="input input-bordered"
                    required
                />

                <input
                    type="time"
                    bind:value={horario.fim}
                    class="input input-bordered"
                    required
                />

                <button type="button" class="btn btn-error" on:click={() => removeHorario(index)}>
                    Remover
                </button>
            </div>
        {/each}

        <button type="button" class="btn btn-primary mt-2" on:click={addHorario}>
            Adicionar horário
        </button>

  
        <button type="button" class="btn btn-primary mt-12" on:click={openModal}
          >Cadastrar Itinerário</button
        >
      </form>
  
      <dialog id="modal_confirm" class="modal">
        <div class="modal-box prose">
          <h1 class="text-lg font-black">Aviso:</h1>
          <p>
            Ao confirmar esse diálogo, as alterações serão enviadas. Verifique se
            os dados estão realmente corretos.
          </p>
          <div class="modal-action">
            <button class="btn btn-success" on:click={confirmSubmit}
              >Confirmar</button
            >
            <button class="btn btn-error" on:click={closeModal}>Cancelar</button>
          </div>
        </div>
      </dialog>
    </div>
</div>
  
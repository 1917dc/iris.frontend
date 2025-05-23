<script lang="ts">
    import { onMount } from 'svelte';
    
    let itinerariosTrilhas = [
      {
        nome: "Produção textual",
        disciplinas: ["Redação", "Gramática"],
        quantidadeVagasDisponíveis: 30,
        horarios: [
          { diaDaSemana: "segunda-feira", comeco: "08:00", fim: "09:30" },
          { diaDaSemana: "quarta-feira", comeco: "10:00", fim: "11:30" }
        ],
        tipo: "trilha",
        conflito: false
      },
      {
        nome: "Produção textual Avançada",
        disciplinas: ["Redação Avançada", "Literatura"],
        quantidadeVagasDisponíveis: 30,
        horarios: [
            { diaDaSemana: "terça-feira", comeco: "08:00", fim: "09:30" },
            { diaDaSemana: "quinta-feira", comeco: "15:00", fim: "18:30" }
        ],
        tipo: "trilha",
        conflito: false
        },
      {
        nome: "Ciências de Dados",
        disciplinas: ["Matemática", "Programação"],
        quantidadeVagasDisponíveis: 25,
        horarios: [
          { diaDaSemana: "segunda-feira", comeco: "09:00", fim: "10:30" },
          { diaDaSemana: "quinta-feira", comeco: "14:00", fim: "15:30" }
        ],
        tipo: "trilha",
        conflito: false
      }
    ];
  
    let itinerariosOficinas = [
      {
        nome: "Oficina de Fotografia",
        disciplinas: ["Fotografia Básica", "Edição de Imagens"],
        quantidadeVagasDisponíveis: 20,
        horarios: [
          { diaDaSemana: "segunda-feira", comeco: "14:00", fim: "15:30" },
          { diaDaSemana: "sexta-feira", comeco: "09:00", fim: "10:30" }
        ],
        tipo: "oficina",
        conflito: false
      },
      {
        nome: "Oficina de Pintura",
        disciplinas: ["Pintura Básica", "Técnicas de Cor"],
        quantidadeVagasDisponíveis: 15,
        horarios: [
          { diaDaSemana: "terça-feira", comeco: "11:00", fim: "12:30" },
          { diaDaSemana: "quinta-feira", comeco: "15:00", fim: "16:30" }
        ],
        tipo: "oficina",
        conflito: false
      }
    ];
  
    let itinerariosSelecionados: any[] = [];
    let modalVisible = false;
    let modalMessage = '';
    let modalType = '';

    function verificarConflito(itinerarioSelecionado: any) {
      return itinerariosSelecionados.some(it => {
        return itinerarioSelecionado.horarios.some(horario1 => 
          it.horarios.some(horario2 => 
            horario1.diaDaSemana === horario2.diaDaSemana &&
            ((horario1.comeco >= horario2.comeco && horario1.comeco < horario2.fim) ||
            (horario2.comeco >= horario1.comeco && horario2.comeco < horario1.fim))
          )
        );
      });
    }
  
    function selecionarItinerario(itinerario: any) {
      if (verificarConflito(itinerario)) {
        itinerario.conflito = true;
        showModal("Você não pode se inscrever em itinerários com horários conflitantes.", 'error');
        return;
      }

      if (!itinerariosSelecionados.includes(itinerario)) {
        itinerariosSelecionados = [...itinerariosSelecionados, itinerario];
      }
      itinerario.conflito = false;
      showModal(`Inscrição realizada com sucesso no itinerário: ${itinerario.nome}`, 'success');
    }
  
    function removerItinerario(itinerario: any) {
      itinerariosSelecionados = itinerariosSelecionados.filter(item => item !== itinerario);
      itinerario.conflito = false;
      showModal(`Removido do itinerário: ${itinerario.nome}`, 'success');
    }
  
    function showModal(message: string, type: string) {
      modalMessage = message;
      modalType = type;
      modalVisible = true;
    }
  
    function closeModal() {
      modalVisible = false;
    }
  </script>
  
  <div class="max-w-screen-xl mx-auto px-6 py-12">
    <header class="mb-10 text-center">
      <h1 class="text-4xl font-bold text-primary mb-2">Inscrição de Itinerários</h1>
      <p class="text-xl text-gray-700">
        A data limite de inscrição é <strong class="text-red-500">2025-05-28</strong>.
      </p>
      <p class="text-lg mt-4 text-gray-600">
        Selecione os itinerários abaixo. Você não pode se inscrever em itinerários que tenham conflito de horários.
      </p>
    </header>
  
    <section class="mb-16">
      <h2 class="text-3xl font-semibold text-primary mb-4">Trilhas</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each itinerariosTrilhas as itinerario}
          <div class="bg-gray-100 shadow-lg rounded-lg p-6 flex flex-col">
            <h3 class="text-xl font-semibold text-primary mb-3">{itinerario.nome}</h3>
            <p class="text-md text-gray-700 mb-4">Disciplinas: {itinerario.disciplinas.join(", ")}</p>
            <p class="text-md text-gray-600">Vagas Disponíveis: <strong>{itinerario.quantidadeVagasDisponíveis}</strong></p>
            <div class="mt-2 mb-4">
              <p class="font-medium text-gray-800">Horários:</p>
              {#each itinerario.horarios as horario}
                <p class="text-sm text-gray-600">
                  {horario.diaDaSemana} - {horario.comeco} às {horario.fim}
                </p>
              {/each}
            </div>
            
            <button 
              class="btn btn-primary mt-auto"
              on:click={() => selecionarItinerario(itinerario)}
              disabled={itinerario.conflito}
            >
              {itinerario.conflito ? "Horário em conflito" : "Inscrever-se"}
            </button>
            
            {#if itinerariosSelecionados.includes(itinerario)}
              <button 
                class="btn btn-danger mt-2"
                on:click={() => removerItinerario(itinerario)}
              >
                Remover
              </button>
            {/if}
          </div>
        {/each}
      </div>
    </section>
  
    <section>
      <h2 class="text-3xl font-semibold text-primary mb-4">Oficinas</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each itinerariosOficinas as itinerario}
          <div class="bg-gray-100 shadow-lg rounded-lg p-6 flex flex-col">
            <h3 class="text-xl font-semibold text-primary mb-3">{itinerario.nome}</h3>
            <p class="text-md text-gray-700 mb-4">Disciplinas: {itinerario.disciplinas.join(", ")}</p>
            <p class="text-md text-gray-600">Vagas Disponíveis: <strong>{itinerario.quantidadeVagasDisponíveis}</strong></p>
            <div class="mt-2 mb-4">
              <p class="font-medium text-gray-800">Horários:</p>
              {#each itinerario.horarios as horario}
                <p class="text-sm text-gray-600">
                  {horario.diaDaSemana} - {horario.comeco} às {horario.fim}
                </p>
              {/each}
            </div>
      
            <button 
              class="btn btn-primary mt-auto"
              on:click={() => selecionarItinerario(itinerario)}
              disabled={itinerario.conflito}
            >
              {itinerario.conflito ? "Horário em conflito" : "Inscrever-se"}
            </button>
            
            {#if itinerariosSelecionados.includes(itinerario)}
              <button 
                class="btn btn-danger mt-2"
                on:click={() => removerItinerario(itinerario)}
              >
                Remover
              </button>
            {/if}
          </div>
        {/each}
      </div>
    </section>
    <div class="flex justify-center mt-6">
        <button 
          class="btn btn-primary w-96 mt-20"
        >
          Salvar tudo e enviar
        </button>
    </div>
</div>

{#if modalVisible}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm">
        <h2 class="text-xl font-bold text-center text-{modalType === 'error' ? 'red' : 'green'}-500 mb-4">
            {modalType === 'error' ? 'Erro' : 'Sucesso'}
        </h2>
        <p class="text-center text-gray-700 mb-6">{modalMessage}</p>
        <div class="flex justify-center gap-4">
            <button class="btn btn-success" on:click={closeModal}>Fechar</button>
        </div>
        </div>
    </div>
{/if}
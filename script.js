document.addEventListener("DOMContentLoaded", () => {
  const cepInput = document.getElementById("cep-input");
  const searchButton = document.getElementById("search-button");
  const statusContainer = document.getElementById("error-container");
  const statusMessage = document.getElementById("error-message");
  const cepResult = document.getElementById("cep-result");
  const logradouroResult = document.getElementById("logradouro-result");
  const bairroResult = document.getElementById("bairro-result");
  const cidadeResult = document.getElementById("cidade-result");
  const ufResult = document.getElementById("uf-result");
  const dddResult = document.getElementById("ddd-result");
  const loading = document.getElementById("loading");
  const resultItems = document.querySelectorAll(".result-item");

  let map = null;
  let marker = null;
  if (typeof L === "undefined") {
    statusContainer.classList.remove("hidden");
    statusMessage.textContent =
      "Erro ao carregar o mapa. Verifique sua conexão.";
    return;
  }
  function initMap() {
    try {
      map = L.map("map").setView([-14.7142548, -53.5273951, 4.71], 4);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
    } catch (error) {
      statusContainer.classList.remove("hidden");
      statusMessage.textContent = "Erro ao inicializar o mapa.";
    }
  }
  initMap();
  cepInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 5) {
      value = value.substring(0, 5) + "-" + value.substring(5, 8);
    }
    e.target.value = value;
  });
  function validateCEP(cep) {
    const cleanCEP = cep.replace(/\D/g, "");
    return cleanCEP.length === 8;
  }
  async function fetchCEP(cep) {
    try {
      const cleanCEP = cep.replace(/\D/g, "");
      const response = await fetch(
        `https://viacep.com.br/ws/${cleanCEP}/json/`
      );
      if (!response.ok) {
        throw new Error("Erro na comunicação com a API");
      }
      const data = await response.json();
      if (data.erro) {
        throw new Error("CEP não encontrado");
      }
      return data;
    } catch (error) {
      throw error;
    }
  }

  function displayResult(data) {
    console.log("Exibindo resultados:", data);
    cepResult.textContent = data.cep;
    logradouroResult.textContent = data.logradouro;
    bairroResult.textContent = data.bairro;
    cidadeResult.textContent = data.localidade;
    ufResult.textContent = data.uf;
    dddResult.textContent = data.ddd;
    resultItems.forEach((item) => item.classList.remove("hidden"));
    updateMap(data);
  }
  async function updateMap(address) {
    try {
      let query = `${address.localidade}, ${address.uf}`;
      if (address.bairro) query += `, ${address.bairro}`;
      if (address.logradouro) query += `, ${address.logradouro}`;
      let response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}&limit=1`
      );
      let data = await response.json();
      if (!data || data.length === 0) {
        const simpleQuery = `${address.localidade}, ${address.uf}`;
        response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            simpleQuery
          )}&limit=1`
        );
        data = await response.json();
      }
      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        if (!map) {
          console.log("Mapa não inicializado, inicializando...");
          initMap();
        }
        if (marker) {
          console.log("Removendo marcador anterior");
          map.removeLayer(marker);
        }
        console.log("Centralizando mapa nas coordenadas:", lat, lon);
        map.setView([lat, lon], 16);
        marker = L.marker([lat, lon])
          .addTo(map)
          .bindPopup(
            `<b>${address.logradouro || "Endereço"}</b><br>${
              address.bairro || ""
            }, ${address.localidade} - ${address.uf}`
          )
          .openPopup();
        console.log("Mapa atualizado com sucesso");
      } else {
        showStatus(
          "Não foi possível encontrar a localização deste endereço no mapa. Exibindo a cidade.",
          "error"
        );
      }
    } catch (error) {
      showStatus("Erro ao buscar localização no mapa.", "error");
    }
  }
  function showStatus(message, type = "error") {
    statusMessage.textContent = message;
    statusContainer.classList.remove("hidden");
    statusContainer.classList.add(type);
  }
  function clearResults() {
    cepResult.textContent = "";
    logradouroResult.textContent = "";
    bairroResult.textContent = "";
    cidadeResult.textContent = "";
    ufResult.textContent = "";
    dddResult.textContent = "";
    resultItems.forEach((item) => item.classList.add("hidden"));
    if (map) {
      if (marker) {
        map.removeLayer(marker);
        marker = null;
      }
      map.setView([-14.7142548, -53.5273951, 4.71], 4);
    }
    statusContainer.classList.add("hidden");
    statusContainer.className = "error-container hidden";
    statusMessage.textContent = "";
  }
  async function searchCEP() {
    const cep = cepInput.value.trim();
    clearResults();
    if (!validateCEP(cep)) {
      console.log("CEP inválido");
      showStatus("CEP inválido. Digite um CEP valido", "error");
      return;
    }
    loading.classList.remove("hidden");
    try {
      console.log("Buscando CEP na API:", cep);
      const data = await fetchCEP(cep);
      console.log("Dados recebidos da API:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      displayResult(data);
    } catch (error) {
      console.error("Erro na busca de CEP:", error);
      showStatus(error.message, "error");
    } finally {
      loading.classList.add("hidden");
    }
  }
  searchButton.addEventListener("click", searchCEP);
  cepInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      searchCEP();
    }
  });
});

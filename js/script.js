// Armazenando a URL em uma variável, usamos let porque o valor da url vai ser alterada ao passarmos de página.
let apiUrl = 'https://swapi.dev/api/people/';

// window.onload --> "toda vez que a página carregar" ai passamos o que é pra fazer (função)

// Bloco Try-Cat
  // Try --> "tentativa" "tente fazer isso que estar dentro de chaves {comandos}"
  // Catch --> caso não seja bem sucedida ele entra no catch {"error ou outro comando que você passar"}
window.onload = async () => {
  try {
    await carregarPersonagens(apiUrl); // Essa função vai pegar a url da api e vai fazer uma requisição, vai trazer os resultados e transformar em cards.
  } catch (error) {
    console.log(error);
    alert('Erro ao carregar cards');
  }}

  const nextButton = document.getElementById('next-button');
  nextButton.addEventListener('click', loadNextPage);

  const backButton = document.getElementById('back-button');
  backButton.addEventListener('click', loadPreviousPage);


async function carregarPersonagens(url) {
  const mainContent = document.getElementById('main-content');
  mainContent.innerHTML = ''; // Limpa os resultados anteriores

  try {
    const respostaDaRequisição = await fetch(url); //O "fetch" é como um mensageiro que vai até a internet e traz de volta as informações que pedimos.

    const respostaEmJson = await respostaDaRequisição.json();

    respostaEmJson.results.forEach((personagem) => {
      const card = document.createElement('div')
      card.style.backgroundImage = `url("https://starwars-visualguide.com/assets/img/characters/${personagem.url.replace(/\D/g, "")}.jpg")`
      card.className = "cards"

      const characterNameBG = document.createElement("div");
      characterNameBG.className = "character-name-bg";

      const characterName = document.createElement("span");
      characterName.className = "character-name";
      characterName.innerText = `${personagem.name}`; //a propriedade "innerText" é usada para obter ou definir o texto visível dentro de um elemento HTML, excluindo qualquer marcação HTML.

      characterNameBG.appendChild(characterName);
      card.appendChild(characterNameBG);

      card.onclick = () => {
        const modal = document.getElementById("modal")
        modal.style.visibility = "visible";

        const modalContent = document.getElementById("modal-content")
        modalContent.innerHTML = "";

        const characterImage = document.createElement('div')
        characterImage.style.backgroundImage = `url("https://starwars-visualguide.com/assets/img/characters/${personagem.url.replace(/\D/g, "")}.jpg"`
        characterImage.className = "character-image"

        const name = document.createElement("span")
        name.className = "character-details"
        name.innerText = `Nome: ${personagem.name}`;

        const height = document.createElement("span")
        height.className = "character-details"
        height.innerText = `Altura: ${convertHeight(personagem.height)}`;

        const mass = document.createElement("span")
        mass.className = "character-details"
        mass.innerText = `Peso: ${convertMass(personagem.mass)}`;

        const eyeColor = document.createElement("span")
        eyeColor.className = "character-details"
        eyeColor.innerText = `Cor dos olhos: ${convertEyeColor(personagem.eye_color)}`;

        const birthYear = document.createElement("span")
        birthYear.className = "character-details"
        birthYear.innerText = `Nascimento: ${convertBirthYear(personagem.birth_year)}`;

        modalContent.appendChild(characterImage);
        modalContent.appendChild(name);
        modalContent.appendChild(height);
        modalContent.appendChild(mass);
        modalContent.appendChild(eyeColor);
        modalContent.appendChild(birthYear);
      }
      mainContent.appendChild(card);
    });

    
    const nextButton = document.getElementById('next-button');
    nextButton.addEventListener('click', loadNextPage);

    const backButton = document.getElementById('back-button');
    backButton.addEventListener('click', loadPreviousPage);

    nextButton.disabled = !respostaEmJson.next;
    backButton.disabled = !respostaEmJson.previous;

    backButton.style.visibility = respostaEmJson.previous ? "visible" : "hidden"


    apiUrl = url;

  }catch (error) {
    alert("erro ao carregar personagens");
    console.log(error);
  }
  
} 

async function loadNextPage(){
  if(!apiUrl) return;

  try{
    const respostaDaRequisição = await fetch(apiUrl)
    const respostaEmJson = await respostaDaRequisição.json();

    await carregarPersonagens(respostaEmJson.next)
  }catch(error){
    console.log(error)
    alert("Erro ao carregar a próxima página")
  }
}

async function loadPreviousPage(){
  if(!apiUrl) return;

  try{
    const respostaDaRequisição = await fetch(apiUrl)
    const respostaEmJson = await respostaDaRequisição.json();

    await carregarPersonagens(respostaEmJson.previous)
  }catch(error){
    console.log(error)
    alert("Erro ao carregar a página anterior")
  }
}

function hideModal(){
  const modal = document.getElementById("modal")
  modal.style.visibility = "hidden"
}

function convertEyeColor(eyeColor) {
    const cores = {
      blue: "azul",
      brown: "castanho",
      green: "verde",
      yellow: "amarelo",
      black: "preto",
      pink: "rosa",
      red: "vermelho",
      orange: "laranja",
      hazel: "avela",
      unknown: "desconhecida"
    };
  
    return cores[eyeColor.toLowerCase()] || eyeColor;
  }
  
  function convertHeight(height) {
    if (height === "unknown") {
      return "desconhecida";
    }
    
    return (height / 100).toFixed(2);
  }
  
  function convertMass(mass) {
    if (mass === "unknown") {
      return "desconhecido";
    }
    
    return `${mass} kg`;
  }
  
  function convertBirthYear(birthYear) {
    if (birthYear === "unknown") {
      return "desconhecido";
    }
    
    return birthYear;
  }
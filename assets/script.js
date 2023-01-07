

let h2 = document.querySelector('h2');

var map;
console.log(map);
// Função para localização exata, aparti de Logitude e latitude
function sucess(pos){
	console.log(pos.coords.latitude, pos.coords.longitude);
//h2.textContent =  `Latitude:${pos.coords.latitude}, Longitude:${pos.coords.longitude}`;

// se não existe nenhum valor ao map. crie o mapa
// Essa condição foi feita para que quando muda de posição o nosso mapa também vai mudar 
if (map === undefined){

    map = L.map('mapid').setView([pos.coords.latitude,pos.coords.longitude], 13);

    // se não removar o mapa recrie ele
} else {

    map.remove();
    map = L.map('mapid').setView([pos.coords.latitude,pos.coords.longitude], 13);
}



// função de renderização do mapa
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// função para o marcado  do map
L.marker([pos.coords.latitude,pos.coords.longitude]).addTo(map)
    .bindPopup('Você esta aqui !.')
    .openPopup();
}


// Função para o erro, se não permitir a localização retorna essa função//
function error(err){
console.long(err);

}


/*Metodo watchPosition vai servi para quando usuário muda de localização,
ela mude também, mostre o local de onde ela estive, fica obsevando o usuário sempre que ele mudar */
var watchID = navigator.geolocation.watchPosition(sucess,error,{

// vamos usa uma função para que a localização seja mas precisa //
	// obs. consume mas bateria//
   enableHighAccuracy: true,

   //uma opção, para que se o navegador fica demorando para conseguir a localização,
    //eu quero que ele pare de fica tentando, usando isso
   timeout:5000});

/* usando a função clearWatch ele não exibi na página a localização*/
//navigator.geolocation.clearWatch(watchID);


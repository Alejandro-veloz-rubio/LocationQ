Descripcion de la actividad

Se consume servicios de terceros utilizando una interfaz html donde recibe los datos de latitud y longitud del lugar a encontrar y presionando un boton se da el display name del lugar para que despues se de tambien el clima de dicho lugar.

El html recibira los datos necesarios atraves de inputs, se creo un button en cual iniciara el proceso de ejecucion en el archivo js. y un div para poner el display_name y otro div para el clima de la ciudad.

El html antes mencionado tiene un script que se enlaza a un archivo .js este archivo js lo que hara es consumir los servicios de locationq con el metodo fetch y promesas (.then),aclarando que antes se deben crear unas variables que se enlacen con los valores de lat y lon ademas de añadirlas al url para que asi busque el que deseamos,

let lat=document.getElementById('latitud').value;
let lon=document.getElementById('longitud').value;

fetch('https://us1.locationiq.com/v1/reverse.php?key=pk.3e0679bd56cc92f2106d1f0a3403498c&lat='+lat+'&lon='+lon+'&format=json')
  .then(response => response.json())
  .then(json => {});

 para brindarnos la informacion completa del lugar que decidimos buscar pero lo unico que se necesita es el "display name"(json.display_name) una vez que se tiene la informacion se crea una variable que se enlace a un div del html antres mencionado y por medio de un innerHTML se añade un parrafo con la informacion requerida

let result=document.getElementById('resultados');
      result.innerHTML=`
      <p>Nombre para mostrar: ${json.display_name} </p>
      `;

,dentro del ultimo .then del fetch principal se hara otra llamada (igual con el metodo fetch y promesas) a weatherstack para saber el "weather_descriptions"(json2.current.weather_descriptions) de la ciudad antes buscada, todo esto, se ejecuta con el click del boton, el cual tendra un addEventListener.

let btnbuscar=document.getElementById('btnbuscar');
btnbuscar.addEventListener('click',()=>{
let lat=document.getElementById('latitud').value;
let lon=document.getElementById('longitud').value;
fetch('https://us1.locationiq.com/v1/reverse.php?key=pk.3e0679bd56cc92f2106d1f0a3403498c&lat='+lat+'&lon='+lon+'&format=json')
  .then(response => response.json())
  .then(json => {
      let result=document.getElementById('resultados');
      result.innerHTML=`
      <p>Nombre para mostrar: ${json.display_name} </p>
      `;
      fetch('http://api.weatherstack.com/current?access_key=f51f659fde487e91a24fe0803c4dc253&query='+json.address.city)
      .then(response => response.json())
      .then(json2 => {
          let clima=document.getElementById('resclima');
          clima.innerHTML=`
          <p>Clima de la ciudad de ${json.address.city}: ${json2.current.weather_descriptions}</p>
          `
      });
    });
});

Los resultados obtenidos como el display name y el weather_descriptions se mostraran en dos divs diferentes uno para cada uno.
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
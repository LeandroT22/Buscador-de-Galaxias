document.getElementById('btnBuscar').addEventListener('click', function () {
  let query = document.getElementById('inputBuscar').value.trim();

  // Si el input está vacío, no hacer la búsqueda
  if (!query) {
    alert('Por favor, ingresa un término de búsqueda.');
    return;
  }

  // URL de la API con el parámetro de búsqueda
  let url = `https://images-api.nasa.gov/search?q=${query}&media_type=image`;

  // Hacer la solicitud a la API de la NASA
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const results = data.collection.items;

      // Limpiar el contenedor antes de mostrar nuevos resultados
      let contenedor = document.getElementById('contenedor');
      contenedor.innerHTML = '';

      // Si no se encontraron resultados
      if (results.length === 0) {
        contenedor.innerHTML = '<p>No se encontraron imágenes.</p>';
        return;
      }

      // Iterar sobre los resultados y generar el contenido HTML
      results.forEach(item => {
        let { title, description, date_created } = item.data[0];
        let imageUrl = item.links ? item.links[0].href : '';

        // Crear el contenedor de la tarjeta con la información
        let card = document.createElement('div');
        card.classList.add('card', 'mb-4');

        card.innerHTML = `
          <img src="${imageUrl}" class="card-img-top" alt="${title}">
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${description ? description : 'No hay descripción disponible.'}</p>
            <p class="card-text"><small class="text-muted">Fecha: ${new Date(date_created).toLocaleDateString()}</small></p>
          </div>
        `;

        contenedor.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Error al realizar la búsqueda:', error);
      let contenedor = document.getElementById('contenedor');
      contenedor.innerHTML = '<p>Ocurrió un error al realizar la búsqueda. Por favor, intenta nuevamente.</p>';
    });
});

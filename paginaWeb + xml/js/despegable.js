document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM completamente cargado y parseado'); // Depuración

    // Seleccionar el botón por su ID
    const temporadaButton = document.getElementById('temporada');

    // Asociar el evento click al botón
    temporadaButton.addEventListener('click', async function (e) {
        e.preventDefault(); // Prevenir comportamiento por defecto del enlace

        try {
            const response = await fetch('/xml'); // Obtener el listado de archivos XML
            if (!response.ok) {
                throw new Error('Error al obtener los archivos XML: ' + response.statusText);
            }

            const xmlText = await response.text(); // Obtener el contenido como texto

            const regex = /<a href="([^"]+\.xml)">/g;
            let match;
            const xmlFiles = [];

            // Iteramos sobre todas las coincidencias
            while ((match = regex.exec(xmlText)) !== null) {
                xmlFiles.push(match[1]);
            }

            // Renderizar el contenido dinámico mediante AJAX
            const dropdownContent = document.querySelector('.dropdown-content');
            if (dropdownContent) {
                // Limpiar el contenido previo
                dropdownContent.innerHTML = '';

                // Agregar los nombres de los archivos como elementos
                xmlFiles.forEach(file => {
                    const item = document.createElement('a'); // Crear un elemento <a>
                    item.href = `#`; // Previene el comportamiento por defecto
                    item.textContent = file.replace('.xml', ''); // Asignar el nombre del archivo como texto

                    // Agregar un evento click al elemento
                    item.addEventListener('click', async function (e) {
                        e.preventDefault(); // Prevenir el comportamiento por defecto
                        await loadXMLContent(file); // Cargar el contenido del archivo XML
                    });

                    dropdownContent.appendChild(item); // Añadir el elemento al dropdown
                });
            } else {
                console.error('El contenedor dropdown-content no existe.');
            }

            console.log(xmlFiles); // Depuración
        } catch (error) {
            console.error('Hubo un problema al obtener el archivo XML:', error);
        }
    });

    // Función para cargar y renderizar el contenido del XML
    async function loadXMLContent(fileName) {
        try {
            const xmlResponse = await fetch(`/xml/${fileName}`); // Obtener el archivo XML
            if (!xmlResponse.ok) {
                throw new Error('Error al obtener el archivo XML: ' + xmlResponse.statusText);
            }

            const xsltResponse = await fetch('/xml/clasificacion.xslt'); // Obtener el archivo XSLT
            if (!xsltResponse.ok) {
                throw new Error('Error al obtener el archivo XSLT: ' + xsltResponse.statusText);
            }

            const xmlText = await xmlResponse.text(); // Convertir XML a texto
            const xsltText = await xsltResponse.text(); // Convertir XSLT a texto

            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, "application/xml");
            const xsltDoc = parser.parseFromString(xsltText, "application/xml");

            // Procesar el XML con el XSLT
            const xsltProcessor = new XSLTProcessor();
            xsltProcessor.importStylesheet(xsltDoc);

            const transformedFragment = xsltProcessor.transformToFragment(xmlDoc, document);

            // Seleccionar el contenedor con la clase 'contenido'
            const contentContainer = document.querySelector('#tabla-clasificacion');
            if (contentContainer) {
                contentContainer.innerHTML = ''; // Limpiar contenido previo
                contentContainer.appendChild(transformedFragment); // Insertar el contenido transformado
            } else {
                console.error('El contenedor con la clase "contenido" no existe.');
            }

        } catch (error) {
            console.error('Hubo un problema al cargar o transformar el contenido del archivo XML:', error);
        }
    }
});

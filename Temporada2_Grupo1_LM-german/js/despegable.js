document.addEventListener('DOMContentLoaded', function() {
    fetch('../xml/')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, 'text/html');
            const links = xmlDoc.querySelectorAll('a');
            const dropdownContent = document.getElementById('dropdown-content');
            
            links.forEach(link => {
                const href = link.getAttribute('href');
                if (href.endsWith('.xml')) {
                    const a = document.createElement('a');
                    a.href = `../xml/${href}`;
                    a.textContent = href;
                    a.addEventListener('click', function(event) {
                        event.preventDefault();
                        console.log(`Cargando contenido del archivo: ${a.href}`);
                        loadXMLContent(a.href);
                    });
                    dropdownContent.appendChild(a);
                }
            });
        })
        .catch(error => console.error('Error al obtener los archivos XML:', error));
});

function loadXMLContent(url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            console.log('Contenido del archivo XML cargado correctamente.');
            console.log('Contenido del XML:', data); // Agrega este mensaje de depuración
            const parser = new DOMParser();
            let xmlDoc;
            try {
                xmlDoc = parser.parseFromString(data, 'application/xml');
            } catch (e) {
                console.error('Error al analizar el XML:', e);
                return;
            }

            const pi = Array.from(xmlDoc.childNodes).find(node => node.nodeType === Node.PROCESSING_INSTRUCTION_NODE && node.target === 'xml-stylesheet');
            if (!pi) {
                console.error('No se encontró la instrucción de procesamiento xml-stylesheet en el archivo XML.');
                return;
            }

            const match = pi.data.match(/href="([^"]+)"/);
            if (!match) {
                console.error('No se encontró una hoja de estilo XSLT en la instrucción de procesamiento.');
                return;
            }

            const xslStylesheet = match[1];
            const xslStylesheetUrl = new URL(xslStylesheet, url).href;

            console.log(`Cargando hoja de estilo XSLT desde: ${xslStylesheetUrl}`);
            fetch(xslStylesheetUrl)
                .then(response => {
                    console.log(`Estado de la respuesta: ${response.status} ${response.statusText}`);
                    if (!response.ok) {
                        throw new Error(`Error al cargar el XSLT: ${response.statusText}`);
                    }
                    return response.text();
                })
                .then(xsltData => {
                    console.log('Hoja de estilo XSLT cargada correctamente.');
                    const xslDoc = parser.parseFromString(xsltData, 'application/xml');
                    const xsltProcessor = new XSLTProcessor();
                    xsltProcessor.importStylesheet(xslDoc);
                    const resultDocument = xsltProcessor.transformToFragment(xmlDoc, document);
                    const tablaClasificacion = document.getElementById('tabla-clasificacion');
                    tablaClasificacion.innerHTML = '';
                    tablaClasificacion.appendChild(resultDocument);
                    console.log('Contenido del archivo XML transformado y mostrado correctamente.');
                })
                .catch(error => console.error('Error al cargar el XSLT:', error));
        })
        .catch(error => console.error('Error al cargar el XML:', error));
}
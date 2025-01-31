// Función para cargar un archivo XML de manera asíncrona
async function loadXMLDocAsync(filename) {
    const response = await fetch(filename);
    if (!response.ok) {
        throw new Error(`Error al cargar el archivo: ${response.statusText}`);
    }
    const text = await response.text();
    const parser = new DOMParser();
    return parser.parseFromString(text, 'application/xml');
}

// Función principal para cargar y transformar el XML
async function loadAndTransformXML() {
    try {
        const [xml, xsl] = await Promise.all([
            loadXMLDocAsync("../xml/2024.xml"),
            loadXMLDocAsync("../xml/clasificacion.xslt")
        ]);

        // Código para transformar el XML usando el XSLT
        if (window.ActiveXObject || "ActiveXObject" in window) {
            // Para IE
            let ex = xml.transformNode(xsl);
            document.getElementById("tabla-clasificacion").innerHTML = ex;
           

        } else if (document.implementation && document.implementation.createDocument) {
            // Para otros navegadores
            let xsltProcessor = new XSLTProcessor();
            xsltProcessor.importStylesheet(xsl);
            let resultDocument = xsltProcessor.transformToFragment(xml, document);
            document.getElementById("tabla-clasificacion").appendChild(resultDocument);
            
        }
    } catch (error) {
        console.error('Error al cargar o transformar el XML:', error);
    }
}

// Llamar a la función principal
loadAndTransformXML();
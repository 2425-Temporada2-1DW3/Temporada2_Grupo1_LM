// Función para cargar un archivo XML
function loadXMLDoc(filename) {
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", filename, false);
    xhttp.send();
    return xhttp.responseXML;
}

// Cargar el archivo XML y XSLT
let xml = loadXMLDoc("../xml/clasificacion.xml");
let xsl = loadXMLDoc("../xml/clasificacion.xslt");

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
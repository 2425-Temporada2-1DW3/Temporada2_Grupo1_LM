$(document).ready(function () {
    function obtenerNombreDeArchivo(url) {
        var ruta = url.split("/");
        return ruta.pop();
    }

    function obtenerNombreSinExtension(url) {
        var ruta = url.split("/");
        var nombreArchivoConExtension = ruta.pop();
        return nombreArchivoConExtension.split(".")[0];
    }

    function cargarContenido(url) {
        $.ajax({
            url: url,
            method: "GET",
            dataType: "html",
            success: function (data) {
                $("#contenido").html(data);

                // Obtener el nombre del archivo sin extensión
                var nombreSinExtension = obtenerNombreSinExtension(url);

                // Cargar el estilo CSS correspondiente
                cargarEstiloCSS(nombreSinExtension);

                // Cambiar el título de la página
                $(document).attr(
                    "title",
                    nombreSinExtension.charAt(0).toUpperCase() +
                    nombreSinExtension.slice(1) +
                    " - F.E.R."
                );
            },
            error: function () {
                $("#contenido").html("Error al cargar el contenido.");
            },
        });
    }

    function cargarEstiloCSS(nombre) {
        // Eliminar cualquier hoja de estilo dinámica previamente añadida
        $("link[data-dinamico='true']").remove();

        // Crear una nueva hoja de estilo si corresponde
        var rutaCSS = `./css/${nombre}.css`;
        $("<link>")
            .attr({
                rel: "stylesheet",
                href: rutaCSS,
                type: "text/css",
                "data-dinamico": "true",
            })
            .appendTo("head");
    }

    // Asociar eventos al hacer clic en los elementos del menú
    $("nav ul li").on("click", function () {
        var url = $(this).data("url");
        cargarContenido(url);
    });

    // Asociar eventos al hacer clic en los elementos de los equipos
    $(document).on("click", ".equipos-escudo", function (e) {
        e.preventDefault(); // Prevenir el comportamiento por defecto del enlace
        var url = $(this).data("url");
        cargarContenido(url);
    });

    // Cargar contenido predeterminado al cargar la página
    cargarContenido($("nav ul li:first").data("url"));
});
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:ns="http://www.example.com/clasificacion">
    <xsl:template match="/">
        <html>
            <head>
                <link rel="stylesheet" type="text/css" href="../css/temporadas.css" />
            </head>
            <body>
                <h1 style="color: white;">Clasificación</h1>
                <table class="clasificacion">
                    <tr>
                        <th>Posición</th>
                        <th>Equipo</th>
                        <th>Puntos</th>
                        <th>Victorias</th>
                        <th>Derrotas</th>

                    </tr>
                    <xsl:for-each select="ns:tabla/ns:fila">
                        <tr>
                            <td>
                                <xsl:value-of select="ns:posicion" />
                            </td>
                            <td>
                                <xsl:value-of select="ns:equipo" />
                            </td>
                            <td>
                                <xsl:value-of select="ns:puntos" />
                            </td>
                            <td>
                                <xsl:value-of select="ns:victorias" />
                            </td>
                            <td>
                                <xsl:value-of select="ns:derrotas" />
                            </td>
                        </tr>
                    </xsl:for-each>
                </table>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
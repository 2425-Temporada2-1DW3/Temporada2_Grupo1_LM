<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <html>
            <head>
                <link rel="stylesheet" type="text/css" href="../css/temporadas.css" />
            </head>
            <body>
                <h1 style="color: white;">Clasificación</h1>
                <table class="clasificacion">
                    <tr>
                        <th>Equipo</th>
                        <th>Puntos</th>
                        <th>Victorias</th>
                        <th>Derrotas</th>
                    </tr>
                    <!-- Sin el prefijo "ns", ya no es necesario -->
                    <xsl:for-each select="temporadas/Clasificacion/fila">
                        <tr>
                            <td><xsl:value-of select="equipo" /></td> <!-- Directamente el nombre de la etiqueta -->
                            <td><xsl:value-of select="puntos" /></td>
                            <td><xsl:value-of select="victorias" /></td>
                            <td><xsl:value-of select="derrotas" /></td>
                        </tr>
                    </xsl:for-each>
                </table>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>

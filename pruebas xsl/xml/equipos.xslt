<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <html>
            <head>
                <link rel="stylesheet" type="text/css" href="../css/temporadas.css" />
            </head>
            <body>
                <h1 style="color: white;">Equipos</h1>
                <table class="equipos">
                    <tr>
                        <th>Escudo</th>
                        <th>Nombre</th>
                        <th>Jugador 1</th>
                        <th>Jugador 2</th>
                        <th>Jugador 3</th>
                        <th>Jugador 4</th>
                        <th>Jugador 5</th>
                        <th>Jugador 6</th>
                    </tr>
                    <xsl:for-each select="temporadas/Equipos/Equipo">
                        <tr>
                            <td><xsl:value-of select="ns:escudo" /></td>
                            <td><xsl:value-of select="ns:nombre" /></td>
                            <td><xsl:value-of select="ns:jugador1" /></td>
                            <td><xsl:value-of select="ns:jugador2" /></td>
                            <td><xsl:value-of select="ns:jugador3" /></td>
                            <td><xsl:value-of select="ns:jugador4" /></td>
                            <td><xsl:value-of select="ns:jugador5" /></td>
                            <td><xsl:value-of select="ns:jugador6" /></td>
                        </tr>
                    </xsl:for-each>
                </table>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
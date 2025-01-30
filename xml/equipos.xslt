<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:ns="http://www.example.com/clasificacion">
    <xsl:template match="/">
        <html>
            <head>
                <title>Equipos</title>
                <link rel="stylesheet" type="text/css" href="../css/equipos.css" />
            </head>
            <body>
                <table border="1">
                    <thead>
                        <tr>
                            <th>Escudo</th>
                            <th>Jugadores</th>
                        </tr>
                    </thead>
                    <tbody>
                        <xsl:for-each select="ns:documento/ns:equipos/ns:equipo">
                            <tr>
                                <td>
                                    <img src="{ns:escudo}" alt="Escudo" width="50" height="50" />
                                </td>
                                <td>
                                    <ul>
                                        <xsl:for-each select="ns:jugadores/ns:jugador">
                                            <li><xsl:value-of select="." /></li>
                                        </xsl:for-each>
                                    </ul>
                                </td>
                            </tr>
                        </xsl:for-each>
                    </tbody>
                </table>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>

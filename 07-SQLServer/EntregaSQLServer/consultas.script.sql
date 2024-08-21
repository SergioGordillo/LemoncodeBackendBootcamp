--Listar las pistas (tabla Track) con precio mayor o igual a 1€
SELECT * FROM Track WHERE UnitPrice >= 1;

--Listar las pistas de más de 4 minutos de duración
SELECT * FROM Track WHERE Milliseconds > 4 * 60 * 1000;

--Listar las pistas que tengan entre 2 y 3 minutos de duración
SELECT * FROM Track WHERE Milliseconds BETWEEN 2 * 60 * 1000 AND 3 * 60 * 1000;

--Listar las pistas que uno de sus compositores (columna Composer) sea Mercury
SELECT * FROM Track WHERE Composer LIKE '%Mercury%';

--Calcular la media de duración de las pistas (Track) de la plataforma
SELECT AVG(Milliseconds) FROM Track;

--Listar los clientes (tabla Customer) de USA, Canada y Brazil
SELECT * FROM Customer WHERE Country IN ('USA', 'Canada', 'Brazil');

--Listar todas las pistas del artista 'Queen' (Artist.Name = 'Queen')
SELECT * FROM Track WHERE Composer IN (SELECT Name FROM Artist WHERE Name = 'Queen');

--Listar las pistas del artista 'Queen' en las que haya participado como compositor David Bowie
SELECT * FROM Track WHERE Composer LIKE '%David Bowie%' AND AlbumId IN (
    SELECT AlbumId 
    FROM Album 
    WHERE ArtistId = (
        SELECT ArtistId 
        FROM Artist 
        WHERE Name = 'Queen'
    )
);

--Listar las pistas de la playlist 'Heavy Metal Classic'
SELECT t.* 
FROM Track t
JOIN PlaylistTrack pt ON t.TrackId = pt.TrackId
JOIN Playlist p ON pt.PlaylistId = p.PlaylistId
WHERE p.Name = 'Heavy Metal Classic';

--Listar las playlist junto con el número de pistas que contienen
SELECT p.Name AS PlaylistName, COUNT(pt.TrackId) AS TracksNumber
FROM Playlist p
LEFT JOIN PlaylistTrack pt ON p.PlaylistId = pt.PlaylistId
GROUP BY p.PlaylistId, p.Name
ORDER BY TracksNumber DESC;

--Listar las playlist (sin repetir ninguna) que tienen alguna canción de AC/DC


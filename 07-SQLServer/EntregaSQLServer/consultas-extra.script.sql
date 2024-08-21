--Listar las pistas ordenadas por el número de veces que aparecen en playlists de forma descendente
SELECT t.Name AS TrackName, COUNT(pt.PlaylistId) AS NumberOfPlaylists
FROM Track t
JOIN PlaylistTrack pt ON t.TrackId = pt.TrackId
GROUP BY t.Name     
ORDER BY NumberOfPlaylists DESC;

--Listar las pistas más compradas (la tabla InvoiceLine tiene los registros de compras)
SELECT t.Name AS TrackName, COUNT(il.InvoiceLineId) AS NumberOfPurchases
FROM Track t
JOIN InvoiceLine il ON t.TrackId = il.TrackId
GROUP BY t.Name;

--Listar los artistas más comprados
SELECT ar.Name AS ArtistName, COUNT(il.InvoiceLineId) AS TotalPurchases
FROM Artist ar
JOIN Album a ON ar.ArtistId = a.ArtistId
JOIN Track t ON a.AlbumId = t.AlbumId
JOIN InvoiceLine il ON t.TrackId = il.TrackId
GROUP BY ar.Name
ORDER BY TotalPurchases DESC;

--Listar las pistas que aún no han sido compradas por nadie
SELECT t.TrackId, t.Name
FROM Track t
LEFT JOIN InvoiceLine il ON t.TrackId = il.TrackId
WHERE il.TrackId IS NULL;

--Listar los artistas que aún no han vendido ninguna pista
SELECT ar.ArtistId, ar.Name AS ArtistName
FROM Artist ar
LEFT JOIN Album a ON ar.ArtistId = a.ArtistId
LEFT JOIN Track t ON a.AlbumId = t.AlbumId
LEFT JOIN InvoiceLine il ON t.TrackId = il.TrackId
WHERE il.TrackId IS NULL
GROUP BY ar.ArtistId, ar.Name
HAVING COUNT(il.TrackId) = 0;






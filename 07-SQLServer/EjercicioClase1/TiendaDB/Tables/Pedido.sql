CREATE TABLE [dbo].[Pedido]
(
	[Id] INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	[ClienteId] INT NOT NULL,
    [Creado] DATETIME NOT NULL ,
	[CuponDescuentoId] INT NOT NULL, 
    CONSTRAINT [FK_Pedido_Cliente] FOREIGN KEY ([ClienteId]) REFERENCES [Cliente]([Id]),
	CONSTRAINT [FK_Pedido_CuponDescuento] FOREIGN KEY ([CuponDescuentoId]) REFERENCES [CuponDescuento]([Id]),
)

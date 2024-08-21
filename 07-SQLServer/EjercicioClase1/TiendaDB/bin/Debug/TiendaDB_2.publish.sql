/*
Script de implementación para TiendaDev

Una herramienta generó este código.
Los cambios realizados en este archivo podrían generar un comportamiento incorrecto y se perderán si
se vuelve a generar el código.
*/

GO
SET ANSI_NULLS, ANSI_PADDING, ANSI_WARNINGS, ARITHABORT, CONCAT_NULL_YIELDS_NULL, QUOTED_IDENTIFIER ON;

SET NUMERIC_ROUNDABORT OFF;


GO
:setvar DatabaseName "TiendaDev"
:setvar DefaultFilePrefix "TiendaDev"
:setvar DefaultDataPath "/var/opt/mssql/data/"
:setvar DefaultLogPath "/var/opt/mssql/data/"

GO
:on error exit
GO
/*
Detectar el modo SQLCMD y deshabilitar la ejecución del script si no se admite el modo SQLCMD.
Para volver a habilitar el script después de habilitar el modo SQLCMD, ejecute lo siguiente:
SET NOEXEC OFF; 
*/
:setvar __IsSqlCmdEnabled "True"
GO
IF N'$(__IsSqlCmdEnabled)' NOT LIKE N'True'
    BEGIN
        PRINT N'El modo SQLCMD debe estar habilitado para ejecutar correctamente este script.';
        SET NOEXEC ON;
    END


GO
USE [$(DatabaseName)];


GO
/*
Debe agregarse la columna [dbo].[Pedido].[CuponDescuentoId] de la tabla [dbo].[Pedido], pero esta columna no tiene un valor predeterminado y no admite valores NULL. Si la tabla contiene datos, el script ALTER no funcionará. Para evitar esta incidencia, agregue un valor predeterminado a la columna, márquela de modo que permita valores NULL o habilite la generación de valores predeterminados inteligentes como opción de implementación.
*/

IF EXISTS (select top 1 1 from [dbo].[Pedido])
    RAISERROR (N'Se detectaron filas. La actualización del esquema va a terminar debido a una posible pérdida de datos.', 16, 127) WITH NOWAIT

GO
PRINT N'Modificando Tabla [dbo].[Pedido]...';


GO
ALTER TABLE [dbo].[Pedido]
    ADD [CuponDescuentoId] INT NOT NULL;


GO
PRINT N'Creando Tabla [dbo].[CuponDescuento]...';


GO
CREATE TABLE [dbo].[CuponDescuento] (
    [Id]         INT IDENTITY (1, 1) NOT NULL,
    [Porcentaje] INT NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);


GO
PRINT N'Creando Clave externa [dbo].[FK_Pedido_CuponDescuento]...';


GO
ALTER TABLE [dbo].[Pedido] WITH NOCHECK
    ADD CONSTRAINT [FK_Pedido_CuponDescuento] FOREIGN KEY ([CuponDescuentoId]) REFERENCES [dbo].[CuponDescuento] ([Id]);


GO
PRINT N'Comprobando los datos existentes con las restricciones recién creadas';


GO
USE [$(DatabaseName)];


GO
ALTER TABLE [dbo].[Pedido] WITH CHECK CHECK CONSTRAINT [FK_Pedido_CuponDescuento];


GO
PRINT N'Actualización completada.';


GO

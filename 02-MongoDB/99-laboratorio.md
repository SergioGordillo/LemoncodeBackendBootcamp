# Laboratorio MongoDB

Vamos a trabajar con el set de datos de Mongo Atlas _airbnb_. Lo puedes encontrar en este enlace: https://drive.google.com/drive/folders/1gAtZZdrBKiKioJSZwnShXskaKk6H_gCJ?usp=sharing

Para restaurarlo puede seguir las instrucciones de este videopost:
https://www.lemoncode.tv/curso/docker-y-mongodb/leccion/restaurando-backup-mongodb

> Acuerdate de mirar si en el directorio `/opt/app` del contenedor Mongo hay contenido de backups previos que haya que borrar

Para entregar las soluciones, añade un README.md a tu repositorio del bootcamp incluyendo enunciado y consulta (lo que pone '_Pega aquí tu consulta_').

## Introducción

En este base de datos puedes encontrar un montón de alojamientos y sus reviews, esto está sacado de hacer webscrapping.

**Pregunta**. Si montaras un sitio real, ¿Qué posibles problemas pontenciales les ves a como está almacenada la información?

```md
La información está almacenada de forma muy poco eficiente. Tenemos todo en la misma colección, de modo que:

· Cualquier petición que hagamos desde Frontend nos va a traer un montón de datos innecesarios, haciendo las peticiones más lentas y obligándonos a mayor procesamiento en frontend para filtrar datos y mostrar sólo los datos necesarios al usuario.
· Si realizamos dicho procesamiento en backend, estamos gastando muchos recursos de forma innecesaria, ya que tenemos que filtrar una gran cantidad de datos que no necesitamos traer de la BBDD.
· Cualquier petición a la BBDD va a ser lenta al traer una gran cantidad de datos, y filtrar tanto en front como en back sólo es un parche para un problema existente desde el inicio. 

Por último, al ser datos recolectados mediante web scraping, es muy posible que no estén actualizados, de modo que sería interesante una automatización que pudiera actualizar los datos con dicha periodicidad.

Mi propuesta de solución sería dividir la colección en distintas colecciones, siguiendo los patrones de modelado de Mongo más adecuados y óptimos, buscando rapidez y escalabilidad, de acuerdo a lo que necesitemos para la aplicación, así como asegurarnos de tener los datos actualizados mediante lanzamientos de webscraping periódicos.
```

## Obligatorio

Esta es la parte mínima que tendrás que entregar para superar este laboratorio.

### Consultas

- Saca en una consulta cuantos alojamientos hay en España.

```js
db.listingsAndReviews.find({
    'address.country': 'Spain',
  });
```

- Lista los 10 primeros:
  - Ordenados por precio de forma ascendente.
  - Sólo muestra: nombre, precio, camas y la localidad (`address.market`).

```js
db.listingsAndReviews
  .find(
    {
      'address.country': 'Spain',
    },
    {
      _id: 0,
      name: 1,
      price: 1,
      beds: 1,
      city: '$address.market',
    }
  )
  .limit(10)
  .sort({ price: 1 })
```

### Filtrando

- Queremos viajar cómodos, somos 4 personas y queremos:
  - 4 camas.
  - Dos cuartos de baño o más.
  - Sólo muestra: nombre, precio, camas y baños.

```js
use('listingsAndReviews');
db.listingsAndReviews
    .find(
      {
        beds: 4,
        bathrooms: { $gte: 2 }
      },
      {
        _id: 0,
        name: 1,
        price: 1,
        beds: 1,
        bathrooms: 1,
      }
    )
```

- Aunque estamos de viaje no queremos estar desconectados, así que necesitamos que el alojamiento también tenga conexión wifi. A los requisitos anteriores, hay que añadir que el alojamiento tenga wifi.
  - Sólo muestra: nombre, precio, camas, baños y servicios (`amenities`).

```js
use('listingsAndReviews');
db.listingsAndReviews.find(
    {
      beds: 4,
      bathrooms: { $gte: 2 },
      amenities: { $all: ['Wifi'] },
    },
    {
      _id: 0,
      name: 1,
      price: 1,
      beds: 1,
      bathrooms: 1,
      amenities: 1,
    }
  );
```

- Y bueno, un amigo trae a su perro, así que tenemos que buscar alojamientos que permitan mascota (_Pets allowed_).
  - Sólo muestra: nombre, precio, camas, baños y servicios (`amenities`).

```js
use('listingsAndReviews');
db.listingsAndReviews.find(
    {
      beds: 4,
      bathrooms: { $gte: 2 },
      amenities: { $all: ['Wifi', 'Pets allowed'] },
    },
    {
      _id: 0,
      name: 1,
      price: 1,
      beds: 1,
      bathrooms: 1,
      amenities: 1,
    }
  );
```

- Estamos entre ir a Barcelona o a Portugal, los dos destinos nos valen. Pero queremos que el precio nos salga baratito (50 $), y que tenga buen rating de reviews (campo `review_scores.review_scores_rating` igual o superior a 88).
  - Sólo muestra: nombre, precio, camas, baños, rating y localidad.

```js
  use('listingsAndReviews');
  db.listingsAndReviews.find(
    {
      $or: [{ 'address.market': 'Barcelona' }, { 'address.country': 'Portugal' }],
      price: { $lte: 50 },
      'review_scores.review_scores_rating': { $gte: 88 },
    },
    {
      _id: 0,
      name: 1,
      price: 1,
      beds: 1,
      rating: '$review_scores.review_scores_rating',
      city: '$address.market',
    }
  );
```

- También queremos que el huésped sea un superhost (`host.host_is_superhost`) y que no tengamos que pagar depósito de seguridad (`security_deposit`).
  - Sólo muestra: nombre, precio, camas, baños, rating, si el huésped es superhost, depósito de seguridad y localidad.

```js
  use('listingsAndReviews');
  db.listingsAndReviews.find(
    {
      $or: [{ 'address.market': 'Barcelona' }, { 'address.country': 'Portugal' }],
      price: { $lte: 50 },
      'review_scores.review_scores_rating': { $gte: 88 },
      'host.host_is_superhost': true,
      security_deposit: 0
    },
    {
      _id: 0,
      name: 1,
      price: 1,
      beds: 1,
      rating: '$review_scores.review_scores_rating',
      city: '$address.market',
      superhost: '$host.host_is_superhost',
      security_deposit: 1
    }
  );
```

### Agregaciones

- Queremos mostrar los alojamientos que hay en España, con los siguientes campos:
  - Nombre.
  - Localidad (no queremos mostrar un objeto, sólo el string con la localidad).
  - Precio

```js
  db.listingsAndReviews.aggregate(
    { $match: { 'address.country': 'Spain' } },
    {
      $project: {
        _id: 0,
        name: 1,
        city: '$address.market',
        price: 1,
      },
    }
  );
```

- Queremos saber cuantos alojamientos hay disponibles por pais.

```js
  use('listingsAndReviews');
  db.listingsAndReviews.aggregate({
    $group: {
      _id: '$address.country',
      total_listings_available: { $sum: 1 },
    },
  });
```

## Opcional

- Queremos saber el precio medio de alquiler de airbnb en España.

```js
  use('listingsAndReviews');
  db.listingsAndReviews.aggregate(
    { $match: { 'address.country': 'Spain' } },
    {
      $group: {
        _id: null,
        average_price: { $avg: '$price' },
      },
    },
    {
      $project: {
        average_price: {
          $round: ['$average_price', 2],
        },
      },
    }
  );
```

- ¿Y si quisieramos hacer como el anterior, pero sacarlo por paises?

```js
db.listingsAndReviews.aggregate(
  {
    $group: {
      _id: '$address.country',
      average_price: { $avg: '$price' },
    },
  },
  {
    $project: {
      average_price: {
        $round: ['$average_price', 2],
      },
    },
  }
);
```

- Repite los mismos pasos pero agrupando también por numero de habitaciones.

```js
  db.listingsAndReviews.aggregate(
    {
      $group: {
        _id: { country: '$address.country', bedrooms: '$bedrooms'},
        average_price: { $avg: '$price' },
      },
    },
    {
      $project: {
        average_price: {
          $round: ['$average_price', 2],
        },
      },
    }
  );
```

## Desafio

Queremos mostrar el top 5 de alojamientos más caros en España, con los siguentes campos:

- Nombre.
- Precio.
- Número de habitaciones
- Número de camas
- Número de baños
- Ciudad.
- Servicios, pero en vez de un array, un string con todos los servicios incluidos.

```js

db.listingsAndReviews.aggregate(
  { $match: { 'address.country': 'Spain' } },
  { $sort: { price: -1 } },
  { $limit: 5 },
  {
    $project: {
      _id: 0,
      name: 1,
      price: 1,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1,
      locality: '$address.market',
      amenities: {
        $reduce: {
          input: '$amenities',
          initialValue: '',
          in: {
            $concat: [
              '$$value',
              { $cond: [{ $eq: ['$$value', ''] }, '', ', '] },
              '$$this',
            ],
          },
        },
      },
    },
  }
);


```

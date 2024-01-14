# 01-Entrega-Modelado-Documental

## Caso Básico

Para los requisitos del caso básico, he planteado el siguiente modelo:

![CasoBásico](./content/modeladoBasicoSergioGordillo.jpg)

· La entidad Curso tiene un array de objetos llamada lecciones. Las lecciones van a ser críticas en la aplicación, interesa que se carguen pronto, ya que van a tener muchas lecturas. Por ello, dado que un curso puede tener muchas lecciones, considero que lo mejor en este caso es embeber las lecciones dentro de la colección Curso.

· Dentro del documento de Lecciones, que es un array de objetos, vamos a tener el orden de la lección (un entero que nos permitirá tener ordenadas las lecciones del curso) y el vídeo, que a su vez lo tenemos embebido, para facilitar la carga rápida. Dado que cada vídeo puede tener un sólo autor y no queremos cargar todos los datos del autor, en este caso he utilizado el Subset Pattern. En este documento sólo tenemos el id del autor y su nombre.

· El Subset Pattern ha sido utilizado también en la colección Curso, ya que vamos a mostrar menos información de las temáticas que están embebidas en la colección Curso que toda la información que tenemos si accedemos directamente a la colección Temáticas.

· En el caso de la colección Autores, embebemos el documento redes sociales.

· En el caso de la colección Home, embebemos tres documentos, que son arrays de objetos: novedades, populares y temáticas. 

· Para el caso de las Novedades, ofrecemos la resolución del problema de los últimos 5 cursos publicados mediante la base de datos, aunque pensando en una solución que combine caché con base de datos: podemos tener los cursos actualizados en la Base de Datos pero que luego los cachee el servidor a fin de evitar consultas innecesarias, y que sólo se haga una consulta para actualizar los 5 últimos cursos publicados cada vez que haya habido una actualización del documento (es decir, que se haya publicado un nuevo curso).

· Para el caso de los cursos más populares, utilizamos el Computed Pattern, ya que me interesa que el cálculo de la puntuación de los cursos más populares se realice con poca frecuencia mediante un proceso batch (por ejemplo, una vez al día). De esta forma, estoy optimizando el rendimiento de la aplicación.

· Por otro lado, en el documento embebido temáticas, mostraremos según el diseño que se ofrece en el enunciado las distintas temáticas (Frontend, Backend etc.) con los cursos más recientes de dichas temáticas (para ello en la Colección Curso tenemos un campo que es fechaPublicación.)

· Y, en cuanto a colecciones, tenemos también la colección Temáticas dónde se pueden consultar todas las temáticas que hay con sus respectivos cursos, a los que se puede acceder directamente debido a que tengo el id de cada Curso. 

· En líneas generales, en este ejercicio de modelado, podemos observar que se ha priorizado el anidamiento sobre la referencia, dado que tenemos pocos elementos en la relación, pequeños y que se van a usar mucho (por ejemplo, cada curso tendrá entre 1 y 20 vídeos).

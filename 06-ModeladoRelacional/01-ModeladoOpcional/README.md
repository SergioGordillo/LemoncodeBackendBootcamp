# 06-Entrega-Modelado-Relacional

## Caso Opcional

Para los requisitos del caso opcional, he planteado el siguiente modelo:

![CasoOpcional](./content/ModeladoRelacional.jpg)

· He creado una tabla Temática para la jerarquía de temáticas, con tres campos (idTematica, nombreTematica e idPadre). En este caso, idPadre funciona como una Foreign Key, y nos permite la creación de una estructura de árbol en la que cada temática puede tener un único padre (por ejemplo, React iría dentro del padre Frontend) y cada padre puede tener muchos hijos (Frontend puede tener hijos como React, Angular, Vue, Svelte...). Aquí la información se recuperaría con consultas recursivas.

· La relación entre la tabla Curso y la tabla Temática es de muchos a muchos, ya que un curso puede tener muchas temáticas (por ejemplo, un curso de Testing de React puede tener las temáticas Frontend -> React -> Testing) y una temática puede tener muchos cursos (puede haber múltiples cursos de Frontend, por ejemplo). Por tanto, necesitamos crear una tabla intermedia, que es la tabla CursoTematica que tiene tres campos (idCursoTematica, idCurso, idTematica). 

· La relación entre la tabla Curso y la tabla CursoTematica es de uno a muchos (un curso puede estar asociado a múltiples registros de la tabla CursoTematica) y la relación entre Tematica y la tabla CursoTematica también es de uno a muchos (una Tematica puede estar asociada a múltiples registros en la tabla CursoTematica).

· Por otro lado, de forma sencilla, podemos implementar la privacidad de los vídeos con un campo de tipo booleano en la tabla Video (esPrivado). 
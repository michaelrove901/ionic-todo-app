Gestor de Tareas - Aplicación Móvil Ionic
Descripción del Proyecto

Esta aplicación es un gestor de tareas (To-Do List) desarrollado con Ionic y Angular, pensado para dispositivos móviles Android e iOS. Permite a los usuarios:

Agregar, editar y eliminar tareas.

Marcar tareas como completadas.

Crear, editar y eliminar categorías.

Asignar tareas a categorías y filtrar por ellas.

Visualizar la aplicación de manera responsiva en distintos dispositivos.

Activar o desactivar funcionalidades mediante feature flags con Firebase Remote Config.

El objetivo de la aplicación es demostrar habilidades en desarrollo híbrido, optimización de rendimiento, integración con Firebase y uso de control de versiones.

Tecnologías Utilizadas

Node.js = v22.17.1

Ionic 7.2.1

Angular 20.3.7

Capacitor (Android e iOS)

Firebase (Firestore y Remote Config)

TypeScript

Sass para estilos personalizados

Git / GitHub para versionamiento

Pasos

Clonar el repositorio:

git clone https://github.com/michaelrove901/ionic-todo-app.git

Instalar dependencias:

npm install

Configurar Firebase:
Deje mis credenciales para la prueba y puedan ver

Ejecutar en navegador :

ionic serve


Compilar para producción:

ionic build


Sincronizar con Capacitor:

npx cap add android
npx cap sync android
npx cap open android

npx cap add ios
npx cap sync ios
npx cap open ios

Tuve problemas al desarrollar la aplicacioncon Ionic y Angular diseñe el FRONT revisaba el responsive en el navegador y todo se ve bien quedaba bien, pero cuando lo integre con Android studio casi nada servia o se veia correctamente las funcionalidades.

Funcionalidades

Gestión de tareas (CRUD)

Gestión de categorías (CRUD)

Filtrado de tareas por categoría

Indicadores visuales de tareas completadas

Feature flags mediante Firebase Remote Config

UI responsiva adaptada a distintos tamaños de pantalla

Optimización de Rendimiento

Uso de lazy loading en módulos de Angular.

Renderizado eficiente de listas de tareas con trackBy en ngFor.

Minimización de recursos y assets optimizados para móviles.

Manejo eficiente de estado con signals de Angular para reactividad.

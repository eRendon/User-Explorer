# UserExplorer

Este proyecto fue creado con [Angular CLI](https://github.com/angular/angular-cli) version 18.2.8.

## Descripción

Esta aplicación permite buscar y mostrar información sobre usuarios de GitHub utilizando su API pública. Los usuarios pueden ingresar un nombre de usuario y ver un listado de los primeros 10 resultados, con enlaces a perfiles individuales que muestran más detalles sobre cada usuario.

## Características

- **Búsqueda de Usuarios**: Captura el nombre de usuario y obtiene información desde la API de GitHub.
- **Listado de Resultados**: Muestra los primeros 10 usuarios con su nombre de usuario y ID.
- **Navegación a Perfiles**: Cada perfil de usuario es un enlace que navega a una ruta específica.
- **Detalles del Usuario**: Incluye información del usuario, como la imagen de perfil y otros datos relevantes.
- **Validación de Búsqueda**: Verifica que el texto de búsqueda tenga al menos 4 caracteres y no permita la búsqueda de la palabra "gcpglobal".
- **Gráficos**: Integra una librería de gráficos para mostrar un gráfico de barras con el número de seguidores de los primeros 10 usuarios.
- **Manejo de Errores**: Un componente para mostrar mensajes de error en toda la aplicación.
- **Métodos Observables y Promises**: Implementa un servicio que utiliza ambos métodos para obtener datos.
- **Guardias**: Restringe el acceso a perfiles de usuarios con un 'score' menor a 30.0.

## Tecnologías Utilizadas

- **Angular 18**: Framework para construir aplicaciones web.
- **TypeScript**: Lenguaje utilizado para el desarrollo del proyecto.
- **Tailwind CSS**: Framework de CSS para estilos rápidos y responsivos.
- **Font Awesome**: Para el manejo de iconos.
- **Librería de Gráficos Chart Js**: Para visualizar datos de seguidores.

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/eRendon/User-Explorer.git
   ```
2. Navegar al directorio del proyecto:
    ```bash
    cd User-Explorer 
    ```
3. Instala las dependencias:
    ```bash
    npm install
    ```
   
4. Inicia la aplicación:
    ```bash
    ng serve
   ```
   
5. Abre tu navegador y ve a http://localhost:4200.

## Deploy

Este proyecto ha sido deployado en vercel con una integración contínua que permite este servicio de la nube, no se crearon ci ni cd por cuestiones de planes del servicio
```
https://user-explorer-cyan.vercel.app/
```

## Coverage
Se alcanzó un coverage de un 66% en el proyecto
```
66.85% Statements 117/1754.34% Branches 1/2354.9% Functions 28/5165.83% Lines 106/161
```
## Conclusión

<p style="text-align: justify;">
- Decidí crear el patrón repositorio para tener un mejor orden en la estructura de este, agregando DAO para separar la lógica que se necesita a la hora de modificar datos del modelo que retorna la API.
</p>
<p>
- Implementé el patrón de diseño atómico para reutilizar componentes simples y evitar un diseño duplicado de estos en todo el proyecto.
</p>
<p>
- Creé un sistema de layouts simple para dividir el proyecto en caso tal de que este fuese a crecer en el tiempo y hacerlo más modular.
</p>
<p>
- Creé algunas animaciones simples para los modales y la transición de rutas.
</p>
<p>
- Me encontré con el reto para crear gráficas dinámicas, ya que hace algún tiempo no utilizaba este tipo de gráficos. Por tanto, fue bastante retador renderizar las gráficas correctamente luego de pasar los datos para estas. 
</p>
<p>
- Para los test de los componentes, me apoyé con las inteligencias artificiales, en este caso, usé ChatGPT, ya que Codiumate provee muy poca información.
</p>

```
Nombre: Edwin Alexander Rendon Cadavid
Residencia: Robledo, Medellín, Antioquia
```

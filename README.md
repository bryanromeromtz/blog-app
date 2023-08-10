# Instrucciones para Ejecutar la Aplicación

Esta guía te ayudará a configurar y ejecutar la aplicación en tu entorno local utilizando Skaffold, Docker y Kubernetes.

## Prerrequisitos

Asegúrate de tener instalados los siguientes componentes en tu máquina:

- [Docker](https://www.docker.com/get-started)
- [Kubernetes](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
- [Skaffold](https://skaffold.dev/docs/install/)

## Pasos para Ejecutar la Aplicación

1. **Clonar el Repositorio:**

   ```sh
   git clone https://github.com/TuUsuario/tu-repositorio.git
   cd tu-repositorio


# Iniciar Skaffold:

Ejecuta el siguiente comando en la terminal para iniciar Skaffold y desplegar los microservicios en tu clúster local de Kubernetes:

sh
Copy code
skaffold dev
Skaffold se encargará de construir y actualizar automáticamente los contenedores cuando realices cambios en el código fuente.

Acceder a la Aplicación:

Una vez que Skaffold haya terminado de desplegar los microservicios, podrás acceder a la aplicación en tu navegador web:

Frontend: http://localhost:3000
Otros servicios pueden tener puertos diferentes. Consulta la documentación de cada servicio.
Detener Skaffold:

Cuando hayas terminado de trabajar con la aplicación, puedes detener Skaffold presionando Ctrl+C en la terminal donde lo iniciaste. Esto eliminará los recursos desplegados en tu clúster local de Kubernetes.

Notas
Asegúrate de que Docker Desktop esté configurado para usar el motor Docker de Kubernetes si estás utilizando Docker Desktop.
Estas instrucciones son para un entorno local de desarrollo. La implementación en producción requerirá una configuración diferente.
¡Disfruta explorando tu aplicación y desarrollando nuevas características!

Contacto
Si tienes alguna pregunta o encuentras problemas, no dudes en contactarnos en tu-correo@example.com.






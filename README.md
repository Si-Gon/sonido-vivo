# Sonido Vivo

Tienda de instrumentos musicales - Proyecto Frontend (Evaluación 1, Desarrollo Fullstack II).

## Estructura inicial

```
/
├── index.html            Página principal (pública)
├── nosotros.html         Quiénes somos
├── catalogo.html         Catálogo (se carga desde js/productos.js)
├── contacto.html         Formulario de contacto
├── login.html            Inicio de sesión
├── registro.html         Registro de usuario
├── admin.html            Panel de administración
├── admin-productos.html  Mantenedor de productos
├── admin-usuarios.html   Mantenedor de usuarios
├── css/
│   └── style.css         Hoja de estilos (común, externa)
└── js/
    ├── productos.js      Arreglo con el catálogo real (51 productos)
    └── catalogo.js       Render del catálogo (a completar)
```

## Cómo trabajar en equipo con Git

Esto es un repo de práctica para aprender el flujo de trabajo colaborativo.

### 1. Cada integrante clona el repo (una vez)

```bash
git clone <url-del-repo>
cd sonido-vivo
```

### 2. Antes de trabajar, siempre trae lo último

```bash
git pull origin main
```

### 3. Crear una rama para tu tarea

```bash
git checkout -b mi-rama
```

### 4. Hacer tus cambios y subirlos a tu rama

```bash
git add <archivos>          # o git add . para subir todo
git commit -m "feat: completo el formulario de contacto"
git push origin mi-rama
```

### 5. Unir tu trabajo a la rama principal (merge)

En GitHub: crea un **Pull Request** de `mi-rama` hacia `main`, pide revisión a un compañero y haz merge. O en local:

```bash
git checkout main
git pull origin main
git merge mi-rama
git push origin main
```

### Consejos rápidos

- **Commits pequeños y con mensaje claro**: `feat:` añade, `fix:` corrige.
- **No trabajes directo en `main`** para las tareas grandes; usa ramas.
- Si te sale **conflicto de merge**: edita el archivo, deja lo que corresponde, `git add` y `git commit`.
- **Siempre `git pull` antes de empezar** para no pisar lo del otro.

## Catálogo

`js/productos.js` contiene el arreglo con los 51 productos reales de la tienda (extraídos del XLSX de la evaluación). Cada producto tiene: id, codigo, categoria, nombre, marca, modelo, precio, stock, descripcion e imagen.
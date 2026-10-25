# TheMealDB — Documentación de la Free API V1

Guía de todos los endpoints gratuitos (V1) de [TheMealDB](https://www.themealdb.com/documentation), con explicación de parámetros, ejemplos de uso y estructura de respuesta.

---

## 1. Información general

| Concepto | Valor |
|---|---|
| Base URL | `https://www.themealdb.com/api/json/v1/` |
| API key de prueba (gratuita) | `1` |
| URL base completa | `https://www.themealdb.com/api/json/v1/1/` |
| Método HTTP | `GET` (todos los endpoints) |
| Formato de respuesta | JSON |
| Autenticación | La API key va **dentro de la ruta** (`/v1/1/`), no en headers |

> **Nota:** La key `1` es para desarrollo, aprendizaje y uso educativo. Si vas a publicar una app en producción, TheMealDB recomienda hacerse *supporter* para obtener una key propia (se sustituye `1` por `TU_API_KEY` en la ruta).

### Estructura general de las respuestas

Todas las respuestas son un objeto con **una sola propiedad** que contiene un arreglo:

```json
{ "meals": [ { ... }, { ... } ] }
```

- Endpoints de comidas → propiedad `meals`
- `categories.php` → propiedad `categories`
- **Sin resultados:** la API responde `{"meals": null}` (no un arreglo vacío ni un error 404). Siempre valida `null` en tu código.

---

## 2. Resumen de endpoints

| # | Endpoint | Parámetro | Descripción |
|---|---|---|---|
| 1 | `search.php` | `s` | Buscar comida por nombre |
| 2 | `search.php` | `f` | Listar comidas por primera letra |
| 3 | `lookup.php` | `i` | Detalle completo de una comida por ID |
| 4 | `random.php` | — | Una comida aleatoria |
| 5 | `categories.php` | — | Todas las categorías (con imagen y descripción) |
| 6 | `list.php` | `c=list` | Lista de nombres de categorías |
| 7 | `list.php` | `a=list` | Lista de áreas / países |
| 8 | `list.php` | `i=list` | Lista de ingredientes |
| 9 | `filter.php` | `i` | Filtrar por ingrediente principal |
| 10 | `filter.php` | `c` | Filtrar por categoría |
| 11 | `filter.php` | `a` | Filtrar por área / país |
| — | Imágenes | — | Miniaturas de comidas e ingredientes |

---

## 3. Endpoints de búsqueda

### 3.1 Buscar comida por nombre

```
GET https://www.themealdb.com/api/json/v1/1/search.php?s={nombre}
```

| Parámetro | Tipo | Requerido | Descripción |
|---|---|---|---|
| `s` | string | Sí | Nombre (o parte del nombre) de la comida, en inglés |

**Ejemplo:**
```
https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata
```

**Respuesta:** arreglo `meals` con el **objeto de comida completo** (ver [sección 7](#7-estructura-del-objeto-meal)). Si no hay coincidencias: `{"meals": null}`.

**Uso típico:** barra de búsqueda de recetas.

---

### 3.2 Listar comidas por primera letra

```
GET https://www.themealdb.com/api/json/v1/1/search.php?f={letra}
```

| Parámetro | Tipo | Requerido | Descripción |
|---|---|---|---|
| `f` | string (1 carácter) | Sí | Letra inicial del nombre de la comida |

**Ejemplo:**
```
https://www.themealdb.com/api/json/v1/1/search.php?f=a
```

**Respuesta:** arreglo `meals` con objetos de comida completos cuyo nombre empieza con esa letra.

**Uso típico:** índice alfabético (A–Z) de recetas.

---

## 4. Endpoints de consulta (lookup)

### 4.1 Detalle completo de una comida por ID

```
GET https://www.themealdb.com/api/json/v1/1/lookup.php?i={idMeal}
```

| Parámetro | Tipo | Requerido | Descripción |
|---|---|---|---|
| `i` | string/número | Sí | ID de la comida (`idMeal`) |

**Ejemplo:**
```
https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772
```

**Respuesta:** arreglo `meals` con **un solo objeto** completo (instrucciones, ingredientes, medidas, video, etc.).

**Uso típico:** pantalla de detalle de receta. Es el endpoint que debes llamar después de un `filter.php`, porque los filtros solo devuelven datos resumidos.

---

### 4.2 Comida aleatoria

```
GET https://www.themealdb.com/api/json/v1/1/random.php
```

Sin parámetros.

**Respuesta:** arreglo `meals` con **un** objeto de comida completo elegido al azar.

**Uso típico:** botón "Sorpréndeme" / receta del día.

---

## 5. Endpoints de listas

### 5.1 Todas las categorías (detalladas)

```
GET https://www.themealdb.com/api/json/v1/1/categories.php
```

Sin parámetros.

**Respuesta:** propiedad `categories` (no `meals`):

```json
{
  "categories": [
    {
      "idCategory": "1",
      "strCategory": "Beef",
      "strCategoryThumb": "https://www.themealdb.com/images/category/beef.png",
      "strCategoryDescription": "Beef is the culinary name for meat from cattle..."
    }
  ]
}
```

**Uso típico:** menú visual de categorías con imagen y descripción.

---

### 5.2 Lista de nombres de categorías

```
GET https://www.themealdb.com/api/json/v1/1/list.php?c=list
```

**Respuesta:** `meals` → `[{ "strCategory": "Beef" }, ...]`

**Uso típico:** llenar un `<select>` o chips de filtro (más ligero que `categories.php`).

---

### 5.3 Lista de áreas / países

```
GET https://www.themealdb.com/api/json/v1/1/list.php?a=list
```

**Respuesta:** `meals` → `[{ "strArea": "Japanese", "strCountry": "Japan" }, ...]`

- `strArea`: gentilicio o región culinaria (ej. `Mexican`, `Japanese`).
- `strCountry`: nombre del país.

**Uso típico:** filtro por cocina del mundo.

---

### 5.4 Lista de ingredientes

```
GET https://www.themealdb.com/api/json/v1/1/list.php?i=list
```

**Respuesta:** `meals` →

```json
[
  {
    "idIngredient": "1",
    "strIngredient": "Chicken",
    "strDescription": "The chicken is a type of domesticated fowl...",
    "strThumb": "https://www.themealdb.com/images/ingredients/chicken.png",
    "strType": null
  }
]
```

**Uso típico:** autocompletado de ingredientes, catálogo de ingredientes.

---

## 6. Endpoints de filtrado

> **Importante:** los filtros devuelven **datos resumidos**, no la receta completa. Cada elemento trae solo: `idMeal`, `strMeal`, `strMealThumb` (y en la respuesta actual también `strArea`, `strCountry`). Para ver instrucciones e ingredientes, usa `lookup.php?i={idMeal}`.

### 6.1 Filtrar por ingrediente principal

```
GET https://www.themealdb.com/api/json/v1/1/filter.php?i={ingrediente}
```

| Parámetro | Tipo | Requerido | Descripción |
|---|---|---|---|
| `i` | string | Sí | Nombre del ingrediente en inglés. Los espacios se escriben con guion bajo (`_`) |

**Ejemplo:**
```
https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast
```

> En V1 solo se permite **un** ingrediente. El filtro por múltiples ingredientes (`i=chicken_breast,garlic,salt`) es exclusivo de la V2 Premium.

---

### 6.2 Filtrar por categoría

```
GET https://www.themealdb.com/api/json/v1/1/filter.php?c={categoria}
```

| Parámetro | Tipo | Requerido | Descripción |
|---|---|---|---|
| `c` | string | Sí | Nombre de la categoría (valores de `list.php?c=list`) |

**Ejemplo:**
```
https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood
```

---

### 6.3 Filtrar por área / país

```
GET https://www.themealdb.com/api/json/v1/1/filter.php?a={area}
```

| Parámetro | Tipo | Requerido | Descripción |
|---|---|---|---|
| `a` | string | Sí | Área o país (valores de `list.php?a=list`). Acepta el país o el gentilicio |

**Ejemplos:**
```
https://www.themealdb.com/api/json/v1/1/filter.php?a=Canada
https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian
```

**Respuesta de ejemplo (cualquier filtro):**

```json
{
  "meals": [
    {
      "strMeal": "Baked salmon with fennel & tomatoes",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/1548772327.jpg",
      "idMeal": "52959"
    }
  ]
}
```

---

## 7. Estructura del objeto `meal`

Objeto completo devuelto por `search.php`, `lookup.php` y `random.php`:

| Campo | Descripción |
|---|---|
| `idMeal` | ID único de la comida |
| `strMeal` | Nombre de la comida |
| `strMealAlternate` | Nombre alternativo (puede ser `null`) |
| `strCategory` | Categoría (ej. `Chicken`, `Seafood`) |
| `strArea` | Área culinaria (ej. `Japanese`) |
| `strCountry` | País (ej. `Japan`) |
| `strInstructions` | Instrucciones de preparación (texto largo) |
| `strMealThumb` | URL de la imagen |
| `strTags` | Etiquetas separadas por coma (ej. `"Meat,Casserole"`) o `null` |
| `strYoutube` | URL de video en YouTube |
| `strIngredient1` … `strIngredient20` | Ingredientes (los no usados vienen como `""` o `null`) |
| `strMeasure1` … `strMeasure20` | Medida correspondiente a cada ingrediente |
| `strSource` | URL de la receta original |
| `strImageSource` | Fuente de la imagen |
| `strCreativeCommonsConfirmed` | Confirmación de licencia Creative Commons |
| `dateModified` | Fecha de última modificación |

### Cómo armar la lista de ingredientes

Los ingredientes no vienen como arreglo; hay que recorrer los 20 pares `strIngredientN` / `strMeasureN` y descartar los vacíos:

```js
function getIngredients(meal) {
  const list = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const mea = meal[`strMeasure${i}`];
    if (ing && ing.trim()) list.push({ ingredient: ing.trim(), measure: (mea || "").trim() });
  }
  return list;
}
```

---

## 8. Imágenes

### 8.1 Miniaturas de comidas

Toma la URL de `strMealThumb` y agrega `/small`, `/medium` o `/large`:

```
https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg          (original)
https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg/small
https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg/medium
https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg/large
```

### 8.2 Imágenes de ingredientes

Se construyen con el nombre del ingrediente (minúsculas, espacios como `_`) y aceptan los mismos tamaños:

```
https://www.themealdb.com/images/ingredients/olive_oil.png
https://www.themealdb.com/images/ingredients/olive_oil.png/small
https://www.themealdb.com/images/ingredients/olive_oil.png/medium
https://www.themealdb.com/images/ingredients/olive_oil.png/large
```

---

## 9. Ejemplos de consumo

### JavaScript (fetch)

```js
const BASE = "https://www.themealdb.com/api/json/v1/1";

async function searchMeal(name) {
  const res = await fetch(`${BASE}/search.php?s=${encodeURIComponent(name)}`);
  const data = await res.json();
  return data.meals ?? []; // meals es null si no hay resultados
}

async function mealsByCategoryWithDetails(category) {
  const { meals } = await (await fetch(`${BASE}/filter.php?c=${category}`)).json();
  if (!meals) return [];
  // filter.php trae datos resumidos → pedir detalle por ID
  return Promise.all(
    meals.slice(0, 5).map(async m =>
      (await (await fetch(`${BASE}/lookup.php?i=${m.idMeal}`)).json()).meals[0]
    )
  );
}
```

### Python (requests)

```python
import requests

BASE = "https://www.themealdb.com/api/json/v1/1"

def random_meal():
    r = requests.get(f"{BASE}/random.php", timeout=10)
    r.raise_for_status()
    return r.json()["meals"][0]

def filter_by_area(area: str):
    r = requests.get(f"{BASE}/filter.php", params={"a": area}, timeout=10)
    return r.json()["meals"] or []
```

### cURL

```bash
curl "https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772"
```

---

## 10. Flujo recomendado para una app

1. **Pantalla inicio:** `random.php` (receta destacada) + `categories.php` (menú de categorías).
2. **Filtros:** `list.php?a=list` y `list.php?i=list` para poblar selectores.
3. **Listado:** `filter.php?c=` / `?a=` / `?i=` → tarjetas con `strMeal` y `strMealThumb/small`.
4. **Detalle:** `lookup.php?i={idMeal}` → instrucciones, ingredientes, video.
5. **Búsqueda:** `search.php?s=` para texto libre, `search.php?f=` para índice A–Z.

---

## 11. Buenas prácticas y limitaciones de V1

- Los valores de búsqueda/filtro van **en inglés** (`chicken`, `Seafood`, `Mexican`).
- Usa `encodeURIComponent` (JS) o `params` (Python) para los parámetros.
- Siempre valida `meals === null`.
- Los filtros **no** devuelven la receta completa: combínalos con `lookup.php`.
- V1 solo filtra por **un** criterio a la vez.
- **No disponibles en V1 (solo Premium V2):** `randomselection.php` (10 aleatorias), `latest.php` (últimas 10), filtro por múltiples ingredientes.
- Atribuye a TheMealDB como fuente de los datos en tu app.

---

**Fuente:** [TheMealDB – API Guide](https://www.themealdb.com/documentation) · Especificación OpenAPI V1: `https://www.themealdb.com/api/spec/openapi-v1.yaml`
# xddweb

Micrositio estático de broma con una falsa confesión dramática que remata en **“TE QUIERO GAY”**.

## Stack

- HTML semántico
- CSS sin dependencias
- JavaScript vanilla
- Sin backend, trackers, APIs ni assets remotos

## Experiencia

1. Loader teatral con mensajes falsamente serios.
2. Pantalla de “confesión” minimalista.
3. Reveal interactivo con confeti, partículas tipográficas y tratamiento rainbow/neón.
4. Botón para repetir el efecto sin recargar la página.
5. Responsive, teclado y `prefers-reduced-motion` contemplados.

## Desarrollo local

No requiere build:

```bash
python -m http.server 8080
```

## Deploy

El repositorio incluye un workflow de GitHub Pages preparado para publicar el contenido estático de `main`. El workflow sólo entra en juego al integrar la rama de feature en `main`.

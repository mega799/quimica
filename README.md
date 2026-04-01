# 💣 Desactiva la Bomba Química (BachUAA)

Juego cooperativo inspirado en *Keep Talking and Nobody Explodes* para química inorgánica de bachillerato.

## Cómo correr

```bash
npm install
npm run dev
```

Abre la URL local de Vite (normalmente `http://localhost:5173`).

## Manual del experto

Disponible en:

- `http://localhost:5173/manual-experto.html`

## Flujo de partida sugerido

1. Alumno A abre el juego (pantalla principal).
2. Alumno B abre/imprime el manual del experto.
3. A describe datos de módulo, B guía el procedimiento.
4. A valida respuestas. 3 errores = derrota.

## Ejemplo de ronda

- Módulo estequiometría: `2H₂ + O₂ -> 2H₂O`, dato `4 mol H₂`.
- El experto aplica razón molar: `4 * (2/2) = 4 mol H₂O`.
- Técnico introduce `4`, valida y desactiva módulo.

# CHEATSHEET — Semana 03.2: Animaciones Oculares OLED y FSM de Arranque

Sistema Embebido ESP32 · Soporte Técnico · 3° BGU · Unidad Educativa Técnico Salesiano

> Recordatorio Deep Freeze: configura tu identidad de Git al sentarte y trabaja siempre
> en tu rama `entrega/nombre-apellido`. Nunca entregues sobre `main`.

---

## 1. Referencia rápida de hardware

| Parámetro | Valor | Dónde vive |
|---|---|---|
| Pin SDA | `21` | `config.h` |
| Pin SCL | `22` | `config.h` |
| Velocidad del bus I2C | `400 kHz` | `config.h` |
| Dirección del panel OLED | `0x3C` | `config.h` |
| Geometría del panel | `128 x 64` | `config.h` |
| Pin de reset | `-1` (no cableado) | `config.h` |
| Velocidad del Monitor Serie | `115200 bps` | `main.ino` |
| Ventana del logo de arranque | `3000 ms` | `config.h` |
| Cuadros por segundo objetivo | `60 fps` | `config.h` |

Cableado en Wokwi y en la mesa de laboratorio:

| ESP32 | OLED SSD1306 |
|---|---|
| `GPIO21` | `SDA` |
| `GPIO22` | `SCL` |
| `3V3` | `VCC` |
| `GND` | `GND` |

---

## 2. Consola de depuración (Monitor Serie a 115200 bps)

| Tecla | Expresión |
|---|---|
| `1` | `DEFAULT` |
| `2` | `HAPPY` |
| `3` | `ANGRY` |
| `4` | `TIRED` |
| `5` | `SLEEPY` |
| `6` | `SCARY` |
| `7` | `CURIOUS` |
| `h` o `H` | Repite el bloque de ayuda |

Reglas de la consola que debes respetar en tu código de Arduino:

- Se lee **una sola tecla por vuelta** del bucle, sin bloquear la animación.
- Una tecla válida produce **respuesta inmediata** por el monitor.
- Los caracteres de control (incluido el salto de línea del Enter) **se ignoran en silencio**.

---

## 3. Inventario de módulos (proyecto plano)

| Archivo | Responsabilidad |
|---|---|
| `main.ino` | Orquesta el arranque y el bucle; no dibuja nada |
| `config.h` | Configuración global única del proyecto |
| `i2c_manager.h` | Bus I2C: pines, velocidad, escaneo y verificación |
| `display.h` | Pantalla: inicialización y texto |
| `logo.h` | Datos del bitmap del logo de arranque |
| `logboot.h` | Logo de arranque y POST de pantalla |
| `eyes.h` | Ojos animados y expresión elegida |
| `debug_serial.h` | Comandos del Monitor Serie y ayuda |

Regla de estructura: **cero archivos `.cpp`**. Todo el código vive en el boceto `.ino`
y en los encabezados de módulo, con un único `config.h`.

---

## 4. Conventional Commits

| Prefijo | Cuándo usarlo | Ejemplo |
|---|---|---|
| `feat:` | Nuevo reto resuelto o nueva función | `feat: resolver el escaneo del bus I2C` |
| `fix:` | Corrección de un error | `fix: centrar el cuadrado del POST` |
| `docs:` | Solo documentación | `docs: actualizar el cheatsheet` |
| `refactor:` | Reorganizar sin cambiar comportamiento | `refactor: extraer la ayuda de la consola` |
| `chore:` | Tareas de mantención | `chore: ignorar artefactos de compilación` |

---

## 5. Reglamento de tiempos del video

| Entrega | Límite | Penalización |
|---|---|---|
| Short de anticipación | 60 s (gracia hasta 65 s) | Más de 65 s → −0.50 pts · más de 90 s → se califica sobre el 50 % |
| Screencast demostrativo | 3 a 4 min sugeridos · **tope absoluto 5:00** | Desde 5:01 → −1.00 pts |

El docente califica estrictamente hasta el minuto 5:00. El enlace público del video va
en la descripción del Pull Request.

---

## 6. Orden de resolución recomendado

1. Levanta el bus y verifica que el panel responda en `0x3C`.
2. Inicializa la pantalla y deja el buffer limpio.
3. Pinta el logo de arranque y ejecuta el POST de pantalla.
4. Inicializa los ojos y aplica las 7 expresiones por tecla.
5. Publica la ayuda y cierra la ventana de arranque con el cambio de estado.

Cada paso depende del anterior: si el bus no responde, nada de lo demás se puede ver.

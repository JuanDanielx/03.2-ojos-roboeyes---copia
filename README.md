# Semana 03.2 — Animaciones Oculares OLED con RoboEyes & FSM de Arranque

[![Ver Guía Maestra en Vivo](https://img.shields.io/badge/Guía_Técnica-Ver_en_Línea-E07A5F?style=for-the-badge&logo=cloudflare)](https://uets-st-portal.vgmiltonisaac.workers.dev/03.2-ojos-roboeyes/)

Sistema Embebido ESP32 · Soporte Técnico 3° BGU · Unidad Educativa Técnico Salesiano · 2026–2027

Este repositorio es el **starter kit** de la semana: trae el proyecto andamiado con
`// TODO:` y las **Preguntas Guía**, no la solución resuelta. Tu trabajo es resolver cada
reto en orden y demostrarlo en el screencast.

---

## Inicio rápido en 4 pasos

1. **Abre el espacio de trabajo.** Abre `03.2-ojos-roboeyes.code-workspace` en VS Code.
   Sus cuatro raíces etiquetadas apuntan al proyecto plano, así el panel de PlatformIO
   encuentra `platformio.ini` y no aparece el error *"Nothing to build"*.
2. **Resuelve los `// TODO:`.** Cada módulo trae el reto, la Pregunta Guía y la pista de
   hacia dónde mirar. Empieza por el bus I2C: sin bus, nada de lo demás se puede ver.
3. **Compila desde el panel de PlatformIO.** Usa el icono de la hormiga 🐜 (**Build**) en la
   barra de PlatformIO. No necesitas terminal: la compilación debe quedar limpia, sin warnings.
4. **Simula en Wokwi.** Con `diagram.json` y `wokwi.toml` en la raíz, ejecuta la simulación y
   revisa la telemetría en el Monitor Serie a **115200 bps**.

> **Prueba en hardware físico:** el flasheo del ESP32 real se hace siempre en **VS Code
> local** (laboratorio o tu máquina). Un entorno de desarrollo hospedado no puede pasar
> puertos COM físicos hacia el microcontrolador.

---

## Inventario del proyecto (plano, sin subcarpetas por reto)

| Archivo | Responsabilidad |
|---|---|
| `main.ino` | Orquesta el arranque y el bucle principal |
| `config.h` | Configuración global única (pines, dirección, geometría, tiempos) |
| `i2c_manager.h` | Bus I2C: pines, velocidad, escaneo y verificación |
| `display.h` | Pantalla OLED SSD1306: inicialización y texto |
| `logo.h` | Datos del bitmap del logo de arranque |
| `logboot.h` | Logo de arranque y POST de pantalla |
| `eyes.h` | Ojos animados (RoboEyes) y expresión elegida |
| `debug_serial.h` | Comandos del Monitor Serie y bloque de ayuda |
| `platformio.ini` | Entorno ESP32 DevKit con framework de Arduino |
| `diagram.json` | Esquema Wokwi (ESP32 + SSD1306 en `0x3C`) |
| `wokwi.toml` | Ruta del firmware para el simulador |
| `03.2-ojos-roboeyes.code-workspace` | Espacio de trabajo multiraíz |
| `CHEATSHEET_ESTUDIANTE.md` | Pines, direcciones, teclas y commits |

Regla de estructura: **cero archivos `.cpp`** y **cero diapositivas** en este repositorio.
Todo el código vive en el boceto `.ino` y en los encabezados de módulo.

---

## Entrega

1. Haz el **fork** del repositorio del docente y clona **tu** fork.
2. Crea tu rama de entrega: `git checkout -b entrega/nombre-apellido`.
3. Commits con **Conventional Commits** (`feat:`, `fix:`, `docs:`, `refactor:`, `chore:`).
4. Abre el Pull Request comparando `compare: entrega/nombre-apellido` contra `base: main`.

### Reglamento de tiempos del video

| Entrega | Límite | Penalización |
|---|---|---|
| Short de anticipación | 60 s (gracia hasta 65 s) | Más de 65 s → −0.50 pts · más de 90 s → se califica sobre el 50 % |
| Screencast demostrativo | 3 a 4 min sugeridos · tope absoluto **5:00** | Desde 5:01 → −1.00 pts |

El enlace público del screencast va en la descripción del Pull Request. Si terminas la clase
con avance parcial, entrega igual: la sustentación oral se rescata completa.

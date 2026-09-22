## Identificación del Estudiante

- **Nombre y Apellido:** <!-- Escribe tu nombre completo aquí -->
- **Curso y Especialidad:** 3° de Bachillerato General Unificado Técnico en Informática
- **Paralelo:** [ ] 3E1  |  [ ] 3E2
- **Rama de Entrega Personal:** `entrega/nombre-apellido`

---

## Bloque A: Circuito & Código de Arduino en Wokwi (50% · 5.0 Puntos)

### Checklist de Retos Técnicos

El proyecto es **plano**: un boceto `main.ino` y un encabezado por responsabilidad. No hay subcarpetas por reto.

- [ ] **Reto 01 — Escáner I2C e inicialización del panel** (`i2c_manager.h`, `display.h`):
      bus levantado en `GPIO21`/`GPIO22` a 400 kHz, escaneo de direcciones 1-126 con `Wire.beginTransmission()` y
      `Wire.endTransmission()`, detección del dispositivo en `0x3C`, y `display.begin()` con éxito.
- [ ] **Reto 02 — Logo de arranque, POST y FSM** (`logboot.h`, `main.ino`):
      logo dibujado desde los datos del bitmap, cuadrado de autoprueba centrado con sus coordenadas reportadas,
      y la máquina de estados que sostiene el logo durante `LOGO_TIME_MS` y reporta `[FSM] BOOT -> RUN`.
- [ ] **Reto 03 — Ojos animados con RoboEyes** (`eyes.h`):
      inicialización con ancho, alto y objetivo de cuadros por segundo, avance de la animación **sin bloquear**, y
      las 7 expresiones aplicadas por tecla desde un estado base limpio.
- [ ] **Reto 04 — Consola de depuración serial** (`debug_serial.h`, `main.ino`):
      bloque de ayuda publicado, teclas `1` a `7` cambiando la expresión, `h` repitiendo la ayuda, y los caracteres
      de control ignorados en silencio.
- [ ] **Compilación limpia:** sin errores en PlatformIO ni en el simulador Wokwi, en los retos completados.
- [ ] **Commits semánticos:** commits estructurados respetando la convención (`feat:`, `fix:`, `refactor:`, `docs:`, `chore:`).

---

## Bloque B: Screencast Demostrativo Oral (50% · 5.0 Puntos)

- **Enlace al Video Screencast:** <!-- Pega aquí tu enlace de YouTube (No Listado), Google Drive Institucional o Loom -->
- **Duración del Video:** <!-- Indicar tiempo exacto mm:ss (Ejemplo: 03:45) -->

### Checklist del Video Screencast

- [ ] **Duración reglamentaria:** video de 3 a 4 minutos. Tope máximo absoluto **5:00 min**; los videos de 5:01 en adelante tienen penalización automática de **-1.00 pt**.
- [ ] **Cámara y rostro:** rostro del estudiante visible mediante cámara web durante toda la explicación.
- [ ] **Voz y sustentación técnica:** explicación fluida del bus I2C (`GPIO21` SDA, `GPIO22` SCL, 400 kHz, `0x3C`), del arranque con la máquina de estados y del módulo de ojos animados.
- [ ] **Demostración en vivo:** Monitor Serie a **115200 bps** corriendo en paralelo a la pantalla OLED, mostrando el cambio de expresión con las teclas `1` a `7`.

---

## Reglamento de Tiempos del Video

| Entrega | Límite | Penalización |
|---|---|---|
| Short de anticipación | 60 s (gracia hasta 65 s) | Más de 65 s → **-0.50 pts** · más de 90 s → se califica sobre el **50 %** |
| Screencast demostrativo | 3 a 4 min sugeridos · tope absoluto **5:00** | Desde **5:01** → **-1.00 pt** |

---

## Directiva de Entrega Parcial Salesiana ("¡Nunca te quedes con 0!")

- [ ] ¿Esta entrega es un avance parcial? En caso afirmativo, describe hasta qué reto completaste y explica tus
      aprendizajes en el screencast para asegurar tus puntos orales.

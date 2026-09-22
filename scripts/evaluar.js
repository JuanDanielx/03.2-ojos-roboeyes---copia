#!/usr/bin/env node
/**
 * ============================================================================
 * EVALUADOR PEDAGÓGICO DE CÓDIGO — SOPORTE TÉCNICO UETS (2026–2027)
 * Validador Modular y Auto-Sincronizable para Semana 03.2
 * (Animación Ocular RoboEyes, FSM de Arranque y Debug Serial)
 *
 * El proyecto es PLANO: un boceto main.ino y un encabezado por responsabilidad.
 * No hay subcarpetas por reto.
 * ============================================================================
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const REPO_RAW_BASE = 'https://raw.githubusercontent.com/UETS-Soporte-Tecnico/03.2-ojos-roboeyes/main/scripts/evaluar.js';
const rootDir = path.resolve(__dirname, '..');

// Colores ANSI
const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
  magenta: '\x1b[35m'
};

async function syncEvaluator() {
  const localPath = __filename;
  try {
    await new Promise((resolve) => {
      const req = https.get(REPO_RAW_BASE, { timeout: 3000 }, (res) => {
        if (res.statusCode === 200) {
          let data = '';
          res.on('data', chunk => data += chunk);
          res.on('end', () => {
            const currentData = fs.readFileSync(localPath, 'utf8');
            if (data && data.length > 200 && data !== currentData) {
              console.log(`${c.cyan}🔄 Actualizando script de evaluación con la última versión de GitHub...${c.reset}\n`);
              fs.writeFileSync(localPath, data, 'utf8');
            }
            resolve();
          });
        } else {
          resolve();
        }
      });
      req.on('error', () => resolve());
      req.on('timeout', () => { req.destroy(); resolve(); });
    });
  } catch {
    // Si no hay red o da timeout, continúa normalmente con el script local
  }
}

function leerArchivo(relPath) {
  const fullPath = path.join(rootDir, relPath);
  if (!fs.existsSync(fullPath)) return null;
  return fs.readFileSync(fullPath, 'utf8');
}

function stripComments(code) {
  if (!code) return '';
  return code.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
}

let violaciones = [];
function checkForbidden(content, file) {
  if (/c\+\+/i.test(content)) {
    violaciones.push(`Archivo '${file}' contiene 'C++'. Usar siempre 'código de Arduino'.`);
  }
  if (/baymax/i.test(content)) {
    violaciones.push(`Archivo '${file}' contiene 'Baymax'. Usar nomenclatura neutral 'Sistema Embebido ESP32'.`);
  }
  if (/socr[aá]t/i.test(content)) {
    violaciones.push(`Archivo '${file}' contiene jerga 'socrática'. Usar 'Preguntas Guía' o 'Preguntas de Pizarra'.`);
  }
}

async function run() {
  await syncEvaluator();

  console.log(`\n${c.bold}${c.cyan}======================================================================${c.reset}`);
  console.log(`${c.bold}${c.cyan} 🤖 REPORTE PEDAGÓGICO DE ENTREGA — SOPORTE TÉCNICO UETS (3° BGU)    ${c.reset}`);
  console.log(`${c.bold}${c.cyan}    Semana 03.2: RoboEyes, FSM de Arranque y Debug Serial            ${c.reset}`);
  console.log(`${c.bold}${c.cyan}======================================================================${c.reset}\n`);

  let puntaje = 0;
  const retos = [];

  // 1. Auditoría de Reglas Institucionales (proyecto plano)
  const filesToAudit = [
    'config.h',
    'i2c_manager.h',
    'display.h',
    'logo.h',
    'logboot.h',
    'eyes.h',
    'debug_serial.h',
    'main.ino',
    'README.md',
    'CHEATSHEET_ESTUDIANTE.md'
  ];
  for (const f of filesToAudit) {
    const cont = leerArchivo(f);
    if (cont) checkForbidden(cont, f);
  }

  // 2. Verificación de Estructura de Archivos
  const i2cCont = leerArchivo('i2c_manager.h');
  const dispCont = leerArchivo('display.h');
  const logCont = leerArchivo('logboot.h');
  const ojosCont = leerArchivo('eyes.h');
  const consCont = leerArchivo('debug_serial.h');
  const mainCont = leerArchivo('main.ino');

  const mainCode = stripComments(mainCont);
  const i2cCode = stripComments(i2cCont);
  const dispCode = stripComments(dispCont);
  const logCode = stripComments(logCont);
  const ojosCode = stripComments(ojosCont);
  const consCode = stripComments(consCont);

  // RETO 01: Bus I2C y panel listos (1.00 pt)
  let r1Pass = false;
  let r1Msg = '';
  if (!i2cCont || !dispCont || !mainCont) {
    r1Msg = 'Faltan archivos esenciales (i2c_manager.h, display.h, main.ino).';
  } else if (!/Wire\s*\.\s*begin\s*\(/.test(i2cCode) || !/Wire\s*\.\s*setClock\s*\(/.test(i2cCode)) {
    r1Msg = 'i2c_manager.h no levanta el bus con Wire.begin() y Wire.setClock(). Completa el TODO 1.1.';
  } else if (!/display\s*\.\s*begin\s*\(/.test(dispCode)) {
    r1Msg = 'display.h no inicializa el panel. Completa el TODO 1.4.';
  } else if (!/initI2C\s*\(\s*\)/.test(mainCode) || !/initDisplay\s*\(\s*\)/.test(mainCode)) {
    r1Msg = 'main.ino no invoca initI2C() e initDisplay(). Completa el TODO 1.5.';
  } else {
    r1Pass = true;
    puntaje += 1.0;
  }
  retos.push({ id: 'RETO 01', name: 'Bus I2C y panel SSD1306 inicializados (i2c_manager.h, display.h)', ok: r1Pass, msg: r1Msg, pts: 1.0 });

  // RETO 02: Logo, POST de pantalla y FSM de arranque (1.00 pt)
  let r2Pass = false;
  let r2Msg = '';
  if (!logCont || !mainCont) {
    r2Msg = 'Faltan archivos esenciales (logboot.h, main.ino).';
  } else if (!/display\s*\.\s*drawBitmap\s*\(/.test(logCode)) {
    r2Msg = 'logboot.h no dibuja el logo desde el mapa de bits. Completa el TODO 2.2.';
  } else if (!/display\s*\.\s*draw/.test(logCode) || !/Serial\s*\.\s*print/.test(logCode)) {
    r2Msg = 'logboot.h no dibuja la figura de autoprueba ni informa sus coordenadas. Completa el TODO 2.3.';
  } else if (!/showLogo\s*\(\s*\)/.test(mainCode) || !/testDisplay\s*\(\s*\)/.test(mainCode)) {
    r2Msg = 'main.ino no invoca showLogo() y testDisplay(). Completa el TODO 2.4.';
  } else if (!/millis\s*\(/.test(mainCode) || !/LOGO_TIME_MS/.test(mainCode)) {
    r2Msg = 'main.ino no temporiza la ventana de arranque con millis() y LOGO_TIME_MS.';
  } else {
    r2Pass = true;
    puntaje += 1.0;
  }
  retos.push({ id: 'RETO 02', name: 'Logo de arranque, POST de pantalla y FSM BOOT -> RUN', ok: r2Pass, msg: r2Msg, pts: 1.0 });

  // RETO 03: Ojos RoboEyes: inicialización y expresiones (1.50 pts)
  let r3Pass = false;
  let r3Msg = '';
  if (!ojosCont || !mainCont) {
    r3Msg = 'Faltan archivos esenciales (eyes.h, main.ino).';
  } else if (!/roboEyes\s*\.\s*begin\s*\(/.test(ojosCode)) {
    r3Msg = 'eyes.h no inicializa los ojos. Completa el TODO 3.1.';
  } else if (!/roboEyes\s*\.\s*update\s*\(/.test(ojosCode)) {
    r3Msg = 'eyes.h no avanza la animación con roboEyes.update(). Completa el TODO 3.2.';
  } else if (!/roboEyes\s*\.\s*setMood\s*\(/.test(ojosCode)) {
    r3Msg = 'eyes.h no aplica ninguna expresión con roboEyes.setMood(). Completa el TODO 3.3.';
  } else if (!/initEyes\s*\(\s*\)/.test(mainCode) || !/updateEyes\s*\(\s*\)/.test(mainCode)) {
    r3Msg = 'main.ino no invoca initEyes() y updateEyes(). Completa los TODO 3.4 y 4.3.';
  } else {
    r3Pass = true;
    puntaje += 1.5;
  }
  retos.push({ id: 'RETO 03', name: 'RoboEyes: inicialización, animación no bloqueante y expresiones', ok: r3Pass, msg: r3Msg, pts: 1.5 });

  // RETO 04: Consola de depuración serial e integración (1.50 pts)
  let r4Pass = false;
  let r4Msg = '';
  if (!consCont || !mainCont) {
    r4Msg = 'Faltan archivos esenciales (debug_serial.h, main.ino).';
  } else if (!/Serial\s*\.\s*available\s*\(/.test(consCode) || !/Serial\s*\.\s*read\s*\(/.test(consCode)) {
    r4Msg = 'debug_serial.h no atiende el puerto con Serial.available() y Serial.read(). Completa el TODO 4.2.';
  } else if (!/setEyesMood\s*\(/.test(consCode)) {
    r4Msg = 'debug_serial.h no despacha las teclas hacia setEyesMood(). Completa el TODO 4.2.';
  } else if (!/printHelp\s*\(\s*\)/.test(mainCode) || !/debugSerialTick\s*\(\s*\)/.test(mainCode)) {
    r4Msg = 'main.ino no publica la ayuda ni atiende la consola. Completa los TODO 4.3.';
  } else {
    r4Pass = true;
    puntaje += 1.5;
  }
  retos.push({ id: 'RETO 04', name: 'Consola de depuración serial a 115200 bps e integración', ok: r4Pass, msg: r4Msg, pts: 1.5 });

  // Despliegue de resultados
  for (const r of retos) {
    const badge = r.ok ? `${c.green}✅ APROBADO${c.reset}` : `${c.red}❌ PENDIENTE${c.reset}`;
    console.log(`[${r.id}] ${badge} - ${r.name}`);
    if (!r.ok && r.msg) {
      console.log(`        ${c.yellow}⚠️ Pista: ${r.msg}${c.reset}`);
    }
  }

  console.log(`\n${c.bold}----------------------------------------------------------------------${c.reset}`);
  console.log(`🏆 ${c.bold}PUNTAJE EN CÓDIGO (BLOQUE A):${c.reset} ${puntaje.toFixed(2)} / 5.00 PUNTOS`);
  console.log(`📹 ${c.bold}BLOQUE B (VIDEO SCREENCAST):${c.reset}  5.00 PUNTOS (Sustentación oral de 4 min)`);
  console.log(`${c.bold}----------------------------------------------------------------------${c.reset}`);
  console.log(`${c.gray}Este evaluador revisa ESTRUCTURA, no comportamiento: que el panel se vea bien`);
  console.log(`y que la animación corra sigue siendo tu demostración en el screencast.${c.reset}`);

  if (violaciones.length > 0) {
    console.log(`\n${c.red}${c.bold}🚨 AUDITORÍA INSTITUCIONAL: Se detectaron términos no conformes:${c.reset}`);
    for (const v of violaciones) {
      console.log(`  - ${c.yellow}${v}${c.reset}`);
    }
    console.log(`${c.gray}Corrige estos términos para asegurar la máxima nota en tu entrega.${c.reset}\n`);
    process.exit(1);
  }

  if (puntaje >= 5.0) {
    console.log(`\n${c.green}${c.bold}🎉 ¡EXCELENTE! Has completado todos los retos de la Semana 03.2.${c.reset}`);
    console.log(`💡 Siguiente paso: Graba tu screencast explicando el conexionado, el Monitor Serie y abre tu Pull Request.\n`);
    process.exit(0);
  } else {
    console.log(`\n${c.yellow}💡 Completa los TODOs pendientes y vuelve a ejecutar: pnpm test\n${c.reset}`);
    process.exit(0);
  }
}

run();

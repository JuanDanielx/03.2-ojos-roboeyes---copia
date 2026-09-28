// debug_serial.h
// ============================================
// RESPONSABILIDAD: Leer comandos del Monitor Serie y mostrar la ayuda.
// No sabe nada de: bus I2C, OLED, logos ni animacion interna de los ojos.
// ============================================

#ifndef DEBUG_SERIAL_H
#define DEBUG_SERIAL_H

#include <Arduino.h>
#include "config.h"
#include "eyes.h"

// TODO 4.1: Publica el bloque de ayuda con las 7 expresiones y la tecla de ayuda.
// Pregunta Guía: ¿Qué debe ver un compañero que abre el monitor por primera vez?
inline void printHelp() {
    Serial.println(F("\n=== CONSOLA DE CONTROL ROBOEYES ==="));
    Serial.println(F("1: Expresión Normal / Defecto"));
    Serial.println(F("2: Expresión Feliz"));
    Serial.println(F("3: Expresión Cansado"));
    Serial.println(F("4: Expresión Enojado"));
    Serial.println(F("5: Expresión Risa"));
    Serial.println(F("6: Expresión Confuso / Curioso"));
    Serial.println(F("7: Guiño / Pestañeo"));
    Serial.println(F("h: Mostrar este menú de ayuda"));
    Serial.println(F("===================================\n"));
}

// TODO 4.2: Atiende el puerto sin bloquear: una tecla, respuesta inmediata; teclas 1 a 7 cambian la expresión, h repite la ayuda, los caracteres de control se ignoran en silencio.
// Pregunta Guía: ¿Qué pasa con una tecla desconocida y qué pasa con un carácter de control?
inline void debugSerialTick() {
    char key = Serial.read();
    /* ESCRIBE TU CÓDIGO AQUÍ */
    if (Serial.available() > 0){
        char key = Serial.read();
    }
    if (key == '\r' || key == '\n') {
        return;
    }
    if (key >= '1' && key <= '7'){
        setEyesMood(key);
        Serial.print(F("Expresion cambiada a: "));
        Serial.println(key);

    }
    
}

#endif

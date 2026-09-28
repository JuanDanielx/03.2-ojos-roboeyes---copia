// logboot.h
// ============================================
// RESPONSABILIDAD: Dibujar el logo de arranque y hacer el POST de pantalla.
// No sabe nada de: ojos, bus I2C ni comandos del Monitor Serie.
// ============================================

#ifndef LOGBOOT_H
#define LOGBOOT_H

#include <Arduino.h>
#include "display.h"
#include "logo.h"

// TODO 2.2: Pinta el marco del logo desde logo_bitmap y preséntalo en el panel.
// Pregunta Guía: ¿Qué debe verse en el panel durante la ventana de arranque?
inline void showLogo() {
    display.clearDisplay();
    display.drawBitmap(0, 0, logo_bitmap, LOGO_WIDTH, LOGO_HEIGHT, SSD1306_WHITE);
    display.display();
}

// TODO 2.3: Dibuja el cuadrado de autoprueba centrado e informa sus coordenadas.
// Pregunta Guía: ¿Cómo compruebas que el cuadrado quedó centrado sin medir a ojo?
inline void testDisplay() {
    /* ESCRIBE TU CÓDIGO AQUÍ */
    display.clearDisplay();
    int side = 32;
    int x = (OLED_WIDTH - side) / 2;
    int y = (OLED_HEIGHT - side) / 2;
    
    Serial.print("Posicion en x: ");
    Serial.print(x);
    Serial.print("Y: ");
    Serial.print(y);



    display.drawRect(x, y, side, side, SSD1306_WHITE);
    display.display();
}

#endif

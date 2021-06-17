#include <arduinoFFT.h>
#include "SFE_MMA8452Q.h"
#include <Wire.h>

#define SAMPLES 64             //Must be a power of 2
#define SAMPLING_FREQUENCY 200 //Hz, must be less than 10000 due to ADC

arduinoFFT FFT = arduinoFFT();

unsigned int sampling_period_us;
unsigned long microseconds;
 
double vReal[SAMPLES];
double vRealY[SAMPLES];
double vRealZ[SAMPLES];
double vImag[SAMPLES];

MMA8452Q acelerometro(0x1C);
double ax, ay, az;

void setup(void) {
  Serial.begin(9600);
  Serial.println("Teste de comunicacao MMA8452");
  acelerometro.init();
  acelerometro.init(SCALE_8G);
  sampling_period_us = round(1000000*(1.0/SAMPLING_FREQUENCY));
}

void loop() {

  if (acelerometro.available())
  {
    for(int i=0; i<SAMPLES; i++){
      microseconds = micros();    //Overflows after around 70 minutes!
      acelerometro.read();
      ax = acelerometro.cx * 9.80665;
      ay = acelerometro.cy * 9.80665;
      az = acelerometro.cz * 9.80665;
      vReal[i] = ax;
      vRealY[i] = ay;
      vRealZ[i] = az;
      vImag[i] = 0; 
      while(micros() < (microseconds + sampling_period_us)){
      }
    }
  }
  
  FFT.Windowing(vReal, SAMPLES, FFT_WIN_TYP_HAMMING, FFT_FORWARD);
  FFT.Compute(vReal, vImag, SAMPLES, FFT_FORWARD);
  FFT.ComplexToMagnitude(vReal, vImag, SAMPLES);
  double peak = FFT.MajorPeak(vReal, SAMPLES, SAMPLING_FREQUENCY);
    
  Serial.print("xp"); Serial.println(peak);

  FFT.Windowing(vRealY, SAMPLES, FFT_WIN_TYP_HAMMING, FFT_FORWARD);
  FFT.Compute(vRealY, vImag, SAMPLES, FFT_FORWARD);
  FFT.ComplexToMagnitude(vRealY, vImag, SAMPLES);
  double peakY = FFT.MajorPeak(vRealY, SAMPLES, SAMPLING_FREQUENCY);

  Serial.print("yp"); Serial.println(peakY);

  FFT.Windowing(vRealZ, SAMPLES, FFT_WIN_TYP_HAMMING, FFT_FORWARD);
  FFT.Compute(vRealZ, vImag, SAMPLES, FFT_FORWARD);
  FFT.ComplexToMagnitude(vRealZ, vImag, SAMPLES);
  double peakZ = FFT.MajorPeak(vRealZ, SAMPLES, SAMPLING_FREQUENCY);

  Serial.print("zp"); Serial.println(peakZ);
    
  for(int i=0; i<(SAMPLES/2); i++){
    /*View all these three lines in serial terminal to see which frequencies has which amplitudes*/     
    Serial.print("ff"); Serial.println((i * 1.0 * SAMPLING_FREQUENCY) / SAMPLES, 1);
    Serial.print("xa"); 
    Serial.println(vReal[i]);    //View only this line in serial plotter to visualize the bins
    Serial.print("ya"); 
    Serial.println(vRealY[i]);
    Serial.print("za"); 
    Serial.println(vRealZ[i]);
      
  }
  Serial.println("-");
  delay(100);
}

#include "I2Cdev.h"
#include "MPU6050.h"
#include "arduinoFFT.h"

#define SAMPLES 64             //Must be a power of 2
#define SAMPLING_FREQUENCY 200 //Hz, must be less than 10000 due to ADC

arduinoFFT FFT = arduinoFFT();
 
unsigned int sampling_period_us;
unsigned long microseconds;
 
double vReal[SAMPLES];
double vRealY[SAMPLES];
double vRealZ[SAMPLES];
double vImag[SAMPLES];

#if I2CDEV_IMPLEMENTATION == I2CDEV_ARDUINO_WIRE
    #include "Wire.h"
#endif

MPU6050 accelgyro;

int16_t ax, ay, az;
int gx, gy, gz;

#define OUTPUT_READABLE_ACCELGYRO

#define LED_PIN 13
bool blinkState = false;

void setup() {
    // join I2C bus (I2Cdev library doesn't do this automatically)
    #if I2CDEV_IMPLEMENTATION == I2CDEV_ARDUINO_WIRE
        Wire.begin();
    #elif I2CDEV_IMPLEMENTATION == I2CDEV_BUILTIN_FASTWIRE
        Fastwire::setup(400, true);
    #endif

    Serial.begin(38400);

    accelgyro.initialize();
    sampling_period_us = round(1000000*(1.0/SAMPLING_FREQUENCY));
    
    // configure Arduino LED for
    pinMode(LED_PIN, OUTPUT);
}

void loop() {
    for(int i=0; i<SAMPLES; i++){
        microseconds = micros();    //Overflows after around 70 minutes!

        accelgyro.getMotion6(&ax, &ay, &az, &gx, &gy, &gz);
        vReal[i] = (ax/16384)*9.81;
        vRealY[i] = (ay/16384)*9.81;
        vRealZ[i] =  (az/16384)*9.81;
        vImag[i] = 0;
     
        while(micros() < (microseconds + sampling_period_us)){
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

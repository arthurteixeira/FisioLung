#include <arduinoFFT.h>

#include <Adafruit_MPU6050.h>
#include <Adafruit_Sensor.h>
#include <Wire.h>

Adafruit_MPU6050 mpu;

#define SAMPLES 64             //Must be a power of 2
#define SAMPLING_FREQUENCY 200 //Hz, must be less than 10000 due to ADC

arduinoFFT FFT = arduinoFFT();

unsigned int sampling_period_us;
unsigned long microseconds;
 
double vReal[SAMPLES];
double vRealY[SAMPLES];
double vRealZ[SAMPLES];
double vImag[SAMPLES];

void setup(void) {
  Serial.begin(115200);

  // Try to initialize!
  if (!mpu.begin()) {
    Serial.println("Failed to find MPU6050 chip");
    while (1) {
      delay(10);
    }
  }
  Serial.println("MPU6050 Found!");

  // set accelerometer range to +-8G
  mpu.setAccelerometerRange(MPU6050_RANGE_8_G);

  // set gyro range to +- 500 deg/s
  mpu.setGyroRange(MPU6050_RANGE_500_DEG);

  // set filter bandwidth to 21 Hz
  mpu.setFilterBandwidth(MPU6050_BAND_21_HZ);
  sampling_period_us = round(1000000*(1.0/SAMPLING_FREQUENCY));
  delay(100);
}

void loop() {
  /* Get new sensor events with the readings */
  sensors_event_t a, g, temp;

  for(int i=0; i<SAMPLES; i++){
    microseconds = micros();    //Overflows after around 70 minutes!
    mpu.getEvent(&a, &g, &temp);
    vReal[i] = a.acceleration.x;
    vRealY[i] = a.acceleration.y;
    vRealZ[i] = a.acceleration.z;
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

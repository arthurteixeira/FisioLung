 /* App: Esse código é um gerador de números aleatórios, que envia os valores gerados, usando a 
 * porta serial do Arduíno para a aplicação web que vai desenhar o gráfico.
 * Mais informações sobre a class randomSeed consulte:http://www.arduino.cc/en/Reference/Random
 */
 
// variável para armazenar valores aleatórios.
long randNumber;
 
/**
 * setup - configuração do sistema
 */
 void setup(){
 	Serial.begin(9600); // taxa de velocidade da comunicação.
 	randomSeed(analogRead(0));
 }
 
/**
 * loop - 
 */ 
 void loop(){
 // randNumber recebe valores entre 0 e 11.
 randNumber = random(0, 11);
 Serial.println(randNumber); // imprime o valor.
 delay(1000); // aguarda 1 segundo.
}
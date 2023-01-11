//!FUNCIONES

export function mostrar(arr1, arr2, arr3) {
  return "[0]: X= " + arr1[0] + "   Y= " + arr2[0] + "   Z= " + arr3[0] + "\n" +
    "[1]: X= " + arr1[1] + "   Y= " + arr2[1] + "   Z= " + arr3[1] + "\n" +
    "[2]: X= " + arr1[2] + "   Y= " + arr2[2] + "   Z= " + arr3[2] + "\n" +
    "[3]: X= " + arr1[3] + "   Y= " + arr2[3] + "   Z= " + arr3[3] + "\n" +
    "[4]: X= " + arr1[4] + "   Y= " + arr2[4] + "   Z= " + arr3[4] + "\n" +
    "[5]: X= " + arr1[5] + "   Y= " + arr2[5] + "   Z= " + arr3[5] + "\n" +
    "[6]: X= " + arr1[6] + "   Y= " + arr2[6] + "   Z= " + arr3[6] + "\n" +
    "[7]: X= " + arr1[7] + "   Y= " + arr2[7] + "   Z= " + arr3[7] + "\n" +
    "[8]: X= " + arr1[8] + "   Y= " + arr2[8] + "   Z= " + arr3[8] + "\n" +
    "[9]: X= " + arr1[9] + "   Y= " + arr2[9] + "   Z= " + arr3[9] + "\n" +
    "[10]: X= " + arr1[10] + "   Y= " + arr2[10] + "   Z= " + arr3[10] + "\n" +
    "[11]: X= " + arr1[11] + "   Y= " + arr2[11] + "   Z= " + arr3[11] + "\n" +
    "[12]: X= " + arr1[12] + "   Y= " + arr2[12] + "   Z= " + arr3[12] + "\n" +
    "[13]: X= " + arr1[13] + "   Y= " + arr2[13] + "   Z= " + arr3[13] + "\n" +
    "[14]: X= " + arr1[14] + "   Y= " + arr2[14] + "   Z= " + arr3[14] + "\n" +
    "[15]: X= " + arr1[15] + "   Y= " + arr2[15] + "   Z= " + arr3[15] + "\n" +
    "[16]: X= " + arr1[16] + "   Y= " + arr2[16] + "   Z= " + arr3[16] + "\n" +
    "[17]: X= " + arr1[17] + "   Y= " + arr2[17] + "   Z= " + arr3[17] + "\n" +
    "[18]: X= " + arr1[18] + "   Y= " + arr2[18] + "   Z= " + arr3[18] + "\n" +
    "[19]: X= " + arr1[19] + "   Y= " + arr2[19] + "   Z= " + arr3[19] + "\n" +
    "[20]: X= " + arr1[20] + "   Y= " + arr2[20] + "   Z= " + arr3[20] + "\n"
}

//Angulo del punto A al punto B en el eje de las absisas (X)
function calcularAngulo_A_B(x1, y1, x2, y2) {
  return Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
}

//Distancia entre 2 puntos
function distancia_A_B(x1, y1, x2, y2) {
  return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

//Angulo de 3 puntos (Angulo B de los puntos A, B, C [en ese orden])
function angulo_A_B_C(x1, y1, x2, y2, x3, y3) {
  let d1 = distancia_A_B(x1, y1, x2, y2);
  let d2 = distancia_A_B(x2, y2, x3, y3);
  let d3 = distancia_A_B(x1, y1, x3, y3);
  return Math.acos((d1 * d1 + d2 * d2 - d3 * d3) / (2 * d1 * d2)) * 180 / Math.PI;
}

//Calcular centroide de la palma de la mano
function average_palm(coordX, coordY) {
  let coordinates_palm = [];
  let promX = (coordX[0] + coordX[1] + coordX[2] + coordX[5] + coordX[9] + coordX[13] + coordX[17]) / 7;
  let promY = (coordY[0] + coordY[1] + coordY[2] + coordY[5] + coordY[9] + coordY[13] + coordY[17]) / 7;
  coordinates_palm.push(Math.trunc(promX));
  coordinates_palm.push(Math.trunc(promY));
  return coordinates_palm;
}

//Dibujar el centroide
function dibujarCentroide(centroide) {
  let dibujo = document.getElementById('output_canva'); //Canvas
  let cx = dibujo.getContext('2d');
  cx.beginPath();
  cx.arc(centroide[0], centroide[1], 2, 0, Math.PI * 2, true);
  cx.fill();
}

//Orientación de la mano derecha
function CalcularOrienctacionHand(rightHandX, rightHandY) {
  let angulo = calcularAngulo_A_B(rightHandX[9], rightHandY[9], rightHandX[0], rightHandY[0])
  let orientacion = '';

  if (angulo < 0) {
    angulo += 360;
  }

  if ((angulo >= 0 && angulo < 45) || (angulo <= 360 && angulo > 315)) {
    orientacion = 'left'
  } else {
    if (angulo >= 45 && angulo < 135) {
      orientacion = 'upward'
    } else {
      if (angulo >= 135 && angulo < 225) {
        orientacion = 'right'
      } else {
        if (angulo >= 225 && angulo < 315) {
          orientacion = 'downward'
        }
      }
    }
  }
  return orientacion;
}

//Funciones para la detección de los números del 0 al 9

//Calcular Número 0
function Number_0_Right(rightHandX, rightHandY, centroide) {

  let angulo_4_3 = calcularAngulo_A_B(rightHandX[4], rightHandY[4], rightHandX[3], rightHandY[3])
  let angulo_20_18_17 = angulo_A_B_C(rightHandX[20], rightHandY[20], rightHandX[18], rightHandY[18], rightHandX[17], rightHandY[17])

  if (
    (rightHandY[8] < rightHandY[4] && rightHandY[12] < rightHandY[4] && rightHandY[16] < rightHandY[4] && rightHandY[20] < rightHandY[4]) &&
    (rightHandY[8] > rightHandY[7] && rightHandY[12] > rightHandY[11] && rightHandY[16] > rightHandY[15] && rightHandY[20] > rightHandY[19]) &&

    (rightHandY[7] < centroide[1] && rightHandY[11] < centroide[1] && rightHandY[15] < centroide[1] && rightHandY[19] < centroide[1]) &&

    rightHandX[4] > rightHandX[2] &&
    rightHandX[8] > rightHandX[6] && rightHandX[12] > rightHandX[10] && rightHandX[16] > rightHandX[14] &&
    rightHandX[20] > rightHandX[18] &&

    (rightHandY[2] > centroide[1]) && (angulo_4_3 >= 60 && angulo_4_3 <= 150) &&
    CalcularOrienctacionHand(rightHandX, rightHandY) === 'upward' &&
    (angulo_20_18_17 > 80 && angulo_20_18_17 <= 135)
  ) {
    return true
  } else {
    return false
  }
}

//Calcular Número 1
function Number_1_Right(rightHandX, rightHandY) {

  //Angulo del punto 8 al punto 7
  let angulo = calcularAngulo_A_B(rightHandX[8], rightHandY[8], rightHandX[7], rightHandY[7]);

  if (
    rightHandY[12] > rightHandY[11] && rightHandY[12] > rightHandY[10] && rightHandY[12] > rightHandY[9] &&
    rightHandY[8] < rightHandY[7] &&

    (rightHandY[16] > rightHandY[15] && rightHandY[16] > rightHandY[14] && rightHandY[15] > rightHandY[13]) &&
    (rightHandY[20] > rightHandY[19] && rightHandY[20] > rightHandY[18] && rightHandY[19] > rightHandY[17]) &&

    (rightHandX[4] < rightHandX[3] && rightHandX[4] < rightHandX[2]) &&
    (rightHandX[4] < rightHandX[1] || rightHandX[4] < rightHandX[5] || rightHandX[4] < rightHandX[9] || rightHandX[4] < rightHandX[13]) &&
    rightHandY[4] < rightHandY[2] && rightHandY[4] < rightHandY[1] &&

    (angulo >= 80 && angulo <= 100)
  ) {
    return true
  }
  else {
    return false
  }
}


//Calcular Número 2
function Number_2_Right(rightHandX, rightHandY, angulo_4_2) {

  //Angulo del punto 12 al punto 11
  let angulo = calcularAngulo_A_B(rightHandX[12], rightHandY[12], rightHandX[11], rightHandY[11]);

  if (
    rightHandY[12] < rightHandY[11] && rightHandY[12] < rightHandY[8] && rightHandY[8] < rightHandY[11] &&
    rightHandY[8] < rightHandY[7] && rightHandY[8] < rightHandY[11] &&

    (rightHandY[16] > rightHandY[15] && rightHandY[16] > rightHandY[14] && rightHandY[15] > rightHandY[13]) &&
    (rightHandY[20] > rightHandY[19] && rightHandY[20] > rightHandY[18] && rightHandY[19] > rightHandY[17]) &&

    (rightHandX[4] < rightHandX[3] && rightHandX[4] < rightHandX[2]) &&
    (rightHandX[4] < rightHandX[1] || rightHandX[4] < rightHandX[5] || rightHandX[4] < rightHandX[9] || rightHandX[4] < rightHandX[13]) &&
    rightHandY[4] < rightHandY[2] && rightHandY[4] < rightHandY[1] &&

    (angulo_4_2 <= 45 && angulo_4_2 >= 15) && (angulo >= 65 && angulo <= 95)
  ) {
    return true
  }
  else {
    return false
  }
}

//Calcular Número 3
function Number_3_Right(rightHandX, rightHandY, angulo_4_3) {

  //Angulo del punto 12 al punto 11
  let angulo = calcularAngulo_A_B(rightHandX[12], rightHandY[12], rightHandX[11], rightHandY[11]);

  if (
    rightHandY[12] < rightHandY[11] && rightHandY[12] < rightHandY[8] && rightHandY[8] < rightHandY[11] &&
    rightHandY[8] < rightHandY[7] && rightHandY[8] < rightHandY[11] &&

    (rightHandY[16] > rightHandY[15] && rightHandY[16] > rightHandY[14] && rightHandY[15] > rightHandY[13]) &&
    (rightHandY[20] > rightHandY[19] && rightHandY[20] > rightHandY[18] && rightHandY[19] > rightHandY[17]) &&

    rightHandX[4] > rightHandX[3] && rightHandX[4] > rightHandX[2] && rightHandX[4] > rightHandX[5] &&

    (angulo_4_3 <= 170 && angulo_4_3 >= 110) && (angulo >= 65 && angulo <= 95)
  ) {
    return true
  }
  else {
    return false
  }
}

//Calcular Número 4
function Number_4_Right(rightHandX, rightHandY, angulo_4_2) {

  if (rightHandY[20] < rightHandY[19] && rightHandY[20] < rightHandY[14] &&
    rightHandY[16] < rightHandY[15] && rightHandY[16] < rightHandY[11] &&

    rightHandY[12] < rightHandY[8] && rightHandY[12] < rightHandY[16] &&
    rightHandY[8] < rightHandY[7] && rightHandY[8] < rightHandY[15] &&

    (rightHandX[4] < rightHandX[3] && rightHandX[4] < rightHandX[2]) &&
    (rightHandX[4] < rightHandX[1] || rightHandX[4] < rightHandX[5] || rightHandX[4] < rightHandX[9] || rightHandX[4] < rightHandX[13]) &&
    rightHandY[4] < rightHandY[2] && rightHandY[4] < rightHandY[1] &&

    (angulo_4_2 <= 45 && angulo_4_2 >= 15)
  ) {
    return true
  } else {
    return false
  }
}

//Calcular Número 5
function Number_5_Right(rightHandX, rightHandY, angulo_4_3) {

  if (rightHandY[20] < rightHandY[19] && rightHandY[20] < rightHandY[14] &&
    rightHandY[16] < rightHandY[15] && rightHandY[16] < rightHandY[11] &&
    rightHandY[12] < rightHandY[11] && rightHandY[12] < rightHandY[8] && rightHandY[12] < rightHandY[16] &&
    rightHandY[8] < rightHandY[7] && rightHandY[8] < rightHandY[15] &&
    rightHandX[4] > rightHandX[3] && rightHandX[4] > rightHandX[2] && rightHandX[4] > rightHandX[5] &&

    (angulo_4_3 <= 170 && angulo_4_3 >= 110)
  ) {
    return true
  } else {
    return false
  }
}

//Calcular Número 6
function Number_6_Right(rightHandX, rightHandY, absoluto_20_4) {

  if (rightHandY[16] < rightHandY[15] && rightHandY[16] < rightHandY[14] &&
    rightHandY[12] < rightHandY[11] && rightHandY[12] < rightHandY[10] &&
    rightHandY[8] < rightHandY[7] && rightHandY[8] < rightHandY[6] &&
    rightHandY[12] < rightHandY[8] && rightHandY[12] < rightHandY[16] &&
    rightHandY[8] < rightHandY[15] && rightHandY[16] < rightHandY[11] &&
    rightHandX[4] < rightHandX[3] && rightHandY[20] > rightHandY[19] &&
    (absoluto_20_4 >= 5 && absoluto_20_4 <= 20)
  ) {
    return true
  } else {
    return false
  }
}

//Calcular Número 7
function Number_7_Right(rightHandX, rightHandY, absoluto_16_4) {

  if (rightHandY[20] < rightHandY[19] && rightHandY[20] < rightHandY[18] && rightHandY[20] < rightHandY[10] &&
    rightHandY[12] < rightHandY[11] && rightHandY[12] < rightHandY[10] && rightHandY[12] < rightHandY[8] &&
    rightHandY[12] < rightHandY[7] &&
    rightHandY[8] < rightHandY[7] && rightHandY[8] < rightHandY[6] &&
    rightHandY[11] < rightHandY[7] && rightHandY[11] < rightHandY[19] &&
    rightHandX[4] < rightHandX[3] && rightHandY[16] > rightHandY[15] &&
    (absoluto_16_4 <= 35)
  ) {
    return true
  } else {
    return false
  }
}

//Calcular Número 8
function Number_8_Right(rightHandX, rightHandY, absoluto_12_4) {

  if (
    rightHandY[20] < rightHandY[19] && rightHandY[20] < rightHandY[14] &&
    rightHandY[16] < rightHandY[15] && rightHandY[16] < rightHandY[6] &&
    rightHandY[12] > rightHandY[11] && rightHandY[12] > rightHandY[10] && rightHandY[11] > rightHandY[10] &&
    rightHandY[8] < rightHandY[7] && rightHandY[8] < rightHandY[15] &&

    (rightHandX[4] < rightHandX[3] || rightHandX[4] > rightHandX[2]) &&
    rightHandX[4] > rightHandX[12] && rightHandY[4] > rightHandY[12] &&
    (absoluto_12_4 >= 10 && absoluto_12_4 <= 25)
  ) {
    return true
  } else {
    return false
  }
}

//Calcular Número 9
function Number_9_Right(rightHandX, rightHandY, absoluto_4_8) {

  if (
    rightHandY[20] < rightHandY[19] && rightHandY[20] < rightHandY[18] && rightHandY[20] < rightHandY[14] &&
    rightHandY[16] < rightHandY[15] && rightHandY[16] < rightHandY[14] && rightHandY[16] < rightHandY[7] &&
    rightHandY[12] < rightHandY[11] && rightHandY[12] < rightHandY[10] && rightHandY[12] < rightHandY[16] &&

    rightHandY[8] > rightHandY[7] && rightHandY[8] > rightHandY[6] && rightHandY[7] > rightHandY[6] &&

    (rightHandX[4] < rightHandX[3] || rightHandX[4] > rightHandX[2]) &&
    rightHandX[4] > rightHandX[8] && rightHandY[4] > rightHandY[8] &&
    (absoluto_4_8 >= 10 && absoluto_4_8 <= 28)
  ) {
    return true
  } else {
    return false
  }
}







export function detectNumber(rightHandX, rightHandY, rightHandZ) {





  let centroide = average_palm(rightHandX, rightHandY);
  dibujarCentroide(centroide)


  if (Number_0_Right(rightHandX, rightHandY,centroide)) {
    // console.log('Número 0')
    return ('Número 0')
  }

  if (Number_1_Right(rightHandX, rightHandY)) {
    // console.log('Número 1')
    return ('Número 1')
  }

  let angulo_4_2 = calcularAngulo_A_B(rightHandX[4], rightHandY[4], rightHandX[2], rightHandY[2])
  if (Number_2_Right(rightHandX, rightHandY, angulo_4_2)) {
    // console.log('Número 2')
    return ('Número 2')
  }

  let angulo_4_3 = calcularAngulo_A_B(rightHandX[4], rightHandY[4], rightHandX[3], rightHandY[3]);
  if (Number_3_Right(rightHandX, rightHandY, angulo_4_3)) {
    // console.log('Número 3')
    return ('Número 3')
  }

  if (Number_4_Right(rightHandX, rightHandY, angulo_4_2)) {
    // console.log('Número 4')
    return ('Número 4')
  }

  if (Number_5_Right(rightHandX, rightHandY, angulo_4_3)) {
    // console.log('Número 5')
    return ('Número 5')
  }

  let absoluto_20_4 = Math.abs(rightHandX[20] - rightHandX[4]);
  if (Number_6_Right(rightHandX, rightHandY, absoluto_20_4)) {
    // console.log('Número 6')
    return ('Número 6')
  }

  let absoluto_16_4 = Math.abs(rightHandX[16] - rightHandX[4]);
  if (Number_7_Right(rightHandX, rightHandY, absoluto_16_4)) {
    // console.log('Número 7')
    return ('Número 7')
  }

  let absoluto_12_4 = Math.abs(rightHandX[12] - rightHandX[4]);
  if (Number_8_Right(rightHandX, rightHandY, absoluto_12_4)) {
    // console.log('Número 8')
    return ('Número 8')
  }

  let absoluto_4_8 = Math.abs(rightHandX[4] - rightHandX[8]);
  if (Number_9_Right(rightHandX, rightHandY, absoluto_4_8)) {
    // console.log('Número 9')
    return ('Número 9')
  }






}

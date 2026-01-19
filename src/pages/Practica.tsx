function Practica() {
  //EJERCICIO 2

  // Contar pares

  // const countEven = [1, 2, 3, 4, 6];

  // const evenFunction = () => {
  //   let count = 0;
  //   for (const nums of countEven) {
  //     if (nums % 2 == 0) {
  //       count += 1;
  //     }
  //   }

  //   return count;
  // };

  // console.log(`${evenFunction()} even`);

  // EJERCICIO 3

  // Encontrar el mayor

  // const findMax = (arr: number[]) => {
  //   let max = arr[0];

  //   for (const nums of arr) {
  //     if (nums > max) {
  //       max = nums;
  //     }
  //   }

  //   return max;
  // };

  // console.log(findMax([3, 9, 2, 10, 4]));

  // EJERCICIO 4

  // Invertir array

  // const reverseArray = (arr: number[]) => {
  //   let max = arr.length - 1;

  //   for (let i = 0; i < arr.length; i++) {
  //     if (max >= 0) {
  //       console.log(arr[max]);
  //       max--;
  //     }
  //   }
  // };

  // reverseArray([10, 3, 2, 4, 6, 9]);

  // EJERCICIO 6

  // Encontrar mayor que >

  // const greaterThan = (arr: number[], limit: number) => {
  //   const greaterThanLimit = [];
  //   for (const nums of arr) {
  //     if (nums > limit) {
  //       greaterThanLimit.push(nums);
  //     }
  //   }

  //   console.log(greaterThanLimit);
  // };

  // greaterThan([5, 12, 8, 130, 44], 10);

  // EJERCICIO 7

  // Sumar solo pares

  // const sumEvens = (arr: number[]) => {
  //   let suma = 0;
  //   for (const nums of arr) {
  //     if (nums % 2 === 0) {
  //       suma += nums;
  //     }
  //   }

  //   console.log(suma);
  // };

  // sumEvens([1, 2, 3, 4, 6]); // 12

  // EJERCICIO 8

  // ELIMINAR DUPLICADOS

  // const unique = (arr: number[]) => {
  //   const uniqueNumbers: number[] = [];

  //   for (const num1 of arr) {
  //     let exist = false;
  //     for (const saved of uniqueNumbers) {
  //       if (saved === num1) {
  //         exist = true;
  //         break;
  //       }
  //     }
  //     if (!exist) {
  //       uniqueNumbers.push(num1);
  //     }
  //     console.log(uniqueNumbers);
  //   }
  // };

  // unique([1, 2, 2, 3, 3, 4]); // [1,2,3,4]

  // EJERCICIO 9

  // Count duplicados

  // const countOccurrences = (arr: string[]) => {
  //   const obj: Record<string, number> = {};

  //   for (const letter of arr) {
  //     if (obj[letter] === undefined) {
  //       obj[letter] = 1;
  //     } else {
  //       obj[letter]++;
  //     }
  //   }

  //   console.log(obj);
  // };

  // countOccurrences(["a", "b", "a", "c", "b", "a"]);

  // {a: 3, b: 2, c: 1}

  // EJERCICIO 10

  // Search consecutive

  // const hasConsecutive = (arr: number[]) => {
  //   for (const i in arr) {
  //     const result = arr[i] - arr[Number(i) + 1];

  //     if (result === -1) {
  //       console.log("true");
  //     }
  //   }
  // };

  // hasConsecutive([1, 2, 3, 5, 7]);

  // EJERCICIO 11

  // Dos sumas (muy entrevista)

  // const flatten = (arr: number[][]) => {
  //   const flatter = [];

  //   for (const i of arr) {
  //     for (const j of i) {
  //       flatter.push(j);
  //     }
  //   }
  //   console.log(flatter);
  // };

  // flatten([[1, 2], [3, 4], [5], [20]]); // [1, 2, 3, 4, 5]

  // EJERCICIO 12

  // Dos sumas (muy entrevista)

  // const twoSum = (arr: number[], result: number) => {
  //   for (const i in arr) {
  //     const currentNumber = arr[i];
  //     for (const j in arr) {
  //       if (currentNumber + arr[j] === result) {
  //         return [i, j];
  //       }
  //     }
  //   }
  // };

  // console.log(twoSum([2, 7, 11, 15, 1], 12)); // [0, 1]

  // EJERCICIO 13

  // Rotar array

  // const rotate = (arr: number[], posiciones: number) => {
  //   for (let i = arr.length - 1; i >= arr.length - posiciones; i--) {
  //     console.log(arr[i]);

  //   }
  // };

  // const rotate = (arr: number[], posiciones: number) => {
  //   const newArray = [];

  //   for (let i = arr.length - posiciones; i < arr.length; i++) {
  //     newArray.push(arr[i]);
  //   }

  //   for (let i = 0; i < arr.length - posiciones; i++) {
  //     newArray.push(arr[i]);
  //   }

  //   console.log(newArray);
  // };

  // rotate([1, 2, 3, 9, 7], 2); // [4,5,1,2,3]

  return <></>;
}

// // EJERCICIO 5

// // Doblar valores

// eslint-disable-next-line react-refresh/only-export-components
// export const double = (arr: number[]) => {
//   const newArray = [];
//   for (const num of arr) {
//     if (typeof num === "number") {
//       const currentNumber = num;

//       newArray.push(num + currentNumber);
//     } else {
//       throw new Error("Should be only numbers");
//     }
//   }

//   return newArray;
// };

// console.log(double([1, -2, 3, 10]));

// // eslint-disable-next-line react-refresh/only-export-components
// export const suma = (num1: number, num2: number) => {
//   return num1 + num2;
// };

export default Practica;

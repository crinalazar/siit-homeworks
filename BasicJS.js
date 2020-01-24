// Display in the console the numbers from 1 to 20

for (let i = 1; i <= 20; i++){
    console.log(i)
}

// Display in the console the odd numbers from 1 to 20

for (let i = 0; i < 10; i++){
    let a = i + 1;
    console.log(i + a);
}

// Compute the sum of the elements of an array and display it in the console (add all numbers in the array 
// together)

function sumArrayElements(arr){
    let sum = 0;
    for (let i = 0; i <= arr.length-1; i++){
        sum = sum + arr[i];
    }
    return sum;
}
console.log(sumArrayElements([1, 2, 3, 4, 5]));


// Compute the maximum of the elements of an array and display it in the console (am facut-o impreuna :) )

function maxOfArray(arr) {
    let i = 0;
    let max = -Infinity;

    while(i < arr.length) {
      if (max < arr[i]) {
        max = arr[i];
      }
      i++;
    }
    return max;
  }

console.log(maxOfArray([5, 52, 3, -110, 75, 60]));

// Compute how many times a certain element appears in an array (count the number of times one element of 
// your choice is in the array)

function elementRepeats (arr, r){
    let count = 0;
    for(let i = 0; i <= arr.length-1; i++){
        if(arr[i] === r){
            count++;
        }
    }
    return count;
}

console.log(elementRepeats([3, 5, 3, 9, 3, 25], 3));


// Expert Challenge:

// using nested for loops generate and display in the console the following pattern
//            0 1 0 1

//            1 0 1 0

//            0 1 0 1

//            1 0 1 0

let s = "";
let t = "";

for (i = 0; i <= 1; i++){
    for (let j = 0; j <= 1; j++){  
        s += j + " ";
        t += Math.abs(j - 1) + " ";
    } 
}

console.log(s , "\n" + "\n" + t, "\n" + "\n" + s, "\n" + "\n" + t);






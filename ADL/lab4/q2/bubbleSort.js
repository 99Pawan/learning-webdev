function bubbleSort(arr){
    var len = arr.length;
    for (var i = 0; i < len-1; i++) {
        for (var j = 0; j < len-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                // swap arr[j+1] and arr[j]
                var temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
    return arr;
}

var arr = [12, 11, 13, 5, 6, 7];
console.log("before sorting: " + arr);
console.log("after sorting: " + bubbleSort(arr));
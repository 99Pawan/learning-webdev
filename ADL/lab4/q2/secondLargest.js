function secondLargest(arr){
    let maxi = -1, maxi2 = -1;
    for(let i = 0; i < arr.length; i++){
        if(arr[i] >= maxi){
            maxi2 = maxi;
            maxi = arr[i];
        }
    }
    return maxi2;
}

var arr = [1,2,3,4,5,6,7,8,9];

console.log(secondLargest(arr));
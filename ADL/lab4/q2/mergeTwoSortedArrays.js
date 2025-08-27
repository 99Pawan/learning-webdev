function merge(arr1, arr2){
    var ans = [];
    let i = 0, j = 0;
    while(i < arr1.length && j < arr2.length){
        if(arr1[i] < arr2[j]){
            ans.push(arr1[i]);
            i++;
        } else {
            ans.push(arr2[j]);
            j++;
        }
    } 
    while(i < arr1.length){
        ans.push(arr1[i]);
        i++;
    }
    while(j < arr2.length){
        ans.push(arr2[j]);
        j++;
    }
    return ans;
}

var arr1 = [1,3,5,7];
var arr2 = [2,4,6,8];

console.log(merge(arr1, arr2));
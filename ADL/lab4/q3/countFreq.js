function countCharacterFrequency(str) {
    let frequency = {};

    for (let char of str) {
        frequency[char] = (frequency[char] || 0) + 1;
    }

    return frequency;
}

let input = "pawan";
let result = countCharacterFrequency(input);

console.log(result);

function capitalizeWords(sentence) {
    let result = "";
    let capitalizeNext = true;

    for (let i = 0; i < sentence.length; i++) {
        let char = sentence[i];

        if (char === ' ') {
            result += char;
            capitalizeNext = true;
        } else if (capitalizeNext) {
            result += char.toUpperCase();
            capitalizeNext = false; 
        } else {
            result += char; 
        }
    }

    return result;
}

let input = "hi iam pawan";
console.log("before: "+ input);
let result = capitalizeWords(input);
console.log("after: " + result);

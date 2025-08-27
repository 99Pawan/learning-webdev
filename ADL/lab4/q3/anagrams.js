    function countCharacterFrequency(str) {
        let frequency = {};
        for (let char of str) {
            frequency[char] = (frequency[char] || 0) + 1;
        }
        return frequency;
    }

    function areAnagrams(str1, str2) {
        if (str1.length !== str2.length) {
            return false;
        }

        let freq1 = countCharacterFrequency(str1);
        let freq2 = countCharacterFrequency(str2);

        for (let char in freq1) {
            if (freq1[char] !== freq2[char]) {
                return false;   
            }
        }

        return true;
    }

    let input1 = "pawan";
    let input2 = "npwaa";

    if (areAnagrams(input1, input2)) {
        console.log("Both strings are anagrams");
    } else {
        console.log("Both strings are not anagrams");
    }

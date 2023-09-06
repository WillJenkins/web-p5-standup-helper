
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function swapElementsInArray(arr) {
    let index1 = getRandomInt(arr.length);
    let index2 = getRandomInt(arr.length);
    let temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
    return arr;
}

function formatTextAreaPlaceholders() {
    let textAreas = document.getElementsByTagName('textarea');
    Array.prototype.forEach.call(textAreas, (e) => {
        e.placeholder = e.placeholder.replace(/\\n/g, '\n');
    });
}

function generateColor() {
    let hexSet = "0123456789ABCDEF";
    let finalHexString = "#";
    for (let i = 0; i < 6; i++) {
        finalHexString += hexSet[Math.ceil(Math.random() * 15)];
    }
    return finalHexString;
}
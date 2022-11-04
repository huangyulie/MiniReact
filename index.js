let num = 100;
let p = 10;
let random = Math.floor(Math.random()*(88-3+1)+3)
function fn(num, people) {
    let res = [];
    while (num) {
        if (people !== 1) {
            let count = Math.floor(num / p);
            let random = Math.floor(Math.random() * (num-count) + p);
            num -= random;
            people--;
            res.push(random);
        } else {
            res.push(num);
            num = 0;
        }
    }
    return res;
}

console.log(fn(num, p));
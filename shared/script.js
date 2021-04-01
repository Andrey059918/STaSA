/* jshint  esversion:6*/
/* jshint browser: true */
/* globals Calculate: false */
/* globals inps: false */

function InputFloat(name) {
    CheckFloat(name);
    Calculate();
}

function InputInt(name) {
    CheckInt(name);
    Calculate();
}

function InputDivident(divident, ...pairs) {
    CheckFloat(divident);
    if (inps[divident].valid) {
        for (let i = 0; i < pairs.length; i++) {
            if (typeof (pairs[i][0]) == "number") {
                inps[pairs[i][1]].dom.value = inps[divident].value / pairs[i][0];
            } else if (inps[pairs[i][0]].valid) {
                inps[pairs[i][1]].dom.value = inps[divident].value / inps[pairs[i][0]].value;
            }
            CheckFloat(pairs[i][1]);
        }
    }
    Calculate();
}

function InputDivisor(divisor, ...pairs) {
    CheckFloat(divisor);
    if (inps[divisor].valid) {
        for (let i = 0; i < pairs.length; i++) {
            if (typeof (pairs[i][0]) == "number") {
                inps[pairs[i][1]].dom.value = pairs[i][0] / inps[divisor].value;
            } else if (inps[pairs[i][0]].valid) {
                inps[pairs[i][1]].dom.value = inps[pairs[i][0]].value / inps[divisor].value;
            }
            CheckFloat(pairs[i][1]);
        }
    }
    Calculate();
}

function InputFactor(factor, ...pairs) {
    CheckFloat(factor);
    if (inps[factor].valid) {
        for (let i = 0; i < pairs.length; i++) {
            if (typeof (pairs[i][0]) == "number") {
                inps[pairs[i][1]].dom.value = inps[factor].value * pairs[i][0];
            } else if (inps[pairs[i][0]].valid) {
                inps[pairs[i][1]].dom.value = inps[factor].value * inps[pairs[i][0]].value;
            }
            CheckFloat(pairs[i][1]);
        }
    }
    Calculate();
}

function ClickCheck(elem) {
    if (inps[elem].value) {
        inps[elem].value = false;
        inps[elem].dom.classList.remove('on');
        inps[elem].dom.classList.add('off');
    } else {
        inps[elem].value = true;
        inps[elem].dom.classList.remove('off');
        inps[elem].dom.classList.add('on');
    }
    Calculate();
}

function ClickRadio(elem, index) {
    for (var i = 0; i < inps[elem].dom.length; i++) {
        if (i == index) {
            inps[elem].value = true;
            inps[elem].dom.classList.remove('off');
            inps[elem].dom.classList.add('on');
        } else {
            inps[elem].value = false;
            inps[elem].dom.classList.remove('on');
            inps[elem].dom.classList.add('off');
        }
    }
    Calculate();
}

function CheckFloat(elem) {
    inps[elem].value = parseFloat(inps[elem].dom.value);
    inps[elem].valid = !isNaN(inps[elem].value);
    let min = parseFloat(inps[elem].dom.min);
    let minFlag = !isNaN(min);
    let max = parseFloat(inps[elem].dom.max);
    let maxFlag = !isNaN(max);

    if (inps[elem].valid && (!minFlag || inps[elem].value > min) && (!maxFlag || inps[elem].value < max)) {
        inps[elem].dom.classList.remove('err');
        inps[elem].dom.classList.add('ok');
    } else {
        inps[elem].dom.classList.remove('ok');
        inps[elem].dom.classList.add('err');
    }
}

function CheckInt(elem) {
    inps[elem].value = parseInt(inps[elem].dom.value);
    inps[elem].valid = !isNaN(inps[elem].value);
    let min = parseInt(inps[elem].dom.min);
    let minFlag = !isNaN(min);
    let max = parseInt(inps[elem].dom.max);
    let maxFlag = !isNaN(max);

    if (inps[elem].valid && (!minFlag || inps[elem].value >= min) && (!maxFlag || inps[elem].value <= max)) {
        inps[elem].dom.classList.remove('err');
        inps[elem].dom.classList.add('ok');
    } else {
        inps[elem].dom.classList.remove('ok');
        inps[elem].dom.classList.add('err');
    }
}


function factorial(n) {
    var ans = 1,
        neg = false;
    n = Math.round(n);
    if (n < 0 || !n) neg = true;
    for (var i = 1; i <= n; i++) ans *= i;
    return neg ? 1 : ans;
}

function advRound(num) {
    var str;
    if (inps.rForce.value) str = num.toFixed(inps.rMax.value);
    else
        str = num.toString();
    if (inps.rSoft.value) {
        let p0 = inps.rCoeff.value,
            p9 = inps.rCoeff.value;
        let dotPos = str.indexOf('.');
        if (dotPos == -1) return str;
        for (var i = dotPos + 1; i < str.length; i++) {
            if (str[i] == '0') {
                p0--;
                if (p0 <= 0 && i > dotPos + inps.rMin.value) {
                    str = num.toFixed(i - dotPos - inps.rCoeff.value + p0);
                    break;
                }
            } else if (str[i] == '9') {
                p9--;
                if (p9 <= 0 && i > dotPos + inps.rMin.value) {
                    str = num.toFixed(i - dotPos - inps.rCoeff.value + p9);
                    break;
                }
            } else {
                p0 = inps.rCoeff.value;
                p9 = inps.rCoeff.value;
            }
        }
    }
    return str;
}

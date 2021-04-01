/* jshint  esversion:6*/
/* jshint browser: true */
const eL = document.getElementById('L');
const eT = document.getElementById('T');
const eM = document.getElementById('M');
const eq = document.getElementById('q');
const eA = document.getElementById('A');
const ePo = document.getElementById('Potk');
const eAn = document.getElementById('Anom');
const eR = document.getElementById('R');

function processT() {
    eM.value = 1 / eT.value;
    process();
}

function process() {
    var eMv = parseFloat(eM.value);
    var eLv = parseFloat(eL.value);
    eq.value = eMv / (eMv + eLv);
    eA.value = eq.value * eL.value;
    ePo.value = 1 - eq.value;
    eAn.value = 1 / eT.value;
    eR.value = eAn.value / eA.value;
}

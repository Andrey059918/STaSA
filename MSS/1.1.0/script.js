/* jshint  esversion:6*/
/* jshint browser: true */

const layout = {
    tbodies: {
        Prob: document.getElementById('ResProb'),
        Thread: document.getElementById('ResThread'),
        Query: document.getElementById('ResQuery')
    },
    equations: {
        P1: document.getElementById('fP1'),
        P2: document.getElementById('fP2'),
        P3: document.getElementById('fP3'),
        Q1: document.getElementById('fQ1'),
        Q2: document.getElementById('fQ2'),
        Q3: document.getElementById('fQ3'),
        Lq1: document.getElementById('fLq1'),
        Lq2: document.getElementById('fLq2'),
        Lq3: document.getElementById('fLq3'),
        Lq4: document.getElementById('fLq4'),
        Lq5: document.getElementById('fLq5'),
        Lq6: document.getElementById('fLq6'),
        Ls1: document.getElementById('fLs1'),
        Ls2: document.getElementById('fLs2'),
        Ls3: document.getElementById('fLs3'),
        Ls4: document.getElementById('fLs4'),
        P_S1: document.getElementById('P_S1'),
        P_S1_I: document.getElementById('P_S1_I'),
        P_S1_P1: document.getElementById('P_S1_P1'),
        P_S1_PP: document.getElementById('P_S1_PP'),
        P_SS_I: document.getElementById('P_SS_I'),
        P_SS_N0: document.getElementById('P_SS_N0'),
        P_SS_NN_P1: document.getElementById('P_SS_NN_P1'),
        P_SS_NN_PP: document.getElementById('P_SS_NN_PP'),
        P_SSPK_N0: document.getElementById('P_SSPK_N0'),
        P_SSPK_NN_P1: document.getElementById('P_SSPK_NN_P1'),
        P_SSPK_NN_PP: document.getElementById('P_SSPK_NN_PP')
    },
    labels: {
        queryMax: document.getElementById('queryMax'),
        queryCalc: document.getElementById('queryCalc'),
        errInput: document.getElementById('errInput'),
        errUnstable: document.getElementById('errUnstable')

    }
};
const data = {
    inputs: {
        L: document.getElementById('iL'),
        TL: document.getElementById('iTL'),
        M: document.getElementById('iM'),
        TM: document.getElementById('iTM'),
        S: document.getElementById('iS'),
        I: document.getElementById('iI'),
        N: document.getElementById('iN')
    },
    outputs: {
        N: document.getElementById('oN'),
        Psi: document.getElementById('oPsi'),
        Psik: document.getElementById('oPsik'),
        P: document.getElementById('oP'),
        Q: document.getElementById('oQ'),
        Aa: document.getElementById('oAa'),
        An: document.getElementById('oAn'),
        Af: document.getElementById('oAf'),
        Sz: document.getElementById('oSz'),
        Kz: document.getElementById('oKz'),
        Ls: document.getElementById('oLs'),
        Ws: document.getElementById('oWs'),
        Wq: document.getElementById('oWq'),
        Lq: document.getElementById('oLq')
    }
};

function Input_TL() {
    let t = CheckFloat(data.inputs.TL);
    if (t || (t === 0))
        data.inputs.L.value = 1 / t;
    else data.inputs.L.value = 0;
    CheckFloat(data.inputs.L);
    Calculate();
}

function Input_L() {
    let t = CheckFloat(data.inputs.L);
    if (t || (t === 0))
        data.inputs.TL.value = 1 / t;
    else data.inputs.TL.value = 0;
    CheckFloat(data.inputs.TL);
    Calculate();
}

function Input_TM() {
    let t = CheckFloat(data.inputs.TM);
    if (t || (t === 0))
        data.inputs.M.value = 1 / t;
    else data.inputs.M.value = 0;
    CheckFloat(data.inputs.M);
    Calculate();
}

function Input_M() {
    let t = CheckFloat(data.inputs.M);
    if (t || (t === 0))
        data.inputs.TM.value = 1 / t;
    else data.inputs.TM.value = 0;
    CheckFloat(data.inputs.TM);
    Calculate();
}

function Input_S() {
    let t = CheckInt(data.inputs.S);
    Calculate();
}

function Input_N() {
    let t = CheckInt(data.inputs.N);
    Calculate();
}

function CheckFloat(elem) {
    let t = parseFloat(elem.value);
    let min = parseFloat(elem.min);
    let minVal = true;
    if (!min && min !== 0) minVal = false;

    if (!t && t !== 0 || minVal && (t <= min)) {
        elem.className = 'err';
        return false;
    } else {
        elem.className = 'ok';
        return t;
    }
}

function CheckInt(elem) {
    let t = parseInt(elem.value);
    let min = parseInt(elem.min);
    let minVal = true;
    if (!min && min !== 0) minVal = false;

    if (!t && t !== 0 || minVal && (t < min)) {
        elem.className = 'err';
        return false;
    } else {
        elem.className = 'ok';
        return t;
    }
}

function Calculate() {
    var i;
    var vNS = 0,
        vPsi = 0,
        vPsik = 0;
    var vP = 0,
        vQ = 0,
        vAa = 0,
        vAn = 0,
        vAf = 0;
    var vSz = 0,
        vKz = 0;
    var vLs = 0,
        vWs = 0,
        vLq = 0,
        vWq = 0;
    var vProb, vTmp;


    if (data.inputs.N.className == 'err' || data.inputs.S.className == 'err' ||
        data.inputs.L.className == 'err' || data.inputs.TL.className == 'err' ||
        data.inputs.M.className == 'err' || data.inputs.TM.className == 'err') {
        layout.labels.errInput.style.display = "block";
        layout.labels.errUnstable.style.display = "none";
    } else {
        var vTL = parseFloat(data.inputs.TL.value);
        var vL = parseFloat(data.inputs.L.value);
        var vTM = parseFloat(data.inputs.TM.value);
        var vM = parseFloat(data.inputs.M.value);
        var vN = parseInt(data.inputs.N.value);
        var vS = parseInt(data.inputs.S.value);
        var vI = data.inputs.I.checked;

        vNS = vN + vS;
        vPsi = vL / vM;
        vPsik = vPsi / vS;
        vProb = new Array(vNS + 1);

        layout.labels.errInput.style.display = "none";
        if (vPsik >= 1 && vI) {
            layout.labels.errUnstable.style.display = "block";
        } else {
            layout.labels.errUnstable.style.display = "none";
            layout.tbodies.Query.style.display = vN > 0 || vI ? 'table-row-group' : 'none';
            layout.tbodies.Thread.style.display = vS > 1 ? 'table-row-group' : 'none';
            layout.labels.queryMax.style.display = !vI ? 'table-cell' : 'none';
            layout.labels.queryCalc.style.display = vI ? 'table-cell' : 'none';
            layout.equations.P1.style.display = (!vI && vNS == 1) ? 'table-cell' : 'none';
            layout.equations.P2.style.display = (!vI && vNS > 1) ? 'table-cell' : 'none';
            layout.equations.P3.style.display = (vI) ? 'table-cell' : 'none';
            layout.equations.Q1.style.display = (!vI && vNS == 1) ? 'table-cell' : 'none';
            layout.equations.Q2.style.display = (!vI && vNS > 1) ? 'table-cell' : 'none';
            layout.equations.Q3.style.display = (vI) ? 'table-cell' : 'none';
            layout.equations.Lq1.style.display = (vS == 1 && !vI && vN > 0 && vPsik != 1) ? 'table-cell' : 'none';
            layout.equations.Lq2.style.display = (vS == 1 && !vI && vN > 0 && vPsik == 1) ? 'table-cell' : 'none';
            layout.equations.Lq3.style.display = (vS == 1 && vI) ? 'table-cell' : 'none';
            layout.equations.Lq4.style.display = (vS > 1 && !vI && vN > 0 && vPsik != 1) ? 'table-cell' : 'none';
            layout.equations.Lq5.style.display = (vS > 1 && !vI && vN > 0 && vPsik == 1) ? 'table-cell' : 'none';
            layout.equations.Lq6.style.display = (vS > 1 && vI) ? 'table-cell' : 'none';
            layout.equations.Ls1.style.display = (vS == 1 && !vI && vN > 0 && vPsik != 1) ? 'table-cell' : 'none';
            layout.equations.Ls2.style.display = (vS == 1 && !vI && vN > 0 && vPsik == 1) ? 'table-cell' : 'none';
            layout.equations.Ls3.style.display = (vS == 1 && vI) ? 'table-cell' : 'none';
            layout.equations.Ls4.style.display = (vS > 1) ? 'table-cell' : 'none';
            layout.equations.P_S1_I.style.display = (vS == 1 && vI) ? "block" : "none";
            layout.equations.P_S1_P1.style.display = (vS == 1 && !vI && vPsi == 1) ? "block" : "none";
            layout.equations.P_S1_PP.style.display = (vS == 1 && !vI && vPsi != 1) ? "block" : "none";
            layout.equations.P_S1.style.display = (vS == 1 && (vI || vPsi != 1)) ? "block" : "none";
            layout.equations.P_SS_I.style.display = (vS > 1 && vI) ? "block" : "none";
            layout.equations.P_SS_N0.style.display = (vS > 1 && !vI && vN === 0) ? "block" : "none";
            layout.equations.P_SS_NN_P1.style.display = (vS > 1 && !vI && vN > 0 && vPsik == 1) ? "block" : "none";
            layout.equations.P_SS_NN_PP.style.display = (vS > 1 && !vI && vN > 0 && vPsik != 1) ? "block" : "none";
            layout.equations.P_SSPK_N0.style.display = (vS > 1 && vN === 0) ? "block" : "none";
            layout.equations.P_SSPK_NN_P1.style.display = (vS > 1 && vN > 0 && vPsik == 1) ? "block" : "none";
            layout.equations.P_SSPK_NN_PP.style.display = (vS > 1 && vN > 0 && vPsik != 1) ? "block" : "none";

            while (layout.tbodies.Prob.childElementCount > vNS + 2) {
                layout.tbodies.Prob.lastChild.remove();
            }
            while (layout.tbodies.Prob.childElementCount < vNS + 2) {
                layout.tbodies.Prob.insertAdjacentHTML('beforeend',
                    '<tr><td class="math-right">\\(P_{' + (layout.tbodies.Prob.childElementCount - 1) +
                    '}=\\)</td><td><input type="text" id="oP' + (layout.tbodies.Prob.childElementCount - 1) +
                    '" readonly="true"></input></td></tr>'
                );
            }
            MathJax.typeset();


            if (vS == 1) {
                if (vI) vProb[0] = 1 - vPsi;
                else {
                    if (vPsi == 1) vProb[0] = 1 / (vNS + 1);
                    else vProb[0] = (1 - vPsi) / (1 - Math.pow(vPsi, vNS + 1));
                }
                for (i = 1; i <= vNS; i++) {
                    vProb[i] = vProb[i - 1] * vPsi;
                }
            } else {
                vTmp = Array.from({
                    length: vS + 1
                }, (v, k) => Math.pow(vPsi, k) / factorial(k));
                vProb[0] = vTmp.reduce((res, itm) => res + itm);
                if (vI) vProb[0] += Math.pow(vPsi, vS + 1) / factorial(vS) / (vS - vPsi);
                else if (vN > 0)
                    if (vPsik == 1) vProb[0] += vTmp[vS] * vN;
                    else vProb[0] += vTmp[vS] * vPsi * (1 - Math.pow(vPsik, vN)) / (vS - vPsi);
                vProb[0] = 1 / vProb[0];
                for (i = 1; i <= vS; i++) {
                    vProb[i] = vTmp[i] * vProb[0];
                }
                for (i = vS + 1; i <= vNS; i++) {
                    vProb[i] = vProb[i - 1] * vPsik;
                }
            }

            if (vI) vP = 0;
            else vP = vProb[vProb.length - 1];
            vQ = 1 - vP;
            vAa = vQ * vL;
            vAn = vS * vM;
            vAf = (vAa * 100 / vAn);

            if (vS == 1) {
                if (vI) {
                    vLq = vPsi * vPsi / (1 - vPsi);
                    vLs = vPsi / (1 - vPsi);
                } else if (vN > 0) {
                    if (vPsik == 1) {
                        vLq = vN * (vN + 1) / 2 / (vN + 2);
                        vLs = (vN + 1) / 2;
                    } else {
                        vLq = vPsi * vPsi * (1 - Math.pow(vPsi, vN) * (vN + 1 - vPsi * vN)) / Math.pow(1 - vPsi, 2) * vProb[0];
                        vLs = vProb.reduce((res, itm, idx) => res + (itm * idx), 0);
                    }
                }
            } else {
                vSz = vPsi * vQ;
                vKz = vSz / vS;
                if (vI) {
                    vLq = Math.pow(vPsi, vS + 1) / vS / factorial(vS) / Math.pow(1 - vPsik, 2) * vProb[0];
                } else if (vN > 0) {
                    vLq = vProb[0] * vTmp[vS];
                    if (vPsik == 1) {
                        vLq *= vN * (vN + 1) / 2;
                    } else {
                        vLq *= vPsik * (1 - Math.pow(vPsik, vN) * (vN + 1 - vPsik * vN)) / Math.pow(1 - vPsik, 2);
                    }
                }
                vLs = vLq + vSz;
            }
            vWq = vLq / vAa;
            vWs = vLs / vAa;
        }
    }
    data.outputs.N.value = vNS;
    data.outputs.Psi.value = vPsi;
    data.outputs.Psik.value = vPsik;
    data.outputs.P.value = vP;
    data.outputs.Q.value = vQ;
    data.outputs.An.value = vAn;
    data.outputs.Aa.value = vAa;
    data.outputs.Af.value = vAf.toFixed(3);
    data.outputs.Ls.value = vLs;
    data.outputs.Ws.value = vWs;
    data.outputs.Wq.value = vWq;
    data.outputs.Lq.value = vLq;
    data.outputs.Sz.value = vSz;
    data.outputs.Kz.value = vKz;
    for (i = 0; i <= vNS; i++) {
        document.getElementById('oP' + i).value = (vProb ? vProb[i] ? vProb[i] : 0 : 0);
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

Calculate();

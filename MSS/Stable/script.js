/* jshint  esversion:6*/
/* jshint browser: true */

/* globals advRound: false */
/* globals factorial: false */
/* globals InputInt: false */
/* globals InputFloat: false */
/* globals advRound: false */
const layout = {
    tbodies: {
        Thread: document.getElementById('tbThread'),
        Query: document.getElementById('tbQuery'),
        Probs: document.getElementById('tbProbs')
    },
    equations: {
        P1: document.getElementById('eqP1'),
        P2: document.getElementById('eqP2'),
        P3: document.getElementById('eqP3'),
        Q1: document.getElementById('eqQ1'),
        Q2: document.getElementById('eqQ2'),
        Q3: document.getElementById('eqQ3'),
        Lq1: document.getElementById('eqLq1'),
        Lq2: document.getElementById('eqLq2'),
        Lq3: document.getElementById('eqLq3'),
        Lq4: document.getElementById('eqLq4'),
        Lq5: document.getElementById('eqLq5'),
        Lq6: document.getElementById('eqLq6'),
        Ls1: document.getElementById('eqLs1'),
        Ls2: document.getElementById('eqLs2'),
        Ls3: document.getElementById('eqLs3'),
        Ls4: document.getElementById('eqLs4'),
        P_S1: document.getElementById('eqP_S1'),
        P_S1_I: document.getElementById('eqP_S1_I'),
        P_S1_P1: document.getElementById('eqP_S1_P1'),
        P_S1_PP: document.getElementById('eqP_S1_PP'),
        P_SS_I: document.getElementById('eqP_SS_I'),
        P_SS_N0: document.getElementById('eqP_SS_N0'),
        P_SS_NN_P1: document.getElementById('eqP_SS_NN_P1'),
        P_SS_NN_PP: document.getElementById('eqP_SS_NN_PP'),
        P_SSPK_N0: document.getElementById('eqP_SSPK_N0'),
        P_SSPK_NN_P1: document.getElementById('eqP_SSPK_NN_P1'),
        P_SSPK_NN_PP: document.getElementById('eqP_SSPK_NN_PP')
    },
    labels: {
        queryMax: document.getElementById('queryMax'),
        queryCalc: document.getElementById('queryCalc'),
        warnRoundF: document.getElementById('warnRoundF'),
        warnRoundS: document.getElementById('warnRoundS'),
        errInput: document.getElementById('errInput'),
        errUnstable: document.getElementById('errUnstable')
    }
};
const inps = {
    I: {
        dom: document.getElementById('iI'),
        value: false
    },
    TL: {
        dom: document.getElementById('iTL'),
        value: 0,
        valid: false
    },
    L: {
        dom: document.getElementById('iL'),
        value: 0,
        valid: false
    },
    TM: {
        dom: document.getElementById('iTM'),
        value: 0,
        valid: false
    },
    M: {
        dom: document.getElementById('iM'),
        value: 0,
        valid: false
    },
    N: {
        dom: document.getElementById('iN'),
        value: 0,
        valid: true
    },
    S: {
        dom: document.getElementById('iS'),
        value: 1,
        valid: true
    },
    rForce: {
        dom: document.getElementById('rForce'),
        value: 0
    },
    rSoft: {
        dom: document.getElementById('rSoft'),
        value: 0
    },
    rMax: {
        dom: document.getElementById('rMax'),
        value: 0,
        valid: true
    },
    rMin: {
        dom: document.getElementById('rMin'),
        value: 0,
        valid: true
    },
    rCoeff: {
        dom: document.getElementById('rCoeff'),
        value: 0,
        valid: true
    }
};
const outs = {
    N: {
        dom: document.getElementById('oN'),
        value: 0
    },
    Psi: {
        dom: document.getElementById('oPsi'),
        value: 0
    },
    Psik: {
        dom: document.getElementById('oPsik'),
        value: 0
    },
    P: {
        dom: document.getElementById('oP'),
        value: 0
    },
    Q: {
        dom: document.getElementById('oQ'),
        value: 0
    },
    Aa: {
        dom: document.getElementById('oAa'),
        value: 0
    },
    An: {
        dom: document.getElementById('oAn'),
        value: 0
    },
    Af: {
        dom: document.getElementById('oAf'),
        value: 0
    },
    Sz: {
        dom: document.getElementById('oSz'),
        value: 0
    },
    Kz: {
        dom: document.getElementById('oKz'),
        value: 0
    },
    Ls: {
        dom: document.getElementById('oLs'),
        value: 0
    },
    Ws: {
        dom: document.getElementById('oWs'),
        value: 0
    },
    Wq: {
        dom: document.getElementById('oWq'),
        value: 0
    },
    Lq: {
        dom: document.getElementById('oLq'),
        value: 0
    }
};

function Calculate() {
    var i;
    var vProb, vTmp;
    var vNS = 0,
        vPsi = 0,
        vP = 0,
        vQ = 0,
        vAa = 0,
        vAn = 0,
        vAf = 0;
    var vPsik = 0,
        vSz = 0,
        vKz = 0;
    var vLs = 0,
        vWs = 0,
        vLq = 0,
        vWq = 0;


    if (inps.rForce.value && !inps.rMax.valid) {
        layout.labels.warnRoundF.style.display = "table-cell";
    } else {
        layout.labels.warnRoundF.style.display = "none";
    }
    if (inps.rSoft.value && !(inps.rMin.valid && inps.rCoeff.valid)) {
        layout.labels.warnRoundS.style.display = "table-cell";
    } else {
        layout.labels.warnRoundS.style.display = "none";
    }
    if (inps.N.valid && inps.S.valid) {
        vNS = inps.N.value + inps.S.value;
        vProb = new Array(vNS + 1);
        layout.tbodies.Query.style.display = inps.N.value > 0 || inps.I.value ? 'table-row-group' : 'none';
        layout.tbodies.Thread.style.display = inps.S.value > 1 ? 'table-row-group' : 'none';
        while (layout.tbodies.Probs.childElementCount > vNS + 2) {
            layout.tbodies.Probs.lastChild.remove();
        }
        while (layout.tbodies.Probs.childElementCount < vNS + 2) {
            layout.tbodies.Probs.insertAdjacentHTML('beforeend',
                '<tr><td class="math aright">\\(P_{' + (layout.tbodies.Probs.childElementCount - 1) +
                '}=\\)</td><td><input type="text" id="oP' + (layout.tbodies.Probs.childElementCount - 1) +
                '" class="rounded input inf" readonly></input></td></tr>'
            );
        }
        MathJax.typeset();
    }
    if (!inps.N.valid || !inps.S.valid ||
        !inps.L.valid || !inps.M.valid) {
        layout.labels.errInput.style.display = "table-cell";
        layout.labels.errUnstable.style.display = "none";
    } else {
        vPsi = inps.L.value / inps.M.value;
        vPsik = vPsi / inps.S.value;

        layout.labels.errInput.style.display = "none";
        if (vPsik >= 1 && inps.I.value) {
            layout.labels.errUnstable.style.display = "table-cell";
        } else {
            layout.labels.errUnstable.style.display = 'none';
            layout.labels.queryMax.style.display = !inps.I.value ? 'table-cell' : 'none';
            layout.labels.queryCalc.style.display = inps.I.value ? 'table-cell' : 'none';
            layout.equations.P1.style.display = (!inps.I.value && vNS == 1) ? 'table-cell' : 'none';
            layout.equations.P2.style.display = (!inps.I.value && vNS > 1) ? 'table-cell' : 'none';
            layout.equations.P3.style.display = (inps.I.value) ? 'table-cell' : 'none';
            layout.equations.Q1.style.display = (!inps.I.value && vNS == 1) ? 'table-cell' : 'none';
            layout.equations.Q2.style.display = (!inps.I.value && vNS > 1) ? 'table-cell' : 'none';
            layout.equations.Q3.style.display = (inps.I.value) ? 'table-cell' : 'none';
            layout.equations.Lq1.style.display = (inps.S.value == 1 && !inps.I.value && inps.N.value > 0 && vPsik != 1) ? 'table-cell' : 'none';
            layout.equations.Lq2.style.display = (inps.S.value == 1 && !inps.I.value && inps.N.value > 0 && vPsik == 1) ? 'table-cell' : 'none';
            layout.equations.Lq3.style.display = (inps.S.value == 1 && inps.I.value) ? 'table-cell' : 'none';
            layout.equations.Lq4.style.display = (inps.S.value > 1 && !inps.I.value && inps.N.value > 0 && vPsik != 1) ? 'table-cell' : 'none';
            layout.equations.Lq5.style.display = (inps.S.value > 1 && !inps.I.value && inps.N.value > 0 && vPsik == 1) ? 'table-cell' : 'none';
            layout.equations.Lq6.style.display = (inps.S.value > 1 && inps.I.value) ? 'table-cell' : 'none';
            layout.equations.Ls1.style.display = (inps.S.value == 1 && !inps.I.value && inps.N.value > 0 && vPsik != 1) ? 'table-cell' : 'none';
            layout.equations.Ls2.style.display = (inps.S.value == 1 && !inps.I.value && inps.N.value > 0 && vPsik == 1) ? 'table-cell' : 'none';
            layout.equations.Ls3.style.display = (inps.S.value == 1 && inps.I.value) ? 'table-cell' : 'none';
            layout.equations.Ls4.style.display = (inps.S.value > 1) ? 'table-cell' : 'none';
            layout.equations.P_S1_I.style.display = (inps.S.value == 1 && inps.I.value) ? "block" : "none";
            layout.equations.P_S1_P1.style.display = (inps.S.value == 1 && !inps.I.value && vPsi == 1) ? "block" : "none";
            layout.equations.P_S1_PP.style.display = (inps.S.value == 1 && !inps.I.value && vPsi != 1) ? "block" : "none";
            layout.equations.P_S1.style.display = (inps.S.value == 1 && (inps.I.value || vPsi != 1)) ? "block" : "none";
            layout.equations.P_SS_I.style.display = (inps.S.value > 1 && inps.I.value) ? "block" : "none";
            layout.equations.P_SS_N0.style.display = (inps.S.value > 1 && !inps.I.value && inps.N.value === 0) ? "block" : "none";
            layout.equations.P_SS_NN_P1.style.display = (inps.S.value > 1 && !inps.I.value && inps.N.value > 0 && vPsik == 1) ? "block" : "none";
            layout.equations.P_SS_NN_PP.style.display = (inps.S.value > 1 && !inps.I.value && inps.N.value > 0 && vPsik != 1) ? "block" : "none";
            layout.equations.P_SSPK_N0.style.display = (inps.S.value > 1 && inps.N.value === 0) ? "block" : "none";
            layout.equations.P_SSPK_NN_P1.style.display = (inps.S.value > 1 && inps.N.value > 0 && vPsik == 1) ? "block" : "none";
            layout.equations.P_SSPK_NN_PP.style.display = (inps.S.value > 1 && inps.N.value > 0 && vPsik != 1) ? "block" : "none";





            if (inps.S.value == 1) {
                if (inps.I.value) vProb[0] = 1 - vPsi;
                else {
                    if (vPsi == 1) vProb[0] = 1 / (vNS + 1);
                    else vProb[0] = (1 - vPsi) / (1 - Math.pow(vPsi, vNS + 1));
                }
                for (i = 1; i <= vNS; i++) {
                    vProb[i] = vProb[i - 1] * vPsi;
                }
            } else {
                vTmp = Array.from({
                    length: inps.S.value + 1
                }, (v, k) => Math.pow(vPsi, k) / factorial(k));
                vProb[0] = vTmp.reduce((res, itm) => res + itm);
                if (inps.I.value) vProb[0] += Math.pow(vPsi, inps.S.value + 1) / factorial(inps.S.value) / (inps.S.value - vPsi);
                else if (inps.N.value > 0)
                    if (vPsik == 1) vProb[0] += vTmp[inps.S.value] * inps.N.value;
                    else vProb[0] += vTmp[inps.S.value] * vPsi * (1 - Math.pow(vPsik, inps.N.value)) / (inps.S.value - vPsi);
                vProb[0] = 1 / vProb[0];
                for (i = 1; i <= inps.S.value; i++) {
                    vProb[i] = vTmp[i] * vProb[0];
                }
                for (i = inps.S.value + 1; i <= vNS; i++) {
                    vProb[i] = vProb[i - 1] * vPsik;
                }
            }

            if (inps.I.value) vP = 0;
            else vP = vProb[vProb.length - 1];
            vQ = 1 - vP;
            vAa = vQ * inps.L.value;
            vAn = inps.S.value * inps.M.value;
            vAf = (vAa * 100 / vAn);

            if (inps.S.value == 1) {
                if (inps.I.value) {
                    vLq = vPsi * vPsi / (1 - vPsi);
                    vLs = vPsi / (1 - vPsi);
                } else if (inps.N.value > 0) {
                    if (vPsik == 1) {
                        vLq = inps.N.value * (inps.N.value + 1) / 2 / (inps.N.value + 2);
                        vLs = (inps.N.value + 1) / 2;
                    } else {
                        vLq = vPsi * vPsi * (1 - Math.pow(vPsi, inps.N.value) * (inps.N.value + 1 - vPsi * inps.N.value)) / Math.pow(1 - vPsi, 2) * vProb[0];
                        vLs = vProb.reduce((res, itm, idx) => res + (itm * idx), 0);
                    }
                }
            } else {
                vSz = vPsi * vQ;
                vKz = vSz / inps.S.value;
                if (inps.I.value) {
                    vLq = Math.pow(vPsi, inps.S.value + 1) / inps.S.value / factorial(inps.S.value) / Math.pow(1 - vPsik, 2) * vProb[0];
                } else if (inps.N.value > 0) {
                    vLq = vProb[0] * vTmp[inps.S.value];
                    if (vPsik == 1) {
                        vLq *= inps.N.value * (inps.N.value + 1) / 2;
                    } else {
                        vLq *= vPsik * (1 - Math.pow(vPsik, inps.N.value) * (inps.N.value + 1 - vPsik * inps.N.value)) / Math.pow(1 - vPsik, 2);
                    }
                }
                vLs = vLq + vSz;
            }
            vWq = vLq / vAa;
            vWs = vLs / vAa;
        }
    }
    outs.N.dom.value = vNS;
    outs.Psi.dom.value = advRound(vPsi);
    outs.Psik.dom.value = advRound(vPsik);
    outs.P.dom.value = advRound(vP);
    outs.Q.dom.value = advRound(vQ);
    outs.An.dom.value = advRound(vAn);
    outs.Aa.dom.value = advRound(vAa);
    outs.Af.dom.value = vAf.toFixed(3);
    outs.Ls.dom.value = vLs;
    outs.Ws.dom.value = vWs;
    outs.Wq.dom.value = vWq;
    outs.Lq.dom.value = vLq;
    outs.Sz.dom.value = vSz;
    outs.Kz.dom.value = vKz;
    for (i = 0; i <= vNS; i++) {
        document.getElementById('oP' + i).value = (vProb ? vProb[i] ? vProb[i] : 0 : 0);
    }
}

Calculate();

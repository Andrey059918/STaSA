/* jshint  esversion:6*/
/* jshint browser: true */

const layout = {
    tbodies: {
        Delayed: document.getElementById('tbDelayed'),
        Deficit: document.getElementById('tbDeficit'),
        Tau: document.getElementById('tbTau'),
        T: document.getElementById('tbT')
    },
    equations: {
        eq_0: Array.from(document.getElementsByClassName('eq_0')),
        eq_P: Array.from(document.getElementsByClassName('eq_P')),
        eq_B: Array.from(document.getElementsByClassName('eq_B')),
        eq_BP: Array.from(document.getElementsByClassName('eq_BP')),
        eq_P1: Array.from(document.getElementsByClassName('eq_P1')),
        eq_P2: Array.from(document.getElementsByClassName('eq_P2')),
        eq_BP1: Array.from(document.getElementsByClassName('eq_BP1')),
        eq_BP2: Array.from(document.getElementsByClassName('eq_BP2'))
    },
    labels: {
        errInput: document.getElementById('errInput')
    }
};
const inps = {
    d: {
        dom: document.getElementById('id'),
        value: 0,
        valid: false
    },
    h: {
        dom: document.getElementById('ih'),
        value: 0,
        valid: false
    },
    K: {
        dom: document.getElementById('iK'),
        value: 0,
        valid: false
    },
    b: {
        dom: document.getElementById('ib'),
        value: 0,
        valid: false
    },
    p: {
        dom: document.getElementById('ip'),
        value: 0,
        valid: false
    },
    L: {
        dom: document.getElementById('iL'),
        value: 0,
        valid: false
    },
    T: {
        dom: document.getElementById('iT'),
        value: 0,
        valid: false
    },
    D: {
        dom: document.getElementById('iD'),
        value: 0,
        valid: false
    },
    H: {
        dom: document.getElementById('iH'),
        value: 0,
        valid: false
    },
    B: {
        dom: document.getElementById('iB'),
        value: 0,
        valid: false
    },
    P: {
        dom: document.getElementById('iP'),
        value: 0,
        valid: false
    }
};
const outs = {
    Q: document.getElementById('oQ'),
    S: document.getElementById('oS'),
    T: document.getElementById('oT'),
    cc: document.getElementById('occ'),
    c: document.getElementById('oc'),
    C: document.getElementById('oC'),
    T1: document.getElementById('oT1'),
    T2: document.getElementById('oT2'),
    T3: document.getElementById('oT3'),
    T4: document.getElementById('oT4'),
    Sb: document.getElementById('oSb'),
    l: document.getElementById('ol'),
    R: document.getElementById('oR')

};


function Calculate() {
    var vQ = 0,
        vS = 0,
        vT = 0,
        vcc = 0,
        vc = 0,
        vC = 0,
        vT1 = 0,
        vT2 = 0,
        vT3 = 0,
        vT4 = 0,
        vSb = 0,
        vl = 0,
        vR = 0;

    layout.equations.eq_0.forEach(a => a.style.display = (inps.b.valid || inps.p.valid) ? "none" : "block");
    layout.equations.eq_P.forEach(a => a.style.display = (inps.b.valid || !inps.p.valid) ? "none" : "block");
    layout.equations.eq_B.forEach(a => a.style.display = (!inps.b.valid || inps.p.valid) ? "none" : "block");
    layout.equations.eq_BP.forEach(a => a.style.display = (!inps.b.valid || !inps.p.valid) ? "none" : "block");
    layout.tbodies.Tau.style.display = (inps.b.valid || inps.p.valid) ? "table-row-group" : "none";
    layout.tbodies.Deficit.style.display = (inps.b.valid) ? "table-row-group" : "none";
    layout.tbodies.Delayed.style.display = (inps.L.valid) ? "table-row-group" : "none";
    if (!inps.d.valid || !inps.h.valid || !inps.K.valid) {
        layout.labels.errInput.style.display = "block";
    } else {
        layout.labels.errInput.style.display = "none";


        if (inps.b.valid) {
            if (inps.p.valid) {
                vQ = Math.sqrt(2 * inps.d.value * inps.K.value * (1 + inps.h.value / inps.b.value) / inps.h.value / (1 - inps.d.value / inps.p.value));
                vS = Math.sqrt(2 * inps.d.value * inps.K.value * inps.b.value * (inps.p.value - inps.d.value) / inps.h.value / inps.p.value / (inps.b.value + inps.h.value));
                vSb = vS * inps.h.value / inps.b.value;
                vT = Math.sqrt(2 * inps.K.value * (1 + inps.h.value / inps.b.value) / inps.h.value / (1 - inps.d.value / inps.p.value) / inps.d.value);
                vT1 = vQ * inps.b.value / inps.p.value / (inps.h.value + inps.b.value);
                vT2 = vQ * inps.b.value * (inps.p.value - inps.d.value) / inps.d.value / inps.p.value / (inps.h.value + inps.b.value);
                vT3 = vQ * inps.h.value * (inps.p.value - inps.d.value) / inps.d.value / inps.p.value / (inps.h.value + inps.b.value);
                vT4 = vQ * inps.h.value / inps.p.value / (inps.h.value + inps.b.value);
                vcc = inps.K.value + inps.p.value * (inps.h.value * vS * vS + inps.b.value * vSb * vSb) / 2 / inps.d.value / (inps.p.value - inps.d.value);
                vc = (inps.d.value * inps.K.value * (inps.p.value - inps.d.value) / inps.p.value + vS * vS * inps.h.value / 2 + vSb * vSb * inps.b.value / 2) / (vS + vSb);
            } else {
                vQ = Math.sqrt(2 * inps.d.value * inps.K.value * (inps.b.value + inps.h.value) / inps.h.value / inps.b.value);
                vS = Math.sqrt(2 * inps.d.value * inps.K.value * inps.b.value / inps.h.value / (inps.b.value + inps.h.value));
                vSb = vQ - vS;
                //vSb=Math.sqrt(2 * inps.d.value * inps.K.value * inps.h.value / inps.b.value / (inps.b.value+inps.h.value));
                vT = vS * inps.p.value / inps.d.value / (inps.p.value - inps.d.value);
                vT1 = vS / inps.d.value;
                vT2 = vSb / inps.d.value;
                vcc = inps.K.value + inps.h.value * vT1 * vS / 2 + inps.b.value * vT2 * vSb / 2;
                vc = inps.d.value * inps.K.value / vQ + (vS * vS * inps.h.value + vSb * vSb * inps.b.value) / 2 / vQ;
            }
        } else {
            if (inps.p.valid) {
                vQ = Math.sqrt(2 * inps.d.value * inps.K.value * inps.p.value / inps.h.value / (inps.p.value - inps.d.value));
                vS = Math.sqrt(2 * inps.d.value * inps.K.value * (inps.p.value - inps.d.value) / inps.h.value / inps.p.value);
                vT = vS * inps.p.value / inps.d.value / (inps.p.value - inps.d.value);
                vT1 = vS / (inps.p.value - inps.d.value);
                vT2 = vS / inps.d.value;
                vcc = inps.K.value + inps.h.value * vT * vS / 2;
                vc = inps.d.value * inps.K.value / vQ + vQ * inps.h.value * (inps.p.value - inps.d.value) / 2 / inps.d.value;
            } else {
                vQ = Math.sqrt(2 * inps.d.value * inps.K.value / inps.h.value);
                vS = vQ;
                vT = Math.sqrt(2 * inps.K.value / inps.d.value / inps.h.value);
                vcc = inps.K.value + inps.h.value * vT * vQ / 2;
                vc = inps.d.value * inps.K.value / vQ + vQ * inps.h.value / 2;
            }

        }
        layout.tbodies.T.style.display = (inps.T.valid) ? "table-row" : "none";
        if (inps.T.valid) vC = vc * inps.T.value;
        layout.tbodies.Delayed.style.display = (inps.L.valid) ? "table-row-group" : "none";

        if (inps.L.valid) {
            vl = inps.L.value % vT;
            layout.equations.eq_P1.forEach(a => a.style.display = (inps.p.valid && !inps.b.valid && vl <= vT2) ? "block" : "none");
            layout.equations.eq_P2.forEach(a => a.style.display = (inps.p.valid && !inps.b.valid && vl > vT2) ? "block" : "none");
            layout.equations.eq_BP1.forEach(a => a.style.display = (inps.p.valid && inps.b.valid && vl < vT2 + vT3) ? "block" : "none");
            layout.equations.eq_BP2.forEach(a => a.style.display = (inps.p.valid && inps.b.valid && vl >= vT2 + vT3) ? "block" : "none");
            if (inps.b.valid) {
                if (inps.p.valid) {
                    if (vl < vT2 + vT3) {
                        vR = inps.d.value * (vl - vT3);
                    } else {
                        vR = (inps.p.value - inps.d.value) * (vT1 + vT2 + vT3 - vl);
                    }
                } else {
                    vR = inps.d.value * (vl - inps.h.value * vT / (inps.b.value + inps.h.value));
                }
            } else {
                if (inps.p.valid) {
                    if (vl <= vT2) {
                        vR = inps.d.value * vl;
                    } else {
                        vR = (inps.p.value - inps.d.value) * (vT - vl);
                    }
                } else {
                    vR = inps.d.value * vl;
                }
            }



        }
        outs.Q.value = vQ;
        outs.S.value = vS;
        outs.T.value = vT;
        outs.c.value = vc;
        outs.cc.value = vcc;
        outs.C.value = vC;
        outs.T1.value = vT1;
        outs.T2.value = vT2;
        outs.T3.value = vT3;
        outs.T4.value = vT4;
        outs.Sb.value = vSb;
        outs.l.value = vl;
        outs.R.value = vR;
    }
}
Calculate();

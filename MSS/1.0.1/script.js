/* jshint  esversion:6*/
/* jshint browser: true */

const tabl = {
    Res0: document.getElementById("tblRes0"),
    ResQ: document.getElementById("tblResQ"),
    Prob: document.getElementById("tblProb")
};
const input = {
    L: document.getElementById('iL'),
    Tl: document.getElementById('iTl'),
    M: document.getElementById('iM'),
    Tm: document.getElementById('iTm'),
    n: document.getElementById('in'),
    N: document.getElementById('iN')
};
const out0 = {
    Po: document.getElementById('oPo0'),
    Q: document.getElementById('oQ0'),
    A: document.getElementById('oA0'),
    An: document.getElementById('oAn'),
    R: document.getElementById('oR')
};
const outQ = {
    P: document.getElementById('oP'),
    Q: document.getElementById('oQQ'),
    A: document.getElementById('oAQ'),
    Po: document.getElementById('oPoQ'),
    Ls: document.getElementById('oLs'),
    Ws: document.getElementById('oWs'),
    Wq: document.getElementById('oWq'),
    Lq: document.getElementById('oLq')
};

function CalculateTl() {
    input.Tl.value = 1 / parseFloat(input.L.value);
    Calculate();
}

function CalculateTm() {
    input.Tm.value = 1 / parseFloat(input.M.value);
    Calculate();
}

function CalculateL() {
    input.L.value = 1 / parseFloat(input.Tl.value);
    Calculate();
}

function CalculateM() {
    input.M.value = 1 / parseFloat(input.Tm.value);
    Calculate();
}

function Calculaten() {
    input.n.value = parseInt(input.N.value) - 1;
    Calculate();
}

function CalculateN() {
    input.N.value = parseInt(input.n.value) + 1;
    Calculate();
}

function Calculate() {
    var vL = parseFloat(input.L.value);
    var vN = parseFloat(input.N.value);
    var vM = parseFloat(input.M.value);
    var vQ, vPo, vA;

    if (vN == 1) {
        tabl.ResQ.style.display = "none";
        tabl.Res0.style.display = "table-row-group";
        tabl.Prob.style.display = "none";
        if (!vL || !vM) return;

        vQ = vM / (vM + vL);
        vA = vQ * vL;
        vPo = 1 - vQ;

        out0.Q.value = vQ;
        out0.A.value = vA;
        out0.Po.value = vPo;
        out0.An.value = vM;
        out0.R.value = vM / vA;
    } else if (vN > 1) {
        tabl.ResQ.style.display = "table-row-group";
        tabl.Res0.style.display = "none";
        tabl.Prob.style.display = "table-row-group";
        while (tabl.Prob.childElementCount > vN + 2) {
            tabl.Prob.lastChild.remove();
        }
        while (tabl.Prob.childElementCount < vN + 2) {
            tabl.Prob.insertAdjacentHTML('beforeend', '<tr><td class="mathj">\\(P_' + (tabl.Prob.childElementCount - 1) + '=\\)</td><td><input type="number" id="P' + (tabl.Prob.childElementCount - 1) + '" readonly="true"></td></tr>');
        }
        MathJax.typeset();
        if (!vL || !vM) return;

        var vP = vL / vM;
        outQ.P.value = vP;
        var vProb = new Array(vN + 1);
        var vLs = 0;
        vProb[0] = (vP == 1) ? (1 / vN + 1) : ((1 - vP) / (1 - Math.pow(vP, vN + 1)));
        for (var i = 1; i < vProb.length; i++) {
            vProb[i] = vProb[i - 1] * vP;
            vLs = vLs + vProb[i] * i;
        }

        vPo = vProb[vProb.length - 1];
        vQ = 1 - vPo;
        vA = vQ * vL;
        var vWs = vLs / vL / (1 - vPo);
        var vWq = vWs - 1 / vM;
        var vLq = vL * (1 - vPo) * vWq;

        outQ.Q.value = vQ;
        outQ.A.value = vA;
        outQ.Po.value = vPo;
        for (i = 0; i < vProb.length; i++) {
            document.getElementById('P' + i).value = vProb[i];
        }
        outQ.Ls.value = vLs;
        outQ.Ws.value = vWs;
        outQ.Lq.value = vLq;
        outQ.Wq.value = vWq;
    }
}

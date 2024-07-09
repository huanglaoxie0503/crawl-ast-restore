// 变量重命名
function Oo0oo00(OOO00o) {
    console.log(OOO00o)
    return function (Oo0oo00) {
        console.log(Oo0oo00)
    }
}

Oo0oo00(1)

// 字面量处理
function strOrNum() {
    var a = 0b1111;
    var b = "\u4e00-\u9fa5"
    console.log(a, b)
}

strOrNum()

// 为一些节点加上括号
function bracket(a) {
    if (a) console.log("true", a);
    else console.log("false ", a);
    while (a)
        console.log("while", a, a = !a);
    for (; a;) console.log(a, a = !a);
}

bracket(100);

// 各种复杂嵌套的逗号表达式
function rs() {
    _$ay <= 15 ? _$ay <= 3 ? _$ay <= 0 ? (_$gY = _$ja[--_$kf],
        _$gY = _$ja[--_$kf] * _$gY,
        _$ja[_$kf++] = _$gY) : _$ay <= 1 ? (_$gY = _$ja[--_$kf],
        _$gY = _$ja[--_$kf] & _$gY,
        _$ja[_$kf++] = _$gY) : _$ay <= 2 ? _$ja[_$kf++] = _$j_[_$cg[++_$dc]] : _$ja[_$kf++] = true : _$ay <= 7 ? _$ay <= 4 ? (_$ic = _$cg[++_$dc],
        _$gY = _$ja[--_$kf],
        !_$gY ? (_$dc += _$ic,
            ++_$kf) : 0) : _$ay <= 5 ? (_$gY = _$ja[--_$kf],
        _$$i(),
        _$gY = _$eN[_$ic] |= _$gY) : _$ay <= 6 ? _$ja[_$kf++] = _$hs[_$cg[++_$dc]] : (_$gY = _$ja[--_$kf],
        _$gY = _$ja[--_$kf] !== _$gY,
        _$ja[_$kf++] = _$gY) : _$ay <= 11 ? _$ay <= 8 ? (_$kf -= 2,
        _$gY = _$kf,
        _$$i(),
        _$eN = _$eN[_$ic],
        _$ja[_$kf++] = _$eN(_$ja[_$gY], _$ja[_$gY + 1])) : _$ay <= 9 ? (_$kf--,
        _$gY = _$kf,
        _$$i(),
        _$eN = _$eN[_$ic],
        _$ja[_$kf++] = _$eN(_$ja[_$gY])) : _$ay <= 10 ? (_$fh = _$cg[++_$dc],
        _$dc += _$fh) : (_$dh = _$cg[++_$dc],
        _$ja[_$kf++] = _$_E[_$dh][_$cg[++_$dc]]) : _$ay <= 12 ? (_$gY = _$ja[--_$kf],
        _$d4[4] = 1,
        _$d4[5] = _$gY,
        _$dc = _$jt) : _$ay <= 13 ? (_$kf -= 3,
        _$gY = _$kf,
        _$$i(),
        _$eN = _$eN[_$ic],
        _$gY = _$eN(_$ja[_$gY], _$ja[_$gY + 1], _$ja[_$gY + 2])) : _$ay <= 14 ? (_$fh = _$cg[++_$dc],
        _$dc -= _$fh) : (_$dh = _$cg[++_$dc],
        _$ja[_$kf++] = _$if[_$dh][_$cg[++_$dc]]) : _$ay <= 31 ? _$ay <= 19 ? _$ay <= 16 ? (_$kf--,
        _$gY = _$kf,
        _$$i(),
        _$gY = _$eN[_$ic](_$ja[_$gY])) : _$ay <= 17 ? (_$kf--,
        _$gY = _$kf,
        _$$i(),
        _$ja[_$kf++] = _$eN[_$ic](_$ja[_$gY])) : _$ay <= 18 ? (_$gY = _$ja[--_$kf],
        _$gY = _$ja[--_$kf] in _$gY,
        _$ja[_$kf++] = _$gY) : (_$gY = _$ja[--_$kf],
        _$eN = _$ja[_$kf - 1],
        _$eN[_$gc[_$cg[++_$dc]]] = _$gY) : _$ay <= 23 ? _$ay <= 20 ? _$ja[_$kf++] = [] : _$ay <= 21 ? (_$cg[_$dc] = 26,
        _$ic = _$cg[++_$dc],
        _$gY = _$gc[_$ic],
        _$cg[_$dc] = _$gY,
        _$ja[_$kf++] = _$gY) : _$ay <= 22 ? (_$gY = _$ja[--_$kf],
        _$$i(),
        _$gY = _$eN[_$ic] += _$gY) : _$ja[_$kf++] = _$gn[_$cg[++_$dc]] : _$ay <= 27 ? _$ay <= 24 ? (_$ic = _$ja[--_$kf],
        _$eN = _$ja[--_$kf]) : _$ay <= 25 ? (_$gY = _$ja[--_$kf],
        _$$i(),
        _$eN[_$ic] = _$gY) : _$ay <= 26 ? _$ja[_$kf++] = _$cg[++_$dc] : (_$dh = _$cg[++_$dc],
        _$ic = _$cg[++_$dc],
        _$eN = _$_E[_$dh]) : _$ay <= 28 ? (_$$i(),
        _$ja[_$kf++] = _$eN[_$ic]()) : _$ay <= 29 ? (_$kf -= 2,
        _$gY = _$kf,
        _$$i(),
        _$ja[_$kf++] = _$eN[_$ic](_$ja[_$gY], _$ja[_$gY + 1])) : _$ay <= 30 ? (_$gY = _$ja[--_$kf],
        _$gY = _$ja[--_$kf] > _$gY,
        _$ja[_$kf++] = _$gY) : (_$$i(),
        _$eN = _$eN[_$ic],
        _$ja[_$kf++] = _$eN()) : _$ay <= 47 ? _$ay <= 35 ? _$ay <= 32 ? (_$ho(_$ii, _$cg[++_$dc], _$cg[++_$dc], _$fh = _$cg[++_$dc], _$cg[++_$dc], _$dc + 1, _$hs, _$d4),
        _$d4[4] ? _$dc = _$jt : _$dc += _$fh) : _$ay <= 33 ? (_$ic = _$cg[++_$dc],
        _$eN = _$j_) : _$ay <= 34 ? (_$gY = _$ja[--_$kf],
        _$gY = _$ja[--_$kf] != _$gY,
        _$ja[_$kf++] = _$gY) : (_$$i(),
        _$eN = _$eN[_$ic],
        _$gY = _$eN()) : _$ay <= 39 ? _$ay <= 36 ? (_$kf--,
        _$gY = _$kf,
        _$$i(),
        _$eN = _$eN[_$ic],
        _$gY = _$eN(_$ja[_$gY])) : _$ay <= 37 ? (_$cg[_$dc] = 92,
        _$ic = _$ka[_$cg[++_$dc]],
        _$cg[_$dc] = _$ic,
        _$eN = _$ja[--_$kf]) : _$ay <= 38 ? (_$gY = _$ja[--_$kf],
        _$fh = _$cg[++_$dc],
        _$gY ? 0 : _$dc += _$fh) : (_$ic = _$cg[++_$dc],
        _$gY = _$ja[--_$kf],
        _$gY ? (_$dc += _$ic,
            ++_$kf) : 0) : _$ay <= 43 ? _$ay <= 40 ? _$ja[_$kf++] = {} : _$ay <= 41 ? (_$gY = _$ja[--_$kf],
        _$gY = _$ja[--_$kf] == _$gY,
        _$ja[_$kf++] = _$gY) : _$ay <= 42 ? (_$gY = _$ja[--_$kf],
        _$eN = _$ja[--_$kf],
        _$ja[_$kf++] = _$eN[_$gY]) : (_$gY = _$ja[--_$kf],
        _$gY = _$ja[--_$kf] < _$gY,
        _$ja[_$kf++] = _$gY) : _$ay <= 44 ? (_$gY = _$ja[--_$kf],
        _$gY = _$ja[--_$kf] === _$gY,
        _$ja[_$kf++] = _$gY) : _$ay <= 45 ? _$ja[_$kf++] = _$iW[_$cg[++_$dc]] : _$ay <= 46 ? (_$cg[_$dc] = 87,
        _$ic = _$ka[_$cg[++_$dc]],
        _$cg[_$dc] = _$ic,
        _$gY = _$ja[--_$kf],
        _$ja[_$kf++] = _$gY[_$ic]) : (_$kf -= 2,
        _$gY = _$kf,
        _$$i(),
        _$eN = _$eN[_$ic],
        _$gY = _$eN(_$ja[_$gY], _$ja[_$gY + 1])) : _$ay <= 51 ? _$ay <= 48 ? (_$ic = _$cg[++_$dc],
        _$ja[_$kf++] = _$fP(_$ii._$cK[_$ic], _$d4)) : _$ay <= 49 ? (_$kf -= 2,
        _$gY = _$kf,
        _$$i(),
        _$gY = _$eN[_$ic](_$ja[_$gY], _$ja[_$gY + 1])) : _$ay <= 50 ? (_$gY = typeof _$ja[--_$kf],
        _$ja[_$kf++] = _$gY) : (_$fh = _$cg[++_$dc],
        _$gA = _$ja.slice(_$kf - _$fh, _$kf),
        _$kf -= _$fh,
        _$$i(),
        _$ja[_$kf++] = _$dG(_$eN[_$ic], _$gA)) : _$ay <= 55 ? _$ay <= 52 ? (_$gY = _$ja[--_$kf],
        _$eN = _$ja[_$kf - 1],
        _$eN[_$ka[_$cg[++_$dc]]] = _$gY) : _$ay <= 53 ? (_$gY = _$ja[--_$kf],
        _$ja[_$kf++] = !_$gY) : _$ay <= 54 ? (_$ic = _$cg[++_$dc],
        _$eN = _$gn) : _$gY = _$eN[_$ic]++ : _$ay <= 59 ? _$ay <= 56 ? (_$d4[4] = 2,
        _$dc = _$jt) : _$ay <= 57 ? (_$gY = _$ja[--_$kf],
        _$gY = _$ja[--_$kf] - _$gY,
        _$ja[_$kf++] = _$gY) : _$ay <= 58 ? _$ja[_$kf++] = false : (_$cg[_$dc] = 26,
        _$ic = _$cg[++_$dc],
        _$gY = _$dY[_$ic],
        _$cg[_$dc] = _$gY,
        _$ja[_$kf++] = _$gY) : _$ay <= 60 ? (_$gY = _$ja[--_$kf],
        _$gY = _$ja[--_$kf] + _$gY,
        _$ja[_$kf++] = _$gY) : _$ay <= 61 ? (_$gY = _$ja[--_$kf],
        _$eN = _$ja[_$kf - 1],
        _$eN.push(_$gY)) : _$ay <= 62 ? (_$ic = _$cg[++_$dc],
        _$eN = _$iW) : (_$ic = _$cg[++_$dc],
        _$eN = _$hs);
}
rs()
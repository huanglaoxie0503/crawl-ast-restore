// 变量重命名
function TEST_0(TEST_1) {
  console.log(TEST_1);
  return function (TEST_4) {
    console.log(TEST_4);
  };
}
TEST_0(1);

// 字面量处理
function TEST_7() {
  var TEST_8 = 15;
  var TEST_9 = "一-龥";
  console.log(TEST_8, TEST_9);
}
TEST_7();

// 为一些节点加上括号
function TEST_12(TEST_13) {
  if (TEST_13) {
    console.log("true", TEST_13);
  } else {
    console.log("false ", TEST_13);
  }
  while (TEST_13) {
    console.log("while", TEST_13, TEST_13 = !TEST_13);
  }
  for (; TEST_13;) {
    console.log(TEST_13, TEST_13 = !TEST_13);
  }
}
TEST_12(100);

// 各种复杂嵌套的逗号表达式
function TEST_22() {
  switch (_$ay) {
    case 0:
      _$gY = _$ja[--_$kf];
      _$gY = _$ja[--_$kf] * _$gY;
      _$ja[_$kf++] = _$gY;
      break;
    case 1:
      _$gY = _$ja[--_$kf];
      _$gY = _$ja[--_$kf] & _$gY;
      _$ja[_$kf++] = _$gY;
      break;
    case 2:
      _$ja[_$kf++] = _$j_[_$cg[++_$dc]];
      break;
    case 3:
      _$ja[_$kf++] = true;
      break;
    case 4:
      _$ic = _$cg[++_$dc];
      _$gY = _$ja[--_$kf];
      !_$gY ? (_$dc += _$ic, ++_$kf) : 0;
      break;
    case 5:
      _$gY = _$ja[--_$kf];
      _$$i();
      _$gY = _$eN[_$ic] |= _$gY;
      break;
    case 6:
      _$ja[_$kf++] = _$hs[_$cg[++_$dc]];
      break;
    case 7:
      _$gY = _$ja[--_$kf];
      _$gY = _$ja[--_$kf] !== _$gY;
      _$ja[_$kf++] = _$gY;
      break;
    case 8:
      _$kf -= 2;
      _$gY = _$kf;
      _$$i();
      _$eN = _$eN[_$ic];
      _$ja[_$kf++] = _$eN(_$ja[_$gY], _$ja[_$gY + 1]);
      break;
    case 9:
      _$kf--;
      _$gY = _$kf;
      _$$i();
      _$eN = _$eN[_$ic];
      _$ja[_$kf++] = _$eN(_$ja[_$gY]);
      break;
    case 10:
      _$fh = _$cg[++_$dc];
      _$dc += _$fh;
      break;
    case 11:
      _$dh = _$cg[++_$dc];
      _$ja[_$kf++] = _$_E[_$dh][_$cg[++_$dc]];
      break;
    case 12:
      _$gY = _$ja[--_$kf];
      _$d4[4] = 1;
      _$d4[5] = _$gY;
      _$dc = _$jt;
      break;
    case 13:
      _$kf -= 3;
      _$gY = _$kf;
      _$$i();
      _$eN = _$eN[_$ic];
      _$gY = _$eN(_$ja[_$gY], _$ja[_$gY + 1], _$ja[_$gY + 2]);
      break;
    case 14:
      _$fh = _$cg[++_$dc];
      _$dc -= _$fh;
      break;
    case 15:
      _$dh = _$cg[++_$dc];
      _$ja[_$kf++] = _$if[_$dh][_$cg[++_$dc]];
      break;
    case 16:
      _$kf--;
      _$gY = _$kf;
      _$$i();
      _$gY = _$eN[_$ic](_$ja[_$gY]);
      break;
    case 17:
      _$kf--;
      _$gY = _$kf;
      _$$i();
      _$ja[_$kf++] = _$eN[_$ic](_$ja[_$gY]);
      break;
    case 18:
      _$gY = _$ja[--_$kf];
      _$gY = _$ja[--_$kf] in _$gY;
      _$ja[_$kf++] = _$gY;
      break;
    case 19:
      _$gY = _$ja[--_$kf];
      _$eN = _$ja[_$kf - 1];
      _$eN[_$gc[_$cg[++_$dc]]] = _$gY;
      break;
    case 20:
      _$ja[_$kf++] = [];
      break;
    case 21:
      _$cg[_$dc] = 26;
      _$ic = _$cg[++_$dc];
      _$gY = _$gc[_$ic];
      _$cg[_$dc] = _$gY;
      _$ja[_$kf++] = _$gY;
      break;
    case 22:
      _$gY = _$ja[--_$kf];
      _$$i();
      _$gY = _$eN[_$ic] += _$gY;
      break;
    case 23:
      _$ja[_$kf++] = _$gn[_$cg[++_$dc]];
      break;
    case 24:
      _$ic = _$ja[--_$kf];
      _$eN = _$ja[--_$kf];
      break;
    case 25:
      _$gY = _$ja[--_$kf];
      _$$i();
      _$eN[_$ic] = _$gY;
      break;
    case 26:
      _$ja[_$kf++] = _$cg[++_$dc];
      break;
    case 27:
      _$dh = _$cg[++_$dc];
      _$ic = _$cg[++_$dc];
      _$eN = _$_E[_$dh];
      break;
    case 28:
      _$$i();
      _$ja[_$kf++] = _$eN[_$ic]();
      break;
    case 29:
      _$kf -= 2;
      _$gY = _$kf;
      _$$i();
      _$ja[_$kf++] = _$eN[_$ic](_$ja[_$gY], _$ja[_$gY + 1]);
      break;
    case 30:
      _$gY = _$ja[--_$kf];
      _$gY = _$ja[--_$kf] > _$gY;
      _$ja[_$kf++] = _$gY;
      break;
    case 31:
      _$$i();
      _$eN = _$eN[_$ic];
      _$ja[_$kf++] = _$eN();
      break;
    case 32:
      _$ho(_$ii, _$cg[++_$dc], _$cg[++_$dc], _$fh = _$cg[++_$dc], _$cg[++_$dc], _$dc + 1, _$hs, _$d4);
      _$d4[4] ? _$dc = _$jt : _$dc += _$fh;
      break;
    case 33:
      _$ic = _$cg[++_$dc];
      _$eN = _$j_;
      break;
    case 34:
      _$gY = _$ja[--_$kf];
      _$gY = _$ja[--_$kf] != _$gY;
      _$ja[_$kf++] = _$gY;
      break;
    case 35:
      _$$i();
      _$eN = _$eN[_$ic];
      _$gY = _$eN();
      break;
    case 36:
      _$kf--;
      _$gY = _$kf;
      _$$i();
      _$eN = _$eN[_$ic];
      _$gY = _$eN(_$ja[_$gY]);
      break;
    case 37:
      _$cg[_$dc] = 92;
      _$ic = _$ka[_$cg[++_$dc]];
      _$cg[_$dc] = _$ic;
      _$eN = _$ja[--_$kf];
      break;
    case 38:
      _$gY = _$ja[--_$kf];
      _$fh = _$cg[++_$dc];
      _$gY ? 0 : _$dc += _$fh;
      break;
    case 39:
      _$ic = _$cg[++_$dc];
      _$gY = _$ja[--_$kf];
      _$gY ? (_$dc += _$ic, ++_$kf) : 0;
      break;
    case 40:
      _$ja[_$kf++] = {};
      break;
    case 41:
      _$gY = _$ja[--_$kf];
      _$gY = _$ja[--_$kf] == _$gY;
      _$ja[_$kf++] = _$gY;
      break;
    case 42:
      _$gY = _$ja[--_$kf];
      _$eN = _$ja[--_$kf];
      _$ja[_$kf++] = _$eN[_$gY];
      break;
    case 43:
      _$gY = _$ja[--_$kf];
      _$gY = _$ja[--_$kf] < _$gY;
      _$ja[_$kf++] = _$gY;
      break;
    case 44:
      _$gY = _$ja[--_$kf];
      _$gY = _$ja[--_$kf] === _$gY;
      _$ja[_$kf++] = _$gY;
      break;
    case 45:
      _$ja[_$kf++] = _$iW[_$cg[++_$dc]];
      break;
    case 46:
      _$cg[_$dc] = 87;
      _$ic = _$ka[_$cg[++_$dc]];
      _$cg[_$dc] = _$ic;
      _$gY = _$ja[--_$kf];
      _$ja[_$kf++] = _$gY[_$ic];
      break;
    case 47:
      _$kf -= 2;
      _$gY = _$kf;
      _$$i();
      _$eN = _$eN[_$ic];
      _$gY = _$eN(_$ja[_$gY], _$ja[_$gY + 1]);
      break;
    case 48:
      _$ic = _$cg[++_$dc];
      _$ja[_$kf++] = _$fP(_$ii._$cK[_$ic], _$d4);
      break;
    case 49:
      _$kf -= 2;
      _$gY = _$kf;
      _$$i();
      _$gY = _$eN[_$ic](_$ja[_$gY], _$ja[_$gY + 1]);
      break;
    case 50:
      _$gY = typeof _$ja[--_$kf];
      _$ja[_$kf++] = _$gY;
      break;
    case 51:
      _$fh = _$cg[++_$dc];
      _$gA = _$ja.slice(_$kf - _$fh, _$kf);
      _$kf -= _$fh;
      _$$i();
      _$ja[_$kf++] = _$dG(_$eN[_$ic], _$gA);
      break;
    case 52:
      _$gY = _$ja[--_$kf];
      _$eN = _$ja[_$kf - 1];
      _$eN[_$ka[_$cg[++_$dc]]] = _$gY;
      break;
    case 53:
      _$gY = _$ja[--_$kf];
      _$ja[_$kf++] = !_$gY;
      break;
    case 54:
      _$ic = _$cg[++_$dc];
      _$eN = _$gn;
      break;
    case 55:
      _$gY = _$eN[_$ic]++;
      break;
    case 56:
      _$d4[4] = 2;
      _$dc = _$jt;
      break;
    case 57:
      _$gY = _$ja[--_$kf];
      _$gY = _$ja[--_$kf] - _$gY;
      _$ja[_$kf++] = _$gY;
      break;
    case 58:
      _$ja[_$kf++] = false;
      break;
    case 59:
      _$cg[_$dc] = 26;
      _$ic = _$cg[++_$dc];
      _$gY = _$dY[_$ic];
      _$cg[_$dc] = _$gY;
      _$ja[_$kf++] = _$gY;
      break;
    case 60:
      _$gY = _$ja[--_$kf];
      _$gY = _$ja[--_$kf] + _$gY;
      _$ja[_$kf++] = _$gY;
      break;
    case 61:
      _$gY = _$ja[--_$kf];
      _$eN = _$ja[_$kf - 1];
      _$eN.push(_$gY);
      break;
    case 62:
      _$ic = _$cg[++_$dc];
      _$eN = _$iW;
      break;
    case 63:
      _$ic = _$cg[++_$dc];
      _$eN = _$hs;
      break;
  }
}
TEST_22();
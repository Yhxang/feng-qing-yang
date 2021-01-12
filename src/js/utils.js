function cleanArray(actual) {
    const newArray = []
    for (let i = 0; i < actual.length; i++) {
      if (actual[i]) {
        newArray.push(actual[i])
      }
    }
    return newArray
  }
 
function param(json) {
    if (!json) return ''
    return cleanArray(Object.keys(json).map(key => {
        if (json[key] === undefined) return ''
        return encodeURIComponent(key) + '=' +
                encodeURIComponent(json[key])
    })).join('&')
}

function formatStr (ele){
  let text = ele.innerHTML;
  const totalTextLen = ele.innerText.length;
  const lineNum = 3;
  const base = window.getComputedStyle(ele);
  const baseWidth = base.width;
  const baseFontSize = base.fontSize;
  const lineWidth = +baseWidth.slice(0, -2);

  // 所计算的strNum为元素内部一行可容纳的字数(不区分中英文)
  const strNum = Math.floor(lineWidth / +baseFontSize.slice(0, -2));

  let content = '';

  // 多行可容纳总字数
  const totalStrNum = Math.floor(strNum * lineNum);

  const lastIndex = totalStrNum - totalTextLen;

  if (totalTextLen > totalStrNum) {
    content = text.slice(0, lastIndex - 3).concat('...');
  } else {
    content = text;
  }
  ele.innerHTML = content;
}

export  {param, formatStr};
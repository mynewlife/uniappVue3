//base64转码
export function dataURLtoFile(dataUrl, name) {
  let arr = dataUrl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    buster = atob(arr[1]),
    n = buster.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = buster.charCodeAt(n);
  }
  return new File([u8arr], name.split('.')[0] + '.png', { type: mime });
}

//压缩图片（压缩完成后的图片为base64编码）
export function compressImg(file) {
  let files,
    fileSize = parseFloat(parseInt(file['size']) / 1024 / 1024).toFixed(2),
    read = new FileReader();
  read.readAsDataURL(file);
  return new Promise((resolve, reject) => {
    read.onload = function (e) {
      let img = new Image();
      img.src = e.target.result;
      img.onload = function () {
        //默认按比例压缩
        let w = this.width,
          h = this.height;
        //生成canvas
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        let base64;
        // 创建属性节点
        canvas.setAttribute('width', w);
        canvas.setAttribute('height', h);
        ctx.drawImage(this, 0, 0, w, h);
        if (fileSize < 1) {
          //如果图片小于一兆 那么不执行压缩操作
          base64 = canvas.toDataURL(file['type'], 1);
        } else if (fileSize > 1 && fileSize < 2) {
          //如果图片大于1M并且小于2M 那么压缩0.5
          base64 = canvas.toDataURL(file['type'], 0.5);
        } else {
          //如果图片超过2m 那么压缩0.2
          base64 = canvas.toDataURL(file['type'], 0.2);
        }
        // 回调函数返回file的值（将base64编码转成file）
        files = dataURLtoFile(base64, file.name); //如果后台接收类型为base64的话这一步可以省略
        resolve(files);
      };
    };
  });
}

// 小写转大写
function priceChange(number) {
  let ret = '';
  if (number != '' && number != null && number != '0') {
    let unit = '仟佰拾亿仟佰拾万仟佰拾元角分',
      str = '';
    number += '00';
    let point = number.indexOf('.');
    if (point >= 0) {
      number = number.substring(0, point) + number.substr(point + 1, 2);
    }
    unit = unit.substr(unit.length - number.length);
    for (let i = 0; i < number.length; i++) {
      str += '零壹贰叁肆伍陆柒捌玖'.charAt(number.charAt(i)) + unit.charAt(i);
    }
    ret =
      str
        .replace(/零(仟|佰|拾|角)/g, '零')
        .replace(/(零)+/g, '零')
        .replace(/零(万|亿|元)/g, '$1')
        .replace(/(亿)万|(拾)/g, '$1$2')
        .replace(/^元零?|零分/g, '')
        .replace(/元$/g, '元') + '整';
  }
  return ret;
}

// 转换时间格式
function formatDate(str, format = 'YYYY-MM-DD HH:mm:ss') {
  let oDate = new Date(str),
    oYear = oDate.getFullYear(),
    oMonth = oDate.getMonth() + 1,
    oDay = oDate.getDate(),
    oHour = oDate.getHours(),
    oMin = oDate.getMinutes(),
    oSec = oDate.getSeconds(),
    oTime = '';
  if (format == 'YYYY-MM-DD') {
    return (oTime = oYear + '-' + getzf(oMonth) + '-' + getzf(oDay));
  } else if (format == 'YYYY-MM-DD HH:mm:ss') {
    return (oTime =
      oYear +
      '-' +
      getzf(oMonth) +
      '-' +
      getzf(oDay) +
      ' ' +
      getzf(oHour) +
      ':' +
      getzf(oMin) +
      ':' +
      getzf(oSec)); //最后拼接时间
  } else if (format == 'YYYY年MM月DD日') {
    return (oTime = oYear + '年' + getzf(oMonth) + '月' + getzf(oDay) + '日');
  } else if (format == 'MM-DD HH:mm') {
    return (oTime = getzf(oMonth) + '-' + getzf(oDay) + ' ' + getzf(oHour) + ':' + getzf(oMin));
  } else if (format == '年月日时分') {
    return (oTime =
      oYear +
      '年' +
      getzf(oMonth) +
      '月' +
      getzf(oDay) +
      '日' +
      ' ' +
      getzf(oHour) +
      '时' +
      getzf(oMin) +
      '分');
  }
  return oTime;
}

//补0操作
function getzf(num) {
  if (parseInt(num) < 10) {
    num = '0' + num;
  }
  return num;
}

export default {
  formatDate,
  priceChange,
  compressImg,
  dataURLtoFile,
};

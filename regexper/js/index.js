(function () {
  // 获取相应dom元素
  var regexInput = document.getElementById("regex");
  var textInput = document.getElementById("text");
  var runBtn = document.getElementById("run");
  var errBox = document.getElementById("err");
  var resultBox = document.getElementById("result");
  // 绑定点击事件
  runBtn.onclick = function () {
  // 清除错误和结果
  errBox.innerHTML = "";
  resultBox.innerHTML = "";
  // 获取正则和文本
  var text = textInput.value;
  var regex = regexInput.value;
  if (regex == "") {
  errBox.innerHTML = "请输入正则表达式";
  } else if (text == "") {
  errBox.innerHTML = "请输入测试文本";
  } else {
  regex = createRegex(regex);
  if (!regex) return;
  var result, results = [];
  // 没有修饰符g的话，会死循环
  if (regex.global) {
  while(result = regex.exec(text)) {
  results.push(result);
  }
  } else {
  results.push(regex.exec(text));
  }
  if (results[0] == null) {
  resultBox.innerHTML = "匹配到0个结果";
  return;

  // 倒序是有必要的
  for (var i = results.length - 1; i >= 0; i--) {
  var result = results[i];
  var match = result[0];
  var prefix = text.substr(0, result.index);
  var suffix = text.substr(result.index + match.length);
  text = prefix
  + '<span class="info">'
  + match
  + '</span>'
  + suffix;
  }
  resultBox.innerHTML = "匹配到" + results.length + "个结果:<br>" + text;
  }
  };
  // 生成正则表达式，核心函数
  function createRegex (regex) {
  try {
  if (regex[0] == "/") {
  regex = regex.split("/");
  regex.shift();
  var flags = regex.pop();
  regex = regex.join("/");
  regex = new RegExp(regex, flags);
  } else {
  regex = new RegExp(regex, "g");
  }
  return regex;
  } catch(e) {
  errBox.innerHTML = "无效的正则表达式";
  return false;
  }
  }
})();

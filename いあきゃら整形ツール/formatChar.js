/**
 * キャラ駒を出力する
 */
document.getElementById("output_Ccfolia").addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: outputCcfolia,
  });
});

function outputCcfolia() {
  // 名前の取得
  var origName = document.getElementsByClassName("is-size-2")[0].innerHTML;
  origName = origName.replaceAll('　', ' ');
  origName = origName.replaceAll(')', ' ');
  origName = origName.replaceAll('）', ' ');
  origName = origName.replaceAll('（', '(');
  var arrName = origName.split('(');
  if (arrName.length) {
    var mainName = arrName[0];
    var yomiName = "";
    if (arrName.length == 2) {
      yomiName = arrName[1];
    }
  }

  // ステータスの取得
  var statusElm = document.getElementsByClassName("column is-12 is-min-pad")[2].getElementsByClassName('has-text-light');
  var statusArrs = new Array();
  var statusArr;
  for (let i = 0; i < statusElm.length; i++) {
    statusArr = statusElm[i].innerHTML.split(' <br data-v-1a8402ea=\"\"> ');
    statusArrs.push(statusArr);

  }

  var divElm = document.createElement("div");
  divElm.innerHTML = "\<textarea readonly style=\"width\: 50vw\; height\: 200px\; margin\: 0 auto\; display\: block\;\"\>" + createJSON() + "\<\/textarea\>";
  document.getElementsByClassName("section")[0].before(divElm);
  
  /**
   * ファンクション
   */
   function createJSON() {
    var clipingData = "\{\"kind\":\"character\",\"data\":\{\"name\":\"";
    clipingData = clipingData + mainName;
    clipingData = clipingData + "\",\"memo\":\"";
    clipingData = clipingData + yomiName;
    clipingData = clipingData + "\",\"initiative\":";
    clipingData = clipingData + statusArrs[3][1];
    clipingData = clipingData + ",\"externalUrl\":\"";
    clipingData = clipingData + location.href;
    clipingData = clipingData + "\",\"params\":[";
    clipingData = clipingData + createParams();
    clipingData = clipingData + "\"status\":[";
    clipingData = clipingData + createStatus();
    clipingData = clipingData + "\"width\":13";
    clipingData = clipingData + ",\"secret\":false";
    clipingData = clipingData + ",\"invisible\":true";
    clipingData = clipingData + ",\"hideStatus\":false";
    clipingData = clipingData + ",\"commands\":";
    clipingData = clipingData + createChatPalette();
    clipingData = clipingData + "\}\}";
    return clipingData;
  }

  function createParams() {
    var rtn = "";
    for (let i = 0; i < 8; i++) {
      rtn = rtn + "\{\"label\": \"" + statusArrs[i][0].trim() + "\",";
      rtn = rtn + "\"value\": \"" + statusArrs[i][1].trim() + "\"\}";
      if (i != 7) {
        rtn = rtn + ",";
      }
    }
    return rtn + "],";
  }

  function createStatus() {
    var rtn = "";
    for (let i = 8; i < 11; i++) {
      rtn = rtn + "\{\"label\": \"" + statusArrs[i][0].trim() + "\",";
      rtn = rtn + "\"value\": \"" + statusArrs[i][1].trim() + "\",";
      rtn = rtn + "\"max\": \"" + statusArrs[i][1].trim() + "\"\}";
      if (i != 10) {
        rtn = rtn + ",";
      }
    }
    return rtn + "],";
  }

  function createChatPalette() {
    var rtn = "\"CCB\<\=\{SAN\} 【SAN値チェック】\\n";
    rtn = rtn + "CCB\<\=\{POW\}\*5 【幸運】\\n";
    rtn = rtn + "CCB\<\=\{EDU\}\*5 【知識】\\n";
    rtn = rtn + "CCB\<\=\{INT\}\*5 【アイデア】\\n";
    var ginouElms = document.getElementsByClassName("is-fullwidth gino-table")[0].getElementsByClassName("charedit-status-tr");
    var ginouRow;
    for (let i = 0; i < ginouElms.length; i++) {
      ginouRow = ginouElms[i];
      rtn = rtn + "CCB<=";
      rtn = rtn + ginouRow.children[1].getElementsByClassName("has-text-dark")[0].value;
      rtn = rtn + " 【";
      if (ginouRow.children[0].getElementsByClassName("has-text-dark")[0]) {
        rtn = rtn + ginouRow.children[0].innerText + ":";
        rtn = rtn + ginouRow.children[0].getElementsByClassName("has-text-dark")[0].value;
      } else if (ginouRow.children[0].getElementsByClassName("ta-c")[0]) {
        rtn = rtn + ginouRow.children[0].getElementsByClassName("ta-c")[0].value;
      } else {
        rtn = rtn + ginouRow.children[0].innerText;
      }
      rtn = rtn + "】\\n";
    }
    rtn = rtn + "CCB\<\=\{CON\}\*5\\n";
    rtn = rtn + "CCB\<\=\{STR\}\*5\\n";
    rtn = rtn + "CCB\<\=\{POW\}\*5\\n";
    rtn = rtn + "CCB\<\=\{DEX\}\*5\\n";
    rtn = rtn + "CCB\<\=\{APP\}\*5\\n";
    rtn = rtn + "CCB\<\=\{SIZ\}\*5\\n";
    rtn = rtn + "CCB\<\=\{INT\}\*5\\n";
    rtn = rtn + "CCB\<\=\{EDU\}\*5";
    return rtn + "\"";
  }
}

/**
 * ステータスを出力する
 */
 document.getElementById("output_Status").addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: outputStatus,
  });
});

function outputStatus() {
  // ステータスの取得
  var statusElm = document.getElementsByClassName("column is-12 is-min-pad")[2].getElementsByClassName('has-text-light');
  var statusArrs = new Array();
  var statusArr;
  for (let i = 0; i < statusElm.length; i++) {
    statusArr = statusElm[i].innerHTML.split(' <br data-v-1a8402ea=\"\"> ');
    statusArr[0] = statusArr[0].trim();
    statusArr[1] = statusArr[1].trim();
    statusArrs.push(statusArr);
  }
  // ステータスの出力
  var statusTxt = "";
  for (let i = 0; i < 11; i++) {
    statusTxt = statusTxt + statusArrs[i][0] + "：";
    statusTxt = statusTxt + statusArrs[i][1] + "　";
  }
  statusTxt = statusTxt.trim();

  var divElm = document.createElement("div");
  divElm.innerHTML = "\<textarea readonly style=\"width\: 50vw\; height\: 200px\; margin\: 0 auto\; display\: block\;\"\>" + statusTxt + "\<\/textarea\>";
  document.getElementsByClassName("section")[0].before(divElm);
}

/**
 * 技能を出力する
 */
 document.getElementById("output_Skill").addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: outputGinou,
  });
});

function outputGinou() {
  var ginouElms = document.getElementsByClassName("is-fullwidth gino-table")[0].getElementsByClassName("charedit-status-tr");
  var ginouRow;
  var ginouTxt = "";
  for (let i = 0; i < ginouElms.length; i++) {
    ginouRow = ginouElms[i];
    if (ginouRow.children[0].getElementsByClassName("has-text-dark")[0]) {
      ginouTxt = ginouTxt + ginouRow.children[0].innerText.trim() + "(";
      ginouTxt = ginouTxt + ginouRow.children[0].getElementsByClassName("has-text-dark")[0].value.trim() + ")";
    } else if (ginouRow.children[0].getElementsByClassName("ta-c")[0]) {
      ginouTxt = ginouTxt + ginouRow.children[0].getElementsByClassName("ta-c")[0].value;
    } else {
      ginouTxt = ginouTxt + ginouRow.children[0].innerText.trim();
    }
    ginouTxt = ginouTxt + "：" + ginouRow.children[1].getElementsByClassName("has-text-dark")[0].value.trim() + "　";
  } 
  ginouTxt = ginouTxt.trim();
  var divElm = document.createElement("div");
  divElm.innerHTML = "\<textarea readonly style=\"width\: 50vw\; height\: 200px\; margin\: 0 auto\; display\: block\;\"\>" + ginouTxt + "\<\/textarea\>";
  document.getElementsByClassName("section")[0].before(divElm);
}
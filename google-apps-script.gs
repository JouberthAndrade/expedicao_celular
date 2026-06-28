/**
 * Expedição Celular 3D — recebimento de resultados no Google Planilhas.
 *
 * Este script fica DENTRO de uma Planilha Google (Extensões → Apps Script).
 * Ele recebe os resultados enviados pelos tablets e grava UMA LINHA por aluno,
 * em uma ABA com o nome da turma (cada turma vira uma aba). Assim você tem,
 * por exemplo, as abas "8º ano A", "8º ano B" e "9º ano C" preenchidas sozinhas.
 *
 * Passo a passo completo no arquivo INTEGRACAO_GOOGLE.md.
 */

// Ordem fixa das organelas (precisa bater com o index.html)
var ORG_IDS   = ['membrana','citoplasma','nucleo','mitocondria','ribossomo','re','golgi','lisossomo'];
var ORG_NOMES = ['Membrana Plasmática','Citoplasma','Núcleo','Mitocôndria','Ribossomo',
                 'Retículo Endoplasmático','Complexo de Golgi','Lisossomo'];
var HEADERS   = ['Data/Hora','Nome','Turma','Acertos','Total','Percentual (%)','Pontos'].concat(ORG_NOMES);

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss   = SpreadsheetApp.getActiveSpreadsheet();

    // nome da aba = turma (limpando caracteres que o Sheets não aceita em nomes de aba)
    var turma = String(data.turma || 'Sem turma').replace(/[\\\/\?\*\[\]:]/g, ' ').trim().substring(0, 95) || 'Sem turma';

    var sh = ss.getSheetByName(turma);
    if (!sh) {
      sh = ss.insertSheet(turma);
      sh.appendRow(HEADERS);
      sh.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
      sh.setFrozenRows(1);
    }

    var ans = data.respostas || {};
    var row = [
      data.data || new Date(),
      data.nome  || '',
      data.turma || '',
      num(data.acertos), num(data.total), num(data.pct), num(data.pontos)
    ];
    for (var i = 0; i < ORG_IDS.length; i++) {
      var a = ans[ORG_IDS[i]];
      row.push(a ? (a.resposta + (a.acertou ? ' (OK)' : ' (X)')) : '-');
    }
    sh.appendRow(row);

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function doGet() {
  return ContentService.createTextOutput(
    'Expedição Celular: endpoint ativo. Os resultados dos tablets chegam aqui via POST.'
  );
}

function num(v) { var n = Number(v); return isNaN(n) ? v : n; }
function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

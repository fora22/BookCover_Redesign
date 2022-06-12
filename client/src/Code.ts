function doGet(e) {
  var index = HtmlService.createTemplateFromFile("src/index");
  return index.evaluate().setTitle("나뚜 Docs");
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
function doGet(e) {
  var index = HtmlService.createTemplateFromFile("src/index");
  return index.evaluate();
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
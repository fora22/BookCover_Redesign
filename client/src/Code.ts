function doGet(e) {
  var index = HtmlService.createTemplateFromFile("src/index");
  return index.evaluate();
}

function conn_to_sheet(sheet_name) {
    const scriptProperties = PropertiesService.getScriptProperties();
    const BOOKCOVER_DB_ID = scriptProperties.getProperty('BOOKCOVER_DB_ID');
    const BOOKCOVER_INFO_SHEET_NAME = scriptProperties.getProperty(sheet_name);

    const ss = SpreadsheetApp.openById(BOOKCOVER_DB_ID);
    const sheet = ss.getSheetByName(BOOKCOVER_INFO_SHEET_NAME);

    return sheet
}

function get_sheet_info (sheet) {
    const last_row = sheet.getLastRow();
    const last_col = sheet.getLastColumn();
    const max_row = sheet.getMaxRows();
    const max_col = sheet.getMaxColumns();

    return {
        last_row: last_row,
        last_col: last_col,
        max_row: max_row,
        max_col: max_col
    }
}

function get_book_info() {
  const book_info_sheet = conn_to_sheet('BOOKCOVER_INFO_SHEET_NAME');

  const sheet_info = get_sheet_info(book_info_sheet);

  const range = book_info_sheet.getRange(2,1,sheet_info.last_row - 1, sheet_info.last_col);
  const book_info = range.getDisplayValues();

  let book_info_json = {};
  book_info.forEach((b_info) => {
    // b_info[0] 는 책 ID
    // b_info[9] 는 활성화 여부
    if (b_info[9]) {
        book_info_json[b_info[0]] = {
            name: b_info[1],        // 책 이름
            author: b_info[2],      // 지은이
            translator: b_info[3],  // 옮긴이
            publisher: b_info[4],   // 출판사
            date_publish: b_info[5],   // 출판일
            link: b_info[8],        // 책 링크
        }
    }
  })

//   console.log(book_info_json);
  return JSON.stringify(book_info_json)
}
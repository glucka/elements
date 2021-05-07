/* Responsive Table */
var headertext = [];
var headers = document.querySelectorAll(".ce-table thead");
var tablebody = document.querySelectorAll(".ce-table tbody");
for (var i = 0; i < headers.length; i++) {
    headertext[i] = [];
    for (var j = 0, headrow; headrow = headers[i].rows[0].cells[j]; j++) {
        var current = headrow;
        var text = current.innerHTML.replace(/\r?\n|\r/g, "");
        text = text.replace(/<br>/g, '  |  ');
        headertext[i].push(text);
    }
}
if (headers.length > 0) {
    for (var h = 0, tbody; tbody = tablebody[h]; h++) {
        for (var i = 0, row; row = tbody.rows[i]; i++) {
            for (var j = 0, col; col = row.cells[j]; j++) {
                if (h in headertext) {
                    if (j in headertext[h]) {
                        col.setAttribute("data-th", headertext[h][j]);
                    }
                }
            }
        }
    }
}
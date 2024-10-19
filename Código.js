function doGet(e) {
    return ContentService.createTextOutput("Hello, this is a GET request");
}

function doPost(e) {
    Logger.log(e); // Para verificar o que está sendo recebido

    // Verifique se o postData é nulo
    if (!e || !e.postData || !e.postData.contents) {
        return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "Dados não recebidos." }))
            .setMimeType(ContentService.MimeType.JSON);
    }

    var sheet = SpreadsheetApp.openById("1AhArX92vLcrX41RW1mBuZ897TxBZVkk5M5ikyV3Aq_Q").getActiveSheet();

    // Extrair dados do corpo da requisição
    var data = JSON.parse(e.postData.contents);

    // Adicionar uma nova linha à planilha
    sheet.appendRow([data.classe, data.data, data.valor]);

    return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Dados inseridos com sucesso!" }))
        .setMimeType(ContentService.MimeType.JSON);
}

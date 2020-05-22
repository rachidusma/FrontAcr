let { json2excel, excel2json } = require('js2excel');

exports.convert = function (data, name) {
    try {
        json2excel({
            data,
            name,
            formateDate: 'yyyy/mm/dd'
        });
    } catch (e) {
        console.error('export error');
    }
}

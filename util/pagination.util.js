var sql = require('../database/db');
exports.pagination_start = function(currentPage, limit, toTalRecord) {
    var toTalPage=Math.ceil(toTalRecord/limit);
    if (currentPage > toTalPage) {
        currentPage = toTalPage;
    } else if (currentPage < 1) {
        currentPage = 1;
    }
 
    return (currentPage - 1) * limit;
}
let page = 1;
let countItems = 150;
let itemsOnPage = 10;

let getCompaniesList = (page = 1, itemsCount = 10, countTotal = countItems) => {
    $.getJSON('http://www.tender.pro/api/_info.companylist_by_set.json?_key=6dea68e23416b21d201571d4c9263a57&set_type_id=7&set_id=2&max_rows='+itemsCount+'&offset='+(itemsCount*page),
        function(data) {
            let items = [];
            let statistic = `Cтраница ${page} из ${countTotal} по ${itemsCount} строк (всего строк: ${countTotal*itemsCount})`;
            $.each(data.result.data, function(i, item) {
                items.push('<div class="table__row"><div class="table__td">'+item.id+'</div><div class="table__td">'+item.address+'</div></div>');
            });
            $('.table__content').html(items.join(''));
            $('.companies-list__statistic').html(statistic);
        }).fail(function() { console.log( "error" ); })
    ;
}

$(function() {
    $('.companies-list__paginator').pagination({
        items: countItems,
        itemsOnPage: 10,
        displayedPages: 4,
        onPageClick(pageNumber, event) {
            getCompaniesList(pageNumber, itemsOnPage);
        }
    });
});

getCompaniesList();

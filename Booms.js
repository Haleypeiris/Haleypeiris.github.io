document.addEventListener("DOMContentLoaded", function (event) {

    let data = BoomsData();
    data.then(() => {
        //start up
        console.log("Boom saved");
        console.log(data);

        var input = $('#input');
        input.val("");

    });

    document.getElementById('input').addEventListener('keydown', function (event) {
        if (event.key == "Enter") {
            console.log("Enter");
            document.getElementById('booms_search').click();
        }
    });

    document.getElementById('booms_search').addEventListener('click', function () {

        var inputVal = $('#input').val();

        var name = document.getElementById('row').children;

        for (let name_value in name) {
            let booms_name = name[name_value];
            console.log((booms_name));

            if (typeof (booms_name) == "object") {
                if (booms_name.getAttribute("name").toLowerCase().includes(inputVal.toLowerCase())) {
                    $(booms_name).show()
                }
                else {
                    $(booms_name).hide();
                }
            }

        }

    });

});




//functions

async function BoomsData(){
    const data = await $.getJSON('https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/tftdamageskins.json');
    var number_of_items = 0;
    var data_set = [];

    const result = $.each(data, function(name, object){
        let booms_info = object;
        //console.log(booms_info);
        data_set.push({

            'name' : booms_info['name'],
            'url' : 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/' + booms_info['loadoutsIcon'].split("/ASSETS/")[1].toLowerCase(),
            'level' : booms_info['level'],
            'rarity' : booms_info['rarity']
        });

        number_of_items++;
    });

    let k = 0;

    var row = $('<div class="row gy-4" id="row" ></div>');
    //let j=0;
    while (k < number_of_items) {

        //if there are multiple of the same kind
        if (data_set[k]['level'] >= 2) {
            //multiple indicators
            var exisiting_indicators = indicators;
            var next_button = $('<button type="button"></button>');
            next_button.attr({
                'data-bs-target': '#' + (k - (data_set[k]['level']-1)),
                'data-bs-slide-to': data_set[k]['level'] - 1

            });

            //multiple carousel items
            var existing = carousel_inner;
            var next_item = $('<div class = "carousel-item "></div>');
            var img = $('<img>',
                {
                    'src': data_set[k]['url'],
                    'class': 'rounded-card'
                }
            );
            
            //appending
            next_item.append(img);
            existing.append(next_item);
            exisiting_indicators.append(next_button);

        }
        else {
            
            //col
            var col = $('<div class = "col-lg-2 col-md-4"></div>');
            col.attr({
                'name': data_set[k]['name']
            });

            //card
            var card = $('<div class = "card"></div>');
            card.attr({
                'class': 'card',
            });

            //card title
            var card_body = $('<h5 class = "card-title text-center p-1"></h5>');
            card_body.text(data_set[k]['name']);

            //carousel
            var carousel = $('<div class = "carousel slide" >');
            carousel.attr({ 'id': k });
            var carousel_inner = $('<div class="carousel-inner"></div>');
            carousel_inner.attr({ 'id': data_set[k]['name'] });

            //img
            var first_item = $('<div class = "carousel-item active"></div>');
            var img = $('<img>',
                {
                    'src': data_set[k]['url'],
                    'class': 'rounded-card'
                }
            );

            //indicators
            var indicators = $('<div class="carousel-indicators" id="carousel-indicators">');
            var indicator_button = $('<button type="button" data-bs-slide-to="0" class="active" aria-current="true"></button>');
            indicator_button.attr({ 'data-bs-target': '#' + k });
            indicators.append(indicator_button);

            var left_arrow = $('<button class = "carousel-control-prev" type="button" data-bs-slide="prev">');
            left_arrow.attr({ 'data-bs-target': '#' + k });
            var left_span1 = $('<span class="carousel-control-prev-icon" aria-hidden="true"></span>');
            var left_span2 = $('<span class="visually-hidden">Previous</span>');

            var right_arrow = $('<button class = "carousel-control-next" type="button" data-bs-slide="next">');
            right_arrow.attr({ 'data-bs-target': '#' + k });
            var right_span1 = $('<span class="carousel-control-next-icon" aria-hidden="true"></span>');
            var right_span2 = $('<span class="visually-hidden">Next</span>');

            //appending
            left_arrow.append(left_span1);
            left_arrow.append(left_span2);

            right_arrow.append(right_span1);
            right_arrow.append(right_span2);

            first_item.append(img);
            carousel.append(indicators);
            carousel_inner.append(first_item);
            carousel.append(carousel_inner);
            carousel.append(left_arrow);
            carousel.append(right_arrow);
            card.append(carousel);

            card.append(card_body);
            col.append(card);
            row.append(col);

        }
        k++;

    }

    $(main_booms).append(row);
        
    
    return data;
}
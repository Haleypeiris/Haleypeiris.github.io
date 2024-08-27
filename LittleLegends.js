document.addEventListener("DOMContentLoaded", function (event) {

    let data = LittleLegendData();
    data.then(() => {
        //clear any input in search bar

        var input = $('#input');
        input.val("");

    });

    document.getElementById('input').addEventListener('keydown', function (event) {
        if (event.key == "Enter") {
            console.log("Enter");
            document.getElementById('little_legend_search').click();
        }
    });

    document.getElementById('little_legend_search').addEventListener('click', function () {

        var inputVal = $('#input').val();

        var name = document.getElementById('row').children;

        for (let name_value in name) {
            let ll_name = name[name_value];
            console.log((ll_name));

            if (typeof (ll_name) == "object") {
                if (ll_name.getAttribute("name").toLowerCase().includes(inputVal.toLowerCase())) {
                    $(ll_name).show()
                }
                else {
                    $(ll_name).hide();
                }
            }

        }

    });

});




//functions

async function LittleLegendData() {
    const data = await $.getJSON('https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/companions.json');
    var number_of_items = 0;
    var data_set = [];

    const result = $.each(data, function (name, object) {
        let ll_info = object;
        //console.log(ll_info);
        data_set.push({

            'name': ll_info['name'],
            'url': 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/' + ll_info['loadoutsIcon'].split("/ASSETS/")[1].toLowerCase(),
            'description': ll_info['description'],
            'level': ll_info['level'],
            'rarity': ll_info['rarity']
        });

        number_of_items++;
    });

    let k = 0;
    var row = $('<div class="row gy-4" id="row" ></div>');
    while (k < number_of_items) {

        //if there are multiple of the same kind
        if (data_set[k]['level'] >= 2) {
            //multiple indicators
            var existing = carousel_inner;
            var exisiting_indicators = indicators;
            var next_button = $('<button type="button"></button>');
            next_button.attr({
                'data-bs-target': '#' + k,
                'data-bs-slide-to': data_set[k]['level'] - 1

            });

            //multiple carousel items
            var next_item = $('<div class = "carousel-item "></div>');
            var img = $('<img>',
                {
                    'src': data_set[k]['url'],
                    'class': 'rounded'
                }
            );
            
            //appending items
            next_item.append(img);
            existing.append(next_item);
            exisiting_indicators.append(next_button);
        }
        else {
            //Col
            var col = $('<div class = "col-lg-3 col-md-6"></div>');
            col.attr({
                'name': data_set[k]['name']
            });

            //Card
            var card = $('<div class = "card"></div>');
            card.attr({
                'class': 'card',
            });

            //Card text and title
            var card_text = $('<p class = "card-text text-center"></p>');
            card_text.text(data_set[k]['description']);
            var card_body = $('<h5 class = "card-title text-center"></h5>');
            card_body.text(data_set[k]['name']);

            //carousel
            var carousel = $('<div class = "carousel slide" >');
            carousel.attr({ 'id': k });
            var carousel_inner = $('<div class="carousel-inner"></div>');
            carousel_inner.attr({ 'id': data_set[k]['name'] });
            var first_item = $('<div class = "carousel-item active"></div>');

            //img
            var img = $('<img>',
                {
                    'src': data_set[k]['url'],
                    'class': 'rounded'
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

            left_arrow.append(left_span1);
            left_arrow.append(left_span2);

            var right_arrow = $('<button class = "carousel-control-next" type="button" data-bs-slide="next">');
            right_arrow.attr({ 'data-bs-target': '#' + k });
            var right_span1 = $('<span class="carousel-control-next-icon" aria-hidden="true"></span>');
            var right_span2 = $('<span class="visually-hidden">Next</span>');


            //appending 
            right_arrow.append(right_span1);
            right_arrow.append(right_span2);

            first_item.append(img);
            carousel_inner.append(first_item);

            carousel.append(indicators);
            carousel.append(carousel_inner);
            carousel.append(left_arrow);
            carousel.append(right_arrow);
            card.append(carousel);

            card.append(card_body);
            card.append(card_text);
            col.append(card);
            row.append(col);
        }
        k++;

    }

    $(main_littlelegends).append(row);


    return data;
}
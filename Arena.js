document.addEventListener("DOMContentLoaded", function (event) {

    let data = ArenaData();
    data.then(() => {
        //start up

        //clear any inputs
        var input = $('#input');
        input.val("");

    });

    document.getElementById('input').addEventListener('keydown', function (event) {
        if (event.key == "Enter") {
            console.log("Enter");
            document.getElementById('arenas_search').click();
        }
    });

    document.getElementById('arenas_search').addEventListener('click', function () {

        var inputVal = $('#input').val();

        var name = document.getElementById('row').children;

        for (let name_value in name) {
            let arenas_name = name[name_value];

            if (typeof (arenas_name) == "object") {
                if (arenas_name.getAttribute("name").toLowerCase().includes(inputVal.toLowerCase())) {
                    $(arenas_name).show()
                }
                else {
                    $(arenas_name).hide();
                }
            }

        }

    });

});

//functions

async function ArenaData() {
    const data = await $.getJSON('https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/tftmapskins.json');
    var number_of_items = 0;
    var data_set = [];

    const result = $.each(data, function (name, object) {
        let arenas_info = object;
        data_set.push({

            'name': arenas_info['name'],
            'url': 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/' + arenas_info['loadoutsIcon'].split("/ASSETS/")[1].toLowerCase(),
            'group': arenas_info['groupName'],
            'rarity': arenas_info['rarity']
        });

        number_of_items++;
    });

    let k = 0;
    var row = $('<div class="row gy-4" id="row" ></div>');
    while (k < number_of_items) {

        //col
        var col = $('<div class = "col-lg-3 col-md-4"></div>');
        col.attr({
            'name': data_set[k]['name']
        });

        //card
        var card = $('<div class = "card"></div>');
        card.attr({
            'class': 'card',
        });

        //card title
        var card_body = $('<h5 class = "card-title text-center"></h5>');
        card_body.text(data_set[k]['name']);

        //img
        var img = $('<img>',
            {
                'src': data_set[k]['url'],
                'class': 'rounded'
            }
        );

        //appending
        card.append(img);
        card.append(card_body);

        col.append(card);
        row.append(col);

        k++;
    }

    $(main_arenas).append(row);

    return data;
}
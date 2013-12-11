var num = 28,
    images = [],
    name = [
        'Jane',
        'Niklas',
        'Leon',
        'Tim',
        'Timmy',
        'Emily',
        'Jannik',
        'Dina',
        'Anthony',
        'Philip',
        'Ellen',
        'Matthes',
        'Alfred',
        'Veronika',
        'Viktoria',
        'Angelika',
        'Relana',
        'Natalie',
        'Tina',
        'Diana',
        'Andre',
        'Michelle Fischuk',
        'Alex',
        'Vanessa',
        'Kevin',
        'Michelle Martin',
        'Kornelius',
        'Konstanzija'
    ];

$(document).ready(function() {
    function shuffle(o) { //v1.0
        for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }

    function hide(el) {
        $('.image').css('margin-top','-200%');
    }

    function hideAll() {
        $('.image').css('margin-top','-200%');
    }

    /* Create and shuffle array with images */
    for (var a = 1; a <= 29; a++) {
        images.push(a);
    }
    images = shuffle(images);
    /* Left & Right Content erzeugen */
    for (var i = 1; i <= num; i++) {
        // left
        $('#left').append('<div class="item">' + i + '</div>');
        // right
        $('#right').append('<div class="item" data-id="' + i + '">' + i + '</div>');
        // Namen
        $('#left').append('<div class="item">' + i + '</div>');
        // images
        $('#right').append('<div class="image" data-id="' + i + '"><img src="bilder/' + images[(i - 1)] + '.jpg" /></div>');
    }
    $('#right').on('click', '.item', function() {
        // console.log($(this).data('id'));
        // $('.image').css('top','-100%');
        console.log('fired');
        var t = $(this),
            id = t.data('id'),
            el = $('.image[data-id="' + id + '"]');
        console.log(el);
        hideAll();
        el.css('margin-top', 0);
        el.addClass('act');
    });

    $('#stats .btn').click(function(){
        var el = $('.iimagemg.act');
        hide(el);
    });
});
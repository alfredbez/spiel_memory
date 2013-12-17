var num = 31,
    images = [],
    count = 1,
    namen = [
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
        'Konstanzija',
        'Esther',
        'Willi',
        'Annika'
    ];

$(document).ready(function() {
    function shuffle(o) { //v1.0
        for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }

    function hide(elements) {
        elements.each(function(){
            $(this).css('margin-top','-200%');
            $(this).removeClass('act');
        });
        $('.richtig').removeClass('richtig');
        $('.falsch').removeClass('falsch');
    }

    function del(nameId,imageId) {
        hideAll('.image,.name');
        $('#left .item[data-id="' + nameId + '"]').addClass('mute').text(count);
        $('#right .item[data-id="' + imageId + '"]').addClass('mute').text(count);
        count++;
    }

    function hideAll(selector) {
        $(selector).css('margin-top','-200%');
        $(selector).removeClass('act');
        $('.richtig').removeClass('richtig');
        $('.falsch').removeClass('falsch');
    }

    /* Create and shuffle array with images */
    for (var a = 1; a <= num; a++) {
        images.push(a);
    }
    images = shuffle(images);
    /* shuffle array with names */
    namen = shuffle(namen);
    /* Left & Right Content erzeugen */
    for (var i = 1; i <= num; i++) {
        if(typeof namen[i-1] === "undefined"){
            alert('FEHLER: Name ' + (i-1) + ' nicht verfügbar!');
        }
        // left
        $('#left').append('<div class="item" data-id="' + i + '">' + i + '</div>');
        // right
        $('#right').append('<div class="item" data-id="' + i + '">' + i + '</div>');
        // Namen
        $('#left').append('<div class="name" data-id="' + i + '">' + namen[i-1] + '</div>');
        // images
        $('#right').append('<div class="image" data-id="' + i + '"><img src="bilder/' + images[(i-1)] + '.jpg" /></div>');
    }
    $('#right').on('click', '.item:not(.mute)', function() {
        var id = $(this).data('id'),
            el = $('.image[data-id="' + id + '"]');
        hideAll('image');
        el.css('margin-top', 0);
        el.addClass('act');
    });
    $('#left').on('click', '.item:not(.mute)', function() {
        var id = $(this).data('id'),
            el = $('.name[data-id="' + id + '"]');
        hideAll('name');
        el.css('margin-top', 0);
        el.addClass('act');
    });

    $('#stats .btn#falsch').click(function(){
        var el = $('.act');
        hide(el);
    });

    $('#stats .btn#richtig').click(function(){
        var imageId = $('.image.act').data('id'),
            nameId  = $('.name.act').data('id');
        del( nameId , imageId );
    });
    $('#stats .btn#falsch').hover(function(){
        $('.act.image img').addClass('falsch');
    },function(){
        $('.act.image img').removeClass('falsch');
    });
    $('#stats .btn#richtig').hover(function(){
        $('.act.image img').addClass('richtig');
    },function(){
        $('.act.image img').removeClass('richtig');
    });
});
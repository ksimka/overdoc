var livedocClass = 'livedoc';
var livedocSelector = '[data-purplecoat=' + livedocClass + ']';

var $pcs = $(livedocSelector);
if ($pcs.length == 0) {
    var markLivedoc = function (item) {
        var $e = $(item[0]);
        if ($e.length == 0) {
            return;
        }

        $e[0].dataset.purplecoat = livedocClass;
        $e[0].dataset.purplecoatLabel = '<h3>' + item[1] + '</h3>';

        var tags = item[2];
        var html = [];
        tags.forEach(function(tag) {
            if (typeof linksByTags[tag] === 'undefined') {
                return;
            }

            var links = linksByTags[tag];
            html = html.concat(links.map(function(link) {
                return '<a href="' + link[0] + '">' + link[1] + '</a>';
            }));
        });

        var unique = function (value, index, self) {
            return self.indexOf(value) === index;
        };
        html = html.filter(unique);

        $e[0].dataset.purplecoatLabel += html.join(' ');
    };

    var settings = {
        blocks: [
            ['.b-reinformer-leader', 'Лидеры', ['leaders']],
            ['.b-photoline__container', 'Фотолинейка', ['photoline', 'hitlist', 'search']],
            ['.search_form', 'Поиск', ['search']],
            ['.web-new-faces', 'Новые лица', ['newfaces', 'search']],
            ['#Top100Main', 'Рейтинги', ['ratings']],
            ['#MyAnketaBlock', 'Кто меня смотрел', ['hitlist']],
            ['.b-invite', 'Инвайтер', ['inviter']]
        ],
        links: [
            [['http://google.com', 'Бэкенд'], ['photoline']],
            [['http://ya.ru', 'Демон'], ['ratings']],
            [['http://meduza.io', 'Региональные настройки'], ['search', 'leaders']],
            [['http://mamba.ru', 'Общие сведения'], ['search', 'hitlist']]
        ],
        tags: ['photoline', 'ratings', 'search', 'leaders', 'travel', 'hitlist', 'newfaces', 'inviter']
    };

    var linksByTags = {};
    settings.links.forEach(function(item) {
        var link = item[0];
        var tags = item[1];
        tags.forEach(function(tag) {
            if (typeof linksByTags[tag] === 'undefined') {
                linksByTags[tag] = [];
            }
            linksByTags[tag].push(link);
        });
    });

    settings.blocks.forEach(markLivedoc);

    $pcs = $(livedocSelector);
}

$pcs.purplecoat();
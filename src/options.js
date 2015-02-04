// Saves options to chrome.storage.sync.
function saveOptions() {
    var blocksText = document.getElementById('blocks').value;
    var linksText = document.getElementById('links').value;
    var tagsText = document.getElementById('tags').value;

    var blocks = blocksText.split("\n");
    blocks = blocks.map(
        function(t) {
            var m = /"(.+)" "(.+)" "(.+)"/.exec(t);
            if (!m) { return null; }
            return [m[1], m[2], m[3].split(',')];
        }
    ).filter(function(b) { return !!b; });

    var links = linksText.split("\n");
    links = links.map(
        function(t) {
            var m = /(.+) "(.+)" "(.+)"/.exec(t);
            if (!m) { return null; }
            return [m[1], m[2], m[3].split(',')];
        }
    ).filter(function(l) { return !!l; });

    var tags = tagsText.split(',');

    var settings = {
        blocks: blocks,
        links: links,
        tags: tags
    };

    chrome.storage.sync.set(settings, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

function restoreOptions() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({blocks: [], links: [], tags: []}, function(settings) {
        var blocks = document.getElementById('blocks');
        var links = document.getElementById('links');
        var tags = document.getElementById('tags');

        blocks.value = settings.blocks.map(
            function(row) {
                return '"' + [row[0], row[1], row[2].join(',')].join('" "') + '"';
            }
        ).join("\n");

        links.value = settings.links.map(
            function(row) {
                return row[0] + ' "' + [row[1], row[2].join(',')].join('" "') + '"';
            }
        ).join("\n");

        tags.value = settings.tags.join(',');
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
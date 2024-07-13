const URL_REGEX = /href=\"(.*)\"/;

/**
 * @param {String} text 
 */
function getURLs(text) {
    text.split("\n");
    let out = [];

    for (let i of text.split("\n"))
    {
        if (URL_REGEX.test(i))
        {
            let url = URL_REGEX.exec(i)[1];
            out.push(url);
        }
    }

    return out;
}

function reformFileList(list)
{
    let out = [];

    for (let i of list)
    {
        out.push(i.fileID);
    }

    return out;
}

window.addEventListener("load", _ => {
    /** @type {HTMLButtonElement} */
    let start = document.getElementById("start");
    /** @type {HTMLButtonElement} */
    let next = document.getElementById("next");
    /** @type {HTMLInputElement} */
    let manifest = document.getElementById("manifest");
    /** @type {HTMLInputElement} */
    let links = document.getElementById("links");
    
    var current = null;

    start.addEventListener("click", _ => {
        links.files.item(0).text().then(link_val => {
            manifest.files.item(0).text().then(manifest_val => {
                current = [
                    0,
                    getURLs(link_val),
                    reformFileList(JSON.parse(manifest_val).files),
                ];
            });
        });
    });

    next.addEventListener("click", _ => {
        for(let i = 0; i < 15; i++) {
            if(current[0] < current[1].length) {
                window.open(`${current[1][current[0]]}/download/${current[2][current[0]]}`);
                current[0]++;
            }
        }
    });
});
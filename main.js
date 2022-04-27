//creating home page structure
const $body = $("body");
const $headerDiv = $('<div class = "header"></div>');
$headerDiv.appendTo($body);
const $welcomeHeader = $('<h1>Welcome To Fish List</>');
$welcomeHeader.appendTo($headerDiv);
const $page = $('<div id="page"></div>');
$page.appendTo($body);
const $fishContainer = $('<div id="fishContainer"></div>');
$fishContainer.appendTo($page);
$leftRow = $(`<div id="leftRow"></div>`);
$rightRow = $(`<div id="rightRow"></div>`);
$leftRow.appendTo($fishContainer);
$rightRow.appendTo($fishContainer);

let counter = 0;

$.get("https://www.fishwatch.gov/api/species", (data) => {
    for(let i = 0; i < data.length; i++) {
        const $fishDiv = $("<div class='fish-card'></div>");
        if(counter % 2 === 0) {
            $fishDiv.appendTo($leftRow);
        }else {
            $fishDiv.appendTo($rightRow);
        }
        counter++;
        const $h5 = $(`<h5 class="fish">${data[i]["Species Name"]}</h3>`)
        $h5.appendTo($fishDiv);
    }
});


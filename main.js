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



//creating home button
const $homeButton = $('<button class = "homeButton"></button>');
$homeButton.text("Home");
$homeButton.appendTo($headerDiv);
$homeButton.hide();
$($homeButton).on('click', function(e) {
  //unhide all of the other information
    $($fishContainer).show();
    $($welcomeHeader).show();
    $('.homeButton').hide();
})

let counter = 0;

$.get("https://www.fishwatch.gov/api/species", (data) => {
    console.log(data);
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
        const $image = $(`<img class="card-image" src=${data[i]["Species Illustration Photo"].src}></ul>`);
        $image.appendTo($fishDiv);
        const $a = $(`<a id='learn-more' href='${`https://www.fishwatch.gov` + data[i].Path}'>Learn More</a>`)
        $a.appendTo($fishDiv);
        $($fishDiv).on('click', function(e) {
            //unhide all of the other information
            userList();
        })
    }
});

function userList() {
    $($fishContainer).hide();
    $($welcomeHeader).hide();
    $('.homeButton').show();
}


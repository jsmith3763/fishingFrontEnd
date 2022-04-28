//creating home page structure
const $body = $("body");
const $headerDiv = $('<div class = "header"></div>').appendTo($body);;
const $welcomeHeader = $('<h1>Welcome To Fish List</>').appendTo($headerDiv);
const $page = $('<div id="page"></div>').appendTo($body);;
const $fishContainer = $('<div id="fishContainer"></div>').appendTo($page);;
const $leftRow = $(`<div id="leftRow"></div>`).appendTo($fishContainer);;
const $rightRow = $(`<div id="rightRow"></div>`).appendTo($fishContainer);;
const $listHeader = $(`<h1 id='list-header'>Fish Caught</h1>`).appendTo($headerDiv);
const $userList = $(`<div class="userList"></div>`).appendTo($page);;
$($listHeader).hide();
$($userList).hide();


//creating home button
const $homeButton = $('<button class="homeButton"></button>');
$homeButton.text("Home");
$homeButton.appendTo($headerDiv);
$homeButton.hide();
$($homeButton).on('click', function(e) {
  //unhide all of the other information
    hideUserList();
})

//creating view list button
const $viewList = $('<button class="viewList"></button>');
$viewList.text("View List");
$viewList.appendTo($headerDiv);
$($viewList).on('click', function(e) {
  //unhide all of the other information
    hideHomeScreen();
})

//determines what row to place fish card
let counter = 0;
//gets info from fishwatch API and displays on page
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
        const $a = $(`<a class='learn-more' href='${`https://www.fishwatch.gov` + data[i].Path}'>Learn More</a>`)
        $a.appendTo($fishDiv);
        const $addButton = $('<button class="add"></button>').text("Fish Caught").appendTo($fishDiv);
        $($addButton).on('click', function(e) {
            //unhide all of the other information
            //hideHomeScreen();
            addToList($fishDiv);
        })
    }
});

//hides and shows certain elements
function hideHomeScreen() {
    $($fishContainer).hide();
    $($welcomeHeader).hide();
    $($viewList).hide();
    $(".add").hide();
    $(".learn-more").hide();
    $('.homeButton').show();
    $($listHeader).show();
    $($userList).show();
}

//hides userList screen
function hideUserList() {
    $($fishContainer).show();
    $($welcomeHeader).show();
    $($viewList).show();
    $(".add").show();
    $(".learn-more").show();
    $('.homeButton').hide();
    $($listHeader).hide();
    $($userList).hide();
}

//adds clicked div to userList
function addToList(element) {
    const $currentElement = element.clone();
    $currentElement.attr('id', 'userlist-div');
    $currentElement.appendTo($userList);
    const weight = window.prompt('Enter weight of fish:');
    const length = window.prompt('Enter length:');
    const location = window.prompt('Where did you catch it?');
    const method = window.prompt("What method was used?");
    $ul = $(`<ul class="unordered-list" style="list-style-type:none; margin: 0; padding: 0; text-align: center;"></ul>`).appendTo($currentElement);
    $li = $(`<li class="fish-info">Weight: ${weight}</ul>`).appendTo($ul);
    $li = $(`<li class="fish-info">Length: ${length}</ul>`).appendTo($ul);
    $li = $(`<li class="fish-info">Location: ${location}</ul>`).appendTo($ul);
    $li = $(`<li class="fish-info">How was it caught?: ${method}</ul>`).appendTo($ul);
}


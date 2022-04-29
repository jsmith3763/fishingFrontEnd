//creating home page structure
const $body = $("body");
const $headerDiv = $('<div class = "header"></div>').appendTo($body);
const $welcomeHeader = $('<h1>Welcome To Fish List</h1>').appendTo($headerDiv);
const $searchContainer = $('<div class="search-container"></div>').appendTo($headerDiv);
const $searchBar = $(`<input id="searchbar" type="text" name="search" placeholder="Filter fish.."></input>`).appendTo($searchContainer);
const $page = $('<div id="page"></div>').appendTo($body);
const $fishContainer = $('<div id="fishContainer"></div>').appendTo($page);
const $filteredContainer = $(`<div id="fishContainer"></div>`).appendTo($page);
const $listHeader = $(`<h1 id='list-header'>Fish You Have Caught</h1>`).appendTo($headerDiv);
const $userListContainer = $(`<div class="userlist-div"></div>`).appendTo($page);;
$($listHeader).hide();
$($userListContainer).hide();
$($filteredContainer).hide();

//creating buttons
//creating home button
const $homeButton = $('<button id="home-button"></button>');
$homeButton.text("Home");
$homeButton.appendTo($listHeader);
$homeButton.hide();
$($homeButton).on('click', function(e) {
  //unhide all of the other information
    hideuserListContainer();
})

//creating view list button
const $viewList = $('<button id="view-list"></button>');
$viewList.text("View List");
$viewList.appendTo($headerDiv);
$($viewList).on('click', function(e) {
  //unhide all of the other information
    hideHomeScreen();
})

//creating search button 
const $searchButton = $('<button id="search-button"></button>');
$searchButton.text("Search");
$searchButton.appendTo($searchContainer);

//creating reset button to return from search
const $resetButton = $('<button id="search-button"></button>');
$resetButton.text("Reset");
$resetButton.appendTo($searchContainer);
$($resetButton).hide();

//getting users search string
let searchString = '';
$($searchBar).on("keyup", (e) => {
    searchString = e.target.value;
})

console.log(searchString);



//gets info from fishwatch API and displays on page
$.get("https://www.fishwatch.gov/api/species", (data) => {
    console.log(data);
    $($searchBar).on('click', function(e) {
        let searchString = e.target.value;
        $($searchBar).on('keyup', function(e) {
            searchString = e.target.value;
            console.log(searchString);
        })
        console.log(searchString.length);
    })
    for(let i = 0; i < data.length; i++) {
        const $fishDiv = $("<div class='fish-card'></div>").appendTo($fishContainer);
        const $h5 = $(`<h5 class="fish">${data[i]["Species Name"]}</h5>`)
        $h5.appendTo($fishDiv);
        const $image = $(`<img class="card-image" src=${data[i]["Species Illustration Photo"].src}></ul>`);
        $image.appendTo($fishDiv);
        const $a = $(`<a class='learn-more' href='${`https://www.fishwatch.gov` + data[i].Path}'>Learn More</a>`)
        $a.appendTo($fishDiv);
        const $addButton = $('<button class="add"></button>').text("Fish Caught").appendTo($fishDiv);
        $($addButton).on('click', function(e) {
            //unhide all of the other information
            addToList($fishDiv);
        })
    }
});

//allows us to filter fish
//gets info from fishwatch API and displays on page
$($searchBar).on('click', function(e) {
$.get("https://www.fishwatch.gov/api/species", (data) => {
    //console.log(data.length);
            for(let i = 0; i < data.length; i++) {
                let lowercase = data[i]["Species Name"].toLowerCase();
                $($searchButton).on('click', function(e) {
                    $fishContainer.hide();
                    $filteredContainer.show();
                    $searchButton.hide();
                    $resetButton.show();
                    if(lowercase.includes(searchString)){
                        const $filteredFishDiv = $("<div class='fish-card'></div>").appendTo($filteredContainer);
                        const $filteredh5 = $(`<h5 class="fish">${data[i]["Species Name"]}</h5>`)
                        $filteredh5.appendTo($filteredFishDiv);
                        const $filteredImage = $(`<img class="card-image" src=${data[i]["Species Illustration Photo"].src}></ul>`);
                        $filteredImage.appendTo($filteredFishDiv);
                        const $filteredA = $(`<a class='learn-more' href='${`https://www.fishwatch.gov` + data[i].Path}'>Learn More</a>`)
                        $filteredA.appendTo($filteredFishDiv);
                        const $filteredAddButton = $('<button class="add"></button>').text("Fish Caught").appendTo($filteredFishDiv);
                        $($filteredAddButton).on('click', function(e) {
                            //unhide all of the other information
                            addToList($filteredFishDiv);
                        })
                    }
                })  
            }
            $($resetButton).on('click', function(e) {
                $searchBar.empty();
                $fishContainer.show();
                $searchButton.show();
                $resetButton.hide();
                $filteredContainer.hide();
                $filteredContainer.empty();
            })
    })
});






//hides and shows certain elements
function hideHomeScreen() {
    $($fishContainer).hide();
    $($welcomeHeader).hide();
    $($viewList).hide();
    $($filteredContainer).hide();
    $(".add").hide();
    $(".search-container").hide();
    $(".learn-more").hide();
    $('#home-button').show();
    $($listHeader).show();
    $($userListContainer).show();
}

//hides userListContainer screen
function hideuserListContainer() {
    $($fishContainer).show();
    $($welcomeHeader).show();
    $($viewList).show();
    $($filteredContainer).hide();
    $(".add").show();
    $(".learn-more").show();
    $('.search-container').show();
    $('#home-button').hide();
    $($listHeader).hide();
    $($userListContainer).hide();
}

//adds clicked div to userListContainer
function addToList(element) {
    const $currentElement = element.clone();
    $currentElement.attr('id', 'userListContainer-div');
    $currentElement.appendTo($userListContainer);
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


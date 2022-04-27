//creating home page structure
const $body = $("body");
const $headerDiv = $('<div class = "header"></div>');
$headerDiv.appendTo($body);
const $welcomeHeader = $('<h1>Welcome to Fishy.com</>');
$welcomeHeader.appendTo($headerDiv);

$.get('https://www.fishwatch.gov/api/species')

//test
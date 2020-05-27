// Credit Generator

var madeWith = [
    " with lust by Q",
    " with lots of coffee by Q",
    " with a sprinkle of procrastination by Q",
    " without the help of Kim Jong-un by Q",
    " while listening to Foo Fighters by Q",
    " with a certain amount of apathy by Q",
    " with beers by Q",
    " with trepidation by Q",
    " with no help from Netflix by Q",
    " with the knowledge of his insignificance by Q"
];
var container = document.getElementById("credit");
var t = -1;
var thing = '';
var message = container.innerHTML;
var mode = 'write';
var delay = 3000;

function updateText(txt) {
    container.innerHTML = txt;
}

function tick() {

    if(container.innerHTML.length == 0) {
        t++;
        thing = madeWith[getRandomInt(0,madeWith.length)];
        message = '';
        mode = 'write';
    }

    switch(mode) {
        case 'write' :
            message += thing.slice(0, 1);
            thing = thing.substr(1);

            updateText(message);

            if(thing.length === 0 && t === (madeWith.length - 1)) {
                window.clearTimeout(timeout);
                return;
            }

            if(thing.length == 0){
                mode = 'delete';
                delay = 2000;
            } else {
                delay = 32 + Math.round(Math.random() * 60);
            }

            break;

        case 'delete' :
            message = message.slice(0, -1);
            updateText(message);

            if(message.length == 0)
            {
                mode = 'write';
                delay = 2000;
            } else {
                delay = 32 + Math.round(Math.random() * 100);
            }
            break;
    }

    timeout = window.setTimeout(tick, delay);
}

var timeout = window.setTimeout(tick, delay);

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

//Page Content Switcher

var homeLink = document.getElementById("nav-letter");
var writingLink = document.getElementsByClassName("nav-item")[0];
var projectLink = document.getElementsByClassName("nav-item")[1];
var testimonialLink = document.getElementsByClassName("nav-item")[2];
var theGoodBookLink = document.getElementsByClassName("nav-item")[3];

$(homeLink).click(function(){
  showHomeContent();
});

$(writingLink).click(function(){
  showWritingContent();
});

$(projectLink).click(function(){
    showProjectContent();
});

$(testimonialLink).click(function(){
    showTestimonialContent();
});

$(theGoodBookLink).click(function(){
    showTheGoodBookContent();
});

function showHomeContent() {
    $.get("pages/home.html", function(data) {
      $("#bio").html(data);
    });
}

function showWritingContent() {
    $.get("pages/writing.html", function(data) {
      $("#bio").html(data);
    });
}

function showProjectContent() {
    $.get("pages/project.html", function(data) {
      $("#bio").html(data);
    });
}

function showTestimonialContent() {
    $.get("pages/testimonials.html", function(data) {
      $("#bio").html(data);
    });
}

function showTheGoodBookContent() {
    $.get("pages/the-good-book.html", function(data) {
      $("#bio").html(data);
    });
}

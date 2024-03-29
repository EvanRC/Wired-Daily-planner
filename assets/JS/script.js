$(document).ready(function () { //creates call back function to wait for html to load
  var html = "" // creates a variable called html that is used as storage for lines of html that can be dynamically altered througout the code.
  var currentHour = dayjs().hour() //creates a new object that represents the current time and date and returns it in a 24 hour format.
  console.log(currentHour)
  setInterval(function () {
    $("#currentDay").text(dayjs().format('hh:mm:ss A YYYY-MM-DD'))
  }, 1000) //updates time every second
  for (let i = 9; i < 18; i++) { // creates a loop to convert 24 hour clock to 12 hour and determine if it's am or pm.
    if (i < 12) {
      var timeBlock = i + "AM"
    } else if (i === 12) {
      var timeBlock = i + "PM"
    } else {
      var timeBlock = (i - 12) + "PM" // 13-12, 14-12, 15 -12
    }

    var saveList = localStorage.getItem("hour-" + i) || "" // this retrievs value by the key hour- + i. i represents the current hour

    if (i < currentHour) {
      var planColor = "past" //if statement sets color associated with past event if it is less than the current hour
    }
    else if (i === currentHour) {
      var planColor = "present" //if statement sets color associated with present event if it is equal to the current hour
    }
    else {
      var planColor = "future" //if statement sets color associated with future event if it is greater than the current hour
    }
    html += ` 
            <div id="hour-${i}" class="row time-block ${planColor}">
            <div class="col-2 col-md-1 hour text-center py-3">${timeBlock}</div>
            <textarea class="col-8 col-md-10 description" rows="3">${saveList} </textarea>
            <button class="btn saveBtn col-2 col-md-1" aria-label="save">
              <i class="fas fa-save" aria-hidden="true"></i>
            </button>
          </div>
            `

  } //creates dynamic html rows numbered by hours 9 to 5 with a text area to put a todo and a savebutton

  $(".container-fluid").html(html) // replaces content in html var with new content generated by the loop

  $(".saveBtn").on('click', function (event) {
    var userdayplan = $(this).siblings("textarea").val()
    var timeBlock = $(this).parent().attr("id")
    console.log('Button clicked', userdayplan, timeBlock);
    localStorage.setItem(timeBlock, userdayplan)

  }); // saves user data entered tnto text area with coresponding hour

});

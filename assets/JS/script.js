// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(document).ready(function () {
  var html = ""
  var currentHour = dayjs().hour()
  console.log(currentHour)
  setInterval(function(){
    $("#currentDay").text(dayjs().format('HH:mm:ss YYYY-MM-DD') )
  },1000)
  for (let i = 9; i < 18; i++) {
            if (i < 12) {
              var timeBlock = i + "AM"
            } else if (i === 12) {
              var timeBlock = i + "PM"
            } else {
              var timeBlock = (i - 12) + "PM" // 13-12, 14-12, 15 -12,
            }

            var saveList = localStorage.getItem("hour-" + i) || ""

            if (i < currentHour) {
              var planColor = "past"
            }
            else if (i === currentHour) {
              var planColor = "present"
            }
            else {
              var planColor = "future"
            }
           // console.log(i,timeBlock,saveList,planColor)
            html += `
            
            <div id="hour-${i}" class="row time-block ${planColor}">
            <div class="col-2 col-md-1 hour text-center py-3">${timeBlock}</div>
            <textarea class="col-8 col-md-10 description" rows="3">${saveList} </textarea>
            <button class="btn saveBtn col-2 col-md-1" aria-label="save">
              <i class="fas fa-save" aria-hidden="true"></i>
            </button>
          </div>
    
            
            `
      
  }
  //console.log(html)//

  $(".container-fluid").html(html)

  $(".saveBtn").on('click', function (event) {
    var userdayplan = $(this).siblings("textarea").val()
    var timeBlock = $(this).parent().attr("id")
    console.log('Button clicked', userdayplan, timeBlock);
    localStorage.setItem(timeBlock, userdayplan)

  });
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});

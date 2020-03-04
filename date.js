obj_hours = document.getElementById("hours");

name_month = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
name_day = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");

function wr_hours() {
  time = new Date();

  time_sec = time.getSeconds();
  time_min = time.getMinutes();
  time_hours = time.getHours();
  time_wr = ((time_hours < 10) ? "0" : "") + time_hours;
  time_wr += ":";
  time_wr += ((time_min < 10) ? "0" : "") + time_min;
  time_wr += ":";
  time_wr += ((time_sec < 10) ? "0" : "") + time_sec;

  time_wr = "Curent UTC Time: " + name_day[time.getDay()] + " " + time.getDate() + " " + name_month[time.getMonth()] + " " + time.getFullYear() + " Time: " + time_wr;

  obj_hours.innerHTML = time_wr;
}

wr_hours();
setInterval("wr_hours();", 5000);
const alarmsArray = [];
let initialHour = 0,
  initialMinute = 0,
  alarmIndex = 0;
  let alarmSound = new Audio("./song/jaiSriRam.mp3");




function appendZero(abc){   
  if(abc<10){
    return "0" + abc;
  }else{
    return abc;
}
}

let date = new Date();
    let [hours,minutes,seconds] = [
        appendZero(date.getHours()),
        appendZero(date.getMinutes()),
        appendZero(date.getSeconds()),
    ]
    let merid = " AM" ;
        if(hours>12){
            hours = hours-12;
            // hours= appendZero(hours);
            merid= " PM";
         }
      

function time(){
  let date = new Date();
    let [hours,minutes,seconds] = [
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
    ]
    let merid = "AM" ;
        if(hours>12){
            hours = hours-12;
            // hours= appendZero(hours);
            merid= "PM";
         }
         hours = appendZero(hours);
         minutes= appendZero(minutes);
         seconds= appendZero(seconds);
    
    const clock = (hours) + " : " + (minutes) + " : " + (seconds) + (" ")+ (merid) ;
    document.getElementById('spann').innerHTML = clock;

    let actvAlarm = document.getElementById("actv");
if(alarmsArray.length===0){
  actvAlarm.style.display = "none";
}else{
  actvAlarm.style.display = "block";
}

 //Alarm
 alarmsArray.forEach((alarm) => {
  if (alarm.isActive) {
    
    if ((alarm.alarmHour==hours) && (alarm.alarmMinute==minutes) && (alarm.meridianInput == merid) ) {
      
      alarmSound.play();
      alarmSound.loop = true;
    }
  }
   });
  }
  setInterval(time,100);
// console.log("yes it active" + alarm.meridianInput + merid); 
    // console.log("yes it active" +  alarm.alarmHour  + hours); 
    // console.log("yes it active" + alarm.alarmMinute + seconds); 
 // console.log("yess");

// making the input of alarm from where  user provide the details of alarm
const selectHour = document.getElementById("hourSelect");
    for (let i = 0; i <= 12; i++) {
      let option = document.createElement("option");
      option.value = i;
      option.text = i;
      selectHour.appendChild(option);
    }
const selectMinute = document.getElementById("minuteSelect");
    for (let i = 0; i <= 59; i++) {
      let option = document.createElement("option");
      option.value = i;
      option.text = i;
      selectMinute.appendChild(option);
    }



//Search for value in object and finding the alarm Object from array and send the alarm object with resp as yes it exist in the array 
const searchObject = (parameter, value) => {
  let alarmObject,
    objIndex,
    exists = false;
  alarmsArray.forEach((alarm, index) => {
    if (alarm[parameter] == value) {
      exists = true;
      alarmObject = alarm;
      objIndex = index;
      console.log(exists,alarmObject,objIndex);
      return false;
    }
  });
  return [exists, alarmObject, objIndex];
};


function displayAlarm(alarm) {
  const { id, alarmHour, alarmMinute,meridianInput } = alarm;
  //Alarm div
  let alarmDiv = document.createElement("div");
  alarmDiv.setAttribute("id","alarmDiv");
  alarmDiv.setAttribute("data-id", id);

//display the alarm time text ----
  let alarmDis =  alarmHour + ":" + alarmMinute + " " + meridianInput;
  const textnode = document.createTextNode(alarmDis);
        
// .......Display the slider button.........

    // Create the label element
        let label = document.createElement("label");
        label.classList.add("toggleLabel");
        label.setAttribute("id", "labell");

   // Create the checkbox element
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";

   // Create the slider span element
        let slider = document.createElement("span");
        slider.classList.add("slider");

   // Append the checkbox and slider to the label
        label.appendChild(checkbox);
        label.appendChild(slider);
    
   // Add event listener to handle state change
        checkbox.addEventListener("change", function(e) {
          if (e.target.checked) {
          slider.style.backgroundColor = "red";
          console.log(e.target);
          startAlarm(e);

          } else {
            slider.style.backgroundColor = "#ccc";
            slider.style.transform = "translateX(0)";
            stopAlarm(e);
              }
          });
   
   //--------Display delete button
    let deleteButton = document.createElement("button");
         deleteButton.innerHTML = `<i class="fa-solid fa-trash-o"></i>`;
         deleteButton.setAttribute("id","deleteButton");
         deleteButton.addEventListener("click", (e) => deleteAlarm(e));
               

   // Create an "li" node and combining all above in single line--
     const node = document.createElement("li");
   // Append alarmDiv to the "li" node:
    alarmDiv.appendChild(textnode);
    alarmDiv.appendChild(label);
    alarmDiv.appendChild(deleteButton); 
    node.appendChild(alarmDiv);
   // Append the "li" node to the list:
     document.getElementById("myList").appendChild(node);

}//<-----< end of displayAlarm fxn---



function alarmFxn(){
  //  --Taking the input from user---
      let hourInput = document.getElementById("hourSelect").value;
      let minuteInput = document.getElementById("minuteSelect").value;
      let meridianInput = document.getElementById("meridian").value;

      hourInput=appendZero(hourInput);
      minuteInput=appendZero(minuteInput);
// Making an alarmObject including all info enterd by user and push it into an array ---
      let alarmObj = {};
             alarmObj.id = hourInput + "_" + minuteInput + "_" +meridianInput ;
             alarmObj.alarmHour = hourInput;
             alarmObj.alarmMinute = minuteInput;
             alarmObj.meridianInput = meridianInput;

             alarmObj.isActive = false;
             console.log(alarmObj);
             alarmObj.index = alarmIndex+1;
            //  console.log(alarmObj.index);
             alarmIndex++;
             alarmsArray.push(alarmObj);
             displayAlarm(alarmObj);
             hourInput.value = appendZero(initialHour);
             minuteInput.value = appendZero(initialMinute);
       
     }//<-----alarmFxn end--<




  //fxn for slider button if it on then ---Start Alarm 
  //only work for this fxn is to make the status active of an alarm object
  const startAlarm = (e) => {
      //retriving alarmDiv info which we make above by taking an unique id from data-id attribute
        let searchId = e.target.parentElement.parentElement.getAttribute("data-id");
        //e.target represent checkbox ,e.target.parentElement =label , e.target.parentElement.parentElement=alarmDiv
        // alarmDiv has an attribute named data-id which contain "id" of alarmObj which is entred.
        // console.log(searchId);
       let [exists, obj, index] = searchObject("id", searchId);
       if (exists) {
       alarmsArray[index].isActive = true;
       console.log(alarmsArray);
        }
    };

//Stop alarm by slider button by making status active false and also pause the alarm ringtone
const stopAlarm = (e) => {
  let searchId = e.target.parentElement.parentElement.getAttribute("data-id");
  let [exists, obj, index] = searchObject("id", searchId);
  if (exists) {
    alarmsArray[index].isActive = false;
    alarmSound.pause();
  }
};

//delete alarm by delete button 
const deleteAlarm = (e) => {
  let searchId = e.target.parentElement.parentElement.getAttribute("data-id");
  let [exists, obj, index] = searchObject("id", searchId);
  if (exists) {
    e.target.parentElement.parentElement.parentElement.remove(); //removing from "li" node As alarmDiv parent = li
    alarmsArray.splice(index, 1);// removing from array
  }
};






  


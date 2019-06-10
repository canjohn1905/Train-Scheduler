
var firebaseConfig = {
    apiKey: "AIzaSyBNLImv4LvZO_Jb_3uw8P7o1D3_b3Jhqe4",
    authDomain: "test-app-e0280.firebaseapp.com",
    databaseURL: "https://test-app-e0280.firebaseio.com",
    projectId: "test-app-e0280",
    storageBucket: "test-app-e0280.appspot.com",
    messagingSenderId: "1067505615102",
    appId: "1:1067505615102:web:ee7b7c1d36de23bd"
  };

  
  firebase.initializeApp(firebaseConfig);
  
  var database = firebase.database();
  
  // 2. Button for adding Employees
  $("#add-employee-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#Destination-input").val().trim();
    var firstTrainTime = $("#time-input").val().trim();
    var frequency = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding employee data
    var newEmp = {
      trainName: trainName,
      destination: destination,
      firstTrainTime: firstTrainTime,
      frequency: frequency
    };
  
    // Uploads employee data to the database
    database.ref().push(newEmp);
    
  
    alert("Employee successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#Destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().firstTrainTime;
    var frequency = childSnapshot.val().frequency;
  
  
    
    // Prettify the employee start
    var empStartPretty = moment.unix(firstTrainTime).format("MM/DD/YYYY");
  
    // Calculate the months worked using hardcore math
    // To calculate the months worked
    var empMonths = moment().diff(moment(firstTrainTime, "X"), "months");
    
  
    // Calculate the total billed rate
    var empBilled = empMonths * frequency;
   
    
    //do the calculation here
    var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    var currentTime = moment();

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % frequency;
    var tMinutesTillTrain = frequency - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes")
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      $("<td>").text(nextTrain.format("HH:mm")),
      $("<td>").text(tMinutesTillTrain),
      
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
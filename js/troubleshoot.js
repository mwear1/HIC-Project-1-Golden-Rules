const questionSelect = document.querySelector("#questionSelect");
const screen1Select = document.querySelector("#soundScreen");
const screen2Select = document.querySelector("#fixScreen");
const internet1Select = document.querySelector("#powerRouter");
const internet2Select = document.querySelector("#fixRouter");
const heat1Select = document.querySelector("#cleanHeat");
const heat2Select = document.querySelector("#fixHeat");
let success = document.getElementById("success");
let fail = document.getElementById("fail");
let screen1 = document.getElementById("screen1");
let screen2 = document.getElementById("screen2");
let internet1 = document.getElementById("internet1");
let internet2 = document.getElementById("internet2");
let heat1 = document.getElementById("heat1");
let heat2 = document.getElementById("heat2");

// Update troubleshooting steps whenever the user makes a selection.
questionSelect.addEventListener("change", selectQuestion);

screen1Select.addEventListener("change", selectQuestion);
screen2Select.addEventListener("change", selectQuestion);

internet1Select.addEventListener("change", selectQuestion);
internet2Select.addEventListener("change", selectQuestion);

heat1Select.addEventListener("change", selectQuestion);
heat2Select.addEventListener("change", selectQuestion);


// Hide all troubleshooting steps until an issue is selected.
selectQuestion();

function selectQuestion(){
    var selectedQuestion = questionSelect.value;

    if (selectedQuestion === "screen"){
        hide();
        troubleshootScreen();
    }
    else if (selectedQuestion === "internet"){
        hide();
        troubleshootInternet();
    }
    else if (selectedQuestion === "heat"){
        hide();
        troubleshootHeat();
    }
    else {
        hide();
    }
}

function hide(){
    success.style.display = "none";
    fail.style.display = "none";
    screen1.style.display = "none";
    screen2.style.display = "none";
    internet1.style.display = "none";
    internet2.style.display = "none";
    heat1.style.display = "none";
    heat2.style.display = "none";
}

function troubleshootScreen(){
    screen1.style.display = "block";
    
    const selectedScreen1 = screen1Select.value;
    const selectedScreen2 = screen2Select.value;

    if (selectedScreen1 === "yes"){
        fail.style.display = "block";
        
    }
    if (selectedScreen1 === "no"){
        screen2.style.display = "block";
        
        if (selectedScreen2 === "yes"){
            success.style.display = "block";
            
        }
        if (selectedScreen2 === "no"){
            fail.style.display = "block";
            
        }
    }
}

function troubleshootInternet(){
    internet1.style.display = "block";
    
    const selectedInternet1 = internet1Select.value;
    const selectedInternet2 = internet2Select.value;
    
    if (selectedInternet1 === "yes"){
        fail.style.display = "block";
        
    }
    if (selectedInternet1 === "no"){
        internet2.style.display = "block";
        
        if (selectedInternet2 === "yes"){
            success.style.display = "block";
            
        }
        if (selectedInternet2 === "no"){
            fail.style.display = "block";
            
        }
    }
}

function troubleshootHeat(){
    heat1.style.display = "block";
    
    const selectedHeat1 = heat1Select.value;
    const selectedHeat2 = heat2Select.value;

    if (selectedHeat1 === "yes"){
        fail.style.display = "block";
        
    }
    if (selectedHeat1 === "no"){
        heat2.style.display = "block";
        
        if (selectedHeat2 === "yes"){
            success.style.display = "block";
            
        }
        if (selectedHeat2 === "no"){
            fail.style.display = "block";
            
        }
    }
}

selectQuestion();


let currentSelected='';//global variable to know what recipe is selected
let recipeIds=[];
let apiURL = "https://8000-leitefrancisco-iwaca2-ds1i9le2eia.ws-eu45.gitpod.io/recipes/";

//refreshes the page after adding or editing a recipe
function refresh_page(){
    $("#middle").html("");
    getTitles();
}

//adds a new row to add more ingredients
function add_new_row(){
    $("#ingredients-row").append('<input type="text" class="form-control">')
};

//delete last ingredient row in the array
function delete_last_ingredient_row(){
    var list = document.getElementById("ingredients-row");
    list.removeChild(list.childNodes[list.childNodes.length -1]);
};

//opens the recipe clicked on the left menu
function open_recipe(recipeId){
    $("#middle").empty();
    draw_recipe(recipeId);
    currentSelected = recipeId;
    console.log(currentSelected+"oppaaaaaaaa");
};

//opens a form in blank to add a new recipe
function add_new_recipe(){
    $("#middle").empty();
    currentSelected = '';
    let strHtml =   "<form class = 'ingredients-form'>"+//renders the html to the "middle div" in the index.html
        "<label for='recipe-name' class='form-label'>Recipe Name:</label>"+
        "<input type='text' class='form-control' id='recipe-title'>"+
        "<div class='mb-3'>"+
        "<label class='form-label'>Ingredients:</label>"+
        "<div id = 'ingredients-row' class='col-4'>"+
        "<input type='text' class='form-control'>"+
        "</div>"+
        "<button id = 'btnRemoveRow' type='button' class='btn btn-warning' style= 'float:right' onclick='delete_last_ingredient_row()'> Remove Last Ingredient Row </button>"+
        "<button id = 'btnAddRow' type='button' class='btn btn-info' style='float: right' onclick='add_new_row()'>Add Ingredient Row</button>"+
        "</div>"+
        "<div class='mb-3'>"+
        "<label for='recipe-Instructions' class='form-label'>Instructions:</label>"+
        "<div id = 'instructions-row'>"+
        "<textarea type  = 'text' class='form-control' id='recipe-instructions' rows='5' ></textarea>"+
        "</div>"+
        "</div>"+
        "<input id='recipe-id' type='hidden' value=''/>"+
        "<button type='button' class='btn btn-primary' onclick ='saveNewRecipe()' >Save Recipe</button>"+
        "</form>";
    $("#middle").append(strHtml);

};

//opens a form with the current recipe selected so the user can edit it
function edit_recipe(){
    if(!currentSelected == ''){
        $("#middle").empty();
        
        
            let url = apiURL + currentSelected;
        
        fetch(url)
        .then(function (response){
            return response.json();
        })
        .then(function(rec){
        
            //$("#middle").append(html);
            console.log(rec);

            let ingredients = rec.ingredients;//renders the form with the information from the json received
            let strHtml = "<form class = 'ingredients-form'>"+
                "<label for='recipe-title' class='form-label'>Recipe Title:</label>"+
                "<div id = 'recipeName-row' class='col-8'></div>"+
                "<input type='text' class='form-control' id='recipe-title' value = '"+rec.title+"'>"+
                "</div>"+
                "<div class='mb-3'>"+
                "<label class='form-label'>Ingredients</label>"+
                "<div id = 'ingredients-row' class='col-4'>";

            for(let i=0; i < ingredients.length;i++){
                strHtml +="<input type='text' class='form-control ' value = '"+ingredients[i]+"'>";
            }

            strHtml += "</div>"+
                "<button id = 'btnRemoveRow' type='button' class='btn btn-warning' style= 'float:right' onclick='delete_last_ingredient_row()'> Remove Last Ingredient Row  </button>"+
                "<button id = 'btnAddRow' type='button' class='btn btn-info' style='float: right' onclick='add_new_row()'>Add Ingredient Row</button>"+
                "</div>"+
                "<div class='mb-3'>"+
                "<label for='recipe-Instructions' class='form-label'>Instructions:</label>"+
                "<div id = 'instructions-row'>"+
                "<textarea type  = 'text' class='form-control' id='recipe-instructions' rows='5' >"+rec.instructions.replace(/\\n/g, "\n")+"</textarea>"+
                "</div>"+
                "</div>"+
                "<input id='recipe-id' type='hidden' value='" + rec.id + "'/>"+
                "<button type='button' class='btn btn-primary' onclick= 'saveExistingRecipe()'>Save Recipe</button>"+
                "</form>";
            $("#middle").append(strHtml);

        }).catch(function (err){
            console.log(err);
        }); 
    }else{
        alert("No recipe selected")
    }

};

//draws the recipe to the middle div in the index html
function draw_recipe(recipeId){
    
    let url = apiURL + recipeId;
    
    fetch(url)
    .then(function (response){
        return response.json();
    })
    .then(function(rec){
    
        let ingredients = rec.ingredients;
        let strHtml = "<div class='row'>"+
        "<div class='col'>"+
        "<h1>"+rec.title+"</h1>"+
        "<h2>Ingredients</h2>"+
        "<ul>"

        for(var i=0; i < ingredients.length;i++){  //add each ingredient to the div
            strHtml += "<li>" + ingredients[i] + "</li>";
        }

        strHtml+="</ul>"+
            "<h2>Instructions</h2>"+
            "<p>"+ rec.instructions.replace(/\\n/g, "<br />"); +"</p>"
        "</div>"

        $("#middle").append(strHtml);

    }).catch(function (err){
        console.log(err);
    }); 

};

//deletes the current recipe
function delete_recipe(){


    if(!currentSelected == ''){
        if(confirm("Delete Current Recipe?")){
    
            fetch(apiURL+currentSelected,{
                method: 'delete',
            }).then(response => response.json()) 
            .then(json => {
                console.log(json)
                newID =json._id ;
            })
            .catch(err => console.log(err));
            
            
            document.getElementById("titleOf"+currentSelected).remove();
            
            recipeIds.splice(recipeIds.indexOf(currentSelected));
            $("#middle").empty();
            currentSelected ='';
            }
    
    }
    else{
        alert("No recipe selected")
    }
    
};

//saves the new recipe or the editted recipe in the xml file  the server knows by the id of the recipe if it is a edition or an add
function saveNewRecipe() {
    var jsonToAdd = getFields();
    let obj = JSON.parse(jsonToAdd)
    console.log(jsonToAdd)

    
    if(jsonToAdd == null){
        alert("please fill TITLE, INSTRUCTIONS and have at leas one INGREDIENT");
        return;
    }
    
    let newID = '';
    
    fetch(apiURL,{
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(obj)
    }).then(response => response.json()) 
    .then(json => {
        console.log(json)
        newID =json._id ;
    })
    .catch(err => console.log(err));
    
    
    getTitles();
    $("#middle").empty();
    currentSelected='';
    
   
}

function saveExistingRecipe(){
    var jsonToAdd = getFields();
    console.log(jsonToAdd);
    let obj = JSON.parse(jsonToAdd)
    console.log(jsonToAdd)

    
    if(jsonToAdd == null){
        alert("please fill TITLE, INSTRUCTIONS and have at leas one INGREDIENT");
        return;
    }
    
    
    
    fetch(apiURL+currentSelected,{
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(obj)
    }).then(response => response.json()) 
    .then(json =>{
        console.log(json);
        document.getElementById("titleOf"+currentSelected).innerHTML = json.title ;
    }).catch(err => console.log(err));
    open_recipe(currentSelected);
    
    

    // recipeIds.splice(recipeIds.indexOf(currentSelected));
    // getTitles();
    
   
}

//gets the information in the fields and parses it to a json format
function getFields(){

    var instructions = document.getElementById("recipe-instructions").value;
    var list = document.querySelectorAll("#ingredients-row > input");
    var ingredients =[];
    var title = document.getElementById("recipe-title").value.trim();

    if (list != null && list.length>0){
        for (var i = 0; i<list.length ; i++){
            eachElement = list[i].value;
            ingredients.push(eachElement);
        }
    }
    var strJSON = '{'+
        
        '"title":"' + title + '",'+
        '"ingredients":[';

    for(var i = 0 ;i<ingredients.length;i++){
        if(ingredients[i]!=''&& !ingredients[i].empty){
            strJSON +='"'+ ingredients[i].trim()+'"'
            if(i<ingredients.length-1){
                strJSON +=','
            }
        }
    }

    if(strJSON.endsWith(',')){
        strJSON = strJSON.slice(0,strJSON.length -1);
    }

    strJSON+='],'+
        '"instructions":"'+instructions+'"}';


    if(title == '' ||instructions == ''|| ingredients.length==0){  //returns null if some field is missing
        return null;
    }
    else{
        console.log(strJSON);
        return strJSON.replace(/\n/g, "\\\\n").replace(/\r/g, "\\\\r").replace(/\t/g, "\\\\t");
        
    }

}

//fetch the all the recipes from the API and adds to the available recipes section in the left menu 
function getTitles(){
    
    fetch(apiURL)
    .then(function (response){
        return response.json();
    })
    .then(function(data){
        for (var i = 0; i< data.length ; i++ ){
            var id = data[i]._id;
            if(!recipeIds.includes(id)){
            document.getElementById("menu-recipes").innerHTML +=
            "<li id='titleOf"+id+"' onclick= \"open_recipe('"+id+"')\">" + data[i].title+"</li>"
            recipeIds.push(id);
            }
        
        }
    }).catch(function (err){
        console.log(err);
    }); 
    console.log(recipeIds);

};

//when the document finishes loading , get the titles of the available recipes 
$(document).ready(function(){
    getTitles();
});
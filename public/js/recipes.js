var currentSelected='';//global variable to know what recipe is selected
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
};
//opens a form in blank to add a new recipe
function add_new_recipe(){
    $("#middle").empty();
    currentSelected = '';
    let strHtml =   "<form class = 'ingredients-form'>"+//renders the html to the "middle div" in the index.html
        "<label for='recipe-name' class='form-label'>Recipe Name:</label>"+
        "<input type='text' class='form-control' id='recipe-name'>"+
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
        "<button type='button' class='btn btn-primary' onclick ='save()' >Save Recipe</button>"+
        "</form>";
    $("#middle").append(strHtml);

};
//opens a form with the current recipe selected so the user can edit it
function edit_recipe(){
    $("#middle").empty();
    $.getHTMLuncached = function(url) {
        return $.ajax({
            url: url,
            data: "id="+ currentSelected,
            type: 'GET',
            cache: false,
            success: function(rec) {

                //$("#middle").append(html);
                console.log(rec);

                let ingredients = rec.ingredients[0].ingredient;//renders the form with the information from the json received
                let strHtml = "<form class = 'ingredients-form'>"+
                    "<label for='recipe-name' class='form-label'>Recipe Name:</label>"+
                    "<div id = 'recipeName-row' class='col-8'></div>"+
                    "<input type='text' class='form-control' id='recipe-name' value = '"+rec.title+"'>"+
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
                    "<textarea type  = 'text' class='form-control' id='recipe-instructions' rows='5' >"+rec.instructions+"</textarea>"+
                    "</div>"+
                    "</div>"+
                    "<input id='recipe-id' type='hidden' value='" + rec.id + "'/>"+
                    "<button type='button' class='btn btn-primary' onclick= 'save()'>Save Recipe</button>"+
                    "</form>";
                $("#middle").append(strHtml);

            },
            error: function(r) {
                console.log("Error " + r.responseText);
            }
        });
    };
    $.getHTMLuncached("/get/recipe");

};
//draws the recipe to the middle div in the index html
function draw_recipe(recipeId){
    $.getHTMLuncached = function(url) {
        return $.ajax({
            url: url,
            data: "id="+ recipeId,
            type: 'GET',
            cache: false,
            success: function(rec) {


                console.log(rec);

                let ingredients = rec.ingredients[0].ingredient;
                let strHtml = "<div class='row'>"+
                    "<div class='col'>"+
                    "<h1>"+rec.title+"</h1>"+
                    "<h2>Ingredients</h2>"+
                    "<ul>"

                for(let i=0; i < ingredients.length;i++){  //add each ingredient to the div
                    strHtml += "<li>" + ingredients[i] + "</li>";
                }

                strHtml+="</ul>"+
                    "<h2>Instructions</h2>"+
                    "<p>"+ rec.instructions +"</p>"
                "</div>"

                $("#middle").append(strHtml);

            },
            error: function(r) {
                console.log("Error " + r.responseText);
            }
        });
    };
    $.getHTMLuncached("/get/recipe");
};
//deletes the current recipe
function delete_recipe(){

    $.delete = function(url) {
        $.ajax(
            {
                url: url,
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                data: '{"id": "' + currentSelected + '"}', //whenever you open a recipe, its id is stored in the global variable currentSelected
                cache:false,
                success: setTimeout(refresh_page,1000)

            }
        )
    };
    $.delete('/post/delete');

};
//saves the new recipe or the editted recipe in the xml file  the server knows by the id of the recipe if it is a edition or an add
function save() {
    var jsonToAdd = getFields();
    if (jsonToAdd == null){
        alert("please fill all the fields and have at least one ingredient")//make sure the fields are filled
    }
    else{
        if(jsonToAdd != String.empty){
            $.add = function (url) {
                $.ajax(
                    {
                        url: url,
                        type: 'POST',
                        dataType: 'json',
                        contentType: 'application/json',
                        data:  jsonToAdd,
                        success: setTimeout(refresh_page, 2000)
                    }
                )
            };
            $.add('/post/add-or-update');
        }
    }
};
//gets the information in the fields and transforms it into a json format
function getFields(){

    var recipe_id = document.getElementById("recipe-id").value.trim();
    var title = document.getElementById("recipe-name").value.trim();
    var instructions = document.getElementById("recipe-instructions").value;
    var list = document.querySelectorAll("#ingredients-row > input");
    var ingredients =[]
    if (list != null && list.length>0){
        for (var i = 0; i<list.length ; i++){
            eachElement = list[i].value;
            ingredients.push(eachElement);
        }
    }
    var strJSON = '{'+
        '"recipe":{'+
        '"title": "' + title.trim() + '",'+
        '"id":"'+ recipe_id + '",'+
        '"ingredients":{'+
        '"ingredient":[';

    for(var i = 0 ;i<ingredients.length;i++){
        if(ingredients[i]!=''&& !ingredients[i].empty){
            strJSON +='"'+ ingredients[i].trim()+'"'
            if(i<ingredients.length-1){
                strJSON +=','
            }
        }
    }

    for(var i = 0; i<ingredients.length; i++){
        console.log(ingredients[i])
    }

    strJSON+=']},'+
        '"instructions" :"'+instructions+'"}}';

    if(title== '' ||instructions ==''||ingredients.length==0){ //returns null if some field is missing
        return null;
    }
    else{
        return strJSON;
    }

}
//gets the titles from the xml file and uses the xsl file to get only the titles and transform from xml to html
// function getTitles(){
//     $("#menu-recipes").empty();
//     $.getHTMLuncached = function(url) {
//         return $.ajax({
//             url: url,
//             type: 'GET',
//             cache: false,
//             success: function(html) {
//                 $("#menu-recipes").append(html);
//             }
//         });
//     };
//     $.getHTMLuncached("/get/recipes-titles");
// };
// //when the document finishes loading , get the titles of the available recipes
// $(document).ready(function(){
//     getTitles();
// });
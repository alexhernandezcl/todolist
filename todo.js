//Objeto principal de TODOs
var todo = {
    list: []
};

/*
todo.list = []; //Arreglo que almacena los todo
*/
todo.add = function(td) {
    //Agrega un item nuevo a la lista
    var id = parseInt(Math.random() * 10000000);
    todo.list.push({ todoID: "L" + id, todoText: td });
    todo.renderList();
}
todo.renderList = function() {
    //Muestra la lista de TODO
    var tplLI = '<li id="{{todoID}}" class="{{todoClass}}">' +
        '<input type="checkbox" name="check_{{todoID}}" />' +
        ' <span>{{todoText}}</span></li>';
    $("#todoList").empty();
    if(todo.list){
    for (var x = 0; x < todo.list.length; x++) {
        var elemento = todo.list[x];
        var newLI = tplLI;
        newLI = newLI.replace(/{{todoID}}/g, elemento.todoID);
        newLI = newLI.replace("{{todoText}}", elemento.todoText);
        if (elemento.check) {
            newLI = newLI.replace("{{todoClass}}", "check");
        }

        $("#todoList").append(newLI);
    }

    $("#todoList  input[type='checkbox']").on("click", function() {
        var p = $(this).parent();
        var elID = $(p).attr("id");
        $(p).addClass("check");

        var elemento = $.grep(todo.list, function(el, id) {
            return el.todoID == elID;
        });
        elemento[0].check = true;

        todo.renderList();

    });

    localStorage.setItem("todoList", JSON.stringify(todo.list));
    }
}
todo.check = function(id) {
    //Marca una tarea como realizada
}
todo.uncheck = function(id) {
    //Desmarca una tarea como realizada
}


todo.init = function() {
    todo.list = JSON.parse(localStorage.getItem("todoList")) || [];
    console.log(todo.list);
    todo.renderList();
    $("#btnAddTodo").on("click", function() {
        var txt = $("#newTodo").val();
        if (txt.trim() != "") {
            todo.add(txt);
            $("#newTodo").val("");
        } else {
            alert("Ingrese una tarea a realizar");
        }
    });
}

todo.init();

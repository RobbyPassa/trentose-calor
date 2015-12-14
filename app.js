/* your code should go here */

var CalorModel = {
 
    init: function() {
        this.data = data;
    },
        
//    getMinTemperature: function(day) {
//        var newTemp = 100;
//        console.log(newTemp);
//        var Position = parseInt(day);
//        for (var i = 0; i < 4; i++){
//            if (this.data.day[Position+i] < newTemp){
//                newTemp = this.data.day[Position+i];
//            }
//        }
//        
//        return newTemp; 
//    },
    
    getMaxTemperature: function(day) {
        var newTemp = 0;
        var Position = parseInt(day);
        for (var i = 0; i < 4; i++){
            if (this.data[Position+i].temperature > newTemp){
                newTemp = this.data[Position+i].temperature;
            }
        }
        console.log(newTemp);
        return newTemp;
    }

};

var CalorControl = {
    
    init: function() {
        CalorModel.init();
        CalorView.init();
        
        
    },
    
    calcolaPos: function(pos){
		return pos*4;
	},
    
	calcolaDay: function(pos){
		return data[pos].day;
	},
    
    getCondition: function(pos){
        return data[pos].condition; 
    },    
    
    getMinTemperature: function(pos){
        var newTemp = 100;
        console.log(newTemp);
        var Position = parseInt(pos);
        console.log(Position);
        for (var i = 0; i < 4; i++){
            if (data[Position + i].temperature < newTemp){
                newTemp = data[Position + i].temperature;
            }
        }
        
        return newTemp;
    },
    
    getMaxTemperature: function(pos){
        return CalorModel.getMaxTemperature(pos);   
    }
};

var CalorView = {
    
    init: function() {
        
        $("#btn-filter").on("click" ,function(){
            //metto dentro a city il testo html della cosa che seleziono
            var city = $("#SelectCity").find(":selected").text();
            //confronto se city è = a Trento, Rovereto, o a nessuna delle due
            if(city == "Trento"){
                $("#summary").empty();
                CalorView.render("0");
                CalorView.render("2");
                CalorView.render("4");
                CalorView.render("6");  

            }
            else if (city == "Rovereto"){
                $('#summary').empty();
                CalorView.render("1");
                CalorView.render("3");
                CalorView.render("5");
                CalorView.render("7");                 
            }
            else{
                alert("No city selected!");
            }
        });
    },
    
    render: function(data) {
        
        console.log(data);
         
        var pos = CalorControl.calcolaPos(data)
        var giorno = CalorControl.calcolaDay(pos);
        var minimo = CalorControl.getMinTemperature(pos);
        var massimo = CalorControl.getMaxTemperature(pos);
        var condizione = CalorControl.getCondition(pos);
            
        
        for(var i = 0; i < data.length / 4; i++){    
              
            $('#summary').append(
            "<li>" + 
                "<div class='icon'>" + 
                    "<img src=img/icons/" + condizione + ".png>" +
                "</div>" + 
                    "<div class='stats'"+i+">" + 
                        "<h2>" + giorno + "</h2>" +
                        "<strong>min: </strong>" + minimo + "ºC" + 
                        "<strong> max: </strong>" + massimo + "ºC" + 
                "</div>" +
            "</li>");
        }
    }
};

$(document).ready(function(){
  CalorControl.init();
});


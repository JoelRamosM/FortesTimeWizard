angular.module('app.services')

.factory("CalculaDatasService",function(){
   
    return{
            areEquals : function(dt1,dt2){
                if(moment.isMoment(dt1) && moment.isMoment(dt2)){;
                   var comparer = moment(dt1.format("DD/MM/YYYY HH:mm:ss"),["DD/MM/YYYY HH:mm:ss"]) ;    
                   var toCompare = moment(dt2.format("DD/MM/YYYY HH:mm:ss"),["DD/MM/YYYY HH:mm:ss"]);     
                    return comparer.isSame(toCompare);
                    }
                else throw Error("Isn't moment object.");
            },
            getDiff:function(dt1,dt2){
                if(moment.isMoment(dt1) && moment.isMoment(dt2)){;
                    var difference = dt1.diff(dt2);
                    var momentDiff = moment.utc(difference);
                    return moment(momentDiff.format("HH:mm:ss"),["HH:mm:ss"]);
                    }
                else throw Error("Isn't moment object.");
            }
    };

});

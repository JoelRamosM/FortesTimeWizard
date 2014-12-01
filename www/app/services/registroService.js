angular.module('app.services', [])
/*
    Serviço que faz o acesso WebApi
*/

.factory("RegistroService",function($http,CalculaDatasService){
       
    return{
        
        getRegistrosHoje: function(pis){
            var url="http://fortesponto.azurewebsites.net/api/Lancamentos/"+pis+"/hoje";
                return $http.get(url);                    
        },
        getRegistrosFiltro: function(pis,date){
            var url="http://fortesponto.azurewebsites.net/api/Lancamentos/"+pis+"/"+date;
                return $http.get(url);                    
        },
        getProximaQuebra: function(pis){
            var url="http://fortesponto.azurewebsites.net/api/Regras/"+pis+"/ProximaQuebra";
                return $http.get(url);                    
        },
        getTurnos : function(registros){
            var Turnos =[];
            if(registros.length>0)
                registros.forEach(function(h,index){
                    if(h.sentido ==="Saida"){            
                        var diff = CalculaDatasService.getDiff(h.data,registros[index-1].data);
                        var turno = {
                            flotHrsTrabalhadas : a.asHours(),
                            dif:diff,
                            horasTrabalhadasStr : diff.format("HH:mm")
                            }
                    Turnos.push(turno);            
                    }
                })            
            return Turnos;        
      },
        getIntervalos : function(registros){
            var Intervalos = [];
            if(registros.length>0)
                registros.forEach(function(h,index){
                    if(h.sentido==="Entrada"&&index!==0){
                        var diff = h.data.diff(registros[index-1].data);
                        var a = moment.duration(diff);
                        var diff = moment.utc(diff);
                        var intervalo = {
                            flotHrsIntervalo : a.asHours(),
                            dif: diff,
                            horasIntervaloStr :diff.format("HH:mm")
                        }
                        Intervalos.push(intervalo);
                    }
                })          
            return Intervalos;
        },
        getProximaQuebraFake: function(){
            return {Hora : moment().add(2,"minute"),Mensagem: "Teste"};
            
        },
     
        
        getRegistrosHojeFake:function(){            
            
            var retorno = [{sentido:"Entrada",
                            data: moment("08:00",["HH:mm"]),
                            hora:  moment("08:00",["HH:mm"]).format("HH:mm")},
                           {sentido:"Saida",
                            data: moment("11:37",["HH:mm"]),
                            hora:  moment("11:37",["HH:mm"]).format("HH:mm")},
                           {sentido:"Entrada",
                            data: moment("13:00",["HH:mm"]),
                            hora:  moment("13:00",["HH:mm"]).format("HH:mm")},
//                           {sentido:"Saida",
//                            data: moment("17:00",["HH:mm"]),
//                            hora:  moment("17:00",["HH:mm"]).format("HH:mm")},
//                          
            ];
            return retorno;
        }
       
    };
    
});
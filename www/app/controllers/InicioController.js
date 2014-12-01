angular.module('app.controllers',["ngCordova"])
.controller('InicioCtrl', function($scope,$interval,RegistroService,NotificaService,CalculaDatasService) {
    $scope.now = moment();    
    $interval(function(){
        $scope.now = moment();
    },1000)
    $scope.$watch("now",function(nValue,oValue){
        if($scope.dadosInicio.horasDoTurno){
            $scope.dadosInicio.horasDoTurno.add(1,"second");
            $scope.dadosInicio.totalTrabalhado.add(1,"second");
        }   
        if($scope.dadosInicio.proximaQuebra){
            if($scope.dadosInicio.proximaQuebra.Hora.isAfter(nValue))
                $scope.dadosInicio.proximaQuebra.Timer.add(-1,"second");
            if(CalculaDatasService.areEquals($scope.dadosInicio.proximaQuebra.Hora,nValue)){
                $scope.Alert = true;
                $scope.dadosInicio.proximaQuebra = null;                
                NotificaService.notify();
            }
        }
           
    });    
    var pis = localStorage.getItem("pis");    
    var registros = RegistroService.getRegistrosHojeFake(pis);    
    var Turnos =RegistroService.getTurnos(registros);
    var Intervalos=RegistroService.getIntervalos(registros);
    var entradaEmAberto;
    if(registros.length>0){
        registros.forEach(function(h,index){
            if(h.sentido ==="Entrada"&&!registros[index+1]){
                entradaEmAberto = h;
            }
        });
    }    
    var totalTrabalhando;
    if(entradaEmAberto){
        var now = moment();
        var difNow = now.diff(entradaEmAberto.data);
        var trabalhando = moment.utc(difNow);
        totalTrabalhando = trabalhando;
        
    }
    var totalTrabalhado=0;
    var totalIntervalos =0;
    Turnos.forEach(function(t){
        totalTrabalhado+=t.dif;
    });
    Intervalos.forEach(function(i){
        totalIntervalos+=i.dif;
    });
    var momentTrabalhadas = totalTrabalhado > 0? moment.utc(totalTrabalhado): totalTrabalhando;
    var momentIntervalos = totalIntervalos > 0? moment.utc(totalIntervalos):{};
    var proximaQuebra;
    
//    RegistroService.getProximaQuebra(pis).success(function(data){
//            var date =  moment(data.Hora,["YYYY-MM-DD HH:mm:ss"]);
//            proximaQuebra= {Hora : date,Timer:moment.utc(date.dif(moment())) ,Mensagem: data.Mensagem};
//        NotificaService.addNotification();
//        
//    });
    if(!proximaQuebra){
        proximaQuebra = RegistroService.getProximaQuebraFake();    
        var teste = proximaQuebra.Hora.diff(now);
        proximaQuebra.Timer = moment.utc(teste);
    }
    
    $scope.dadosInicio ={totalTrabalhado:momentTrabalhadas,
                         totalIntarvalos:momentIntervalos,
                         horasDoTurno:totalTrabalhando,
                         proximaQuebra:proximaQuebra};
  
})
angular.module('app.controllers')
.controller('RegistroCtrl', function($http,$scope,$location,$ionicModal,$ionicLoading,$ionicPopup, LancamentosFiltro,LancamentosHoje) {
	
    $scope.data={Filtro:""};
    $scope.data={Dia: new Date().toLocaleDateString()};
    
    var pis = localStorage.getItem("pis")
    $scope.$watch("data.Filtro",function(nValue,oValue){
        if(nValue)
        if(nValue.indexOf('-')>=0){
                var data  = nValue.split('-');
                $scope.data.Dia = data[2]+'/'+data[1]+'/'+data[0];
            }
            else{
                $scope.data.Dia = oValue;
            }
        
    });
    
    
    $scope.showAlert=function(msg){
        var alertBox=$ionicPopup.alert({title:"<h1 class='assertive'><span class='icon ion-alert padding' style='font-size:30px;'></span>Atenção</h1>",template:msg, okType: "button-assertive"});
        
    }
     if(!pis){
        
        $scope.showAlert("Informe seu PIS no menu de Configurações");
        $location.path("/tab/configuracoes");
        localStorage.setItem("redirected",true);
        return;
    }
    //    020727948177
	    
    $scope.Filtrar = function(){
        $scope.lancamentos = [];
        $scope.closeModal();
        var dia = $scope.data.Filtro;
       
        if(dia && dia!== new Date().toLocaleDateString()){            
            $ionicLoading.show({        
                 template: '<h1><i class="icon ion-loading-a"></i></h1>'        
                })       

              var url="http://fortesponto.azurewebsites.net/api/Lancamentos/"+pis+"/"+dia;
                  $http.get(url).then(function(result){
                       var array = result.data;
                      var result = array.map(function(item, rank){
                        return {
                          sentido: (rank % 2) == 0 ? "Entrada" : "Saída",
                          hora: item.DtRegistro.slice(11,16) 
                        };                          
                    })
                  $scope.lancamentos = result;
                  $ionicLoading.hide();
                });
        }
        else{
             $scope.showAlert("Informe uma data para filtrar.");        
        }
    };
    
    $scope.BatidasDeHoje = function(){
        $ionicLoading.show({        
         template: '<h1><i class="icon ion-loading-a"></i></h1> '        
        })
        
        $scope.lancamentos = [];
        var url="http://fortesponto.azurewebsites.net/api/Lancamentos/"+pis+"/hoje";
                $http.get(url).then(function(result){
                    var array = result.data;
                    var result = array.map(function(item, rank){
                        return {
                                sentido: (rank % 2) == 0 ? "Entrada" : "Saída",
                                hora: item.DtRegistro.slice(11,16) 
                                };                          
                            })
                    $scope.data={Dia: new Date().toLocaleDateString()};
                    $scope.lancamentos = result;
                    $ionicLoading.hide();
                });
    }
    
    
     $ionicModal.fromTemplateUrl('modalDate.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
         modal.height= 30;
      });
      $scope.openModal = function() {
        $scope.modal.show();
      };
      $scope.closeModal = function() {
        $scope.modal.hide();
      };    
})

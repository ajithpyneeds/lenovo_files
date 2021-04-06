
    
        $(function(){
            $("#chksend1").change(function(){
                var st = this.checked;
                if(st){
                    $("#txtsend1").prop("disabled",false);
                }else{
                    $("#txtsend1").prop("disabled",true);
                }
            });
        });
   
        $(function(){
            $("#chksend1").change(function(){
                var st = this.checked;
                if(st){
                    $("#txtsend2").prop("disabled",false);
                }else{
                    $("#txtsend2").prop("disabled",true);
                }
            });
        });
   
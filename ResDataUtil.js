
 class ResDataUtil{
     static success(data){
         return {
             resCode : 0,
             resMessage : 'success',
             resData : data
         }
     }

     static fail(code,message){
            return {
                resCode : code,
                resMessage : message,
                resData : null
            }
     }
}


export  default  ResDataUtil;

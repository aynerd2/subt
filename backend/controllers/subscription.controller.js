import Subcription from '../models/subcription.model.js'


export const createSubscription = async (req,res,next)=>{
      try {

            const sub = await Subcription.create({
                  
                  ...req.body,
                  user: req.user._id,
            });
            
      res.status(201).json({
            success:true,
            data: sub
      })
            
      } catch (error) {
            next(error)
      }
}

export const getUserSubscriptions = async (req,res,next) =>{
      try {
            // compare the entered user with the user in the token
      if(req.user.id != req.params.id){
       const error = new Error("You are not the owner of this account")
       error.status = 401;
       throw error;
      }
      const subcription = await Subcription.find({user: req.params.id});
      res.status(200).json({success:true, data:subcription})

      } catch (error) {
            next(error)
      }
}

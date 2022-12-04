const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {check, validationResult} = require('express-validator'); 
// get profile api 
const Profile = require('../model/profile');
const User = require('../model/User');

router.get('/me', auth, async(req, res) => {

  try {
        
      const profile = await Profile.findOne({user: req.user.id}).populate('user', ['name' ,'avatar']);
      if(!profile){
          return res.status(400).json({msg: 'there is nor profile available right now'});

      }
      
      res.json(profile);

    
  } catch (error) {

    console.error(error.message);
    res.status(500).send('Server Error')
  }
});

router.post('/', [auth, [
  check('status', 'Status is required').not().isEmpty(),
  check('skills','Skills is required').not().isEmpty()
 ]
], async(req,res)=>{
   
   const errors = validationResult(req);
   if(!errors.isEmpty()){
       return res.status(400).json({errors: errors.array()});     
   }

  const {
     company,
     website,
     location,
     bio,
     status,
     githubusername,
     skills,
     youtube,
     facebook,
     twitter,
     instagram,
     linkedin
  } = req.body;
  
   const profileFields ={};

    profileFields.user = req.user.id;
    if(company) profileFields.company = company;
    if(website) profileFields.website= website;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    if(status) profileFields.status = status;
    if(githubusername) profileFields.githubusername= githubusername;
    if(skills) {
       profileFields.skills = skills.split(',').map(result => result.trim());
    }
    
    profileFields.social = {};
    if(youtube) profileFields.social.youtube = youtube;
    if(twitter) profileFields.social.twitter = twitter;
    if(facebook) profileFields.social.facebook = facebook;
    if(linkedin) profileFields.social.linkedin = linkedin;
    if(instagram) profileFields.social.instagram = instagram;
    

    try {
       
       let profile = await Profile.findOne({user: req.user.id});
       if(profile){ 
           profile = await Profile.findOneAndUpdate(
             {user: req.user.id},
             {$set: profileFields},
             {new: true}
             );
             return res.json(profile);
       }

       profile = new Profile(profileFields);
       await profile.save();

       res.json(profile);

    } catch (error) {

       console.error(error.message);
      
    }
}
);

router.get('/', auth, async(req,res)=>{
      try {
        
          const profiles = await Profile.find().populate('user',['name','avatar']);

          res.json(profiles);

      } catch (error) {
         console.log(error.message);
      }
})

router.delete('/', auth, async(req,res)=>{

   try {

      await Profile.findOneAndRemove({user: req.user.id});

      await User.findByIdAndRemove(req.user.id);

      res.json({msg:'User Deleted'});
      
   } catch (error) {

       console.error(error.message);
       res.status(400).json({msg: "something went wrong!!"});
      
   }
})

router.put('/experience', [auth, [
  
    check('title', "title is required").not().isEmpty(),
    check('company', "title is required").not().isEmpty(),
    check('from', "title is required").not().isEmpty()
]], async(req,res)=>{

   const errors = validationResult(req);
   if(!errors.isEmpty()){
       return res.status(400).json({errors: errors.array()});     
   }

      const {
         title,
         company,
         location,
         from,
         to,
         current,
         description
      } = req.body


      const exp = {
         title,
         company,
         location,
         from,
         to,
         current,
         description
      }

       try {
            
            const profile = await Profile.findOne({user: req.user.id});
            profile.experience.unshift(exp);

            await profile.save();
            res.json(profile);

          
       } catch(error) {

         console.error(error.message);
         res.status(400).json({msg: 'found nothing'});
          
       }

})

router.delete('/experience/:exp_id', auth, async(req,res)=>{
   
     try {
        
        const profile = await Profile.findOne({user: req.user.id});
        const removeIndex = profile.experience.map(result => result._id).indexOf(req.params.exp_id);
        profile.experience.splice(removeIndex, 1);

        await profile.save;
        res.json(profile);
     } catch (error) {
        console.error(error.message);
        res.status(400).json({msg:'check the console'});
     }
      

})

router.put('/education', [auth,[
    check('school','School is required').not().isEmpty(),
    check('fieldofstudy',"Field of Study is required").not().isEmpty(),
    check('from',"From is required").not().isEmpty()
]],async(req,res)=>{

   const errors = validationResult(req);
   if(!errors.isEmpty()){
       return res.status(400).json({errors: errors.array()});     
   }

     const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
     } = req.body;

     const details = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
     }

     try {

        const profile = await Profile.findOne({user: req.user.id});

        console.log(profile)
         
        profile.education.unshift(details);

        await profile.save();

        res.json(profile);
        
     } catch (error) {
         
        console.error(error.message);
        
     }
        
})


router.delete('/education/:exp_id', auth, async(req,res)=>{
   
   try {
      
      const profile = await Profile.findOne({user: req.user.id});
      const removeIndex = profile.education.map(result => result._id).indexOf(req.params.exp_id);
      profile.education.splice(removeIndex, 1);

      await profile.save;
      res.json(profile);
   } catch (error) {
      console.error(error.message);
      res.status(400).json({msg:'check the console'});
   }
    

})

module.exports = router;

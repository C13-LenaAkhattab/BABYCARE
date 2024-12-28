const RolesModel = require("../models/rolesSchema")

const CreateRole=(req , res)=>{
const {role , permissions}=req.body
const newRole=new RolesModel({role , permissions})
newRole
.save()
.then((result)=>{
    res.status(201).json({
        success:true,
        message: `Role created successfully`,
        role: result
    })

})
.catch((err)=>{
    res.status(400).json({
        success:false,
        message: `Error creating role:  ${err}`
    })
})
}

module.exports=CreateRole
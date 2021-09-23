const {Day,Doctor,Doctorday,Specialist,User} = require("../models")
const {bcryptCheck} = require("../helper/encryptPass")

class Controller{
    static showLandingPage(req,res){
        res.render("landingPage")
    }

    static userLogin(req,res){
        res.render("login")
    }

    static userLoginPost(req,res){
        let {email,password} = req.body

        User.findOne({
            where:{
                email: email
            }
        })
        .then(data=>{
            if(data){//kalo ada yg match
                let checked = bcryptCheck(password,data.password)
                if(checked){
                    console.log('monggo ke home')
                }else{
                    res.send('email or password not found')
                }

            }else{
                res.send('email or password not found')
            }
        })
        .catch(err=>{
            console.log(err)
            res.send(err)
        })
    }


    static userRegister(req,res){
        res.render('registerUser')
    }

    static userRegisterPost(req,res){
        let {nama,birthDate,nik,phone,email,password} = req.body
        // console.log(req.body)
        // res.send('terdater')
        User.create({
            name:nama,
            email:email,
            password:password,
            birthDate:birthDate,
            nik:nik,
            handphone:phone
        })
        .then(data=>{
            res.redirect('/login')
        })
        .catch(err=>{
            if(err.name === 'SequelizeValidationError'){
                let errMsg = err.errors.map(el => el.message)
                res.send(errMsg)
            }else{
                res.send(err)
            }
        })

    }

    static ShowAdminHome(req,res){
        res.render("adminHome")
    }

    static showDoctorList(req,res){
        // res.send("list")
        Doctor.findAll({
            include: Specialist,
        })
        .then(data=>{
            res.render("doctorList", {data})
        })
        .catch(err=>{
            res.send(err)
        })
    }

    static addDoctorGet(req,res){
        Specialist.findAll()
        .then(data=>{
            res.render("formAddDoctor", {data})
        })
        .catch(err=>{
            res.send(err)
        })
    }

    static addDoctorPost(req,res){
        let {nama,foto,biaya,specialist} = req.body
        // res.send("doctor added")
        Doctor.create({
            name:nama,
            fotoDokter:foto,
            biaya:biaya,
            SpecialistId: specialist
        })
        .then(data=>{
            res.redirect('/:Admin/doctors')
        })
        .catch(err=>{
            // console.log(err,"err msg")
            if(err.name === 'SequelizeValidationError'){
                let errMsg = err.errors.map(el => el.message)
                res.send(errMsg)
            }else{
                res.send(err)
            }
        })
    }

    static deleteDoctor(req,res){
        let {doctorId} = req.params

        Doctor.destroy({
            where:{
                id: doctorId
            }
        })
        .then(data=>{
            res.redirect('/:Admin/doctors')
        })
        .catch(err=>{
            res.send(err)
        })
    }

    static editFormGet(req,res){
        let {doctorId} = req.params
        // console.log(doctorId)
        // res.send("edit")
        let doctorData = null
        Doctor.findOne({
            where: {
                id: doctorId
            }
        })
        .then(data=>{
            doctorData = data
            return Specialist.findAll()
        })
        .then(specialist=>{
            res.render("editDoctor", {doctorData,specialist})
        })
        .catch(err=>{
            res.send(err)
        })
    }

    static editFormPost(req,res){
        let {nama,foto,biaya,specialist} = req.body
        let {doctorId} = req.params
        // console.log(req.body,req.params)
        // res.send("edit post")
        Doctor.update({
            name:nama,
            fotoDokter:foto,
            biaya:biaya,
            SpecialistId: specialist
        },{
            where:{
                id: doctorId
            }
        })
        .then(data=>{
            res.redirect('/:Admin/doctors')
        })
        .catch(err=>{
            if(err.name === 'SequelizeValidationError'){
                let errMsg = err.errors.map(el => el.message)
                res.send(errMsg)
            }else{
                res.send(err)
            }
        })
    }
}

module.exports = Controller
const {Day,Doctor,Doctorday,Specialist,User} = require("../models")

class Controller{
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
        // console.log(req.params)
        // res.send('deleted')
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
}

module.exports = Controller
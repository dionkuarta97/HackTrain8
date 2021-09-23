const express = require("express")
const Controller = require("../controllers/controller")
const route = express.Router()



route.get('/:Admin', Controller.ShowAdminHome)

route.get('/:Admin/doctors', Controller.showDoctorList)

route.get('/:Admin/doctors/Add', Controller.addDoctorGet)

route.post('/:Admin/doctors/Add', Controller.addDoctorPost)


module.exports = route 



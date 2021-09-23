const express = require("express")
const Controller = require("../controllers/controller")
const route = express.Router()

route.get('/', Controller.showLandingPage)

route.get('/login', Controller.userLogin)

// route.post('/login', Controller.)

route.get('/register', Controller.userRegister)

route.post('/register', Controller.userRegisterPost)

route.get('/:Admin', Controller.ShowAdminHome)

route.get('/:Admin/doctors', Controller.showDoctorList)

route.get('/:Admin/doctors/Add', Controller.addDoctorGet)

route.post('/:Admin/doctors/Add', Controller.addDoctorPost)

route.get('/:Admin/doctors/Edit/:doctorId', Controller.editFormGet)

route.post('/:Admin/doctors/Edit/:doctorId', Controller.editFormPost)

route.get('/:Admin/doctors/:doctorId', Controller.deleteDoctor)


module.exports = route 



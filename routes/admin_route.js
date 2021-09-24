const express = require("express");
const router = express.Router();
const admin_controller = require("../controllers/admin_controller");

router.get("/", admin_controller.ShowAdminHome);
router.get("/doctors", admin_controller.showDoctorList);

router.get("/doctors/Add", admin_controller.addDoctorGet);

router.post("/doctors/Add", admin_controller.addDoctorPost);

router.get("/doctors/Edit/:doctorId", admin_controller.editFormGet);

router.post("/doctors/Edit/:doctorId", admin_controller.editFormPost);

router.get("/doctors/:doctorId", admin_controller.deleteDoctor);

router.get("/jadwal_dokter", admin_controller.jadwal_docter);
router.get("/jadwal_dokter/add_jadwal", admin_controller.add_jadwal);

router.post("/jadwal_dokter/save_jadwal", admin_controller.save_jadwal);
router.get("/jadwal_dokter/:id", admin_controller.detail_jadwal);

router.get(
  "/jadwal_dokter/delete_jadwal/:DayId/:DoctorId",
  admin_controller.delete_jadwal
);

module.exports = router;

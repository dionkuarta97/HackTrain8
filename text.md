npx sequelize-cli model:generate --name User --attributes name:string,email:string,password:string,birthDate:date,nik:string,handphone:string

npx sequelize-cli model:generate --name Appointment --attributes UserId:integer,DoctorId:integer//

npx sequelize-cli model:generate --name Doctor --attributes name:string,fotoDokter:string,biaya:string

npx sequelize-cli model:generate --name Specialist --attributes name:string

npx sequelize-cli model:generate --name DoctorDay --attributes DoctorId:integer,DayId:integer//

npx sequelize-cli model:generate --name Day --attributes name:string
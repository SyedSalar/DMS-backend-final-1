const db = require("../../models/index");
const DepartmentModel = db.departments;
const SystemLogModel = db.system_logs;
const DepartmentUserAssociation = db.department_user_associations;

module.exports.createDepartment = async (req, res) => {
  try {
    console.log('dept body',req.body);
    console.log(req.body.title);
    
    if(Array.isArray(req.body.title) && Array.isArray(req.body.suffix)){
      console.log(req.body.title.length,req.body.suffix.length);
      var deptArray=req.body.title;
      var deptSuffix=req.body.suffix;
     for (let index = 0; index < deptArray.length; index++) {
      let mySuffix=deptSuffix[index];
      let element = deptArray[index];
      console.log(element)
      req.body.title=element
      req.body.suffix=mySuffix
      console.log(req.body.title,req.body.suffix);
      console.log('check change',req.body);
      req.body.noOfUsers = 0;
      console.log(req.body);
      await DepartmentModel.create(req?.body);
      await SystemLogModel.create({
        companyId: req?.body?.companyId,
        title: `${req?.body?.authorName} Created Department ${req?.body?.title}`,
      });
    } }
    else{
    await DepartmentModel.create(req?.body);
    await SystemLogModel.create({
      companyId: req?.body?.companyId,
      title: `${req?.body?.authorName} Created Department ${req?.body?.title}`,
    });
  }
    return res.status(200).send({ message: "Departments Created" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};
module.exports.associateUserDepartment = async (req, res) => {
  try {
    await DepartmentUserAssociation.create(req?.body);
    console.log(req.body);
    const id = req?.body.departmentId;
    const departmentUpdate = await DepartmentModel.findOne({
      where: { id },
    });
    const updatedDepartment = await departmentUpdate.update({
      noOfUsers: departmentUpdate.noOfUsers + 1,
    });
    console.log(updatedDepartment);
    await SystemLogModel.create({
      companyId: req?.body?.companyId,
      title: `${req?.body?.authorName} associated with Department ${req?.body?.title}`,
    });
    return res.status(200).send({ message: "User associated with Department" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};

module.exports.listDepartments = async (req, res) => {
  try {
    const departments = await DepartmentModel.findAll({
      where: { companyId: req?.query?.companyId },
    });
    return res.status(200).send(departments);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};


module.exports.updateUser = async (req, res) => {
  try {
    const companyId = req?.query?.companyId;

    // Fetch the department
    const department = await DepartmentModel.findOne({
      where: { companyId },
    });

    if (!department) {
      return res.status(404).send({ message: 'Department not found' });
    }

    const updatedDepartment = await department.update({
      noOfUsers: department.noOfUsers + 1,
    });

    return res.status(200).send(updatedDepartment);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};

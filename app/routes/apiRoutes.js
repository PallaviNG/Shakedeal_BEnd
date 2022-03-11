const AssignmentAPIController = require("../controller/AssignmentAPIController");
const TeamAPIController = require("../controller/TeamAPIController");

var router = require("express").Router();

/*get apis*/
router.get("/team", TeamAPIController.home);

router.get("/get-team-list", TeamAPIController.getTeamList);

/*post apis*/
router.post("/get-team-by-id", TeamAPIController.getTeamById);

router.post("/create-new-team", TeamAPIController.createNewTeam);

/*DELETE API*/
router.delete("/delete-team-by-id", TeamAPIController.deleteTeamById);
router.delete("/delete-all-batches", TeamAPIController.deleteAllTeams);

/*Update API*/
router.put("/add-new-member-to-team",TeamAPIController.addNewMemberToTeam);

//TEAM MEMBER API
/*get apis*/

router.get("/get-team-member-list", TeamAPIController.getTeamMemberList);

/*post apis*/
router.post("/get-team-member-by-id", TeamAPIController.getTeamMemberById);

router.post("/create-new-team-member", TeamAPIController.createNewTeamMember);

/*DELETE API*/
router.delete("/delete-team-member-by-id", TeamAPIController.deleteTeamMemberById);
router.delete("/delete-all-team-members", TeamAPIController.deleteAllTeamMembers);

router.put("/assign-task-to-team-member",AssignmentAPIController.assignTaskToMember);


//ASSIGNMENT API
/*get apis*/
router.get("/get-assignment-list", AssignmentAPIController.getAssignmentList);

/*post apis*/
router.post("/get-assignment-by-id", AssignmentAPIController.getAssignmentById);

router.post("/create-new-assignment", AssignmentAPIController.createNewAssignment);

/*DELETE API*/
router.delete("/delete-assignment-by-id", AssignmentAPIController.deleteAssignmentById);
router.delete("/delete-all-assignments", AssignmentAPIController.deleteAllAssignments);


module.exports = router;
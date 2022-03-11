const { AssignmentModel, TeamMemberModel } = require("../model/TeamModel");

const AssignmentAPIController = {
    home: function (req, res) {
        res.send({ status: true, message: "default assignment" });
    },

    createNewAssignment: async function (req, res) {
        var data = req.body;
        console.log(data);
        try {
            const newAssignment = new AssignmentModel({
                assignment_title: data.assignment_title
            });
            const result = await newAssignment.save();
            res
                .status(200)
                .send({ status: true, result, message: "created new assignment" });
        } catch (error) {
            res.status(500).send({ status: false, error: error });
        }
    },

    getAssignmentList: async function (req, res) {
        try {
            let result = await AssignmentModel.find({}, { __v: 0 }).exec();
            res.status(200).send({ status: true, assignmentList: result });
        } catch (error) {
            res.status(500).send({ status: false, error });
        }
    },

    getAssignmentById: async function (req, res) {
        var data = req.body;
        console.log("Data:" + data);
        try {
            let result = await AssignmentModel.find({
                _id: data._id,
            }).exec();
            res.status(200).send({ status: true, assignments: result });
        } catch (error) {
            res.status(500).send({ status: false, error });
        }
    },

    assignTaskToMember: async function(req,res) {
        var data=req.body;
        console.log(data);
        try {
            if (data._id !== "No Team Member found!") {
                let result = await TeamMemberModel.updateOne(
                    { _id: data._id },
                    {
                        $set: {
                            member_name: data.member_name,
                            assignment_list:data.assignment_list
                        },
                    }
                );
                console.log(result);
                res
                    .status(200)
                    .send({ status: true, result, message: "assigned new task to team member" });
            }
            else {
                res.status(404).send({ status: false, error: "Team Member List is Empty!" });
            }
        } catch (error) {
            res.status(500).send({ status: false, error });
        }
    },

    deleteAssignmentById: async function (req, res) {
        var data = req.body;
        try {
          let result = await AssignmentModel.deleteOne({ _id: data._id });
          res.send({ status: true, result, message: "deleted one assignment" });
        } catch (error) {
          res.status(500).send({ status: false, error });
        }
      },
    
      deleteAllAssignments: async function (req, res) {
        try {
          let result = await AssignmentModel.deleteMany({});
          res.send({ status: true, result, message: "All Assignments deleted" });
        } catch (error) {
          res.status(500).send({ status: false, error });
        }
      }
}
module.exports = AssignmentAPIController;
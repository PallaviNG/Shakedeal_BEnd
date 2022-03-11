const { TeamModel, TeamMemberModel } = require("../model/TeamModel");


const TeamAPIController = {
    home: function (req, res) {
        res.send({ status: true, message: "default assignment" });
    },

    createNewTeam: async function (req, res) {
        var data = req.body;
        console.log("Create");
        console.log(data);
        try {
            const newTeam = new TeamModel({
                team_name: data.team_name,
                team_members:data.team_members
            });
            const result = await newTeam.save();
            res
                .status(200)
                .send({ status: true,result, message: "created new Team" });
        } catch (error) {
            res.status(500).send({ status: false, error: error });
        }
    },

    getTeamList: async function (req, res) {
        console.log("Hi");
        try {
            let result = await TeamModel.find({}, { __v: 0 }).exec();
            res.status(200).send({ status: true, teamList: result });
        } catch (error) {
            res.status(500).send({ status: false, error });
        }
    },

    getTeamById: async function (req, res) {
        var data = req.body;
        console.log("Data:" + data);
        try {
            let result = await TeamModel.find({
                _id: data._id,
            }).exec();
            res.status(200).send({ status: true, teamList: result });
        } catch (error) {
            res.status(500).send({ status: false, error });
        }
    },

    createNewTeamMember: async function (req, res) {
        var data = req.body;
        console.log(data);
        try {
            const newTeamMember = new TeamMemberModel({
                member_name: data.member_name,
                assignment_list:data.assignment_list
            });
            const result = await newTeamMember.save();
            res
                .status(200)
                .send({ status: true, result, message: "created new Team Member" });
        } catch (error) {
            res.status(500).send({ status: false, error: error });
        }
    },

    getTeamMemberList: async function (req, res) {
        try {
            let result = await TeamMemberModel.find({}, { __v: 0 }).exec();
            res.status(200).send({ status: true, teamMemberList: result });
        } catch (error) {
            res.status(500).send({ status: false, error });
        }
    },

    getTeamMemberById: async function (req, res) {
        var data = req.body;
        console.log("Data:" + data);
        try {
            let result = await TeamMemberModel.find({
                _id: data._id,
            }).exec();
            res.status(200).send({ status: true, teamMemberDetails: result });
        } catch (error) {
            res.status(500).send({ status: false, error });
        }
    },


    addNewMemberToTeam: async function(req,res) {
        var data=req.body;
        console.log(data);
        try {
            if (data._id !== "No Team found!") {
                let result = await TeamModel.updateOne(
                    { _id: data._id },
                    {
                        $set: {
                            team_name: data.team_name,
                            team_members:data.team_members
                        },
                    }
                );
                console.log(result);
                res
                    .status(200)
                    .send({ status: true, result, message: "added new member to batch" });
            }
            else {
                res.status(404).send({ status: false, error: "Team List is Empty!" });
            }
        } catch (error) {
            res.status(500).send({ status: false, error });
        }
    },

    deleteTeamById: async function (req, res) {
        var data = req.body;
        try {
          let result = await TeamModel.deleteOne({ _id: data._id });
          res.send({ status: true, result, message: "deleted one team" });
        } catch (error) {
          res.status(500).send({ status: false, error });
        }
      },
    
      deleteAllTeams: async function (req, res) {
        try {
          let result = await TeamModel.deleteMany({});
          res.send({ status: true, result, message: "All Teams deleted" });
        } catch (error) {
          res.status(500).send({ status: false, error });
        }
      },

    deleteTeamMemberById: async function (req, res) {
        var data = req.body;
        try {
          let result = await TeamMemberModel.deleteOne({ _id: data._id });
          res.send({ status: true, result, message: "deleted one team member" });
        } catch (error) {
          res.status(500).send({ status: false, error });
        }
      },
    
      deleteAllTeamMembers: async function (req, res) {
        try {
          let result = await TeamMemberModel.deleteMany({});
          res.send({ status: true, result, message: "All Team Members deleted" });
        } catch (error) {
          res.status(500).send({ status: false, error });
        }
      }
}
module.exports = TeamAPIController;
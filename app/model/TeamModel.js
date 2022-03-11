let mongoose = require("mongoose");
const ObjectID = require("mongoose").Types.ObjectId;
let Schema = mongoose.Schema;

let AssignmentSchema = new Schema({
    assignment_title: { type: String, trim: true },
    assignment_date: { type: Date, default: Date.now }
});

let TeamMemberSchema = new Schema({
    member_name: { type: String, trim: true },
    assignment_list: [AssignmentSchema]
});

let TeamSchema = new Schema({
    team_name: { type: String, trim: true },
    team_members: [TeamMemberSchema]
});


const TeamModel = mongoose.model("team", TeamSchema);
const TeamMemberModel = mongoose.model("team_member", TeamMemberSchema);
const AssignmentModel = mongoose.model("assignment", AssignmentSchema);

module.exports = {
    TeamModel,
    TeamMemberModel,
    AssignmentModel
}
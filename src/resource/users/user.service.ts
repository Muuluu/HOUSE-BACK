import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Model, Sequelize } from 'sequelize-typescript';
import { connector } from 'src/utils/connector';
import { UserUpdateDto } from './dto/user-update.dto';
import { User } from './models/user.model';
import { Team } from './models/team.model';
import { TeamMember } from './models/team_member.model';
import { createTeamDto } from './dto/create-team.dto';
import { createTeamMemberDto } from './dto/create-team-member.dto';
import { UpdatePicDto } from './dto/update-pic.dto';
import { data } from 'cheerio/lib/api/attributes';

@Injectable()
export class UserService {
   
    constructor(
        @InjectModel(User) private userModel: typeof User,
        @InjectModel(Team) private teamModel: typeof Team,
        @InjectModel(TeamMember) private teamMembersModel: typeof TeamMember,
        private sequelize: Sequelize,
    ) { this.sequelize.sync() }

    async createUser({
        id,
        userName,
        phone,
        email,
        firstName,
        lastName
    }: UserCreateType) {
        const user = new this.userModel({
            id: id,
            userName: userName,
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone
        })
        user.save();
        return user;
    }

    async getMe(userId) {
        const user = await this.userModel.findOne({
            where: {
                id: userId
            }
        })
        return user
    }

    async updateMe(userId,
        {
        firstName,
        lastName,
        gender,
        birthDate
    }: UserUpdateDto) {
        this.userModel.update({
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            birthDate: birthDate
        }
        ,{
        where:  { id:userId }
        }
        );
        return "user";
    }
    async updatePic(userId, 
        {
        profilePic
    }: UpdatePicDto) {
        this.userModel.update({
            profilePic
        },{
            where: {id:userId}
        }); return "user"
    }

    async createTeam(data: createTeamDto, userId: string) {
    console.log(data)
        const team = new this.teamModel({
            createdUserId: userId,
            teamType: data.teamType,
            teamName: data.teamName,
        })
        await team.save();
        return team;
    }
    async createTeamMember(data: createTeamMemberDto){
        const teamMember = new this.teamMembersModel({
            userId: data.userId,
            teamId: data.teamId,
            teamRole: data.teamRole
        })
        await teamMember.save();
        return teamMember;
    }
}

export type UserCreateType = {
    id: string,
    userName: string;
    phone: string;
    firstName: string;
    lastName: string;
    email: string;
};

export type UserUpdateType = {
    firstName: string;
    lastName: string;
};
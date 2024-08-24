import {defineAbility, AbilityBuilder, AbilityClass, InferSubjects, PureAbility } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { User } from "src/users/entities/user.entity";

export enum Action {
    Manage = 'manage', //wildcard for any action
    Create = 'create', 
    Read = 'read', 
    Update = 'update', 
    Delete = 'delete'
}

export type Subjects = InferSubjects<typeof User> | 'all';
export type AppAbility = PureAbility<[Action, Subjects]>; 

@Injectable()
export class AbilityFactory {
    // defineAbility(user: User) {
    //     const {can, cannot, build} = new AbilityBuilder(Ability as AbilityClass<AppAbility>)

    //   can(Action.Read, 'all')
    // }
 }

import { ModelRepository } from "src/shared/database/repository/model.repository";
import { Injectable } from "@nestjs/common";
import { UserModel } from "../model/user.model";

@Injectable()
export class UserRepository extends ModelRepository<UserModel> {
    constructor() {
        super(UserModel);
    }
}
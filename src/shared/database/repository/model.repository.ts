/* eslint-disable prettier/prettier */
import { FindOptions, Transaction, WhereOptions } from "sequelize";
import { IModel } from "./model.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ModelRepository<M> implements IModel<M> {
    constructor(private readonly model) {}

    async create<T = unknown>(data: T, transaction: Transaction | null): Promise<M> {
        return this.model.create(data, { transaction });
    }
    
    async bulkCreate<T = unknown>(data: T[], transaction: Transaction | null): Promise<M[]> {
        return this.model.bulkCreate(data, { transaction });
    }

    async findAll<T = unknown>(filter: WhereOptions<M> = {}, includes?: FindOptions<T>): Promise<M[]> {
        return this.model.findAll({where: {...filter}, ...includes});
    }

    async findOne<T = unknown>(filter: WhereOptions<M>, includes?: FindOptions<T>): Promise<M> {
        return this.model.findOne({where: { ...filter }, ...includes});
    }
    
    async findById<T = unknown>(id: string | number, includes?: FindOptions<T>): Promise<M> {
        return this.model.findByPk(id, { ...includes });
    }

    async update<T = unknown>(filter: WhereOptions<M>, data: Partial<T>, transaction?: Transaction): Promise<M> {
        return this.model.update(data, {where: { ...filter }, returning: true, transaction});
    }

    async delete<T = unknown>(filter: WhereOptions<T>, transaction: Transaction | null): Promise<M> {
        return this.model.destroy({where: { ...filter }, transaction });
    }
}
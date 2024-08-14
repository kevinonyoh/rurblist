import { FindOptions, Transaction, WhereOptions } from "sequelize";

export interface IModel<M> {
    create<T = unknown>(data: T, transaction: Transaction | null);

    bulkCreate<T = unknown>(data: T[], transaction: Transaction | null): Promise<M[]>;

    findAll<T = unknown>(filter?: WhereOptions<M>, includes?: FindOptions<T>): Promise<M[]>;

    findOne<T = unknown>(filter: WhereOptions<M>, includes?: FindOptions<T>): Promise<M>;

    findById<T = unknown>(id: string | number, includes?: FindOptions<T>): Promise<M>;

    update<T = unknown>(filter: WhereOptions<M>, data: Partial<T>, transaction?: Transaction | null): Promise<M>;

    delete<T = unknown>(filter: WhereOptions<T>, transaction?: Transaction | null): Promise<M>;
}
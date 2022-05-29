import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "src/functions/dbSrc/User.sqlite",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})

export const initializeDataSource = async () => {
    if(AppDataSource.isInitialized) {
        return ;
    }
    else {
        
        
    }
}
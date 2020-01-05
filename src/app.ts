import { GraphQLServer } from "graphql-yoha";
import cors from "cors";
import helmet from "helmat";
import logger from "morgan";

class App {
    public app: GraphQLServer;
    constructor(){
        this.app = new GraphQLServer({
        this.middlewares()l
        })
    }
    private middlewares = () : void => {
        this.app.express.use(cors())
        this.app.express.use(logger("dev"));
        this.app.express.use(helmet());
    };
}

export default new App().app;
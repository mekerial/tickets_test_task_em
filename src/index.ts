import {runDb} from "./db/db";
import {app} from "./settings";

const port = 3000;



app.set('trust proxy', true)
app.listen(port, async () => {
    await runDb()
})
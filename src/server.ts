import { app } from "./app";

const port = 3001;

app.listen(port, () => {
    console.log(`API sucessfully started on port ${port}`);
})
import express , { Request, Response} from "express";
import connection from "./Connection";
import todos from "./Schemas/Todo.Schema";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
connection();
const PORT = 5000;


app.post("/createTodo", async(req: Request, resp: Response) => {
    const { todo } = req.body;
    try {
        const result = await todos.create({
            Items: todo
        });
        resp.status(200).json(result);

    }catch(err){
        console.log("Something wrong in creating the todo ");
        resp.send(err);

    }
})

app.get("/getAll", async(req: Request, resp: Response) => {
    try {
        const result = await todos.find();
        console.log("result", result);
        resp.status(200).send(result); 

    }catch(err){
        resp.send({message: "Something went wrong !"})
        console.log("err", err);

    }
})

app.post("/update/:todoId", async (req: Request, resp: Response) => {
  const { todoId } = req.params;
  const { todo } = req.body;
  try {
    const result = await todos.findByIdAndUpdate(
      todoId,
      {
        $set: {
          Items: todo,
        },
      },
      {
        new: true,
      }
    );
    if(!result){
        resp.send({message: "no todo found here !"})
    }
    resp.status(200).send(result);
    
  } catch (err) {
    resp.status(400).send(err);
  }
});

app.delete("/deleteTodo/:id", async(req: Request, resp: Response) => {
    const { id } = req.params;
    try{
        const result = await todos.deleteOne({_id: id});
        if(result.deletedCount == 1){
            return resp.send({message: "successfully deleted -"})
        }else{
             resp.send({message: "delete operation failed !"})
        }
        console.log("deleting item", result);
        return resp.status(200).send(result);
        

    }catch(err){
         console.log("error", err);
        return resp.status(400).send({message: "something went wrong !"});
       

    }
})



app.listen(PORT,() => {
    console.log(`port is running in ${PORT}`);
})
import fs from "fs/promises";

export default class DataService {
    //READ DATA
    static async readData(path){
        try {
            const data = await fs.readFile(path,{encoding:"utf-8"})
            return JSON.parse(data)
        } catch (error) {
            console.error("Error reading data: ", error)
            return null;
        }
        
    }
    //WRITE DATA
    static async writeData(path, data = []){
        try {
            await fs.writeFile(path,JSON.stringify(data,null,2))
        } catch (error) {
            console.error("Error writing data: ", error)
            return null;
        }
    }
}
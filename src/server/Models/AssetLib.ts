import { statSync } from "fs";
import { readdir, stat } from "fs/promises";
import path from "path";

interface fileData{
            name: string
            fileType: string //change to enum (Images, pdf, video and NOT png,jpeg,etc..)
            uri?: string
}



export class AssetLib{

    private static baseAssetPath = path.join(__dirname, '../../public/assets/');

    private static assetTypeRegex = {
            "images" : "webp|jpeg|jpg|png|gif|ico",
            "pdf" : "pdf"
    }


    private static matchFileType(fileExtension: string,assetType: string){
        return fileExtension.match(AssetLib.assetTypeRegex[assetType as string]) ? true : false
    }

    private static isFile(dirent: string){
         const dirStat = statSync(dirent)
         return dirStat.isFile()

    }

    private static getFilesWODirectories(dir: string[]){
        return dir.filter(dirent=>{
            const dirPath = path.join(AssetLib.baseAssetPath, dirent)
            return AssetLib.isFile(dirPath)
        })
    }

    public static async getStaticAssets(offset: number, limit: number, assetType: string){

        
        const dir = await readdir(AssetLib.baseAssetPath, {recursive: true})
       
        let files : fileData[] = [];

        const dirWODirectories = AssetLib.getFilesWODirectories(dir)


        for await (const dirent of dirWODirectories.slice(offset, offset + limit)){
            const fileName =path.basename(dirent)
            const fileExtension = fileName.split('.').slice(-1)[0]
            

            if(AssetLib.matchFileType(fileExtension,assetType)){  
                
                files.push({
                    name: fileName,
                    fileType: fileExtension,
                    uri: `/assets/${dirent.replace(/\\/g, '/')}`
                
                })
            }
        }
        return files;


    }


}
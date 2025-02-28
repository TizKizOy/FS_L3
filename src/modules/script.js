const { error } = require("console");
const fs = require("fs");
const path = "C:/КБиП/WebПрограммирование/лаба 3/src/modules/file.txt";
const dest = "copy.txt";
const folderPath = "C:/КБиП/WebПрограммирование/лаба 3/src/modules"

function readFileSync(path){
    try{
        let data = fs.readFileSync(path,'utf8');
        console.log("Данные с файла: ", data)
    } catch(error){
        throw error
    }
}
function readFileAsync(path){
    fs.readFile(path, 'utf8', (error, data)=> {
        if (error) throw error; 
        console.log("Данные с файла: ", data);
    });
}


function writeFileSync(path, str){
    try{
        fs.writeFileSync(path, str, 'utf8');
        console.log('Запись файла завершена')
        readFileSync(path)
    } catch(error){
        throw error
    }
}
function writeFileAsync(path, str){
    fs.writeFile(path, str, 'utf8' ,(error)=>{
        if(error) throw error;
        console.log('Запись файла завершена')
        readFileAsync(path)
    });
}


function appendFileSync(path, str){
    try{
        fs.appendFileSync(path, str, 'utf8');
        console.log('Файл дописан');
        readFileSync(path)
    } catch(error){
        throw error
    }
}
function appendFileAsync(path, str){
    fs.appendFile(path, str, 'utf8' ,(error)=>{
        if(error) throw error
        console.log('Файл дописан');
        readFileAsync(path)
    })
}


function clearFileSync(path){
    try{
        fs.writeFileSync(path, '', 'utf8');
        console.log('Содержимое файла успешно удалено');
    } catch(error){
        throw error
    }
    
}
function clearFileAsync(path){
    fs.writeFile(path, '', 'utf8',(error)=>{
        if(error) throw error
        console.log('Содержимое файла успешно удалено');
    });
}


function removeNoiseSync(path){
    try{
        let data = fs.readFileSync(path,'utf8');
        data = data.replace(/[0-9]/g, '').replace(/[A-Z]/g, (match) => match.toLowerCase());
        fs.writeFileSync(path, data, 'utf8');
        console.log('Шум успешно удалён', data)
    } catch(error){
        throw error;
    }
}
function removeNoiseAsync(path){
    fs.readFile(path, 'utf8', (error, data)=>{
        if(error) throw error;
        data = data.replace(/[0-9]/g, '').replace(/[A-Z]/g, (match) => match.toLowerCase());
        fs.writeFile(path, data, 'utf8', (error) =>{
            if(error) throw error;
            console.log('Шум успешно удалён', data)
        })
    })
}


function copyFileSync(src,dest){
    try{
        fs.copyFileSync(src,dest);
        console.log('Файл успешно скопирован')
    } catch(error){
        throw error
    }
}
function copyFileAsync(src, dest){
    fs.copyFile(src, dest,(error)=>{
        if(error) throw error
        console.log('Файл успешно скопирован')
    })
}


function createFolderSync(folderPath){
    fs.mkdirSync(folderPath);
    console.log('Папка успешно создана');
}
function createFolderAsync(folderPath){
    fs.mkdir(folderPath);
    console.log('Папка успешно создана');
}


function deleteFolderSync(folderPath) {
    fs.rmdirSync(folderPath, { recursive: true });
    console.log('Папка успешно удалена');
}
function deleteFolderAsync(folderPath, callback) {
    fs.rmdir(folderPath, { recursive: true })
    console.log('Папка успешно удалена');
}


function listFilesSync(directory) {
    try{
        const files = fs.readdirSync(directory);
        files.forEach((file) => {
            if (fs.lstatSync(file).isFile() && !file.startsWith('.')) {
                console.log(file);
            }
        });
    } catch(error){
        throw error
    }
}
function listFilesAsync(directory) {
    fs.readdir(directory, (error, files) => {
        if (error) {
            return error;
        }
        files.forEach((file) => {
            fs.lstat(file, (error, stats) => {
                if (error) {
                    return error;
                }
                if (stats.isFile() && !file.startsWith('.')) {
                    console.log(file);
                }
            });
        });
    });
}


function deleteAllFilesSync(directory) {
    const files = fs.readdirSync(directory);
    files.forEach((file) => {
        if (!file.startsWith('.')) {
            const filePath = path.join(directory, file);
            if (fs.lstatSync(filePath).isDirectory()) {
                fs.rmdirSync(filePath, { recursive: true });
            } else {
                fs.unlinkSync(filePath);
            }
        }
    });
    console.log('Все файлы и папки, за исключением служебных, успешно удалены');
}
function deleteAllFilesAsync(directory) {
    fs.readdir(directory, (error, files) => {
        if (error) {
            return error;
        }
        files.forEach((file) => {
            if (!file.startsWith('.')) {
                const filePath = path.join(directory, file);
                fs.lstat(filePath, (error, stats) => {
                    if (error) {
                        return error;
                    }
                    if (stats.isDirectory()) {
                        fs.rmdir(filePath, { recursive: true }, (error) => {
                            if (error) {
                                return error;
                            }
                        });
                    } else {
                        fs.unlink(filePath, (error) => {
                            if (error) {
                                return error;
                            }
                        });
                    }
                });
            }
        });
        console.log('Все файлы и папки, за исключением служебных, успешно удалены');
    });
}
export default function FileValidator(fileToValidate) {
    if(!typeof fileToValidate ==='string'){
        console.log('file',fileToValidate)
        var ext = fileToValidate.name.substr(fileToValidate.name.lastIndexOf('.'));
        switch (ext) {
            case '.jpg':
            case '.jpeg':
            case '.png':
                return true
            default:
                return false
        }
    }else{
        return true
    }
    
}

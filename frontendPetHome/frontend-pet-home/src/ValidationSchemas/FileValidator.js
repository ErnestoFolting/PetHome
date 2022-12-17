export default function FileValidator(fileToValidate) {
    var ext = fileToValidate.name.substr(fileToValidate.name.lastIndexOf('.'));
    switch (ext) {
        case '.jpg':
        case '.jpeg':
        case '.png':
            return true
        default:
            return false
    }
}

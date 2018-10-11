const { getOptions } = require("loader-utils");
const path = require("path");
const fsExtra = require("fs-extra-promise");

function createError(message)
{
    return new Error("exe-loader: " + message);
}

module.exports = function (content) {
    let callback = this.async();
    if(!(content instanceof Buffer))
        callback(createError("content is not"));

    let options = getOptions(this);
    let exeName = path.basename(this.resourcePath);

    if(!options || !options.path)
        return callback(createError("path is undefined"));
    if(!options || !options.relative)
        return callback(createError("relative path is undefined"));

    if(path.isAbsolute(options.relative))
        return callback(createError("relative path is absolute path"));

    let relativePath = path.join(options.relative, exeName);
    relativePath = relativePath.replace(/\\/g, "\\\\");
    fsExtra.ensureDirAsync(options.path)
    .then(()=>{
        // copy exe file to path
        fsExtra.writeFile(path.resolve(options.path, exeName), content, (err)=>{
            if(err)
                return callback(err);
            callback(null, "module.exports = \"" + relativePath + "\";");
        });
    }).catch((err)=>{
        callback(err);
    });
}

module.exports.raw = true;
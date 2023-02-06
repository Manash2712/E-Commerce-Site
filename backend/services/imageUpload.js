import s3 from "../config/s3Config.js"


export const s3FileUpload = async({bucketName, key, body, contentType}) => {
    return await s3.upload({
        Bucket: bucketName,
        Key: key,
        Body: body,
        ContentType: contentType
    })
    .promise()
}

export const s3FileDelete = async({bucketName, key}) => {
    // aws treat everything as object
    return await s3.deleteObject({
        Bucket: bucketName,
        Key: key,
    })
    .promise()
}
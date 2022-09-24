
export const fileUpload = async(file) => {
    //hacemos una peticion a cloudinary para solicitar el url de la img

    const cloudUrl = 'https://api.cloudinary.com/v1_1/dnhavqmec/upload';

    const formData = new FormData();
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file );//mandamos el archivo a cloudinary

    try {
        const resp = await fetch ( cloudUrl, {
            method: 'POST',
            body: formData
        });
         if (resp.ok) {
            const cloudResp = await resp.json();
            return cloudResp.secure_url;
         }else {
             //throw await resp.json();
             return null;
         } 
    } catch (error) {
        throw error;
    }

}

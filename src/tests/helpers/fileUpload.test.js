import cloudinary from 'cloudinary';
import { fileUpload } from "../../helpers/fileUpload";


cloudinary.config({ 
    cloud_name: 'dnhavqmec', 
    api_key: '185768689581431', 
    api_secret: 'Phvxp1OueejHib3ZBGKJp505m-w',

  });



describe('Pruebas en fileUpload', () => { 
    
    test('debe cargar un archivo y retornar el URL', async(done) => { 
                            //extraemos img de google
        const resp = await fetch('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWzb2b47vujg984KYIPSeSZEN_k5L-GNDwTjuigCr00lg_NzvjeaMiYDGBbjL_76SHftI&usqp=CAU');
        const blob = await resp.blob();//extraemos la img
        
        //simulamos un nuevo archvo para la prueba pasandole la img y colocando un nombre
        const file = new File([blob], 'foto.jpg');
        
        const url = await fileUpload( file );
        
        expect( typeof url ).toBe('string');

        //borrar img por id
        //extraemos el id de la img, el cual se encuentra a lo ultimo del url, dividimos el url en segments con split, 
        const segments = url.split('/');
        console.log(segments)
        const imageId = segments[ segments.length - 1].replace('jpg', '');//de esta manera removemos el .jpg que pega con nuestro id, lo reemplazamos por vacío ''


        cloudinary.v2.api.delete_resources(imageId, {}, () => {
            done();
        });
     })

    test('debe retornar un error', async() => { 
                            //extraemos img de google
        const file = new File([], 'foto.jpg');
        
        const url = await fileUpload( file );
        
        expect( url ).toBe(null);

     })
 })


